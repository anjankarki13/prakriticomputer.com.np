# Prakriti Computer — prakriticomputer.com.np

A static informational website for Prakriti Computer. Plain HTML, CSS and JavaScript — no build
step, no framework, no database. Upload the files and the site is live.

---

## Pages

| File            | Page                                                             |
| --------------- | ---------------------------------------------------------------- |
| `index.html`    | Home — intro, phone numbers, service overview, how we work, FAQ  |
| `about.html`    | About Us — story, values, service area                            |
| `services.html` | Services — all 12 services in detail                              |
| `contact.html`  | Contact — phone numbers, hours, enquiry form, map, social links   |
| `404.html`      | Shown when a visitor hits a wrong address                         |

Supporting files: `assets/css/style.css`, `assets/js/main.js`, `assets/img/`,
`robots.txt`, `sitemap.xml`, `.htaccess`.

---

## Before you go live — things to fill in

These are the only placeholders in the site. Everything else is finished.

### 1. Social media links  ← **important**

The three social links use guessed addresses. Replace them with your real profile URLs.
They appear in the top bar, the footer and (on the contact page) the "Follow us" card of
**every** page, plus the `sameAs` list in the structured data on `index.html`.

Search and replace across all `.html` files:

| Replace this                                          | With your real link |
| ----------------------------------------------------- | ------------------- |
| `https://www.facebook.com/prakriticomputer`           | your Facebook page  |
| `https://www.tiktok.com/@prakriticomputer`            | your TikTok account |
| `https://www.linkedin.com/company/prakriticomputer`   | your LinkedIn page  |

In VS Code: `Ctrl+Shift+F`, type the old link, `Ctrl+Shift+H` to replace in all files.

### 2. Shop address

The address currently reads **"Jhapa, Koshi Province, Nepal"**. Replace it with your exact
street / tole / ward. It appears in the footer of every page, in the contact page details,
and in the `address` block of the structured data in `index.html`.

### 3. Map location

In `contact.html`, find the `<!-- TODO -->` comment above the map. Open Google Maps, search for
your shop, choose **Share → Embed a map**, copy the `<iframe>` and paste it in place of the
existing one.

### 4. Email address

The site uses `info@prakriticomputer.com.np`. Create that mailbox in your hosting control panel,
or replace it everywhere with the address you actually use (e.g. your Gmail).

### 5. Facts worth checking

Written as reasonable defaults — correct them if they are wrong:

- **"Since 2010" / "15+ years"** on the home page hero and stat strip
- **"5,000+ devices repaired"** in the stat strip (`index.html`, `about.html`)
- **Opening hours** — Sunday to Friday, 9 AM to 7 PM, Saturday closed. These appear in the hero
  card, the footer of every page, the contact page table, the FAQ, and the structured data.
- **Service descriptions** in `services.html` — reword any that do not match what you offer,
  or delete a whole `<article class="service-block">` block for a service you do not provide.

### 6. WhatsApp number

The floating green button and the contact page both use `9801444271`. If WhatsApp is on a
different number, replace `wa.me/9779801444271` throughout.

---

## Publishing the site

Your `.com.np` domain is free from Mercantile (register.com.np) but does **not** include hosting.
You need somewhere to put these files:

**Option A — normal web hosting (cPanel).** Buy hosting from any Nepali or international provider,
then upload everything in this folder into the `public_html` directory using cPanel's File Manager
or FTP (FileZilla). Point your domain's nameservers to the host. The included `.htaccess` handles
HTTPS redirection, compression and the 404 page automatically.

**Option B — free static hosting (Netlify, Cloudflare Pages, GitHub Pages).** Drag this folder onto
netlify.com/drop, then add `prakriticomputer.com.np` as a custom domain and follow their DNS
instructions. Free, fast, and HTTPS is automatic. Note: `.htaccess` is ignored by these hosts —
that is fine, they provide the same behaviour themselves.

Either way, remember to point the domain's DNS at your host in the register.com.np control panel.

---

## After launch

1. **Google Search Console** (search.google.com/search-console) — verify the domain and submit
   `https://prakriticomputer.com.np/sitemap.xml` so Google indexes the site.
2. **Google Business Profile** — far more valuable than the website for a local shop. Create a
   free listing with your address, phone numbers, photos and hours so you appear on Google Maps.
3. Add the website link to your Facebook, TikTok and LinkedIn profiles.

---

## Contact form

The enquiry form on `contact.html` is not connected to a server — a static site has none. When a
visitor submits it, the form opens their own email app with the message pre-filled and addressed
to you. This works, but some visitors will abandon it.

To receive submissions in your inbox instead, sign up free at [formspree.io](https://formspree.io)
and change one line in `contact.html`:

```html
<!-- from -->
<form class="form" id="enquiry-form" data-mailto="info@prakriticomputer.com.np" novalidate>

<!-- to (use the form ID Formspree gives you) -->
<form class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Removing `id="enquiry-form"` disables the mailto script and lets Formspree handle the submission.

---

## Editing the design

All colours, spacing and fonts live as variables at the top of `assets/css/style.css`, under
`:root`. The site is green throughout, built from two scales:

```css
/* Deep greens — hero, footer, page headers, panels */
--forest-900: #04251a;
--forest-800: #073a28;
--forest-700: #0a5238;
--forest-600: #0e6b4a;

/* Vivid greens — buttons, links, icons, highlights */
--green-700: #0b854a;   /* light theme accent */
--green-600: #0f9d58;
--green-500: #16b364;
--green-400: #3ecf8e;   /* dark theme accent  */
```

Change `--forest-*` to restyle the dark areas, `--green-*` for the accents. Keep `--green-700`
as the light-theme accent if you change it: lighter greens drop below the 4.5:1 contrast ratio
needed for white button text to stay readable.

The site has a light and dark theme; the toggle is the sun/moon button in the header, and the
visitor's choice is remembered in their browser.

---

## Notes

- Works in all current browsers, and on phones down to 320px wide.
- No cookies, no tracking, no analytics — nothing to declare in a privacy policy as it stands.
  If you later add Google Analytics, you should add a short privacy note.
- Fonts (Inter and Sora) load from Google Fonts; everything else is served from your own domain.
- To preview locally, just double-click `index.html`.
