/**
 * Auth Manager - Clerk Authentication Integration
 * Handles user sign-up, sign-in, session management, and role-based access
 */

const Auth = (function() {
  'use strict';

  // ============================================
  // CONFIG
  // ============================================
  const CLERK_PUBLISHABLE_KEY = 'pk_test_c3VpdGFibGUtZWdyZXQtNjIuY2xlcmsuYWNjb3VudHMuZGV2JA';
  const CLERK_CDN = 'https://js.clerk.com/v1/clerk.browser.js';

  // ============================================
  // STATE
  // ============================================
  let isReady = false;
  let isLoading = false;
  let loadError = null;
  let currentUser = null;
  let currentRole = 'free';
  let authListeners = [];
  let pendingCalls = [];

  // ============================================
  // DOM REFS
  // ============================================
  let els = {};

  // ============================================
  // DYNAMIC SCRIPT LOADER
  // ============================================
  function loadClerkScript() {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (typeof Clerk !== 'undefined') {
        resolve();
        return;
      }

      // Check if script tag already exists
      let script = document.querySelector(`script[src="${CLERK_CDN}"]`);
      if (!script) {
        script = document.createElement('script');
        script.src = CLERK_CDN;
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.head.appendChild(script);
      }

      // Wait for load
      script.onload = () => {
        // Clerk SDK takes a moment to initialize after script loads
        const checkClerk = () => {
          if (typeof Clerk !== 'undefined') {
            resolve();
          } else {
            setTimeout(checkClerk, 50);
          }
        };
        setTimeout(checkClerk, 100);
      };
      script.onerror = () => reject(new Error('Failed to load Clerk SDK from CDN'));
    });
  }

  // ============================================
  // INIT
  // ============================================
  async function init() {
    // Cache DOM elements
    els = {
      authButtons: document.getElementById('authButtons'),
      userMenu: document.getElementById('userMenu'),
      userEmail: document.getElementById('userEmail'),
      userBadge: document.getElementById('userBadge'),
      signOutBtn: document.getElementById('signOutBtn'),
      authButtonsMobile: document.getElementById('authButtonsMobile'),
      userMenuMobile: document.getElementById('userMenuMobile'),
      userEmailMobile: document.getElementById('userEmailMobile'),
      userBadgeMobile: document.getElementById('userBadgeMobile'),
      upgradeBanner: document.getElementById('upgradeBanner'),
      upgradeBannerText: document.getElementById('upgradeBannerText'),
      premiumContent: document.querySelectorAll('.premium-locked')
    };

    isLoading = true;

    // Load Clerk script dynamically
    try {
      await loadClerkScript();
      await Clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });
      isReady = true;
      isLoading = false;
      console.log('✅ Clerk auth initialized');

      // Listen for auth changes
      Clerk.addListener(({ user }) => {
        currentUser = user || null;
        updateUI();
        notifyListeners();
      });

      // Check initial state
      currentUser = Clerk.user || null;
      updateUI();

      // Process any calls that were waiting for Clerk
      while (pendingCalls.length) {
        const fn = pendingCalls.shift();
        try { fn(); } catch(e) { console.warn('Pending call error:', e); }
      }

    } catch (err) {
      isLoading = false;
      loadError = err;
      console.error('❌ Clerk failed to load:', err.message);
      console.warn('💡 Check browser console (F12 > Network tab) to see if ' + CLERK_CDN + ' loaded');
    }
  }

  // ============================================
  // SAFE AUTH CALLS
  // ============================================
  function safeClerkCall(fn) {
    if (isReady && typeof Clerk !== 'undefined') {
      try { fn(); } catch(e) { console.error('Clerk error:', e); }
    } else if (isLoading) {
      pendingCalls.push(fn);
    } else {
      // Failed or not started - try loading again
      console.warn('Clerk not ready yet. Try again in a moment.');
      if (!isLoading && !loadError) {
        init();
        pendingCalls.push(fn);
      }
    }
  }

  function openSignIn() {
    safeClerkCall(() => {
      Clerk.openSignIn({
        appearance: {
          elements: {
            card: { boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }
          }
        }
      });
    });
  }

  function openSignUp() {
    safeClerkCall(() => {
      Clerk.openSignUp({
        appearance: {
          elements: {
            card: { boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }
          }
        }
      });
    });
  }

  async function signOut() {
    if (!isReady || typeof Clerk === 'undefined') return;
    try {
      await Clerk.signOut();
      currentUser = null;
      currentRole = 'free';
      updateUI();
      notifyListeners();
    } catch(e) {
      console.error('Sign out error:', e);
    }
  }

  // ============================================
  // UI UPDATE
  // ============================================
  function updateUI() {
    const isLoggedIn = !!currentUser;

    const toggleDisplay = (el, show) => { if (el) el.style.display = show ? 'flex' : 'none'; };
    toggleDisplay(els.authButtons, !isLoggedIn);
    toggleDisplay(els.userMenu, isLoggedIn);
    toggleDisplay(els.authButtonsMobile, !isLoggedIn);
    toggleDisplay(els.userMenuMobile, isLoggedIn);

    if (isLoggedIn && currentUser) {
      const email = currentUser.emailAddresses?.[0]?.emailAddress || currentUser.id || 'User';
      if (els.userEmail) els.userEmail.textContent = email;
      if (els.userEmailMobile) els.userEmailMobile.textContent = email;

      currentRole = currentUser.publicMetadata?.role || 'free';

      const updateBadge = (el) => {
        if (el) {
          el.textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
          el.className = 'user-badge';
          el.classList.add('badge-' + currentRole);
        }
      };
      updateBadge(els.userBadge);
      updateBadge(els.userBadgeMobile);

      if (els.upgradeBanner) {
        if (currentRole === 'free') {
          els.upgradeBanner.classList.add('visible');
          if (els.upgradeBannerText) {
            els.upgradeBannerText.textContent = 'You are on the Free plan. Upgrade to Premium to unlock all features!';
          }
        } else {
          els.upgradeBanner.classList.remove('visible');
        }
      }

      els.premiumContent.forEach(el => {
        if (currentRole === 'free') {
          el.classList.add('locked');
        } else {
          el.classList.remove('locked');
        }
      });
    } else {
      currentRole = 'free';
      if (els.upgradeBanner) {
        els.upgradeBanner.classList.add('visible');
        if (els.upgradeBannerText) {
          els.upgradeBannerText.textContent = 'Sign in to track your prompts and unlock premium features!';
        }
      }
    }
  }

  // ============================================
  // LISTENER SYSTEM
  // ============================================
  function onAuthChange(callback) {
    authListeners.push(callback);
    if (isReady) {
      callback({ user: currentUser, role: currentRole, isLoggedIn: !!currentUser });
    }
    return () => {
      authListeners = authListeners.filter(cb => cb !== callback);
    };
  }

  function notifyListeners() {
    const state = { user: currentUser, role: currentRole, isLoggedIn: !!currentUser };
    authListeners.forEach(cb => {
      try { cb(state); } catch (e) { console.warn('Auth listener error:', e); }
    });
  }

  // ============================================
  // PUBLIC API
  // ============================================
  return {
    init,
    openSignIn,
    openSignUp,
    signOut,
    onAuthChange,
    get isReady() { return isReady; },
    get user() { return currentUser; },
    get role() { return currentRole; },
    get isLoggedIn() { return !!currentUser; }
  };
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => Auth.init());
