# HN Coaching website

A simple, fast, multi-page website for HN Coaching. It is plain HTML, CSS and a little JavaScript, with no build step, no database and no paid services. It is designed to be hosted for free on **Cloudflare Workers** (static assets).

The website itself lives in the `public/` folder. `wrangler.jsonc` tells Cloudflare how to serve it.

## Pages

| Page | File | URL |
| --- | --- | --- |
| Home | `public/index.html` | `/` |
| About | `public/about.html` | `/about` |
| Coaching & prices | `public/services.html` | `/services` |
| FAQs | `public/faq.html` | `/faq` |
| Enquiry form | `public/contact.html` | `/contact` |
| Thank you (after sending the form) | `public/thank-you.html` | `/thank-you` |
| Privacy policy | `public/privacy.html` | `/privacy` |
| Not found | `public/404.html` | any missing page |

Shared styling lives in `public/assets/css/styles.css`. The colours and fonts are set at the top of that file, so you can re-theme the whole site there. The logo is `public/assets/img/logo.svg`.

## What it costs

| Item | Cost |
| --- | --- |
| Cloudflare Workers hosting (free plan: requests for static files are free and unlimited) | £0 |
| HTTPS certificate (automatic on Cloudflare) | £0 |
| Web3Forms enquiry form (free plan: 250 submissions/month) | £0 |
| Google Fonts | £0 |
| Custom domain | the only paid item |

## 1. Connect the enquiry form (5 minutes, free)

A static site can't send email by itself, so the form uses [Web3Forms](https://web3forms.com). It is free and needs no account.

1. Go to https://web3forms.com and enter the email address that should receive enquiries.
2. Web3Forms emails you an **access key**.
3. In `public/contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
4. In the same file, change `https://yourdomain.com/thank-you` to your real domain.

Until you do this, the form shows a friendly "please email us directly" message instead of failing silently.

## 2. Deploy to Cloudflare Workers

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Import a repository** (or "Create an application" → connect GitHub).
2. Connect GitHub and choose this repository.
3. Settings:
   - **Project name:** `hn-coaching` (must match `name` in `wrangler.jsonc`)
   - **Build command:** leave empty
   - **Deploy command:** `npx wrangler deploy`
   - **Branch:** the branch you want to publish
4. Click **Deploy**. The site goes live at `https://hn-coaching.<your-account>.workers.dev`.
5. To use your own domain, go to the Worker's **Settings → Domains & Routes → Add → Custom domain**. The domain must be managed by Cloudflare: either buy it through Cloudflare, or add it to Cloudflare (Free plan) and switch its nameservers at the company you bought it from.

Every push to the branch then redeploys the site automatically. The `public/_headers` file adds security headers.

## 3. Personalise the content (checklist)

Search the files for these placeholders:

- [ ] `hello@example.com`: the real email address (appears on every page)
- [ ] `07700 900123` / `+447700900123`: the real phone number, or remove it
- [ ] `yourdomain.com`: in `public/contact.html`, `public/robots.txt` and `public/sitemap.xml`
- [ ] **About page**: her story, qualifications (`[sector]`, training provider), and a photo in place of the "HN" placeholder (instructions are in a comment in `public/about.html`)
- [ ] **Prices** on `public/services.html` (£65 / £330 are examples) and the matching FAQ answers
- [ ] **Testimonials** on the home page are examples. Replace them with genuine client feedback, used with permission, or remove the section before going live.
- [ ] **Privacy policy**: fill in the `[bracketed]` details. It is a starting template, not legal advice.
- [ ] Location: if she works in a particular town, mention it on the home and services pages. This helps local search.

## Previewing locally

The site uses clean URLs such as `/about`, which Cloudflare serves automatically. To preview it on your computer exactly as it will run on Cloudflare:

```bash
npx wrangler dev
```

Then open http://localhost:8787.
