/**
 * Business Prompt Generator - Main Application
 * Handles prompt generation, UI interactions, premium features
 */

(function() {
  'use strict';

  // ============================================
  // PROMPT TEMPLATES
  // ============================================
  const TEMPLATES = {
    instagram: {
      name: 'Instagram Posts',
      emoji: '📷',
      free: [
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
      ],
      premium: [
        `You are a top-tier social media strategist for {businessType}.

Create a COMPLETE Instagram content package for {product}:

CAMPAIGN GOAL: {goal}
TARGET AUDIENCE: {audience}
TONE: {tone}

[CAPTION - Long Form]
A story-driven caption (250-400 chars) that uses the "hero's journey" framework:
1. The Before (pain point / desire)
2. The Encounter (discovery of {product})
3. The Transformation (how life improved)
4. The Invitation (CTA)

[CAROUSEL STRUCTURE]
Design a 5-slide carousel:
- Slide 1: Hook + branding
- Slide 2: The problem
- Slide 3: The solution ({product})
- Slide 4: Social proof / results
- Slide 5: CTA + engagement question

[STORY IDEAS]
- 2 poll ideas for engagement
- 1 "Ask Me Anything" prompt
- 1 countdown sticker concept

[HASHTAG STRATEGY]
- 5 broad hashtags (500K+ posts)
- 5 niche hashtags (10K-100K posts)
- 3 branded hashtags

[OPTIMAL POSTING TIME]
Suggest best day and time based on audience behavior`,
        `Act as a viral content strategist for {businessType}.

Create a 7-day Instagram content plan for promoting {product}.

GOAL: {goal}
AUDIENCE: {audience}
VOICE: {tone}

DAY 1 - TEASER: Mysterious post building curiosity
DAY 2 - EDUCATE: Value-driven carousel about the problem {product} solves
DAY 3 - SOCIAL PROOF: Customer transformation/ testimonial
DAY 4 - BEHIND THE SCENES: Your process, team, or story
DAY 5 - ENGAGEMENT: Interactive post (quiz, poll, question)
DAY 6 - SCARCITY: Limited-time offer or early access
DAY 7 - S.T.A.R. CONTENT: Your best-performing format from the week

For each day include:
- Caption hook
- Visual concept idea
- 5 hashtags
- CTA

Also suggest 3 Reel ideas related to this campaign.`,
        `You are an Instagram growth expert for {businessType} selling {product}.

Create a 30-day content pillar framework:

AUDIENCE: {audience}
TONE: {tone}
GOAL: {goal}

CONTENT PILLARS (5 total):
1. EDUCATIONAL (40%): Teach something valuable related to your industry
2. ASPIRATIONAL (20%): Show the lifestyle {product} enables
3. PROMOTIONAL (15%): Direct product features and offers
4. COMMUNITY (15%): User-generated content and engagement
5. PERSONAL (10%): Behind-the-scenes and founder story

For each pillar, provide:
- 3 content ideas
- Best format (Reel, Carousel, Single, Story)
- Hook templates (3 per pillar)
- Hashtag clusters

BONUS: Create 1 "viral bait" Reel script designed to reach new audiences.`
      ],
      ultimate: [
        `You are a TikTok-Instagram hybrid strategist for {businessType}.

Create a MONTHLY REEL CONTENT ENGINE for {product}.

AUDIENCE: {audience}
VOICE: {tone}
OBJECTIVE: {goal}

This system produces 12 high-performing Reels per month with minimum effort.

[THE 4 VIDEO TYPES - 3 each per month]

TYPE A - TREND JACK (3/month)
Current trend + your product = viral potential
Template: "When [trend] meets [your niche]"

TYPE B - EDUCATIONAL (3/month)
Teach something valuable
Template: "Stop doing [X], do [Y] instead"

TYPE C - STORYTELLING (3/month)
Customer journey or behind-the-scenes
Template: "How we [achieved result] in [timeframe]"

TYPE D - PROMOTIONAL (3/month)
Direct value with soft sell
Template: "We made [product] for people who [pain point]"

For each video type, provide:
- Hook script (first 3 seconds)
- Body outline (key points)
- On-screen text suggestions
- CTA line
- Hashtag cluster (5 tags)
- Sound/music genre suggestion

[BATCH FILMING SCHEDULE]
How to film all 12 Reels in one 3-hour session.

[CROSS-PLATFORM REPURPOSING]
How to adapt each Reel for YouTube Shorts and TikTok.`,
        `You are an Instagram authority-building expert for {businessType}.

Design a 60-DAY INSTAGRAM GROWTH SYSTEM for {product}.

TARGET: {audience}
VOICE: {tone}
GOAL: {goal}

[WEEK 1-2: FOUNDATION]
Day 1-3: Profile optimization strategy
- Bio hook templates (5 options)
- Highlight covers structure
- Content pillar definition
Day 4-7: 7 posts to establish authority
- Problem awareness → Solution introduction → Social proof

[WEEK 3-4: ENGAGEMENT]
- Comment engagement strategy (50 comments/day template)
- DM outreach sequence (5 messages)
- Collaboration outreach template

[WEEK 5-6: VIRAL EXPERIMENTS]
- 5 Reel ideas designed to reach new audiences
- A/B testing framework (hooks, thumbnails, captions)
- Algorithm optimization checklist

[WEEK 7-8: MONETIZATION]
- Content-to-sale funnel mapping
- Story sequence for launches (12-slide structure)
- CTA optimization for each content type

[GROWTH TRACKER]
- Key metrics to track weekly
- Content audit template (what to keep, kill, tweak)
- 30-60-90 day milestone targets`
      ]
    },
    product: {
      name: 'Product Descriptions',
      emoji: '📦',
      free: [
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
      ],
      premium: [
        `You are a senior direct-response copywriter for {businessType}.

Write a COMPLETE product sales page for {product}.

TONE: {tone}
AUDIENCE: {audience}
GOAL: {goal}

Deliver these components:

1. HEADLINE (3 options):
   - Benefit-driven (max 60 chars)
   - Curiosity-driven (max 60 chars)
   - Pain-point driven (max 60 chars)

2. SUBHEADLINE (max 140 chars)

3. FEATURES VS BENEFITS TABLE:
   | Feature | Benefit | Emotional Payoff |
   |---------|---------|------------------|
   | [feature] | [benefit] | [feeling] |

4. THE "BEFORE & AFTER" SECTION:
   Before: Describe the customer's pain without {product}
   After: Describe their transformation with {product}

5. OBJECTION HANDLERS:
   - Address 3 common objections
   - Provide counterpoints with social proof

6. GUARANTEE STATEMENT (max 50 words)

7. 5 BULLET POINTS optimized for mobile scanning

8. 3 PRICE ANCHORING suggestions

9. 2 BONUS offers to increase perceived value

10. FINAL CTA with urgency element`,
        `You are an e-commerce conversion specialist for {businessType}.

Create a product description for {product} optimized for Amazon/Etsy/Shopify.

TARGET: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[TITLE]
- Front-end: 40-60 chars with primary keyword
- Back-end: Keyword-rich for search (up to 250 chars)

[KEY FEATURES - 6 bullet points]
For each feature:
✓ Feature name
✓ Benefit in 10 words or less
✓ Emotional trigger word

[DESCRIPTION BODY]
- Story-driven opening (connect emotionally)
- Specifications (easy to scan)
- Usage instructions / best paired with
- Care instructions

[SEARCH OPTIMIZATION]
- Primary keyword: [suggest 1]
- Secondary keywords: [suggest 5]
- Long-tail keywords: [suggest 3]

[REVIEW SNIPPET SUGGESTION]
Write 3 fake customer review snippets that highlight different benefits`,
        `You are a luxury branding copywriter for {businessType}.

Write an elevated product description for {product}.

AUDIENCE: {audience}
TONE: Sophisticated, aspirational, exclusive
CAMPAIGN: {goal}

Use the "3-ACT STRUCTURE" for luxury copy:

ACT 1 - THE ORIGIN STORY:
- The inspiration behind {product}
- The craftsmanship / process
- What makes it exceptional

ACT 2 - THE EXPERIENCE:
- Sensory details (sight, touch, smell, sound)
- How it makes the customer feel
- The transformation it enables

ACT 3 - THE INVITATION:
- Exclusivity element (limited, handcrafted, rare)
- The CTA (framed as an invitation, not a command)

Add a "Perfect Pairing" suggestion and a gift-wrapping note option.`
      ],
      ultimate: [
        `You are a senior product copywriter for {businessType}.

Write a COMPLETE E-COMMERSE PRODUCT STORY for {product}.

AUDIENCE: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[PRODUCT STORY FRAMEWORK]
1. The origin: Where did this product come from? Why was it created?
2. The craft: What makes it special? Materials, process, expertise
3. The transformation: How does life change after using {product}?
4. The proof: Testimonials, reviews, data
5. The invitation: Here's how to get it

[EMOTIONAL SELLING POINTS]
- 3 desires this product fulfills
- 3 fears it eliminates
- 3 identities it reinforces

[OBJECTION KILLERS]
For each common objection, provide:
- The objection
- The counter-argument
- Social proof to back it up

[PRICE ANCHORING STRATEGY]
- Compare to competitor
- Show value per use
- Bundle suggestion to increase perceived value

[COMPLETE COPY PACKAGE]
- Product title (3 options)
- Short description (100 chars)
- Long description (300-500 words)
- Bullet points (6)
- SEO metadata (title, description, keywords)
- Social media caption (3 options)`,
        `You are an AI-powered product copy strategist for {businessType}.

Create a COMPARISON / VS PAGE for {product} vs top competitors.

TARGET: {audience}
VOICE: {tone}
OBJECTIVE: {goal}

[HEAD-TO-HEAD COMPARISON TABLE]
| Feature | {product} | Competitor A | Competitor B |
|---------|-----------|-------------|-------------|
| [feature 1] | ✅ [detail] | ❌ | ⚠️ [partial] |
| [feature 2] | ✅ [detail] | ✅ [detail] | ❌ |

[BATTLE CARD - Why choose {product}?]
3 compelling reasons with data/social proof

[SWITCHER'S GUIDE]
Template for customers coming from competitors:
"If you're using [Competitor], here's what you'll love about {product}..."

[FAQs THAT SELL]
5 FAQs framed to highlight competitive advantages

[RETARGETING COPY]
For visitors who viewed the comparison page but didn't buy:
- Email sequence (3 emails)
- Facebook ad copy (3 variants)
- Push notification (1)

[SUMMARY TABLE]
Quick-reference decision matrix for comparison shoppers.`
      ]
    },
    whatsapp: {
      name: 'WhatsApp Messages',
      emoji: '💬',
      free: [
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
      ],
      premium: [
        `You are a WhatsApp marketing automation expert for {businessType}.

Design a COMPLETE WhatsApp customer journey for {product}.

TONE: {tone}
AUDIENCE: {audience}
GOAL: {goal}

[WELCOME SEQUENCE - 5 messages]
Day 1: Warm welcome + what to expect
Day 2: Value tip related to {product}
Day 3: Social proof (testimonial or review)
Day 4: Special welcome offer
Day 5: Engagement question to start conversation

[ORDER CONFIRMATION TEMPLATE]
- Order details
- Delivery timeline
- Next steps
- Support contact

[ABANDONED CART / FOLLOW-UP]
- Gentle reminder (don't be pushy)
- Add urgency (limited stock/time)
- Offer help (overcome objections)

[CUSTOMER RE-ENGAGEMENT]
- 90-day dormant customer message
- Special "come back" offer
- Feedback request

[VIRAL REFERRAL MESSAGE]
Ask for referrals with an incentive

Each message should be 3-4 paragraphs max with personalization hooks.`,
        `You are a customer retention specialist for {businessType} on WhatsApp.

Create a loyalty and retention broadcast sequence for existing customers.

PRODUCT: {product}
AUDIENCE: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[MONTHLY CHECK-IN] - Send on 1st of each month
- Personalized greeting
- Exclusive tip/insight
- VIP offer

[BIRTHDAY MESSAGE]  
- Warm birthday wishes
- Birthday discount code
- Limited-time (7 days)

[RE-ORDER REMINDER] - Based on product usage cycle
- Friendly nudge when product likely running low
- One-click reorder link

[SURVEY REQUEST]
- 3 short questions about their experience
- Incentive for completing
- Thank you message after

[CANCELLATION / UNSUBSCRIBE]
- Confirm with empathy
- Ask for feedback (1 question)
- "Come back" offer with expiration

All messages must feel personal, not automated. Maximum 80 words each.`
      ],
      ultimate: [
        `You are a WhatsApp sales funnel expert for {businessType}.

Design a COMPLETE WHATSAPP SALES FUNNEL for {product}.

AUDIENCE: {audience}
TONE: {tone}
GOAL: {goal}

[TOP OF FUNNEL - Broadcast Campaign]
- Awareness message introducing a problem
- Educational content (value-first)
- Curiosity hook to click through

[MIDDLE OF FUNNEL - Nurture Sequence]
- Testimonial/case study message
- FAQ message addressing top 5 questions
- Free consultation/strategy call offer

[BOTTOM OF FUNNEL - Conversion]
- Limited-time offer announcement
- Scarcity countdown (24 hours)
- Last chance reminder

[POST-PURCHASE - Retention]
- Order confirmation with usage tips
- Check-in message (day 3, 7, 14)
- Referral request with incentive

[ABANDONED CART RECOVERY]
- 1-hour follow-up (gentle reminder)
- 24-hour follow-up (with social proof)
- 72-hour follow-up (with discount offer)

[ANALYTICS]
- Key metrics to track per stage
- A/B testing suggestions for message timing
- Best sending times based on customer behavior`,
        `You are a WhatsApp broadcasting compliance and conversion expert for {businessType}.

Create a high-converting WhatsApp broadcast template library for {product}.

AUDIENCE: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[BROADCAST TEMPLATES - 10 types]
1. Monday Motivation (weekly tip)
2. Wednesday Offer (weekly promotion)
3. Friday Fun (engagement/game)
4. New Product Launch
5. Flash Sale (24-hour urgency)
6. Customer Win/Testimonial Spotlight
7. Educational Tip (how to use {product} better)
8. Event/Webinar Invitation
9. Holiday/Greeting Message
10. Re-engagement (dormant customer)

For each template:
- Character count (keep under 200)
- Emoji usage guide
- Personalization hooks
- CTA options (3 per template)
- Compliance note (opt-out reminder placement)

[BEST PRACTICES]
- Optimal send times per day of week
- Frequency recommendations (max per week)
- Segmentation tips (how to group customers)
- A/B testing framework for subject lines

[OPT-OUT MANAGEMENT]
- Graceful opt-out confirmation message
- Re-engagement sequence for opt-outs (90 days later)`
      ]
    },
    complaint: {
      name: 'Complaint Responses',
      emoji: '⚠️',
      free: [
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
      ],
      premium: [
        `You are a reputation management expert for {businessType}.

Create a COMPLETE crisis response playbook for customer complaints about {product}.

TONE: {tone}
AUDIENCE: {audience}
SITUATION: {goal}

[INITIAL RESPONSE - First 1 Hour]
Acknowledge receipt, state you're investigating, and set expectations.
Template for: Public (social media) + Private (email/DM)

[INVESTIGATION RESPONSE - Within 24 Hours]
- What was found
- What went wrong
- What's being done to fix it
- What's being done to prevent recurrence

[RESOLUTION OPTIONS - Tiered]
Tier 1 (Minor issue): Apology + discount on next purchase
Tier 2 (Moderate issue): Full refund or replacement + apology + 20% discount
Tier 3 (Major issue): Full refund + free product + personal apology from leadership

[LONG-TERM RETENTION PLAN]
- Follow-up schedule (3, 7, 30 days)
- Loyalty offer after resolution
- Feedback loop to prevent recurrence

[ESCALATION PROTOCOL]
- When to escalate to a manager
- Email template for escalation
- Maximum response time commitments

Write each template as fill-in-the-blank for easy use.`,
        `You are a customer experience (CX) consultant for {businessType}.

Design a "WOW Recovery" system for handling complaints about {product}.

AUDIENCE: {audience}
SITUATION: {goal}
BRAND VOICE: {tone}

The goal is to turn detractors into promoters. Use the HEART framework:

HEAR: Listen and validate without interrupting
- Template: "I hear how frustrating [specific issue] must be..."

EMPATHIZE: Show genuine understanding
- Template: "I can see why you'd feel that way. If I were in your shoes..."

APOLOGIZE: Sincere, specific, no excuses
- Template: "I'm genuinely sorry that [specific issue] happened..."

RESOLVE: Go above and beyond
- Template offering 3 resolution paths, including one "wow" option

THANK: Express gratitude for their feedback
- Template turning the complaint into a positive relationship moment

After the HEART response, include:
1. A handwritten note template (for physical products)
2. A surprise follow-up gift idea
3. A "How did we do?" survey request (sent 1 week later)`
      ],
      ultimate: [
        `You are a customer experience transformation expert for {businessType}.

Design a PROACTIVE CUSTOMER HAPPINESS SYSTEM for {product}.

AUDIENCE: {audience}
VOICE: {tone}
OBJECTIVE: {goal}

Unlike reactive complaint handling, this system PREVENTS complaints.

[PREVENTION TIER]
1. Onboarding sequence that sets expectations
2. Usage milestone check-ins (day 1, 7, 30)
3. Proactive tips to get the most out of {product}
4. Common pitfalls warning (before they happen)

[DETECTION TIER]
1. Sentiment monitoring keywords to track
2. Early warning signal identification
3. Automated check-in triggered by specific behaviors

[RESOLUTION TIER]
1. Tiered response templates (minor, moderate, critical)
2. Empowerment guidelines (what team members can do without approval)
3. Recovery gift suggestions by issue severity

[LOYALTY RECOVERY TIER]
1. Post-resolution follow-up sequence
2. "Win-back" offer timing
3. Voice of Customer feedback loop

Each tier should include exact message templates and timing.`,
        `You are a customer service AI training specialist for {businessType}.

Create a COMPLETE CUSTOMER SERVICE PLAYBOOK for {product}.

AUDIENCE: {audience}
SITUATION: {goal}
VOICE: {tone}

[SCENARIO-BASED RESPONSE LIBRARY]

Scenario 1: Product didn't arrive on time
- Empathy statement
- Investigation commitment
- Compensation options (2 tiers)

Scenario 2: Product not as expected
- Validation of disappointment
- Refund/exchange options
- Alternative product suggestion

Scenario 3: Billing issue
- Apologize for inconvenience
- Steps to resolve
- Goodwill gesture

Scenario 4: Customer is angry/frustrated
- De-escalation script
- Active listening phrases
- Problem-solving framework

Scenario 5: Customer wants to cancel
- Retention offers (3 tiers)
- Feedback collection
- Graceful exit process

[SCRIPT LIBRARY BY CHANNEL]
Email templates | Chat scripts | Phone scripts | Social media responses

[ESCALATION PROTOCOL]
- When to escalate
- Who to escalate to
- Time limits per escalation level
- Follow-up schedule after resolution`
      ]
    },
    promotion: {
      name: 'Promotion Ideas',
      emoji: '🎉',
      free: [
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
      ],
      premium: [
        `You are a senior promotional strategist for {businessType}.

Design a QUARTERLY PROMOTION CALENDAR for {product}.

BUSINESS GOAL: {goal}
AUDIENCE: {audience}
TONE: {tone}

[MONTH 1 - ACQUISITION]
- Hook: First-time buyer offer
- Channel Focus: Paid ads + influencer collaborations
- Budget Allocation: 50%
- Success Metric: New customer acquisition cost

[MONTH 2 - RETENTION]
- Hook: Loyalty program launch / VIP event
- Channel Focus: Email + WhatsApp + Community
- Budget Allocation: 30%
- Success Metric: Repeat purchase rate

[MONTH 3 - REFERRAL]
- Hook: Refer-a-friend with dual incentive
- Channel Focus: All channels + UGC campaign
- Budget Allocation: 20%
- Success Metric: Referral conversion rate

For each month, provide:
- 3 specific campaign ideas
- Creative concept / theme
- Visual direction
- Copy hooks (3 options)
- CTA variations for A/B testing

[FLASH SALE PROTOCOL]
- 24-hour sale structure
- Urgency countdown sequence
- Sold-out announcement template

[HOLIDAY / SEASONAL ADAPTATION]
Suggest how to adapt the calendar for [current season/holiday].`,
        `You are a growth marketing consultant for {businessType}.

Design a "VIRAL LAUNCH" promotion strategy for {product}.

TARGET: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[PRE-LAUNCH PHASE - 7 Days]
- Teaser content strategy
- Email/SMS waitlist collection
- Social media countdown
- Influencer seeding plan
- "Coming Soon" landing page copy

[LAUNCH DAY]
- 3-phase announcement (Morning, Afternoon, Evening)
- Each phase has different angle and CTA
- Urgency mechanics (limited quantity, time-bound bonus)
- Live engagement activities (Q&A, demo)

[POST-LAUNCH PHASE - 14 Days]
- Testimonial collection and amplification
- UGC campaign launch
- Retargeting sequence
- Upsell / cross-sell offers
- "Last Chance" scarcity messages

[BONUS: REFERRAL LOOP]
Design a viral referral mechanism where each new customer brings 2+ others. Include the messaging for each touchpoint.

[BUDGET-FRIENDLY ALTERNATIVES]
Offer a "no budget" version of each tactic for bootstrapped businesses.`
      ],
      ultimate: [
        `You are a viral growth consultant for {businessType}.

Design a 90-DAY GO-TO-MARKET STRATEGY for {product}.

TARGET: {audience}
VOICE: {tone}
OBJECTIVE: {goal}

[MONTH 1 - BUID IT]
Week 1: Brand & messaging foundation
Week 2: Content engine setup (10 pieces/week)
Week 3: Community building (100 engaged followers)
Week 4: Beta launch with influencers (5 micro-influencers)

[MONTH 2 - LAUNCH IT]
Week 5: Teaser campaign (countdown)
Week 6: Launch day (multi-channel blitz)
Week 7: Social proof amplification
Week 8: Retargeting & remarketing

[MONTH 3 - SCALE IT]
Week 9: Paid ads pilot ($500 budget plan)
Week 10: Partnership/collaboration push
Week 11: Referral/viral loop activation
Week 12: Review & optimize

[CHANNEL ALLOCATION]
- Organic social: 30% of effort
- Paid ads: 25%
- Influencer/partnerships: 20%
- Email/SMS: 15%
- PR/outreach: 10%

[BUDGET BREAKDOWN]
How to allocate a $1K, $5K, and $10K monthly budget.

[KEY MILESTONES]
- 30-day: [metric targets]
- 60-day: [metric targets]
- 90-day: [metric targets]`,
        `You are a conversion rate optimization expert for {businessType}.

Create a FULL PROMOTION CALENDAR for the next 12 months for {product}.

AUDIENCE: {audience}
TONE: {tone}
BUSINESS GOAL: {goal}

[MONTH-BY-MONTH PROMOTION PLAN]

January: New Year / Resolution campaign
February: Valentine's / Customer appreciation
March: Spring forward / Fresh start
April: Tax refund / Spring sale
May: Mother's Day / Pre-summer prep
June: Summer kickoff / Mid-year sale
July: Independence Day / Summer special
August: Back to school / Pre-fall
September: Fall preview / Labor Day
October: Halloween / Spooky deals
November: Black Friday / Cyber Monday prep
December: Holiday / Year-end clearance

For each month:
- Promotion name & theme
- Offer structure (discount %, BOGO, bundle, etc.)
- Channel focus (which platform to prioritize)
- Content hooks (3 options)
- Urgency mechanism
- Success metric & target

[FLASH SALE BLUEPRINTS]
- 24-hour flash sale structure
- 72-hour weekend sale structure
- 7-day countdown sale structure
- Each includes: Announcement, Mid-point urgency, Last chance`
      ]
    },
    calendar: {
      name: 'Content Calendars',
      emoji: '📅',
      free: [
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
      ],
      premium: [
        `You are a senior content strategist for {businessType}.

Create a 90-DAY CONTENT STRATEGY for {product}.

AUDIENCE: {audience}
TONE: {tone}
BUSINESS GOAL: {goal}

[MONTH 1 - BUILD TRUST]
Weekly themes:
Week 1: Education & Authority
Week 2: Storytelling & Connection
Week 3: Social Proof & Results
Week 4: Community & Engagement

[MONTH 2 - SCALE REACH]
Weekly themes:
Week 1: Collaborations & Partnerships
Week 2: Viral Content Experiments
Week 3: Multi-Platform Repurposing
Week 4: SEO & Discovery Optimization

[MONTH 3 - CONVERT]
Weekly themes:
Week 1: Offer & Promotion Strategy
Week 2: Objection Handling Content
Week 3: Urgency & Scarcity Campaigns
Week 4: Loyalty & Retention

For each month provide:
- Content pillar breakdown with percentages
- 5 specific content ideas per week
- Platform-specific recommendations
- Key performance indicators
- Resource requirements (time, tools, budget)

[BATCH PRODUCTION PLAN]
How to film/create all content in 1 day per week.

[CONTENT REPURPOSING MAP]
How to turn 1 video into 10+ pieces of content across platforms.`,
        `You are a content operations expert for {businessType}.

Design a weekly content production system for {product}.

AUDIENCE: {audience}
TONE: {tone}
GOAL: {goal}

[THE SYSTEM - 4 Hours/Week]

HOUR 1 - STRATEGY & RESEARCH (Monday)
- Trend analysis (current trends in your niche)
- Competitor content audit (3 competitors)
- Keyword research (5 target keywords)
- Content idea generation (10 ideas based on data)

HOUR 2 - PRODUCTION (Tuesday)
- Scriptwriting (3 captions/scripts)
- Visual planning (shot list for each piece)
- Hashtag research (30 hashtags organized in sets)

HOUR 3 - CREATION (Wednesday)
- Draft 5 content pieces
- Create 3 visual concepts
- Write email/newsletter version

HOUR 4 - SCHEDULING & ENGAGEMENT (Thursday)
- Schedule posts for the week
- Write engagement replies (templates for comments/DMs)
- Prepare stories for the weekend

[CONTENT REPOSITORY]
Create a "content bank" structure with categories:
- Evergreen content (20 topics)
- Trending content (5 topics per week)
- Seasonal content (10 upcoming occasions)

[TEMPLATES]
Provide 3 caption templates that can be reused with different angles.`
      ],
      ultimate: [
        `You are a content operations director for {businessType}.

Design a FULL YEAR CONTENT STRATEGY (365 days) for {product}.

AUDIENCE: {audience}
VOICE: {tone}
GOAL: {goal}

[QUARTER 1 - AWARENESS]
Theme: "Meet {product}"
Content mix: 50% educational, 25% entertaining, 15% social proof, 10% promotional
Key initiatives: Brand awareness campaign, thought leadership series

[QUARTER 2 - ENGAGEMENT]
Theme: "Your {product} journey"
Content mix: 35% educational, 30% entertaining, 20% UGC, 15% promotional
Key initiatives: User-generated content contest, community Q&A series

[QUARTER 3 - CONVERSION]
Theme: "Why {product} wins"
Content mix: 30% educational, 20% entertaining, 25% social proof, 25% promotional
Key initiatives: Comparison series, case study rollout, testimonial campaign

[QUARTER 4 - LOYALTY]
Theme: "{product} family"
Content mix: 25% educational, 15% entertaining, 30% community, 30% promotional
Key initiatives: Holiday campaigns, loyalty program, referral push

[CONTENT REPURPOSING MATRIX]
How to turn 1 piece of content into 20+ assets:
1 blog post → 5 social posts → 3 emails → 2 videos → 1 infographic → ...

[CALENDAR TEMPLATE]
Editable monthly calendar template structure for planning.`,
        `You are an AI-powered content strategist for {businessType}.

Create a CONTENT AUTOMATION SYSTEM for {product}.

AUDIENCE: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[THE SYSTEM: 2 Hours/Day = 30 Pieces/Week]

DAILY ROUTINE:
Hour 1 - Research & Curation (30 min) + Creation (30 min)
Hour 2 - Optimization & Scheduling (30 min) + Engagement (30 min)

[CONTENT TYPES BY DAY]
Monday: Long-form (blog, newsletter, podcast)
Tuesday: Educational (tips, how-tos, tutorials)
Wednesday: Social proof (testimonials, case studies)
Thursday: Engaging (polls, questions, interactive)
Friday: Promotional (offers, launches, CTAs)
Saturday: Behind-the-scenes (personal, fun)
Sunday: Planning & strategy (no publishing)

[REPURPOSING BLUEPRINT]
- How to turn 1 podcast into 15 pieces of content
- How to turn 1 blog post into 12 pieces of content
- How to turn 1 video into 10 pieces of content

[BATCH CREATION TEMPLATES]
- 1-hour photo shoot plan (20+ images)
- 1-hour video shoot plan (10+ videos)
- 30-minute caption writing session (7 days of posts)

[CONTENT SCORECARD]
How to measure and improve each piece of content.`
      ]
    },
    adcopy: {
      name: 'Ad Copy',
      emoji: '📊',
      free: [
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
      ],
      premium: [
        `You are a performance marketing specialist for {businessType}.

Create a FULL AD FUNNEL for {product} across all platforms.

CAMPAIGN GOAL: {goal}
TARGET: {audience}
BRAND VOICE: {tone}

[TOP OF FUNNEL - Awareness]
Platform: TikTok + Instagram Reels + YouTube Shorts
- Hook-driven video script (15 seconds)
- 3 headline variations
- Targeting suggestions (lookalike, interest-based)
- Budget recommendation: 40% of total

[MIDDLE OF FUNNEL - Consideration]
Platform: Facebook + Instagram Feed + Google Display
- Carousel ad structure (5 cards)
- Long-form caption (200+ words)
- Retargeting audience definition
- Budget recommendation: 35% of total

[BOTTOM OF FUNNEL - Conversion]
Platform: Google Search + Facebook DPA + Instagram Stories
- Search ad copy (3 headlines, 2 descriptions)
- Dynamic product ad template
- Urgency-driven story ads
- Budget recommendation: 25% of total

[AD EXTENSIONS]
- Call extensions
- Location extensions
- Review snippets
- Sitelink suggestions (4 links)

[TESTING PLAN]
- Proposed A/B testing matrix
- Primary metric for each funnel stage
- Winning threshold criteria`,
        `You are a direct response copywriter and funnel strategist for {businessType}.

Write a complete EMAIL + SMS AD SEQUENCE for {product}.

GOAL: {goal}
AUDIENCE: {audience}
TONE: {tone}

[EMAIL SEQUENCE - 5 Emails]

Email 1: The Hook - Problem awareness
Subject line: [3 options, max 50 chars]
Preview text: [max 100 chars]
Body: Pain point → Curiosity → CTA to learn more

Email 2: The Solution - Introducing {product}
Subject line: [3 options]
Preview text: [max 100 chars]
Body: Features → Benefits → Social proof → CTA

Email 3: Social Proof - Reviews & testimonials
Subject line: [3 options]
Preview text: [max 100 chars]
Body: 3 customer stories → Results data → Risk reversal

Email 4: Scarcity - Limited time offer
Subject line: [3 options with urgency emojis]
Preview text: [max 100 chars]
Body: Urgency → Offer details → Timer → CTA

Email 5: Last Chance - Final reminder
Subject line: [2 options]
Preview text: [max 100 chars]
Body: "Don't miss out" → Recap value → Final CTA

[SMS SEQUENCE - 3 Messages]
Day 1: Teaser with link
Day 3: Offer announcement
Day 5: Last day reminder`
      ],
      ultimate: [
        `You are a paid media director for {businessType}.

Create a FULL-YEAR PAID ADS STRATEGY for {product}.

CAMPAIGN GOAL: {goal}
AUDIENCE: {audience}
VOICE: {tone}
BUDGET: Monthly budget allocation plan

[Q1 - TEST & LEARN (Jan-Mar)]
Platform focus: Facebook + Instagram
Strategy: 5 ad sets with different angles, $50/day total
Key metric: Cost per click & CTR
Optimization: Kill underperformers after $200 spend

[Q2 - SCALE WINNERS (Apr-Jun)]
Platform focus: Winning platforms from Q1 + Google
Strategy: Scale winning ad sets to $150/day
Key metric: ROAS & conversion rate
Optimization: Lookalike audiences from Q1 conversions

[Q3 - EXPAND (Jul-Sep)]
Platform focus: All winning platforms + TikTok
Strategy: $300/day total, split across platforms
Key metric: Blended ROAS
Optimization: Retargeting sequences

[Q4 - MAXIMIZE (Oct-Dec)]
Platform focus: Full funnel
Strategy: $500+/day for holiday season
Key metric: Revenue & AOV
Optimization: Holiday-specific creative

[CREATIVE BRIEF TEMPLATES]
- Video ad script template
- Static image brief template
- Carousel ad structure template
- UGC brief template

[TARGETING PLAYBOOK]
- Interest targeting suggestions by month
- Lookalike audience building guide
- Retargeting window optimization
- Exclusion strategy to avoid audience fatigue`,
        `You are a performance marketing analytics expert for {businessType}.

Create a COMPLETE AD ANALYTICS DASHBOARD for {product}.

GOAL: {goal}
AUDIENCE: {audience}
TONE: {tone}

[DASHBOARD SECTIONS]

1. ACCOUNT OVERVIEW
- Total spend, impressions, clicks, conversions
- Blended ROAS and CPA
- Week-over-week trend

2. PLATFORM BREAKDOWN
- Facebook/Instagram metrics
- Google Ads metrics
- TikTok Ads metrics
- Pinterest/LinkedIn (if applicable)

3. CREATIVE ANALYSIS
- Top 5 creatives by ROAS
- Creative fatigue detection
- Hook analysis (first 3 seconds)
- CTA performance comparison

4. AUDIENCE INSIGHTS
- Best performing demographics
- Lookalike performance
- Retargeting vs prospecting split
- Audience saturation alerts

5. FUNNEL ANALYSIS
- TOF: CPM, CTR, frequency
- MOF: CPC, landing page conversion
- BOF: CPA, ROAS, AOV

[REPORTING TEMPLATES]
- Weekly report structure
- Monthly performance review
- Quarterly strategy presentation

[OPTIMIZATION RECOMMENDATIONS]
- Automated rule suggestions
- Budget reallocation triggers
- Creative refresh calendar
- Seasonality adjustment guidelines`
      ]
    },
    tiktok: {
      name: 'TikTok Scripts',
      emoji: '🎬',
      free: [
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
      ],
      premium: [
        `You are a viral TikTok strategist for {businessType}.

Create a 30-DAY TIKTOK GROWTH PLAN for promoting {product}.

AUDIENCE: {audience}
TONE: {tone}
GOAL: {goal}

[CONTENT PILLARS - 4 Types]

PILLAR 1 - EDUCATIONAL (40% of content)
- "Did you know?" style tips
- Industry secrets
- How-to tutorials
- Example topics: 5 per week

PILLAR 2 - ENTERTAINMENT (30% of content)
- Relatable skits about your industry
- Day-in-the-life
- Trends/hooks adapted to your niche
- Example topics: 4 per week

PILLAR 3 - SOCIAL PROOF (20% of content)
- Customer transformations
- Behind-the-scenes of happy customers
- UGC reposts
- Example topics: 3 per week

PILLAR 4 - PROMOTIONAL (10% of content)
- Product features
- Limited offers
- Launch announcements
- Example topics: 2 per week

[VIRAL HOOK FORMULAS - 10 Templates]
1. "Stop scrolling if [problem]"
2. "I tried [X] so you don't have to"
3. "The [industry] secret no one tells you"
4. "I asked [audience] what they struggle with..."
5. "What they don't tell you about [topic]"
6. "Day 1 vs Day 30 of [transformation]"
7. "3 things I wish I knew about [topic]"
8. "This one trick changed my [industry] game"
9. "Don't make this mistake with [product]"
10. "The real reason [problem] happens"

[HASHTAG STRATEGY]
- 3 broad (1M+ posts)
- 3 medium (100K-1M posts)
- 3 niche (10K-100K posts)
- 3 branded

[POSTING SCHEDULE]
Best days/times + content type per slot.`,
        `You are a TikTok ad and organic growth expert for {businessType}.

Create a HYBRID ORGANIC + PAID TikTok strategy for {product}.

AUDIENCE: {audience}
TONE: {tone}
OBJECTIVE: {goal}

[ORGANIC CONTENT PLAN - 15 Videos/Month]

WEEK 1 - TREND JACKING (4 videos)
Identify current trends and adapt to your niche
Each video: Hook + Trend adaptation + {product} tie-in

WEEK 2 - VALUE CONTENT (4 videos)
Educational content that builds authority
Each video: Problem → Insight → Actionable tip

WEEK 3 - STORYTELLING (4 videos)
Behind-the-scenes and founder stories
Each video: Setup → Conflict → Resolution

WEEK 4 - CONVERSION (3 videos)
Direct response content
Each video: Problem → {product} solution → CTA

[PAID ADS - Spark Ads Strategy]
- Select top 3 organic performers to boost
- Budget allocation: 70% to winner, 20% to runner-up, 10% to test
- Targeting: Lookalike of engaged users

[COMMENT ENGAGEMENT STRATEGY]
- 5 comment templates to use on your own videos
- 10 comment templates to use on competitor/niche videos
- Reply strategy: Speed, Value, CTA

[ANALYTICS REVIEW]
- Key metrics to track weekly
- What to optimize after 7, 14, 30 days
- When to kill underperforming content`
      ],
      ultimate: [
        `You are a TikTok growth hacker for {businessType}.

Create a COMPLETE TIKTOK SHOP / SOCIAL COMMERCE STRATEGY for {product}.

AUDIENCE: {audience}
VOICE: {tone}
OBJECTIVE: {goal}

[TIKTOK SHOP SETUP]
- Product catalog optimization
- Showcase video requirements
- Commission structure for affiliates
- Link-in-bio strategy

[ORGANIC CONTENT ENGINE - 30 Videos/Month]

5 Video Types (6 each):
1. PRODUCT IN ACTION (demonstrate {product} solving a problem)
2. EDUCATIONAL (teach something related to your niche)
3. TREND JACK (adapt trending sounds/formats to your product)
4. TESTIMONIAL/UGC (customer reviews, unboxings, transformations)
5. HOOK-ONLY (scroll-stopping opener, link in bio for full story)

For each video type:
- Script formula (fill in the blank)
- Hook templates (5 options)
- Visual direction
- Sound/music suggestions
- Caption template with hashtags

[PAID ADS - Spark Ads Strategy]
How to turn organic winners into paid ads
- Selection criteria (engagement rate > 15%)
- Budget allocation ($20/day per video)
- Scaling strategy (double budget if ROAS > 2.0)

[INFLUENCER MARKETING]
- How to find micro-influencers in your niche
- Outreach message template
- Brief template for sponsorships
- Performance tracking sheet`,
        `You are a TikTok live selling expert for {businessType}.

Create a TIKTOK LIVE SELLING PLAYBOOK for {product}.

TARGET: {audience}
STYLE: {tone}
GOAL: {goal}

[LIVE SELLING SETUP]
- Equipment needed (minimum + recommended)
- Lighting and audio setup guide
- Background/scene ideas
- Streaming software recommendations

[PRE-LIVE PREPARATION]
- 3-day promotional content sequence
- 1-hour pre-live checklist
- Product lineup and order
- Price/offer structure for live exclusives

[LIVE SCRIPT STRUCTURE - 60 min]
0-5 min: Welcome & what to expect (hook viewers)
5-15 min: Warm-up engagement (polls, questions, giveaways)
15-30 min: First product feature (demonstrate, benefits, price)
30-40 min: Engagement break (comments, Q&A, shoutouts)
40-50 min: Second product feature (testimonial, comparison)
50-55 min: Flash offer/urgency (limited-time live discount)
55-60 min: Closing (CTA, next live date, thanks)

[VIRAL MOMENT STRATEGY]
How to create shareable moments during your live
- Surprise giveaways
- Behind-the-scenes reveals
- Customer call-ins
- Transformation demonstrations

[POST-LIVE]
- Repurpose live clips for content (5 video ideas)
- Follow-up sequence for viewers who engaged
- Sales analysis and optimization for next live`
      ]
    }
  };

  // ============================================
  // INDUSTRY-SPECIFIC PROMPT MODIFIERS
  // ============================================
  // ============================================
  // MONTHLY PROMPT DROPS (Ultimate only)
  // ============================================
  const MONTHLY_DROPS = {
    month: 'June 2026',
    theme: 'Summer Growth Sprint',
    prompts: [
      {
        title: '🔥 Summer Sale Hook Generator',
        text: `Act as a copywriter for {businessType} selling {product}.

Create 10 urgent, scroll-stopping hooks for a SUMMER SALE campaign.

TONE: {tone}
TARGET: {audience}
GOAL: {goal}

Each hook should:
- Be under 10 words
- Create urgency (limited time, limited stock, seasonal)
- Appeal to summer emotions (vacation, sunshine, fresh start, freedom)
- Include a power word

Format as a list with Hook #, the hook text, and why it works.`
      },
      {
        title: '🌴 Summer Content Calendar',
        text: `Act as a seasonal content strategist for {businessType}.

Create a 4-week SUMMER CONTENT CALENDAR for {product}.

WEEK 1: Summer Kickoff (energetic, fresh start)
WEEK 2: Mid-Summer Engagement (interactive, fun)
WEEK 3: Summer Value (educational, tips for summer use)
WEEK 4: Summer Send-Off (urgency, last chance for summer deals)

TONE: {tone} | AUDIENCE: {audience} | GOAL: {goal}

Include daily post ideas with hooks and CTAs.`
      },
      {
        title: '💬 Summer Customer Outreach',
        text: `Act as a customer engagement specialist for {businessType}.

Write 5 summer-themed customer outreach messages for {product}.

CHANNEL: WhatsApp + Email + SMS
TONE: {tone}
AUDIENCE: {audience}
GOAL: {goal}

Each message should:
- Reference summer (heat, vacation, outdoor activities, etc.)
- Feel seasonal and timely, not generic
- Include a specific offer or CTA
- Be under 150 words`
      },
      {
        title: '📸 Instagram Summer Reel Ideas',
        text: `Act as a seasonal content creator for {businessType}.

Generate 7 SUMMER-THEMED REEL IDEAS for {product}.

TONE: {tone}
AUDIENCE: {audience}
GOAL: {goal}

For each reel:
- Hook (first 3 seconds)
- Visual concept
- Sound/music suggestion
- Caption with hashtags
- CTA

Focus on summer vibes: outdoor, bright, energetic, vacation-related.`
      },
      {
        title: '🎯 Mid-Year Strategy Review',
        text: `Act as a business strategy consultant for {businessType}.

Create a MID-YEAR MARKETING AUDIT framework for {product}.

TONE: {tone}
AUDIENCE: {audience}
GOAL: {goal}

Include:
1. What worked in the first half of the year (prompts to analyze)
2. What needs improvement
3. Q3 priorities and focus areas
4. 3 quick wins for the next 30 days
5. Content gap analysis

Write this as a structured audit that the business owner can fill out.`
      }
    ]
  };

  // ============================================
  // CHATGPT STRATEGY GUIDE (Ultimate only)
  // ============================================
  const STRATEGY_GUIDE_SECTIONS = [
    {
      icon: '🎯',
      title: 'Prompt Engineering Basics',
      tips: [
        'Be specific: Instead of "Write a caption", say "Write an Instagram caption for a handmade candle business targeting eco-conscious millennials"',
        'Set the tone explicitly: Tell ChatGPT the tone before the instruction (Professional, Funny, Urgent, etc.)',
        'Use role-playing: Start with "Act as a [role]" to get better context-aware responses',
        'Provide examples: Include a sample of what you want to help ChatGPT match your style'
      ]
    },
    {
      icon: '⚡',
      title: 'Power User Techniques',
      tips: [
        'Chain prompts: Use the output of one prompt as input for the next (e.g., first generate ideas, then expand the best one)',
        'Use delimiters: Separate sections with ### or """ to help ChatGPT parse complex requests',
        'Iterative refinement: Start broad, then narrow down with follow-up prompts like "Make it more urgent" or "Shorten to 50 words"',
        'Negative instructions: Tell ChatGPT what NOT to do to avoid common mistakes'
      ]
    },
    {
      icon: '📊',
      title: 'Business-Specific Strategies',
      tips: [
        'A/B testing prompts: Generate 3 variations of the same message and test which performs best',
        'Customer avatar: Create a detailed customer profile and paste it before each prompt for consistency',
        'Brand voice document: Write a brand voice guide and ask ChatGPT to follow it for all content',
        'Content batching: Use PromptForge to generate a week\'s worth of content in one session'
      ]
    },
    {
      icon: '🚀',
      title: 'Advanced Growth Tactics',
      tips: [
        'Use ChatGPT to analyze your competitors: Paste their content and ask for a gap analysis',
        'Create content clusters: Generate interconnected content around key topics for SEO benefits',
        'Repurpose smartly: Take 1 long-form piece and ask ChatGPT to create 10 social media posts from it',
        'Seasonal planning: Use our monthly drops to stay ahead of seasonal trends and holidays'
      ]
    }
  ];

  // ============================================
  // VIDEO TUTORIALS (Ultimate only)
  // ============================================
  const VIDEO_TUTORIALS = [
    {
      title: 'Getting Started with PromptForge',
      description: 'Learn how to generate your first business prompt, navigate categories, and copy your results.',
      duration: '5 min',
      icon: '🚀'
    },
    {
      title: 'Mastering Prompt Categories',
      description: 'Deep dive into all 8 categories with real-world examples and best practices for each.',
      duration: '12 min',
      icon: '📚'
    },
    {
      title: 'Industry Pack Optimization',
      description: 'How to use industry-specific context to get hyper-relevant prompts for your niche.',
      duration: '8 min',
      icon: '🏭'
    },
    {
      title: 'Prompt Refinement Techniques',
      description: 'Take a good prompt and make it great. Iterative refinement, tone adjustment, and A/B testing.',
      duration: '10 min',
      icon: '✨'
    },
    {
      title: 'Content Planning & Strategy',
      description: 'Use PromptForge to plan 30 days of content in under an hour. Batch creation workflow.',
      duration: '15 min',
      icon: '📅'
    },
    {
      title: 'Advanced ChatGPT Integration',
      description: 'Combine PromptForge outputs with advanced ChatGPT techniques for maximum results.',
      duration: '10 min',
      icon: '🤖'
    }
  ];

  const INDUSTRY_MODIFIERS = {
    general: '',
    ecommerce: `\n\n[INDUSTRY: E-COMMERCE & RETAIL]\nFocus on: Product benefits, conversion optimization, cart recovery, customer reviews, and seasonal promotions. Use urgency and scarcity principles. Highlight free shipping, returns, and guarantees.`,
    restaurant: `\n\n[INDUSTRY: RESTAURANT & FOOD]\nFocus on: Mouth-watering sensory descriptions, menu highlights, specials, delivery options, and customer experience. Emphasize freshness, quality ingredients, and ambiance.`,
    realestate: `\n\n[INDUSTRY: REAL ESTATE]\nFocus on: Property features, location benefits, investment value, lifestyle transformation. Use aspirational language. Highlight square footage, amenities, and neighborhood perks.`,
    fitness: `\n\n[INDUSTRY: FITNESS & WELLNESS]\nFocus on: Transformation stories, health benefits, community, accountability. Use motivational tone. Highlight results, expertise, and unique methodology.`,
    beauty: `\n\n[INDUSTRY: BEAUTY & SPA]\nFocus on: Glow-up results, self-care, luxury experience, product ingredients. Use sensory-rich language. Highlight before/after transformations and exclusivity.`,
    consulting: `\n\n[INDUSTRY: CONSULTING & PROFESSIONAL SERVICES]\nFocus on: Authority, ROI, case studies, expertise. Use professional, trust-building language. Highlight credentials, results data, and risk-free guarantees.`,
    health: `\n\n[INDUSTRY: HEALTH & MEDICAL]\nFocus on: Credibility, patient outcomes, safety, compassion. Use warm, trustworthy tone. Highlight expertise, technology, and patient-centered approach.`,
    education: `\n\n[INDUSTRY: EDUCATION & TRAINING]\nFocus on: Learning outcomes, skill development, career benefits. Use encouraging, expert tone. Highlight curriculum, instructor credentials, and student success stories.`,
    tech: `\n\n[INDUSTRY: TECHNOLOGY & SAAS]\nFocus on: Problem-solving, efficiency gains, ROI, innovation. Use clear, benefit-driven language. Highlight features, integrations, and customer support.`,
    travel: `\n\n[INDUSTRY: TRAVEL & HOSPITALITY]\nFocus on: Experiences, destinations, comfort, adventure. Use aspirational, wanderlust-inducing language. Highlight unique amenities and local culture.`,
    fashion: `\n\n[INDUSTRY: FASHION & APPAREL]\nFocus on: Style, trends, quality, versatility. Use aspirational, trend-forward language. Highlight materials, fit, and styling suggestions.`,
    home: `\n\n[INDUSTRY: HOME & GARDEN]\nFocus on: Transformation, functionality, aesthetics, DIY. Use warm, inspirational language. Highlight quality, ease of use, and before/after potential.`
  };

  // ============================================
  // DOM REFERENCES
  // ============================================
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  const elements = {
    // Form
    category: $('#category'),
    industry: $('#industry'),
    industryGroup: document.querySelector('[data-feature="industries"]'),
    businessType: $('#businessType'),
    product: $('#product'),
    tone: $('#tone'),
    audience: $('#audience'),
    goal: $('#goal'),
    generateBtn: $('#generateBtn'),
    templateTypeBadge: $('#templateTypeBadge'),

    // Output
    outputBody: $('#outputBody'),
    outputSection: $('#outputSection'),
    categoryBadge: $('#categoryBadge'),
    toneBadge: $('#toneBadge'),
    copyBtn: $('#copyBtn'),
    regenerateBtn: $('#regenerateBtn'),
    favoriteBtn: $('#favoriteBtn'),
    exportBtn: $('#exportBtn'),
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

    // History
    historyList: $('#historyList'),
    historyTabs: $$('.history-tab'),
    favCount: $('#favCount'),
    historyInfo: $('#historyInfo'),
    historyPremiumCta: $('#historyPremiumCta'),

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
  let currentFreeTemplateIndex = 0;
  let currentPremiumTemplateIndex = 0;
  let currentUltimateTemplateIndex = 0;
  let usingPremiumTemplate = false;
  let isCopied = false;
  let currentHistoryView = 'recent';
  let promptHistory = [];
  let favorites = new Set();
  let currentHistoryId = null;

  const HISTORY_KEY = 'promptforge_history';
  const FAVORITES_KEY = 'promptforge_favorites';
  const MAX_HISTORY_FREE = 5;
  const MAX_HISTORY_PREMIUM = 100;

  // ============================================
  // HELPERS
  // ============================================
  function getCategoryName(category) {
    return TEMPLATES[category]?.name || 'Unknown';
  }

  function getCategoryEmoji(category) {
    return TEMPLATES[category]?.emoji || '📝';
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

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function truncateText(text, maxLen = 100) {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + '...';
  }

  function formatDate(ts) {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + 'm ago';
    if (diffHrs < 24) return diffHrs + 'h ago';
    if (diffDays < 7) return diffDays + 'd ago';
    return d.toLocaleDateString();
  }

  // ============================================
  // PREMIUM GATING
  // ============================================
  function isFeatureUnlocked(feature) {
    return Auth.hasAccess && Auth.hasAccess(feature);
  }

  function requirePremiumAction(feature, callback) {
    if (isFeatureUnlocked(feature)) {
      callback();
    } else {
      Auth.requirePremium && Auth.requirePremium(feature);
    }
  }

  function updatePremiumLocks() {
    document.querySelectorAll('.premium-locked').forEach(el => {
      const feature = el.dataset.feature || 'premium';
      if (isFeatureUnlocked(feature)) {
        el.classList.remove('premium-locked');
      } else {
        el.classList.add('premium-locked');
      }
    });
  }

  // ============================================
  // HISTORY & FAVORITES
  // ============================================
  function loadHistory() {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      promptHistory = stored ? JSON.parse(stored) : [];
    } catch(e) {
      promptHistory = [];
    }
  }

  function saveHistory() {
    try {
      const max = isFeatureUnlocked('history') ? MAX_HISTORY_PREMIUM : MAX_HISTORY_FREE;
      if (promptHistory.length > max) {
        promptHistory = promptHistory.slice(-max);
      }
      localStorage.setItem(HISTORY_KEY, JSON.stringify(promptHistory));
    } catch(e) {
      console.warn('Could not save history:', e);
    }
  }

  function loadFavorites() {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      favorites = new Set(stored ? JSON.parse(stored) : []);
    } catch(e) {
      favorites = new Set();
    }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch(e) {
      console.warn('Could not save favorites:', e);
    }
  }

  function addToHistory(prompt, category, tone, isPremium, isUltimate) {
    const entry = {
      id: generateId(),
      prompt,
      category,
      tone,
      isPremium: !!isPremium,
      isUltimate: !!isUltimate,
      timestamp: Date.now()
    };
    promptHistory.push(entry);
    saveHistory();
    renderHistory();
  }

  function deleteFromHistory(id) {
    promptHistory = promptHistory.filter(e => e.id !== id);
    favorites.delete(id);
    saveHistory();
    saveFavorites();
    renderHistory();
    if (currentHistoryId === id) {
      currentHistoryId = null;
    }
  }

  function toggleFavorite(id) {
    if (!isFeatureUnlocked('favorites')) {
      Auth.requirePremium && Auth.requirePremium('favorites');
      return;
    }
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    saveFavorites();
    renderHistory();
  }

  function loadHistoryPrompt(id) {
    const entry = promptHistory.find(e => e.id === id);
    if (!entry) return;
    currentHistoryId = id;
    currentPrompt = entry.prompt;
    elements.categoryBadge.textContent = getCategoryName(entry.category);
    elements.toneBadge.textContent = `${getToneEmoji(entry.tone)} ${entry.tone}`;
    elements.outputBody.innerHTML = `<pre class="output-text">${escapeHtml(entry.prompt)}</pre>`;
    elements.copyBtn.disabled = false;
    elements.regenerateBtn.disabled = false;
    elements.favoriteBtn.disabled = false;
    elements.exportBtn.disabled = false;
    elements.outputSection.style.animation = 'none';
    setTimeout(() => {
      elements.outputSection.style.animation = 'fadeInUp 0.4s ease';
    }, 10);
    renderHistory();
    // Scroll to output
    elements.outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderHistory() {
    if (!elements.historyList) return;

    let items = promptHistory;

    if (currentHistoryView === 'favorites') {
      items = items.filter(e => favorites.has(e.id));
      if (!isFeatureUnlocked('favorites')) {
        items = [];
      }
    }

    // Sort by most recent
    items = [...items].reverse();

    // Limit display for free users
    const maxDisplay = isFeatureUnlocked('history') ? items.length : Math.min(items.length, MAX_HISTORY_FREE);
    items = items.slice(0, maxDisplay);

    // Update fav count
    if (elements.favCount) {
      elements.favCount.textContent = favorites.size;
    }

    // Update info text
    if (elements.historyInfo) {
      if (isFeatureUnlocked('history')) {
        elements.historyInfo.textContent = `${promptHistory.length} prompts saved`;
      } else {
        elements.historyInfo.textContent = `Free: showing last ${MAX_HISTORY_FREE} of ${promptHistory.length} (Premium = unlimited)`;
      }
    }

    // Update premium CTA
    if (elements.historyPremiumCta) {
      elements.historyPremiumCta.style.display = isFeatureUnlocked('favorites') ? 'none' : 'block';
    }

    if (items.length === 0) {
      const msg = currentHistoryView === 'favorites'
        ? 'No favorite prompts yet. Click the star on a prompt to save it!'
        : 'No prompts saved yet. Generate a prompt and it will appear here!';
      elements.historyList.innerHTML = `
        <div class="history-empty">
          <span class="history-empty-icon">📝</span>
          <p>${msg}</p>
        </div>
      `;
      return;
    }

    elements.historyList.innerHTML = items.map(entry => {
      const isActive = entry.id === currentHistoryId;
      const isFav = favorites.has(entry.id);
      const canFav = isFeatureUnlocked('favorites');
      return `
        <div class="history-item ${isActive ? 'active' : ''}" data-id="${entry.id}">
          <span class="history-item-icon">${getCategoryEmoji(entry.category)}</span>
          <div class="history-item-info" onclick="window.__loadHistory('${entry.id}')">
            <div class="history-item-title">${truncateText(entry.prompt.replace(/\n/g, ' '), 100)}</div>
            <div class="history-item-meta">
              <span>${getCategoryName(entry.category)}</span>
              <span>•</span>
              <span>${entry.tone}</span>
              <span>•</span>
              <span>${formatDate(entry.timestamp)}</span>
              ${entry.isUltimate ? '<span class="user-badge badge-ultimate" style="font-size:0.6rem">Ultimate</span>' : entry.isPremium ? '<span class="user-badge badge-premium" style="font-size:0.6rem">Premium</span>' : ''}
            </div>
          </div>
          <div class="history-item-actions">
            <button class="fav-btn ${isFav ? 'is-fav' : ''}" onclick="window.__toggleFav('${entry.id}')" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" ${!canFav ? 'disabled' : ''}>
              ${isFav ? '⭐' : '☆'}
            </button>
            <button class="delete-btn" onclick="window.__deleteEntry('${entry.id}')" title="Delete">✕</button>
          </div>
        </div>
      `;
    }).join('');

    // Re-bind click-to-load on history items
    elements.historyList.querySelectorAll('.history-item').forEach(el => {
      el.addEventListener('click', function(e) {
        if (e.target.closest('.history-item-actions')) return;
        const id = this.dataset.id;
        if (id) loadHistoryPrompt(id);
      });
    });
  }

  // ============================================
  // PROMPT GENERATION
  // ============================================
  function generatePrompt() {
    const category = elements.category.value;
    const industry = elements.industry ? elements.industry.value : 'general';
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
      elements.favoriteBtn.disabled = true;
      elements.exportBtn.disabled = true;
      return;
    }

    const categoryData = TEMPLATES[category];
    if (!categoryData) return;

    // Determine which templates to use
    const canUseUltimate = isFeatureUnlocked('ultimateTemplates');
    const canUsePremium = canUseUltimate || isFeatureUnlocked('premiumTemplates');
    const freeTemplates = categoryData.free || [];
    const premiumTemplates = categoryData.premium || [];
    const ultimateTemplates = categoryData.ultimate || [];

    let templates;
    let templateType;

    // Ultimate users: cycle through ultimate templates first
    if (canUseUltimate && ultimateTemplates.length > 0) {
      templates = ultimateTemplates;
      templateType = 'ultimate';
      if (currentUltimateTemplateIndex >= templates.length) {
        currentUltimateTemplateIndex = 0;
      }
    } else if (canUsePremium && premiumTemplates.length > 0) {
      templates = premiumTemplates;
      templateType = 'premium';
      if (currentPremiumTemplateIndex >= templates.length) {
        currentPremiumTemplateIndex = 0;
      }
    } else {
      templates = freeTemplates;
      templateType = 'free';
      if (freeTemplates.length === 0) {
        elements.outputBody.innerHTML = `<div class="output-placeholder"><span class="placeholder-icon">⚠️</span><p>No templates available for this category.</p></div>`;
        return;
      }
      if (currentFreeTemplateIndex >= templates.length) {
        currentFreeTemplateIndex = 0;
      }
    }

    let template;
    if (templateType === 'ultimate') {
      template = templates[currentUltimateTemplateIndex];
      currentUltimateTemplateIndex++;
    } else if (templateType === 'premium') {
      template = templates[currentPremiumTemplateIndex];
      currentPremiumTemplateIndex++;
    } else {
      template = templates[currentFreeTemplateIndex];
      currentFreeTemplateIndex++;
    }

    // Get industry modifier
    const industryMod = canUsePremium && industry !== 'general'
      ? (INDUSTRY_MODIFIERS[industry] || '')
      : '';

    // Fill the template
    let prompt = template
      .replace(/\{businessType\}/g, businessType)
      .replace(/\{product\}/g, product)
      .replace(/\{tone\}/g, tone)
      .replace(/\{audience\}/g, audience)
      .replace(/\{goal\}/g, goal);

    // Prepend industry context at the TOP of the prompt for premium users
    if (industryMod) {
      prompt = industryMod + '\n\n' + prompt;
    }

    currentPrompt = prompt;
    usingPremiumTemplate = templateType === 'premium';
    currentHistoryId = null;

    // Update badges
    elements.categoryBadge.textContent = getCategoryName(category);
    elements.toneBadge.textContent = `${getToneEmoji(tone)} ${tone}`;

    // Update industry badge (show for premium users with a non-general industry)
    const industryBadge = document.getElementById('industryBadge');
    if (industryBadge) {
      const industryName = elements.industry ? elements.industry.options[elements.industry.selectedIndex]?.text : '';
      if (canUsePremium && industry !== 'general' && industryName) {
        industryBadge.textContent = `🏭 ${industryName}`;
        industryBadge.style.display = 'inline-block';
      } else {
        industryBadge.style.display = 'none';
      }
    }

    // Update template type badge
    if (elements.templateTypeBadge) {
      if (templateType === 'ultimate') {
        elements.templateTypeBadge.textContent = '👑 Ultimate Template';
        elements.templateTypeBadge.className = 'template-type-badge ultimate';
      } else if (templateType === 'premium') {
        elements.templateTypeBadge.textContent = '✨ Premium Template';
        elements.templateTypeBadge.className = 'template-type-badge premium';
      } else {
        elements.templateTypeBadge.textContent = 'Free Template';
        elements.templateTypeBadge.className = 'template-type-badge free';
      }
    }

    // Display prompt
    elements.outputBody.innerHTML = `<pre class="output-text">${escapeHtml(prompt)}</pre>`;
    elements.copyBtn.disabled = false;
    elements.regenerateBtn.disabled = false;
    elements.favoriteBtn.disabled = false;
    elements.exportBtn.disabled = false;

    // Update favorite button state
    elements.favoriteBtn.classList.remove('is-fav');

    // Show output section animation
    elements.outputSection.style.animation = 'none';
    setTimeout(() => {
      elements.outputSection.style.animation = 'fadeInUp 0.4s ease';
    }, 10);

    // Add to history
      // Add to history with correct template type
    const histType = templateType === 'ultimate' ? 'ultimate' : (templateType === 'premium' ? 'premium' : 'free');
    addToHistory(prompt, category, tone, histType === 'premium', histType === 'ultimate');
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
  // ACTION TOAST (for favorites, export, etc.)
  // ============================================
  let actionToastEl = null;
  function showActionToast(message) {
    if (!actionToastEl) {
      actionToastEl = document.createElement('div');
      actionToastEl.className = 'action-toast';
      document.body.appendChild(actionToastEl);
    }
    actionToastEl.textContent = message;
    actionToastEl.classList.add('show');
    clearTimeout(actionToastEl._hideTimer);
    actionToastEl._hideTimer = setTimeout(() => {
      actionToastEl.classList.remove('show');
    }, 2500);
  }

  // ============================================
  // REGENERATE
  // ============================================
  function regeneratePrompt() {
    generatePrompt();
  }

  // ============================================
  // FAVORITES
  // ============================================
  function toggleCurrentFavorite() {
    if (!currentPrompt) return;
    if (!isFeatureUnlocked('favorites')) {
      Auth.requirePremium && Auth.requirePremium('favorites');
      return;
    }
    // Find the MOST RECENT history entry for this exact prompt
    const entry = [...promptHistory].reverse().find(e => e.prompt === currentPrompt);
    if (entry) {
      const wasFav = favorites.has(entry.id);
      toggleFavorite(entry.id);
      elements.favoriteBtn.classList.toggle('is-fav', !wasFav);
      // Show feedback toast
      showActionToast(wasFav ? 'Removed from favorites' : 'Added to favorites 💛');
    }
  }

  // ============================================
  // EXPORT TO PDF
  // ============================================
  function exportToPDF() {
    if (!currentPrompt) return;
    requirePremiumAction('export', () => {
      const text = currentPrompt;
      const category = elements.categoryBadge.textContent;
      const tone = elements.toneBadge.textContent;
      const date = new Date().toLocaleDateString();

      // Create a formatted text blob
      const content = `═══════════════════════════════════════\n` +
        `  PROMPTFORGE - Generated Prompt\n` +
        `═══════════════════════════════════════\n\n` +
        `  Category: ${category}\n` +
        `  Tone:     ${tone}\n` +
        `  Date:     ${date}\n\n` +
        `───────────────────────────────────────\n\n` +
        text + `\n\n` +
        `───────────────────────────────────────\n` +
        `  Generated by PromptForge\n` +
        `═══════════════════════════════════════\n`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showActionToast('📄 Prompt downloaded! Check your Downloads folder.');
    });
  }

  // ============================================
  // AUTH INTEGRATION
  // ============================================
  // Wire up auth buttons
  $('#signInBtn').addEventListener('click', () => Auth.openSignIn());
  $('#signUpBtn').addEventListener('click', () => Auth.openSignUp());
  $('#signOutBtn').addEventListener('click', () => Auth.signOut());

  // Listen for auth changes
  Auth.onAuthChange(({ isLoggedIn, role }) => {
    updatePremiumLocks();
    renderHistory();
  });

  // ============================================
  // NAVIGATION
  // ============================================
  function toggleMobileMenu() {
    elements.navLinks.classList.toggle('open');
  }

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

      elements.categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      elements.category.value = category;

      $('#generator').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

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

      elements.faqQuestions.forEach(q => q.parentElement.classList.remove('open'));

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
        const event = new Event('change');
        elements.category.dispatchEvent(event);
      }
    });
  });

  // ============================================
  // HISTORY TABS
  // ============================================
  elements.historyTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const view = this.dataset.view;
      if (!view) return;

      if (view === 'favorites' && !isFeatureUnlocked('favorites')) {
        Auth.requirePremium && Auth.requirePremium('favorites');
        return;
      }

      elements.historyTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentHistoryView = view;
      renderHistory();
    });
  });

  // ============================================
  // EVENT LISTENERS
  // ============================================
  elements.generateBtn.addEventListener('click', generatePrompt);
  elements.copyBtn.addEventListener('click', copyToClipboard);
  elements.regenerateBtn.addEventListener('click', regeneratePrompt);
  elements.favoriteBtn.addEventListener('click', toggleCurrentFavorite);
  elements.exportBtn.addEventListener('click', exportToPDF);
  elements.mobileToggle.addEventListener('click', toggleMobileMenu);

  // Premium modal triggers
  elements.buyPremiumBtn.addEventListener('click', openPremiumModal);
  elements.buyBundleBtn.addEventListener('click', openPremiumModal);
  elements.modalClose.addEventListener('click', closePremiumModal);

  // Close modal on overlay click
  elements.premiumModal.addEventListener('click', function(e) {
    if (e.target === this) closePremiumModal();
  });

  // Strategy guide modal close
  const guideModalClose = document.getElementById('guideModalClose');
  if (guideModalClose) guideModalClose.addEventListener('click', () => {
    const modal = document.getElementById('strategyGuideModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close guide modal on overlay click
  const guideModal = document.getElementById('strategyGuideModal');
  if (guideModal) {
    guideModal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Close modal on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closePremiumModal();
      const guideM = document.getElementById('strategyGuideModal');
      if (guideM) {
        guideM.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

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
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      generatePrompt();
    }
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
  // KEYBOARD SHORTCUT INDICATOR
  // ============================================
  const isMac = navigator.platform && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';
  const shortcutHint = document.createElement('div');
  shortcutHint.className = 'shortcut-hint';
  shortcutHint.innerHTML = `<span>${modKey}+Enter</span> to generate • <span>${modKey}+⇧+C</span> to copy`;
  shortcutHint.style.cssText = `
    text-align: center;
    font-size: 0.75rem;
    color: var(--gray-400);
    margin-top: 8px;
  `;

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
  // GLOBAL EXPOSURE FOR HISTORY CLICKS
  // ============================================
  // Expose functions globally so onclick handlers in rendered HTML work
  window.__loadHistory = loadHistoryPrompt;
  window.__toggleFav = toggleFavorite;
  window.__deleteEntry = deleteFromHistory;

  // ============================================
  // ULTIMATE RENDER FUNCTIONS
  // ============================================
  function renderMonthlyDrops() {
    // Update month/theme from data
    const monthEl = document.getElementById('dropsMonth');
    const themeEl = document.getElementById('dropsTheme');
    if (monthEl) monthEl.textContent = MONTHLY_DROPS.month;
    if (themeEl) themeEl.textContent = MONTHLY_DROPS.theme;

    const container = document.getElementById('monthlyDropsContainer');
    if (!container) return;
    if (!isFeatureUnlocked('monthlyDrops')) {
      container.innerHTML = `<div class="history-premium-cta" style="display:block"><p>👑 <strong>Ultimate</strong> — Monthly prompt drops with seasonal campaigns.</p></div>`;
      return;
    }
    container.innerHTML = MONTHLY_DROPS.prompts.map((p, i) => `
      <div class="drop-card">
        <div class="drop-card-header">
          <span class="drop-card-title">${p.title}</span>
          <span class="badge badge-ultimate">Monthly</span>
        </div>
        <div class="drop-card-preview">${p.text.slice(0, 100)}...</div>
        <button class="btn btn-sm btn-outline use-drop-btn" data-drop-index="${i}">Use Prompt</button>
      </div>
    `).join('');
    container.querySelectorAll('.use-drop-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.dataset.dropIndex);
        const drop = MONTHLY_DROPS.prompts[idx];
        if (drop) {
          currentPrompt = drop.text;
          elements.outputBody.innerHTML = '<pre class="output-text">' + escapeHtml(drop.text) + '</pre>';
          elements.categoryBadge.textContent = 'Monthly Drop';
          elements.toneBadge.textContent = MONTHLY_DROPS.month;
          elements.copyBtn.disabled = false;
          elements.regenerateBtn.disabled = false;
          elements.favoriteBtn.disabled = false;
          elements.exportBtn.disabled = false;
          elements.favoriteBtn.classList.remove('is-fav');
          currentHistoryId = null;
          document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
          showActionToast('📦 Monthly drop loaded! Fill in the {placeholders} and use it.');
        }
      });
    });
  }

  function renderTutorials() {
    const container = document.getElementById('tutorialsContainer');
    if (!container) return;
    if (!isFeatureUnlocked('videoTutorials')) {
      container.innerHTML = `<div class="history-premium-cta" style="display:block"><p>👑 <strong>Ultimate</strong> — 6 video tutorial modules.</p></div>`;
      return;
    }
    container.innerHTML = VIDEO_TUTORIALS.map(t => `
      <div class="tutorial-card">
        <div class="tutorial-icon">${t.icon}</div>
        <div class="tutorial-info">
          <h4>${t.title}</h4>
          <p>${t.description}</p>
          <span class="tutorial-duration">⏱ ${t.duration}</span>
        </div>
      </div>
    `).join('');
  }

  function renderStrategyGuide() {
    const container = document.getElementById('guideContainer');
    if (!container) return;
    if (!isFeatureUnlocked('strategyGuide')) {
      container.innerHTML = `<div class="history-premium-cta" style="display:block"><p>👑 <strong>Ultimate</strong> — ChatGPT strategy guide with expert techniques.</p></div>`;
      return;
    }
    container.innerHTML = STRATEGY_GUIDE_SECTIONS.map(s => `
      <div class="guide-section">
        <div class="guide-section-header">
          <span class="guide-icon">${s.icon}</span>
          <h4>${s.title}</h4>
        </div>
        <ul class="guide-tips">
          ${s.tips.map(t => '<li>' + t + '</li>').join('')}
        </ul>
      </div>
    `).join('');
  }

  function openStrategyGuide() {
    if (!isFeatureUnlocked('strategyGuide')) {
      Auth.requirePremium && Auth.requirePremium('strategyGuide');
      return;
    }
    // Render content into modal
    const fullContainer = document.getElementById('guideContainerFull');
    if (fullContainer) {
      fullContainer.innerHTML = STRATEGY_GUIDE_SECTIONS.map(s => `
        <div class="guide-section">
          <div class="guide-section-header">
            <span class="guide-icon">${s.icon}</span>
            <h4>${s.title}</h4>
          </div>
          <ul class="guide-tips">
            ${s.tips.map(t => '<li>' + t + '</li>').join('')}
          </ul>
        </div>
      `).join('');
    }
    const modal = document.getElementById('strategyGuideModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

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

    // Load history & favorites
    loadHistory();
    loadFavorites();

    // Initial UI updates
    updatePremiumLocks();
    renderHistory();

    // Append shortcut hint
    const generateBar = document.querySelector('.generate-bar');
    if (generateBar) {
      generateBar.parentElement.appendChild(shortcutHint);
    } else {
      elements.generateBtn.parentElement.appendChild(shortcutHint);
    }

    // Render ultimate-only sections
    renderMonthlyDrops();
    renderTutorials();
    renderStrategyGuide();

    // Wire up strategy guide button
    const guideBtn = document.getElementById('openGuideBtn');
    if (guideBtn) guideBtn.addEventListener('click', openStrategyGuide);

    console.log('🚀 PromptForge initialized with premium features');
    console.log('💡 Tip: Use Ctrl+Enter to generate, Ctrl+Shift+C to copy');
    console.log('👑 Premium features: Premium templates, industry packs, history & favorites, PDF export');
    console.log('👑 Ultimate features: Ultimate templates, monthly drops, strategy guide, video tutorials');
  }

  init();

})();
