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

  // ============================================
  // STATE
  // ============================================
  let isReady = false;
  let currentUser = null;
  let currentRole = 'free';
  let authListeners = [];

  // ============================================
  // DOM REFS (populated on init)
  // ============================================
  let els = {};

  // ============================================
  // INIT
  // ============================================
  async function init() {
    // Cache DOM elements
    els = {
      // Desktop auth
      authButtons: document.getElementById('authButtons'),
      userMenu: document.getElementById('userMenu'),
      userEmail: document.getElementById('userEmail'),
      userBadge: document.getElementById('userBadge'),
      signOutBtn: document.getElementById('signOutBtn'),
      // Mobile auth
      authButtonsMobile: document.getElementById('authButtonsMobile'),
      userMenuMobile: document.getElementById('userMenuMobile'),
      userEmailMobile: document.getElementById('userEmailMobile'),
      userBadgeMobile: document.getElementById('userBadgeMobile'),
      // Shared
      upgradeBanner: document.getElementById('upgradeBanner'),
      upgradeBannerText: document.getElementById('upgradeBannerText'),
      premiumContent: document.querySelectorAll('.premium-locked')
    };

    // Load Clerk (script loads synchronously, so Clerk should be available)
    try {
      if (typeof Clerk === 'undefined') {
        throw new Error('Clerk SDK not loaded. Check the CDN URL.');
      }
      await Clerk.load({ publishableKey: CLERK_PUBLISHABLE_KEY });
      isReady = true;
      console.log('✅ Clerk auth initialized');
    } catch (err) {
      console.error('❌ Clerk failed to load:', err);
      console.warn('💡 Make sure you added your site domain in Clerk Dashboard → Configure → Paths → Allowed origins. Add: ' + window.location.origin);
      return;
    }

    // Listen for auth changes
    Clerk.addListener(({ user }) => {
      currentUser = user || null;
      updateUI();
      notifyListeners();
    });

    // Check initial state
    currentUser = Clerk.user || null;
    updateUI();
  }

  // ============================================
  // UI UPDATE
  // ============================================
  function updateUI() {
    const isLoggedIn = !!currentUser;

    // Toggle auth buttons vs user menu (desktop + mobile)
    const toggleDisplay = (el, show) => { if (el) el.style.display = show ? 'flex' : 'none'; };
    toggleDisplay(els.authButtons, !isLoggedIn);
    toggleDisplay(els.userMenu, isLoggedIn);
    toggleDisplay(els.authButtonsMobile, !isLoggedIn);
    toggleDisplay(els.userMenuMobile, isLoggedIn);

    if (isLoggedIn && currentUser) {
      const email = currentUser.emailAddresses?.[0]?.emailAddress || currentUser.id || 'User';
      
      // Set user email (desktop + mobile)
      if (els.userEmail) els.userEmail.textContent = email;
      if (els.userEmailMobile) els.userEmailMobile.textContent = email;

      // Get user role from publicMetadata, default to 'free'
      currentRole = currentUser.publicMetadata?.role || 'free';

      // Update badge (desktop + mobile)
      const updateBadge = (el) => {
        if (el) {
          el.textContent = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
          el.className = 'user-badge';
          el.classList.add('badge-' + currentRole);
        }
      };
      updateBadge(els.userBadge);
      updateBadge(els.userBadgeMobile);

      // Show upgrade banner for free users
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

      // Show/hide premium-locked elements
      els.premiumContent.forEach(el => {
        if (currentRole === 'free') {
          el.classList.add('locked');
        } else {
          el.classList.remove('locked');
        }
      });
    } else {
      // Not logged in - hide upgrade banner, show login prompt
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
  // AUTH ACTIONS
  // ============================================
  function openSignIn() {
    Clerk.openSignIn({
      appearance: {
        elements: {
          card: { boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }
        }
      }
    });
  }

  function openSignUp() {
    Clerk.openSignUp({
      appearance: {
        elements: {
          card: { boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }
        }
      }
    });
  }

  async function signOut() {
    await Clerk.signOut();
    currentUser = null;
    currentRole = 'free';
    updateUI();
    notifyListeners();
  }

  // ============================================
  // LISTENER SYSTEM
  // ============================================
  function onAuthChange(callback) {
    authListeners.push(callback);
    // Immediately call with current state if ready
    if (isReady) {
      callback({ user: currentUser, role: currentRole, isLoggedIn: !!currentUser });
    }
    // Return unsubscribe function
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
