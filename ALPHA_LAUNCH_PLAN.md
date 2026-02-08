# Marketing Website - Alpha Launch Plan

> **Goal**: Get the marketing site live with email capture for alpha signups
> **Target**: 100 email signups before alpha launch (Feb 2026)

---

## Current State

- Static HTML site exists in this repo
- Not deployed anywhere
- No email capture functionality
- Messaging assumes app is available for download

---

## Required Changes

### 1. HTML Updates (`index.html`)

#### Hero Section Changes

| Element | Current | Change To |
|---------|---------|-----------|
| Primary CTA button | "Get Started" → `#download` | "Join Alpha Waitlist" → `#alpha-signup` |
| Secondary CTA | "Learn More" → `#features` | Keep as-is |
| App store badges | Visible, linking to `#` | Remove or replace with alpha badge |
| New element | - | Add "Alpha launching Feb 2026" badge |

#### Replace Download Section → Alpha Signup Section

**Remove:**
```html
<!-- Download CTA Section -->
<section class="cta-section" id="download">
  ... (current download content)
</section>
```

**Replace with:**
```html
<!-- Alpha Signup Section -->
<section class="cta-section" id="alpha-signup">
    <div class="section-container">
        <h2 class="cta-title">Join Our Alpha Program</h2>
        <p class="section-description">
            Be among the first to experience All About Money
        </p>

        <!-- Alpha Incentive Box -->
        <div class="alpha-incentive-box">
            <p>
                🎁 <strong>Alpha Tester Reward</strong><br>
                <span class="incentive-highlight">Lifetime 50% Off</span><br>
                <span class="incentive-subtext">on any premium plan when we launch</span>
            </p>
        </div>

        <!-- Email Signup Form (Formspree) -->
        <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="alpha-form">
            <input type="email" name="email" placeholder="Enter your email" required>
            <button type="submit" class="btn btn-primary">Get Early Access</button>
        </form>
        <p class="form-disclaimer">
            We'll email you when alpha spots open up. No spam, ever.
        </p>

        <!-- Feature Bullets -->
        <div class="alpha-features">
            <div>
                <p>✓ Track crypto & stocks in one app</p>
                <p>✓ Sync 8+ major exchanges</p>
            </div>
            <div>
                <p>✓ Connect BTC & ETH wallets</p>
                <p>✓ Export your data anytime</p>
            </div>
        </div>

        <!-- Coming Soon -->
        <div class="coming-soon">
            <p>Coming soon to iOS & Android</p>
            <div class="store-badges-greyed">
                <img src="images/apple-store.png" alt="Coming to App Store">
                <img src="images/google-play-store.png" alt="Coming to Google Play">
            </div>
        </div>
    </div>
</section>
```

#### CSS Additions (add to `css/aam-theme.css`)

```css
/* Alpha Signup Section */
.alpha-incentive-box {
    background: rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.incentive-highlight {
    font-size: 1.5rem;
    font-weight: bold;
    display: block;
    margin: 0.5rem 0;
}

.incentive-subtext {
    opacity: 0.9;
    font-size: 0.9rem;
}

.alpha-form {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.alpha-form input[type="email"] {
    flex: 1;
    min-width: 200px;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
}

.form-disclaimer {
    color: rgba(255,255,255,0.7);
    font-size: 0.85rem;
    margin-top: 1rem;
}

.alpha-features {
    margin-top: 2.5rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
    text-align: left;
    color: rgba(255,255,255,0.9);
}

.alpha-features p {
    margin: 0.5rem 0;
}

.coming-soon {
    margin-top: 2.5rem;
    opacity: 0.6;
}

.store-badges-greyed img {
    filter: grayscale(50%);
    opacity: 0.7;
}

.hero-alpha-badge {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255,255,255,0.15);
    border-radius: 20px;
    display: inline-block;
    font-size: 0.9rem;
}
```

---

## 2. Email Capture Setup

### Option A: Formspree (Recommended)

1. Go to https://formspree.io
2. Sign up (free tier: 50 submissions/month)
3. Create new form
4. Copy form endpoint (e.g., `https://formspree.io/f/xyzabc123`)
5. Replace `YOUR_FORM_ID` in the HTML

**Pros**: Simple, works with any hosting, free tier sufficient for alpha

