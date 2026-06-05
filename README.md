# ⚡ PromptForge — Business Prompt Generator

A web-based tool that helps small businesses generate ready-to-use ChatGPT prompts. Users fill in their business details, select a category, and get a perfectly crafted prompt — ready to copy, paste, and profit.

**No API keys needed. No backend. Just HTML, CSS & vanilla JavaScript.**

---

## 🚀 Features

- **8 Prompt Categories**: Instagram Posts, Product Descriptions, WhatsApp Messages, Complaint Responses, Promotion Ideas, Content Calendars, Ad Copy, TikTok Scripts
- **Smart Form**: Business type, product/service, tone, target audience, and message goal
- **Multiple Templates**: Each category has 2+ prompt templates that cycle on regeneration
- **Copy to Clipboard**: One-click copy with visual feedback
- **Regenerate**: Cycle through different template variations
- **Keyboard Shortcuts**: `Ctrl+Enter` to generate, `Ctrl+Shift+C` to copy
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Premium Upsell**: Simulated premium pack with pricing tiers
- **FAQ Accordion**: Expandable FAQs for user questions

---

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles (modern, responsive)
├── js/
│   └── app.js          # All logic (templates, generation, interactions)
└── README.md           # This file
```

---

## 🛠️ How to Deploy on GitHub Pages (Free)

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name your repository (e.g., `prompt-forge`)
3. Choose **Public** (free hosting requires public repos for GitHub Free)
4. Click **Create repository**

### Step 2: Upload Your Files
Using Git:
```bash
git init
git add .
git commit -m "Initial commit - Business Prompt Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/prompt-forge.git
git push -u origin main
```

Or upload manually via GitHub's web interface.

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** > **Pages**
3. Under "Branch", select `main` and the `/ (root)` folder
4. Click **Save**

### Step 4: Your Site is Live!
After 1-2 minutes, your site will be available at:
```
https://YOUR_USERNAME.github.io/prompt-forge
```

### Alternative: Deploy with a Custom Domain
1. Buy a domain (e.g., from Namecheap, GoDaddy, or Cloudflare)
2. In your repo Settings > Pages, enter your custom domain
3. Add a `CNAME` record pointing to `YOUR_USERNAME.github.io` in your DNS settings

---

## 💰 Monetization Ideas

### 1. **PayPal** — Receive Payment Directly (Main Channel)
- Create a [PayPal.me](https://paypal.me) link (free to set up)
- Price: **$4.99** for Premium Pack, **$9.95** for Ultimate Bundle
- In `index.html`, replace `YOURUSERNAME` in the PayPal button with your PayPal.me username
- When a customer pays, manually send them the prompt pack PDF via email

### 2. **WhatsApp Send Feature** — Free Value That Drives Upgrades
The built-in "Send via WhatsApp" button lets users send prompts directly to their customers via WhatsApp. This is:
- **Free users**: Can send prompts (basic functionality)
- **Premium/Ultimate users**: Unlimited sending + priority
- This feature makes the tool more useful and encourages upgrades

### 3. **Build an Email List**
- Add a "Get 5 Free Prompts" email form (use [ConvertKit](https://convertkit.com) free tier or [Mailchimp](https://mailchimp.com) free tier)
- Send weekly tips to build trust
- Promote the Premium Pack to your list
- **Referral**: Create an affiliate program — give 30% commission for each sale

### 4. **Price Anchoring Strategy**
On the pricing section, the $0 → $4.99 → $9.95 structure makes the $4.99 option feel like the "smart choice." This is intentional psychological pricing.

### 5. **Partnerships**
Partner with:
- **Social media managers** who can recommend your tool to their clients
- **Small business groups** on Facebook / LinkedIn
- **Local business associations** (chamber of commerce, BNI groups)

### 6. **Content Marketing**
Create free content that drives traffic:
- "10 ChatGPT Prompts Every Bakery Owner Needs"
- "How to Write Product Descriptions with AI"
- TikTok videos showing the tool in action

---

## 🔧 Customization Guide

### Adding New Prompt Categories
In `js/app.js`, add a new key to the `TEMPLATES` object:
```javascript
email: {
  name: 'Email Marketing',
  templates: [
    'Your prompt template with {variables}...'
  ]
}
```
Then add the option to the `<select>` in `index.html` and a new category card.

### Changing the Premium Links
Update the URL placeholders in the premium modal:
- Search for `paypal.me/YOURUSERNAME` in `index.html` and replace with your PayPal.me link
- The only payment method is PayPal — no other payment links exist

---

## 📄 License

MIT — Feel free to modify, sell, and distribute.

Built for small businesses everywhere.
