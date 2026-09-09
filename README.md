# Prakriti Computer — prakriticomputer.com.np

A static informational website for Prakriti Computer. Plain HTML, CSS and JavaScript — no build
step, no framework, no database. Upload the files and the site is live.

---

## Pages

| File            | Page                                                             |
| --------------- | ---------------------------------------------------------------- |
| `index.html`    | Home — intro, phone numbers, service overview, how we work, FAQ  |
| `about.html`    | About Us — story, values, service area                            |
| `services.html` | Services — all 11 services in detail                              |
| `contact.html`  | Contact — phone numbers, hours, enquiry form, map, social links   |
| `404.html`      | Shown when a visitor hits a wrong address                         |

Supporting files: `assets/css/style.css`, `assets/js/main.js`, `assets/img/`,
`robots.txt`, `sitemap.xml`, `.htaccess`.

---

## Before you go live — things to fill in

These are the only placeholders in the site. Everything else is finished.

### 1. Facebook and TikTok links  ← **still guessed**

LinkedIn is now correct. Facebook and TikTok still point at invented addresses and will 404 for
anyone who clicks them. Replace them across all `.html` files:

| Replace this                               | With your real link |
| ------------------------------------------ | ------------------- |
| `https://www.facebook.com/prakriticomputer` | your Facebook page  |
| `https://www.tiktok.com/@prakriticomputer`  | your TikTok account |

In VS Code: `Ctrl+Shift+F` to find, `Ctrl+Shift+H` to replace in all files.

### 2. Shop address and map — done

Address, plus code (J5X4+2X Mechinagar), map and coordinates all come from your Google Business
Profile listing and are live on the site.

### 3. Email — done

The site uses `prakrititechnology@gmail.com` as the primary address, with
`prakriticomputerkvt@gmail.com` also listed on the contact page.

### 4. Facts worth checking

Written as reasonable defaults — correct them if they are wrong:

- The "5,000+ devices repaired" figure has been **removed** — it was invented and there was no
  way to verify it. Add a real number if you have one.
- Years in business is calculated from your opening date (20 Shrawan 2069 BS = 4 August 2012)
  and updates itself each year, so it never goes stale.
- **Opening hours** — Sunday to Friday, 9 AM to 7 PM, Saturday closed. These appear in the hero
  card, the footer of every page, the contact page table, the FAQ, and the structured data.
- **Service descriptions** in `services.html` — reword any that do not match what you offer,
  or delete a whole `<article class="service-block">` block for a service you do not provide.

### 5. WhatsApp — done

The floating green button and the contact page both open a WhatsApp chat with **9824186811**,
with a short greeting pre-filled.

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
<form class="form" id="enquiry-form" data-mailto="prakrititechnology@gmail.com" novalidate>

<!-- to (use the form ID Formspree gives you) -->
<form class="form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Removing `id="enquiry-form"` disables the mailto script and lets Formspree handle the submission.

---

## Logo and images

The brand assets in `assets/img/` are all generated from your round logo
(`Prakriti Computer Round Logo.jpg`):

| File                            | Used for                                              |
| ------------------------------- | ----------------------------------------------------- |
| `logo.png`                      | Header and footer, 512px, circular with transparent corners |
| `favicon-32.png` / `-64.png`    | Browser tab icon                                       |
| `favicon-180.png`               | Icon when someone saves the site to a phone home screen |
| `og-image.png`                  | The preview card shown when the link is shared         |
| `banner.jpg`                    | Shopfront signboard, shown on the home page            |

The corners are transparent because the original JPG is a square with white corners, which would
have shown as a white box against the dark green header. If you ever get a vector (SVG or AI)
version of the logo, that would be sharper still — send it and it can be swapped in.

`banner.jpg` is the signboard artwork, cropped out of the design mockup. The original was a
photo of the sign mounted in a room, with the wall, window and glare around it; the crop keeps
just the sign panel. It appears in the "Look for this sign" section on the home page.

Its wording is used elsewhere too: the tagline "we pick, we fix, we deliver" is in the hero, and
"complete IT related sales and service" informs the copy throughout.

## Editing the design

All colours, spacing and fonts live as variables at the top of `assets/css/style.css`, under
`:root`. The site is green throughout, built from two scales:

```css
/* Deep greens — used by the dark theme and a few solid chips */
--forest-900: #0a2914;
--forest-800: #104121;
--forest-700: #165a2d;
--forest-600: #1d7239;

/* Vivid greens — buttons, links, icons, highlights */
--green-700: #218339;   /* light theme accent */
--green-600: #2a9e45;
--green-500: #34b455;   /* the green from your logo */
--green-400: #5dd07a;   /* dark theme accent  */
```

Keep `--green-700` as the light-theme accent if you change it: lighter greens drop below the
4.5:1 contrast ratio needed for white button text to stay readable. `--green-500` is the green
taken from your logo.

The hero, page headers, CTA strip and footer are called **bands**, and they are controlled by
their own set of tokens so the whole site can be made lighter or darker in one place:

```css
--band:       #f2fbf4;   /* band background, top of the gradient */
--band-2:     #dcf2e3;   /* band background, bottom of the gradient */
--band-text:  #102917;   /* headings on a band */
--band-muted: #47654f;   /* body text on a band */
--topbar-bg:  #218339;   /* the thin green strip above the header */
```

To make the bands deeper green, lower the lightness of `--band` and `--band-2` and switch
`--band-text` to a near-white. The dark theme already does exactly that further down the file.

The site has a light and dark theme; the toggle is the sun/moon button in the header, and the
visitor's choice is remembered in their browser.

---

## Notes

- Works in all current browsers, and on phones down to 320px wide.
- No cookies, no tracking, no analytics — nothing to declare in a privacy policy as it stands.
  If you later add Google Analytics, you should add a short privacy note.
- Fonts (Inter and Sora) load from Google Fonts; everything else is served from your own domain.
- To preview locally, just double-click `index.html`.