### Option B: Netlify Forms (if using Netlify hosting)

1. Add `netlify` attribute to form tag:
   ```html
   <form name="alpha-signup" netlify>
   ```
2. Forms automatically captured in Netlify dashboard

**Pros**: No external service, integrates with hosting

### Option C: Google Forms Embed

1. Create Google Form with email field
2. Get embed code
3. Embed in page

**Pros**: Unlimited free, Google Sheets integration
**Cons**: Looks less polished, opens in iframe

---

## 3. Deployment Options

### Option A: Netlify (Recommended)

**Pros**: Free, automatic HTTPS, easy deploys, form handling
**Setup**:
1. Connect GitHub repo to Netlify
2. Set publish directory to `/` (root)
3. Deploy

**Cost**: Free

### Option B: Vercel

**Pros**: Free, fast, good for static sites
**Setup**:
1. Connect GitHub repo
2. Deploy

**Cost**: Free

### Option C: AWS CloudFront + S3

**Pros**: Already using AWS, full control
**Setup**:
1. Create S3 bucket
2. Upload files
3. Create CloudFront distribution
4. Configure SSL

**Cost**: ~$1-5/month

### Option D: GitHub Pages

**Pros**: Free, simple
**Cons**: Limited features, github.io domain unless custom
**Setup**:
1. Enable GitHub Pages in repo settings
2. Point to main branch

**Cost**: Free

---

## 4. Domain Setup

**If domain exists (e.g., allaboutmoney.com):**
1. Add DNS records pointing to hosting provider
2. Configure SSL certificate
3. Set up www redirect

**If no domain:**
- Use Netlify/Vercel subdomain for alpha (e.g., `allaboutmoney.netlify.app`)
- Purchase domain later

---

## 5. Pre-Launch Checklist

### Content
- [ ] Update hero section CTA
- [ ] Add alpha badge to hero
- [ ] Replace download section with alpha signup
- [ ] Update page title/meta for alpha
- [ ] Review all copy for accuracy

### Technical
- [ ] Set up Formspree account
- [ ] Create form endpoint
- [ ] Test form submission
- [ ] Set up email notifications for new signups
- [ ] Choose and configure hosting
- [ ] Deploy site
- [ ] Test on mobile devices
- [ ] Test on multiple browsers

### Post-Deploy
- [ ] Submit sitemap to Google (optional)
- [ ] Set up basic analytics (Google Analytics or Plausible)
- [ ] Create thank-you page or message for form submission
- [ ] Test full signup flow

---

## 6. Tracking Signups

### Formspree Dashboard
- View all submissions
- Export to CSV
- Email notifications on each signup

### Optional: Google Sheets Integration
- Formspree can send to Google Sheets
- Easier for team to view/manage
- Track signup source if adding UTM params

### Signup Goals

| Week | Target | Cumulative |
|------|--------|------------|
| 1 | 15 | 15 |
| 2 | 25 | 40 |
| 3 | 30 | 70 |
| 4 | 30 | 100 |

---

## 7. Post-Signup Communication

### Welcome Email (via Formspree or manually)

```
Subject: You're on the All About Money Alpha List! 🎉

Hi there,

Thanks for signing up for early access to All About Money!

You're now on our alpha waitlist. Here's what happens next:

1. We're launching alpha in February 2026
2. You'll get an invite code via email
3. As a thank you, you'll get lifetime 50% off any premium plan

In the meantime, follow our journey:
- Twitter: @allaboutmoney
- Questions? Reply to this email

See you soon!
The All About Money Team
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Hero CTA, replace download section |
| `css/aam-theme.css` | Add alpha signup styles |

## Files to Create

| File | Purpose |
|------|---------|
| `thanks.html` (optional) | Thank you page after signup |

---

## Timeline

| Day | Task |
|-----|------|
| 1 | Set up Formspree, choose hosting |
| 1 | Update HTML with alpha signup |
| 1 | Add CSS styles |
| 2 | Deploy to hosting |
| 2 | Test form submission |
| 2 | Configure domain (if available) |
| 3 | Start sharing link for signups |

---

## Owner

| Task | Owner |
|------|-------|
| HTML/CSS updates | |
| Formspree setup | |
| Hosting setup | |
| Domain config | |
| Sharing/outreach | |
