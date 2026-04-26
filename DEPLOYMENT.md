# Domus-AI Deployment & Configuration Guide

## Overview

This document captures all infrastructure, service configurations, and deployment details for the Domus-AI website. Use this as reference for maintenance, debugging, and future evolutions.

**Live Site**: https://www.domus-ai.fr  
**Repository**: https://github.com/wassim-rb/domus-ai  
**Deployment Platform**: Vercel  
**Status**: Live and maintained  
**Last Reviewed**: April 25, 2026

---

## 1. Service Accounts & Credentials

### Vercel
- **Account Owner**: Wassim (personal account)
- **GitHub Integration**: Connected to `wassim-rb/domus-ai` repo
- **Auto-Deploy**: Enabled on main branch pushes
- **Environment**: Production (domus-ai.fr)

### GitHub
- **Repository**: `https://github.com/wassim-rb/domus-ai`
- **Branch**: `main` (production)
- **Recent Commits**:
  - `863bc44` - Update project checklist
  - `9b6e04a` - Add LinkedIn footer links
  - `4e5f64f` - Add blog articles and SEO updates

### OVHcloud
- **Domain**: domus-ai.fr
- **Service Plan**: MX Plan (basic DNS + MX records, no email hosting)
- **Email Redirection**: Enabled
  - Source: `contact@domus-ai.fr`
  - Destination: `rbilawaassim@gmail.com` (internal Gmail)
  - Form/contact flows also reference: `adambadi333@gmail.com`

### Formspree
- **Account**: wassim-rb@gmail.com (linked to contact@domus-ai.fr + adambadi333@gmail.com)
- **Form Name**: `domus-ai-contact`
- **Form Endpoint**: `https://formspree.io/f/xojporrg`
- **Form Action**: POST to endpoint above
- **Email Delivery**: Formspree forwards submissions to both verified email addresses

---

## 2. Contact Form Integration (Formspree)

### How It Works
1. User fills out form on `index.html` (name, email, site web ou LinkedIn, phone, message)
2. Form POSTs to Formspree endpoint: `https://formspree.io/f/xojporrg`
3. Formspree validates submission (spam check, rate limiting)
4. Submission forwarded to both:
   - `rbilawaassim@gmail.com` (internal inbox)
   - `adambadi333@gmail.com` (public contact email)
5. User sees "success" response (can be customized in Formspree dashboard)

### Form Fields
```html
<form action="https://formspree.io/f/xojporrg" method="POST" class="contact-form">
  <input type="text" name="name" required />           <!-- Visitor name -->
  <input type="email" name="email" required />         <!-- Visitor email -->
  <input type="text" name="company" required />        <!-- Website or LinkedIn -->
  <input type="tel" name="phone" required />           <!-- Visitor phone -->
  <textarea name="message" required />                 <!-- Message/inquiry -->
  <button type="submit">Envoyer</button>
</form>
```

### Testing the Form
1. Go to https://www.domus-ai.fr#contact
2. Fill in test data (name, email, site web ou LinkedIn, phone, message)
3. Submit
4. Check email (should arrive in 5-30 seconds)
5. Response confirmation: User sees thank you message in browser

### Troubleshooting Contact Form
| Issue | Solution |
|-------|----------|
| Form not submitting | Check browser console for errors; verify Formspree endpoint in HTML is correct |
| Emails not arriving | Check Formspree dashboard for spam/bounce status; verify recipient emails are verified |
| Rate limiting | Formspree blocks >5 submissions/second from same IP; wait 5 minutes or use different network |
| Spam filtering | Formspree has built-in spam detection; legitimate submissions should pass |

