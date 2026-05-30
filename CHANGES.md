# ATS CV Pro – Migration Guide
## From: OpenResume → ATS CV Pro + Razorpay Subscriptions

This document lists **every file you need to change** in your forked repository
(`waseemkhanjdpr1902/open-resume`) to rebrand as **ATS CV Pro** and add
Razorpay subscriptions.

---

## 📦 New Files to Add

| File | Purpose |
|------|---------|
| `src/app/subscription/page.tsx` | Pricing / subscription page with Razorpay |
| `src/app/components/TopNavBar.tsx` | Rebranded nav (replace existing) |

---

## ✏️ Files to Modify

### 1. `src/app/layout.tsx`
Update the `metadata` object:
```ts
export const metadata: Metadata = {
  title: "ATS CV Pro – Smart Resume Builder & ATS Parser",
  description: "ATS CV Pro is a powerful AI-assisted resume builder and ATS parser...",
};
```

### 2. `src/app/components/TopNavBar.tsx` _(replace entirely)_
- Change brand name to **ATS CV Pro**
- Add **Pricing** nav link pointing to `/subscription`
- Add **Get Pro** CTA button

### 3. `src/app/page.tsx` (Home page)
Find and replace every occurrence of:
- `"OpenResume"` → `"ATS CV Pro"`
- `"open-resume"` → `"ats-cv-pro"`
- `"open resume"` → `"ATS CV Pro"`

Key sections to update:
```tsx
// Hero heading – change:
<h1>OpenResume</h1>
// To:
<h1>ATS CV Pro</h1>

// Hero subtext – change description to:
"ATS CV Pro gives you a modern, ATS-optimised resume and lets you test
 your existing CV's readability — completely free."

// Add a "Get Pro" button next to the existing CTA
```

### 4. `public/` – Favicon & OG image
- Replace `public/favicon.ico` with your ATS CV Pro favicon
- Add `public/logo.png` (used by Razorpay checkout modal)

### 5. `package.json`
```json
{
  "name": "ats-cv-pro"
}
```

---

## 🔑 Environment Variables

Add these to **Vercel → Project Settings → Environment Variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_xxxxxxxxxxxx` | Your Razorpay Key ID |

> ⚠️ Use `rzp_test_xxx` during development and `rzp_live_xxx` in production.

---

## 💳 Razorpay Setup (Step-by-Step)

1. **Log in** to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Go to **Subscriptions → Plans → Create Plan**
3. Create two plans:
   - **Pro Monthly** – ₹299/month → copy the Plan ID (e.g., `plan_Abc123`)
   - **Annual Pro** – ₹2,499/year → copy the Plan ID (e.g., `plan_Xyz456`)
4. Paste those IDs into `src/app/subscription/page.tsx`:
   ```ts
   planId: "plan_Abc123",   // Pro monthly
   planId: "plan_Xyz456",   // Annual
   ```
5. Add your **Razorpay Key ID** to Vercel environment variables.
6. _(Production)_ Create a backend API route `/api/create-subscription` that
   calls Razorpay's Subscriptions API and returns a `subscription_id` to the
   frontend for added security & signature verification.

---

## 🚀 Deployment on Vercel

```bash
# In your local clone of the forked repo:
git add .
git commit -m "rebrand: OpenResume → ATS CV Pro + Razorpay subscriptions"
git push origin main
```

Vercel will auto-deploy on push. Make sure your env var is set in the Vercel
dashboard before deploying to production.

---

## 📁 Quick File Checklist

- [ ] `src/app/layout.tsx` – update metadata title & description
- [ ] `src/app/components/TopNavBar.tsx` – replace with ATS CV Pro nav
- [ ] `src/app/subscription/page.tsx` – add new file (Razorpay plans page)
- [ ] `src/app/page.tsx` – replace all "OpenResume" text with "ATS CV Pro"
- [ ] `package.json` – update `name` field
- [ ] `public/favicon.ico` – replace with your icon
- [ ] `public/logo.png` – add your logo
- [ ] Vercel env vars – add `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- [ ] Razorpay dashboard – create Pro & Annual plans, copy plan IDs
- [ ] `src/app/subscription/page.tsx` – paste your Razorpay plan IDs
