# HN Coaching website

A simple, fast, multi-page website for HN Coaching. It is plain HTML, CSS and a little JavaScript, with no build step, no database and no paid services. It is designed to be hosted for free on **Cloudflare Pages**.

## Pages

| Page | File | URL |
| --- | --- | --- |
| Home | `index.html` | `/` |
| About | `about.html` | `/about` |
| Coaching & prices | `services.html` | `/services` |
| FAQs | `faq.html` | `/faq` |
| Enquiry form | `contact.html` | `/contact` |
| Thank you (after sending the form) | `thank-you.html` | `/thank-you` |
| Privacy policy | `privacy.html` | `/privacy` |
| Not found | `404.html` | any missing page |

Shared styling lives in `assets/css/styles.css`. The colours and fonts are set at the top of that file, so you can re-theme the whole site there. The logo is `assets/img/logo.svg`.

## What it costs

| Item | Cost |
| --- | --- |
| Cloudflare Pages hosting (free plan: unlimited bandwidth, 500 builds/month) | £0 |
| HTTPS certificate (automatic on Cloudflare) | £0 |
| Web3Forms enquiry form (free plan: 250 submissions/month) | £0 |
| Google Fonts | £0 |
| Custom domain | the only paid item |

## 1. Connect the enquiry form (5 minutes, free)

A static site can't send email by itself, so the form uses [Web3Forms](https://web3forms.com). It is free and needs no account.

1. Go to https://web3forms.com and enter the email address that should receive enquiries.
2. Web3Forms emails you an **access key**.
3. In `contact.html`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with that key.
4. In the same file, change `https://yourdomain.com/thank-you` to your real domain.

Until you do this, the form shows a friendly "please email us directly" message instead of failing silently.

## 2. Deploy to Cloudflare Pages

1. Log in to the Cloudflare dashboard and go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Choose this GitHub repository and the branch you want to publish.
3. Build settings: **Framework preset: None**, **Build command: leave empty**, **Build output directory: `/`**.
4. Click **Save and Deploy**. You'll get a free `*.pages.dev` address.
5. Under the project's **Custom domains** tab, add your domain and follow the DNS steps.

Every push to the branch then redeploys the site automatically. The `_headers` file adds security headers, which Cloudflare Pages supports for free.

## 3. Personalise the content (checklist)

Search the files for these placeholders:

- [ ] `hello@example.com`: the real email address (appears on every page)
- [ ] `07700 900123` / `+447700900123`: the real phone number, or remove it
- [ ] `yourdomain.com`: in `contact.html`, `robots.txt` and `sitemap.xml`
- [ ] **About page**: her story, qualifications (`[sector]`, training provider), and a photo in place of the "HN" placeholder (instructions are in a comment in `about.html`)
- [ ] **Prices** on `services.html` (£65 / £330 are examples) and the matching FAQ answers
- [ ] **Testimonials** on the home page are examples. Replace them with genuine client feedback, used with permission, or remove the section before going live.
- [ ] **Privacy policy**: fill in the `[bracketed]` details. It is a starting template, not legal advice.
- [ ] Location: if she works in a particular town, mention it on the home and services pages. This helps local search.

## Previewing locally

The site uses clean URLs such as `/about`, which Cloudflare Pages serves automatically. To preview it on your computer in the same way:

```bash
npx wrangler pages dev .
```

Opening `index.html` directly in a browser works for viewing, but links between pages expect the Cloudflare-style URLs.