### Future Enhancements
- [ ] Add reCAPTCHA to reduce spam
- [ ] Custom thank-you page with calendar link (Calendly/Cal.com)
- [ ] Slack notification integration (new submissions → #leads channel)
- [ ] Form field pre-population from URL params

---

## 3. Email Infrastructure (OVHcloud)

### Domain Configuration
- **Domain Registrar**: OVHcloud
- **Domain**: domus-ai.fr
- **Service Plan**: MX Plan (basic)
- **MX Records**: Set up to handle inbound mail redirection

### Email Redirection Setup
**Primary Redirection** (set up April 10, 2026):
- Rule: All mail to `contact@domus-ai.fr` → `rbilawaassim@gmail.com`
- Status: Active
- Created in: OVHcloud Control Panel → Emails → Redirections

### Accessing OVHcloud Dashboard
1. Go to https://www.ovhcloud.com/en/
2. Sign in with account credentials
3. Navigate to `My Services` → Domain → `domus-ai.fr`
4. Click `Emails` → `Redirections`
5. View/edit active redirections

### Current MX Records (for reference)
The domain currently uses OVHcloud's default MX records for mail redirection only. If you need full email hosting (SMTP, aliases, distribution lists), you must upgrade to "Email Pro" plan (~€4-5/month, 24-48h setup).

### Future Enhancements
- [ ] **Gmail "Send As"** — Enable sending from contact@domus-ai.fr via Gmail account
  - Setup: Gmail Settings → Accounts → Add other email address → Verify via OVHcloud SMTP
  - Enables professional outbound emails from contact@domus-ai.fr address
- [ ] **Upgrade to Email Pro** — If volume exceeds redirection limits
  - Benefit: Full mailbox, IMAP/SMTP, aliases, bigger capacity
  - Cost: ~€4-5/month + VAT
  - Setup time: 24-48 hours

---

## 4. Website Deployment (Vercel)

### Current Deployment
- **Platform**: Vercel (free tier)
- **Production URL**: https://www.domus-ai.fr
- **Source**: GitHub main branch (`wassim-rb/domus-ai`)
- **Auto-Deploy**: Enabled (any push to main triggers deploy)
- **Deploy History**: View at https://vercel.com → Project → Deployments
- **Domain Status**: Custom domain connected and live

### File Structure
```
domus-ai/
├── index.html              # Main landing page
├── blog/
│   ├── index.html         # Blog listing page
│   ├── article-1.html
│   ├── article-2.html
│   ├── article-3.html
│   ├── article-4.html
│   ├── article-5.html
│   └── article-6.html
├── assets/                # Images and static assets
├── contact-form.html      # Reference template / backup form block
├── PROJECT-CHECKLIST.md   # Project tracking (internal)
├── GITHUB-SETUP.md        # GitHub push/auth notes
├── mentions-legales.html  # Legal notice page
├── robots.txt             # SEO crawling rules
├── sitemap.xml            # SEO sitemap
└── DEPLOYMENT.md          # This file
```

### Deployment Workflow

**Option A: Automatic (Recommended)**
```bash
# 1. Make changes locally
# 2. Push to GitHub
git add .
git commit -m "Description of changes"
git push origin main

# 3. Vercel auto-deploys (watch progress at vercel.com)
# 4. Site updates at domus-ai.fr within 30 seconds
```

**Option B: Manual Deploy (if needed)**
1. Go to https://vercel.com/dashboard
2. Select `domus-ai` project
3. Click "Deployments" tab
4. Click "Redeploy" next to latest deployment (or specific version)

### Viewing Deployment Status
- **Current Status**: https://vercel.com/wassim-rb/domus-ai
- **Build Logs**: Dashboard → Project → Deployments → Click any deployment
- **Rollback**: Click previous deployment → "Promote to Production"

### Custom Domain Setup at Vercel
1. Dashboard → Project Settings → Domains
2. Add `domus-ai.fr`
3. Vercel gives you nameservers or CNAME record
4. Update at OVHcloud (see section 5 below)

---

## 5. Domain Configuration (DNS)

### Current Status
- Domain: `domus-ai.fr` registered at OVHcloud
- Website DNS: configured and pointing to Vercel
- MX Records: OVHcloud default (for email redirection)

### DNS Update Steps (One-time Setup)
These steps are already completed for the live site. Keep them here only as reference if the domain setup ever needs to be rebuilt.

**At Vercel Dashboard:**
1. Project → Settings → Domains
2. Add custom domain: `domus-ai.fr`
3. Vercel shows one of two options:

   **Option A: Update Nameservers** (recommended)
   - Vercel: "Use Vercel Nameservers"
   - Record: ns1.vercel.com, ns2.vercel.com (varies)
   - At OVHcloud: Domain → DNS → Change nameservers to Vercel's

   **Option B: Add CNAME Record** (if keeping OVHcloud nameservers)
   - Vercel gives: CNAME record like `www` → `cname.vercel.com`
   - At OVHcloud: DNS → Add CNAME record

**At OVHcloud Control Panel:**
1. Go to https://www.ovhcloud.com/en/
2. My Services → Domains → `domus-ai.fr`
3. Click "DNS" tab
4. Update nameservers or add CNAME (per Vercel's instructions)
5. **⚠️ Keep MX records unchanged** — they handle email redirection

### Verification
```bash
# Verify domain points to Vercel
nslookup domus-ai.fr
# Should show: Vercel-related resolution / active website IP

# Verify MX records for email
nslookup -type=MX domus-ai.fr
# Should show: OVHcloud MX records
```

### Troubleshooting DNS
| Issue | Cause | Solution |
|-------|-------|----------|
| Site shows "Not Found" | DNS not propagated | Wait 24-48 hours; check status at whatsmydns.net |
| Email not arriving | MX records overwritten | Re-verify at OVHcloud that MX records exist |
| HTTPS error | SSL certificate not issued | Vercel auto-issues after DNS is active; wait 24h |

---

## 6. Browser & Analytics

### Current Setup
- **Analytics**: GA4 measurement ID `G-1G1293D2BP` added on all current public HTML pages and verified in production on April 13, 2026
- **Search Console**: Domain property `domus-ai.fr` verified on April 25, 2026
- **SEO**: meta tags in place (title, description, keywords)
- **SSL**: Auto-enabled by Vercel (HTTPS by default)
- **robots.txt**: Present
- **sitemap.xml**: Present
- **Favicon**: SVG favicon added in code on April 13, 2026; production verification still pending after deploy

### Google Analytics Implementation Rule
> Canonical rule: see `AGENTS.md` rule #6. GA4 measurement ID: `G-1G1293D2BP`.  
> Applies to all public pages: index.html, mentions-legales.html, blog/index.html, and every blog/article-*.html.

### Google Search Console Status (April 25, 2026)
- **Property Type**: Domain property for `domus-ai.fr`
- **Preferred URL Version**: Use `https://www.domus-ai.fr/...` when inspecting pages and when submitting the sitemap
- **Sitemap Submitted**: `https://www.domus-ai.fr/sitemap.xml`
- **Sitemap Result**: Processed successfully on April 25, 2026
- **Pages Discovered via Sitemap**: 11
- **Homepage Status**: `https://www.domus-ai.fr/` confirmed indexed on April 25, 2026
- **Pending Pages at Last Check**:
  - `https://www.domus-ai.fr/blog/`
  - `https://www.domus-ai.fr/faq-ia-immobilier.html`
- **Action Already Taken**: Indexing requested for both pending pages on April 25, 2026
- **Re-check Window**: Between April 27 and May 2, 2026, before requesting indexing again
- **Useful Live URLs**:
  - `https://www.domus-ai.fr/robots.txt`
  - `https://www.domus-ai.fr/sitemap.xml`

### Future Enhancements
- [x] **Google Analytics verification** — Production tracking confirmed on April 13, 2026 via real-time view and Google tag detection
- [x] **Search Console setup** — Domain property verified on April 25, 2026
- [x] **Search Console sitemap submission** — `https://www.domus-ai.fr/sitemap.xml` accepted on April 25, 2026 with 11 pages discovered
- [ ] **Search Console follow-up** — Re-check indexing for `/blog/` and `/faq-ia-immobilier.html` between April 27 and May 2, 2026
- [ ] **Search Console monitoring** — Continue checking indexing, keywords, and click-through rates
- [ ] **Hotjar** — Heatmaps, session recordings (understanding user behavior)

---

## 7. Project Management & Iteration

### Current Phase
**Phase 2 (Launch)** — Website live, contact form working, domain configured

### Next Phases
1. **Phase 2 Complete** → Finish legal details, analytics, favicon, and mobile testing
2. **Phase 3 (Growth)** → Content distribution, blog SEO, client acquisition
   - Publish blog articles to LinkedIn, Twitter, email newsletter
   - Optimize for Google search (keywords, backlinks, domain authority)
   - Email prospecting via contact@domus-ai.fr (after Gmail "Send As" setup)

### Important Files for Future Work
- `PROJECT-CHECKLIST.md` — Main task tracking (update after each iteration)
- `about-me.md` — Wassim's profile & voice (reference for content tone)
- `my-company.md` — 2026 strategy & goals (decision-making context)
- `DEPLOYMENT.md` — This file (infrastructure reference)

---

## 8. Support & Troubleshooting

### Quick Diagnostics
```bash
# From project directory:
git status                    # Check uncommitted changes
git log --oneline -5          # Recent commits
curl -I https://www.domus-ai.fr  # Check if site is live
```

### Getting Help
| Problem | Resource |
|---------|----------|
| Vercel deployment fails | Check build logs at vercel.com → Deployments |
| Form submissions not arriving | Verify Formspree endpoint in HTML; check Formspree dashboard |
| Domain not resolving | Wait 24-48h for DNS propagation; use whatsmydns.net |
| Email redirection not working | Check OVHcloud control panel; verify MX records |
| Blog article not showing | Verify file path in blog/index.html links (use relative paths) |

---

## 9. Handover Checklist

Before handing off project for future evolution:
- [ ] Document any environment variables (none currently)
- [ ] Share access: Vercel, OVHcloud, GitHub, Formspree, Gmail
- [ ] Create backup of production files
- [ ] Update `DEPLOYMENT.md` with any new service accounts
- [ ] Update `PROJECT-CHECKLIST.md` with Phase 3 tasks

---

**Last Updated**: April 25, 2026  
**Maintained By**: Claude  
**Next Review**: After first customer acquisition or Phase 3 launch
