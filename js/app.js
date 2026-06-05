/**
 * Business Prompt Generator - Main Application
 * Handles prompt generation, UI interactions, and premium modal
 */

(function() {
  'use strict';

  // ============================================
  // PROMPT TEMPLATES
  // ============================================
  const TEMPLATES = {
    instagram: {
      name: 'Instagram Posts',
      templates: [
        `Act as a social media manager for a {businessType} business that offers {product}.

Create an Instagram caption with the following specifications:

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Include:
1. A scroll-stopping hook (first 2 lines)
2. The main body that highlights benefits
3. 3-5 relevant hashtags
4. A question to drive comments
5. A call-to-action for the bio link

Also suggest 2 story poll ideas and 1 carousel post structure.`,
        `You are a social media strategist for {businessType} specializing in {product}.

Write an Instagram caption that:

GENERAL GOAL: {goal}
AUDIENCE: {audience}
TONE: {tone}

Structure the caption as:
- Opening hook (create curiosity or state a relatable problem)
- Value-driven body (show how {product} solves the problem)
- Social proof section
- Engagement question
- 5 hashtags (mix of broad and niche)

Format the caption with line breaks for easy reading on mobile.`
      ]
    },
    product: {
      name: 'Product Descriptions',
      templates: [
        `Act as an expert copywriter for {businessType}.

Write a compelling product description for {product} that drives conversions.

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Format the description with:

BULLET POINTS:
- List 5 key features
- For each feature, explain the BENEFIT (not just the feature)

DESCRIPTION BODY:
- Start with a pain point or desire that resonates with {audience}
- Introduce {product} as the solution
- Highlight what makes it unique (materials, process, origin, etc.)
- Include social proof elements
- Create urgency or scarcity
- End with a clear call-to-action

SEO KEYWORDS: Include 3 relevant keywords naturally`,
        `You are a conversion copywriter for {businessType}.

Write a powerful product description for {product}.

TARGET: {audience}
TONE: {tone}
OBJECTIVE: {goal}

Follow the AIDA framework:
ATTENTION: A headline that grabs attention (include emojis if appropriate for {tone})
INTEREST: 2-3 sentences explaining why {audience} needs {product}
DESIRE: Benefits-focused features. Why is {product} the best choice?
ACTION: Clear CTA telling the customer what to do next

Price anchoring suggestion and a short guarantee statement.`
      ]
    },
    whatsapp: {
      name: 'WhatsApp Messages',
      templates: [
        `Act as a business communication specialist for {businessType}.

Write a WhatsApp message for {product} to be sent to customers.

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Guidelines:
- Keep it conversational and not salesy
- Start with the customer's first name placeholder (use [Name])
- Use emojis sparingly for warmth
- Max 3-4 short paragraphs
- End with a low-friction CTA (reply, click, visit, etc.)
- Add an "opt-out" note if it's a broadcast

Write 3 variations: one short (1 paragraph), one medium (2-3 paragraphs), and one with a special offer.`,
        `You are a customer engagement expert for {businessType}.

Draft a WhatsApp broadcast message about {product}.

STYLE: {tone}
AUDIENCE: {audience}
PURPOSE: {goal}

Requirements:
1. Personalization placeholder at the start
2. Value-first opening (why they should care)
3. Clear, scannable format (use line breaks)
4. 2-3 emojis maximum
5. Specific CTA
6. Include delivery timing or availability if relevant

Also write a 1-line follow-up for customers who don't respond in 48 hours.`
      ]
    },
    complaint: {
      name: 'Complaint Responses',
      templates: [
        `Act as a customer service expert for {businessType}.

Write a response to a customer complaint regarding {product}.

TONE: Empathetic, professional, solution-oriented
TARGET AUDIENCE: {audience}
GOAL: {goal} - Resolve the issue and retain the customer

Structure the response:
[1] THANK & APOLOGIZE: Thank them for their feedback. Apologize sincerely without being defensive.
[2] UNDERSTAND: Show you understand the specific issue they're facing.
[3] EXPLAIN (if needed): Briefly explain what happened (without making excuses).
[4] SOLVE: Offer a specific solution or next steps. Use bullet points for clarity.
[5] REASSURE: Commit to improving.
[6] CLOSE: Leave the door open for further discussion.

Keep the tone warm but professional. Never use generic corporate language.`,
        `You handle customer complaints for {businessType}.

Write an empathetic complaint response template for issues related to {product}.

COMPLAINT CONTEXT: {goal}
CUSTOMER PROFILE: {audience}
OVERALL TONE: {tone}

The response must include:
- A genuine apology (no "we're sorry you feel that way" language)
- Validation of their frustration
- A clear explanation of what went wrong
- Tangible solution options (at least 2)
- Compensation suggestion (discount, freebie, refund, etc.)
- Timeline for resolution
- Direct contact info or escalation path

Write a 24-hour follow-up message to check if they're satisfied with the resolution.`
      ]
    },
    promotion: {
      name: 'Promotion Ideas',
      templates: [
        `Act as a creative marketing strategist for {businessType}.

Generate 5 promotion ideas for {product} to drive {goal}.

TARGET AUDIENCE: {audience}
TONE: {tone}
FORMAT: Multi-channel (social, email, in-store/website)

For each promotion include:
1. PROMOTION NAME (catchy and memorable)
2. CHANNEL (which platform to use)
3. THE HOOK (why customers will care)
4. OFFER DETAILS (what the customer gets)
5. TIMING (best day/time to launch)

Bonus: Suggest which promotion would work best for Instagram vs. email vs. WhatsApp.`,
        `You are a promotions expert for small businesses.

Design a complete promotional campaign for {product} at {businessType}.

CAMPAIGN GOAL: {goal}
TARGET: {audience}
BRAND VOICE: {tone}

Create:
1. LAUNCH STRATEGY (how to announce the promotion)
2. 3-DAY CONTENT PLAN (what to post each day across channels)
3. THE OFFER (discount, BOGO, bundle, freebie, contest, etc.)
4. URGHENCY MECHANISM (limited time, limited stock, early bird)
5. CROSS-SELL SUGGESTION (what complementary products to suggest)
6. SUCCESS METRIC (how to measure if this promotion worked)`
      ]
    },
    calendar: {
      name: 'Content Calendars',
      templates: [
        `Act as a content strategist for {businessType}.

Create a 30-day content calendar for {product}.

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Organize the calendar by weeks:

WEEK 1 - AWARENESS: Introduce {product} and educate the audience
WEEK 2 - ENGAGEMENT: Interactive content that gets people talking
WEEK 3 - SOCIAL PROOF: Testimonials, UGC, case studies
WEEK 4 - CONVERSION: Offers, CTAs, and closing

For each week, provide:
- 3-4 content ideas
- Best platform for each idea
- Content type (photo, video, text, carousel, story)
- Caption hook suggestion
- Hashtag ideas

Also suggest 2 "viral potential" content ideas.`,
        `You plan content for {businessType} selling {product}.

Build a 2-week content calendar focused on: {goal}.

AUDIENCE: {audience}
VOICE: {tone}

Each day needs:
- DAY & DATE reference
- CONTENT TITLE
- FORMAT (Reel/Post/Story/Carousel/Email)
- PLATFORM (Instagram, TikTok, Facebook, Email, WhatsApp)
- HOOK (first line)
- CTA
- 3 HASHTAGS

Mix of content types:
- 40% educational/value
- 25% entertaining/relatable
- 20% promotional
- 15% community building

End with a weekend "behind the scenes" or "day in the life" post idea.`
      ]
    },
    adcopy: {
      name: 'Ad Copy',
      templates: [
        `Act as a direct response copywriter for {businessType}.

Write Facebook and Instagram ad copy for {product}.

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Provide:

[HEADLINE OPTION 1] - Benefit-driven, max 40 characters
[HEADLINE OPTION 2] - Curiosity-driven, max 40 characters
[HEADLINE OPTION 3] - Urgency-driven, max 40 characters

[PRIMARY TEXT - SHORT] - 1-2 sentences for mobile (125 characters)
[PRIMARY TEXT - LONG] - 3-5 sentences for desktop

[BULLET POINTS] - 3 benefits as bullet points

[CTA SUGGESTIONS] - 3 different CTAs to test

A/B TESTING NOTE: Suggest which element to test first for maximum ROI.`,
        `You are a paid ads specialist for {businessType}.

Write Google Ads and TikTok ad copy for {product}.

CAMPAIGN GOAL: {goal}
AUDIENCE: {audience}
TONE: {tone}

GOOGLE ADS:
- 3 headline options (30 chars max each)
- 2 description options (90 chars max each)
- 5 negative keywords to exclude
- Suggested match types

TIKTOK ADS:
- Hook (first 3 seconds) idea
- Script for 15-30 second video
- Caption with hashtags
- CTA overlay text suggestion

BUDGET TIP: Suggest a starting daily budget and targeting strategy.`
      ]
    },
    tiktok: {
      name: 'TikTok Scripts',
      templates: [
        `Act as a TikTok content creator and strategist for {businessType}.

Write a viral TikTok video script featuring {product}.

TONE: {tone}
TARGET AUDIENCE: {audience}
GOAL: {goal}

Script structure:

HOOK (0-3 seconds) - Stop the scroll (question, bold statement, or visual hook)
BODY (3-15 seconds) - Show {product} in action, explain the value
CTA (15-20 seconds) - Tell viewers what to do

Include:
- On-screen text suggestions
- Audio/music style recommendation
- Transition idea
- 3-5 relevant hashtags
- Best time to post suggestion

Trend jacking idea: How to adapt this to a current TikTok trend.`,
        `You are a TikTok growth strategist for {businessType} selling {product}.

Create a series of 3 TikTok video scripts.

SERIES NAME: Educational series about {product}
GOAL: {goal}
AUDIENCE: {audience}
STYLE: {tone}

VIDEO 1 - THE HOOK VIDEO:
- Caption that creates curiosity
- Script that introduces the problem
- On-screen text cues
- Sound suggestion
- Hook rating (1-10)

VIDEO 2 - THE VALUE VIDEO:
- Teach something useful related to {product}
- 3 key points presented in a fast-paced format
- Engaging visual transitions
- CTA to follow for more tips

VIDEO 3 - THE SOCIAL PROOF VIDEO:
- Customer transformation or result
- Before/after format
- Testimonial text overlay
- Strong CTA to check link in bio

Each video should work as a standalone AND as part of the series.`
      ]
    }
  };

  // ============================================
  // DOM REFERENCES
  // ============================================
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const elements = {
    // Form
    category: $('#category'),
    businessType: $('#businessType'),
    product: $('#product'),
    tone: $('#tone'),
    audience: $('#audience'),
    goal: $('#goal'),
    generateBtn: $('#generateBtn'),

    // Output
    outputBody: $('#outputBody'),
    outputSection: $('#outputSection'),
    categoryBadge: $('#categoryBadge'),
    toneBadge: $('#toneBadge'),
    copyBtn: $('#copyBtn'),
    regenerateBtn: $('#regenerateBtn'),
    copyToast: $('#copyToast'),

    // Navigation
    mobileToggle: $('#mobileToggle'),
    navLinks: $('#navLinks'),

    // Category cards
    categoryCards: $$('.category-card'),

    // Premium modal
    premiumModal: $('#premiumModal'),
    modalClose: $('#modalClose'),
    buyPremiumBtn: $('#buyPremiumBtn'),
    buyBundleBtn: $('#buyBundleBtn'),

    // WhatsApp send
    whatsappSendBtn: $('#whatsappSendBtn'),

    // Footer links
    footerPaypal: $('#footerPaypal'),

    // FAQ
    faqQuestions: $$('.faq-question'),

    // Footer category links
    footerCatLinks: $$('.footer-links a[data-cat]')
  };

  // ============================================
  // STATE
  // ============================================
  let currentPrompt = '';
  let currentTemplateIndex = 0;
  let isCopied = false;

  // ============================================
  // HELPERS
  // ============================================
  function getCategoryName(category) {
    const TEMPLATES_KEYS = {
      instagram: 'Instagram Posts',
      product: 'Product Descriptions',
      whatsapp: 'WhatsApp Messages',
      complaint: 'Complaint Responses',
      promotion: 'Promotion Ideas',
      calendar: 'Content Calendars',
      adcopy: 'Ad Copy',
      tiktok: 'TikTok Scripts'
    };
    return TEMPLATES_KEYS[category] || 'Unknown';
  }

  function getToneEmoji(tone) {
    const emojis = {
      'Professional': '💼',
      'Friendly': '😊',
      'Humorous': '😂',
      'Inspirational': '✨',
      'Urgent': '⚡',
      'Luxury': '💎',
      'Casual': '✌️',
      'Educational': '📚'
    };
    return emojis[tone] || '';
  }

  // ============================================
  // PROMPT GENERATION
  // ============================================
  function generatePrompt() {
    const category = elements.category.value;
    const businessType = elements.businessType.value.trim();
    const product = elements.product.value.trim();
    const tone = elements.tone.value;
    const audience = elements.audience.value.trim();
    const goal = elements.goal.value.trim();

    // Validate
    if (!businessType || !product || !audience || !goal) {
      elements.outputBody.innerHTML = `
        <div class="output-placeholder">
          <span class="placeholder-icon">⚠️</span>
          <p>Please fill in all fields to generate your prompt.</p>
        </div>
      `;
      elements.copyBtn.disabled = true;
      elements.regenerateBtn.disabled = true;
      elements.whatsappSendBtn.disabled = true;
      return;
    }

    // Get templates for the selected category
    const categoryData = TEMPLATES[category];
    if (!categoryData) return;

    const templates = categoryData.templates;

    // Cycle through templates if regenerating
    if (currentTemplateIndex >= templates.length) {
      currentTemplateIndex = 0;
    }

    const template = templates[currentTemplateIndex];

    // Fill the template
    let prompt = template
      .replace(/\{businessType\}/g, businessType)
      .replace(/\{product\}/g, product)
      .replace(/\{tone\}/g, tone)
      .replace(/\{audience\}/g, audience)
      .replace(/\{goal\}/g, goal);

    currentPrompt = prompt;

    // Update badges
    elements.categoryBadge.textContent = getCategoryName(category);
    elements.toneBadge.textContent = `${getToneEmoji(tone)} ${tone}`;

    // Display prompt
    elements.outputBody.innerHTML = `<pre class="output-text">${escapeHtml(prompt)}</pre>`;
    elements.copyBtn.disabled = false;
    elements.regenerateBtn.disabled = false;
    elements.whatsappSendBtn.disabled = false;

    // Progress template index
    currentTemplateIndex++;

    // Show output section animation
    elements.outputSection.style.animation = 'none';
    setTimeout(() => {
      elements.outputSection.style.animation = 'fadeInUp 0.4s ease';
    }, 10);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ============================================
  // COPY TO CLIPBOARD
  // ============================================
  function copyToClipboard() {
    if (!currentPrompt) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentPrompt).then(() => {
        showCopySuccess();
      }).catch(() => {
        // Fallback
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  }

  function fallbackCopy() {
    const textarea = document.createElement('textarea');
    textarea.value = currentPrompt;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showCopySuccess();
  }

  function showCopySuccess() {
    elements.copyToast.classList.add('show');
    const copyText = elements.copyBtn.querySelector('.copy-text');
    const copyIcon = elements.copyBtn.querySelector('.copy-icon');
    const originalText = copyText.textContent;
    const originalIcon = copyIcon.innerHTML;

    copyText.textContent = 'Copied!';
    copyIcon.innerHTML = '✓';

    setTimeout(() => {
      copyText.textContent = originalText;
      copyIcon.innerHTML = originalIcon;
      elements.copyToast.classList.remove('show');
    }, 2000);
  }

  // ============================================
  // REGENERATE
  // ============================================
  function regeneratePrompt() {
    generatePrompt();
  }

  // ============================================
  // AUTH INTEGRATION
  // ============================================
  // Wire up auth buttons
  $('#signInBtn').addEventListener('click', () => Auth.openSignIn());
  $('#signUpBtn').addEventListener('click', () => Auth.openSignUp());
  $('#signOutBtn').addEventListener('click', () => Auth.signOut());

  // Listen for auth changes to protect premium features
  Auth.onAuthChange(({ isLoggedIn, role }) => {
    // WhatsApp send: lock for free users, unlock for premium/ultimate
    if (elements.whatsappSendBtn) {
      if (isLoggedIn && role !== 'free') {
        elements.whatsappSendBtn.classList.remove('premium-locked');
        elements.whatsappSendBtn.title = 'Send this prompt via WhatsApp to your customers';
      } else {
        elements.whatsappSendBtn.classList.add('premium-locked');
        elements.whatsappSendBtn.title = isLoggedIn
          ? 'Upgrade to Premium to send via WhatsApp'
          : 'Sign in and upgrade to send via WhatsApp';
      }
    }

    // Show/hide upgrade prompts on premium pricing cards
    document.querySelectorAll('.premium-feature-locked').forEach(el => {
      el.style.display = (isLoggedIn && role !== 'free') ? 'none' : 'flex';
    });
  });

  // ============================================
  // NAVIGATION
  // ============================================
  function toggleMobileMenu() {
    elements.navLinks.classList.toggle('open');
  }

  // Close mobile menu on link click
  elements.navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      elements.navLinks.classList.remove('open');
    });
  });

  // ============================================
  // CATEGORY CARDS
  // ============================================
  elements.categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;

      // Remove active from all
      elements.categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      // Update select
      elements.category.value = category;

      // Scroll to generator
      $('#generator').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Highlight active category card when select changes
  elements.category.addEventListener('change', function() {
    const value = this.value;
    elements.categoryCards.forEach(card => {
      card.classList.toggle('active', card.dataset.category === value);
    });
  });

  // ============================================
  // PREMIUM MODAL
  // ============================================
  function openPremiumModal() {
    elements.premiumModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePremiumModal() {
    elements.premiumModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  elements.faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      elements.faqQuestions.forEach(q => q.parentElement.classList.remove('open'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ============================================
  // FOOTER CATEGORY LINKS
  // ============================================
  elements.footerCatLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const cat = this.dataset.cat;
      if (cat) {
        elements.category.value = cat;
        // Trigger change event
        const event = new Event('change');
        elements.category.dispatchEvent(event);
      }
    });
  });

  // ============================================
  // EVENT LISTENERS
  // ============================================
  elements.generateBtn.addEventListener('click', generatePrompt);
  elements.copyBtn.addEventListener('click', copyToClipboard);
  elements.regenerateBtn.addEventListener('click', regeneratePrompt);
  elements.whatsappSendBtn.addEventListener('click', sendViaWhatsApp);
  elements.mobileToggle.addEventListener('click', toggleMobileMenu);

  // Premium modal triggers
  elements.buyPremiumBtn.addEventListener('click', openPremiumModal);
  elements.buyBundleBtn.addEventListener('click', openPremiumModal);
  elements.modalClose.addEventListener('click', closePremiumModal);

  // Close modal on overlay click
  elements.premiumModal.addEventListener('click', function(e) {
    if (e.target === this) closePremiumModal();
  });

  // Close modal on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePremiumModal();
  });

  // WhatsApp send feature — open wa.me with the generated prompt
  function sendViaWhatsApp() {
    if (!currentPrompt) return;
    // Free users cannot use WhatsApp send
    if (!Auth.isLoggedIn || Auth.role === 'free') {
      Auth.openSignUp();
      return;
    }
    const phone = prompt('Enter the customer\'s WhatsApp number (with country code, e.g., +1234567890):', '+');
    if (phone && phone.length > 1) {
      // Truncate very long prompts to avoid URL length issues
      const text = currentPrompt.length > 4000
        ? currentPrompt.substring(0, 4000) + '... (full prompt on ChatGPT)'
        : currentPrompt;
      const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  // Footer links
  elements.footerPaypal.addEventListener('click', function(e) {
    e.preventDefault();
    openPremiumModal();
  });

  // Enter key in form fields
  const formInputs = [elements.businessType, elements.product, elements.audience];
  formInputs.forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        generatePrompt();
      }
    });
  });

  // ============================================
  // KEYBOARD SHORTCUTS
  // ============================================
  document.addEventListener('keydown', function(e) {
    // Ctrl+Enter or Cmd+Enter to generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generatePrompt();
    }
    // Ctrl+Shift+C or Cmd+Shift+C to copy
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      copyToClipboard();
    }
  });

  // ============================================
  // SMOOTH SCROLL FOR NAV
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // KEYBOARD SHORTCUT INDICATOR (small hint)
  // ============================================
  const isMac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';
  const shortcutHint = document.createElement('div');
  shortcutHint.className = 'shortcut-hint';
  shortcutHint.innerHTML = `<span>${modKey}+Enter</span> to generate &bull; <span>${modKey}+⇧+C</span> to copy`;
  shortcutHint.style.cssText = `
    text-align: center;
    font-size: 0.75rem;
    color: var(--gray-400);
    margin-top: 8px;
  `;
  elements.generateBtn.parentElement.appendChild(shortcutHint);

  // ============================================
  // ADD FADE-IN ANIMATION
  // ============================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .generator-output { position: relative; }
    .generator-form, .generator-output { animation: fadeInUp 0.5s ease both; }
    .generator-output { animation-delay: 0.1s; }
  `;
  document.head.appendChild(style);

  // ============================================
  // INIT
  // ============================================
  function init() {
    // Set default category card active
    elements.categoryCards.forEach(card => {
      if (card.dataset.category === elements.category.value) {
        card.classList.add('active');
      }
    });
    console.log('🚀 Business Prompt Generator initialized');
    console.log('💡 Tip: Use Ctrl+Enter to generate, Ctrl+Shift+C to copy');
  }

  init();

})();
