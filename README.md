# NEXLOOM STUDIO

> AI-powered marketing, development & design for small businesses in the US and Latin America.

**Live site:** https://dialdise.github.io/nexloom-studio/

---

## Pages

| Page | URL | Access |
|------|-----|--------|
| Home | `/index.html` | Public |
| Projects | `/portfolio.html` | Public |
| Pricing | `/pricing.html` | Public |
| Contact | `/contact.html` | Public |
| Login | `/login.html` | Public (gate) |
| Dashboard | `/dashboard.html` | Private (password) |

---

## Stack

- Pure HTML + CSS + JS — no framework, no build step
- Shared design system via `nexloom.css` + `nexloom.js`
- Design: Kinetic Brutalism · Space Grotesk · `#DFE104`
- Bilingual: English + Spanish (toggle on every page)
- Auth: sessionStorage password gate for dashboard

---

## Local development

```bash
# Clone
git clone https://github.com/dialdise/nexloom-studio.git
cd nexloom-studio

# Serve locally (pick any)
npx serve .
# or
python3 -m http.server 3000
# then open http://localhost:3000
```

---

## Deployment

Hosted on GitHub Pages from `main` branch root.

To update: edit files → commit → push. GitHub Pages auto-deploys in ~60 seconds.

```bash
git add .
git commit -m "update: description of change"
git push
```

---

## Dashboard password

Default: `nexloom2025`

To change: open `nexloom.js` → find `AUTH_PASS` → update the value → commit + push.

---

## AI Agents

| Agent | Service | Persona |
|-------|---------|---------|
| ARIA | Marketing | Bilingual content, social, email, ads |
| DEVX | Development | Websites, web apps, automations |
| LUMA | Design | Brand identity, UI/UX, visual systems |

Set up each agent as a **Claude Project** with the system prompts from the session.

---

## File structure

```
nexloom-studio/
├── index.html          # Public homepage
├── login.html          # Auth gate
├── dashboard.html      # Private owner dashboard
├── portfolio.html      # Projects / case studies
├── pricing.html        # Pricing + comparison table
├── contact.html        # Lead capture form
├── nexloom.css         # Shared design system
├── nexloom.js          # Shared JS (auth, lang, animations)
├── nexloom_logo.png    # Horizontal logo (1200x600)
├── nexloom_logo_square.png  # Square logo (600x600)
└── .nojekyll           # GitHub Pages fix
```

---

*Built with Claude · Nexloom Studio © 2025*
