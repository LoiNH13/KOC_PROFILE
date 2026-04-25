# Bio / KOC Profile — Changelog for Claude Code handoff

Mục đích: để Claude Code biết **chính xác những gì đã thay đổi** mà không phải làm lại từ đầu. Đưa file này vào context khi bạn paste-back sang codebase Claude Code.

---

## 📂 File structure

```
landing-page.html                    ← entry point (canvas + router)
design-canvas.jsx                    ← starter (pan/zoom canvas)
components/
  tokens.jsx                         ← TOKENS_B (Clay Pop palette)
  data.jsx                           ← KOC mock data (small-tier: 3.8K followers)
  primitives.jsx                     ← PhotoPlaceholder, Pill, Stars, SocialIcon, Counter, Marquee, CursorGlow
  variation-b.jsx                    ← Landing page (hero, stats, niches, products, videos, trending, brands, booking, newsletter, footer, + ClayCard/Sparkle/Blob)
  variation-b-extras.jsx             ← Landing extras (About, Packages, Testimonials, Process, MediaKit, FAQ)
  pages.jsx                          ← PageNav, PageHero, PageFooter (shared across non-landing pages)
  page-about.jsx                     ← /about
  page-portfolio.jsx                 ← /portfolio (12 video items, filter by niche)
  page-booking.jsx                   ← /booking (3-step form)
  page-contact.jsx                   ← /contact (channels + hours + quick form + mini FAQ)
```

---

## 🔑 Contracts (quan trọng khi Claude Code migrate)

1. **Single-file React prototype, không có build step.** Mỗi `.jsx` = 1 `<script type="text/babel">`. Mỗi file tự `Object.assign(window, { ... })` để share component.
2. **Style: inline `style={{}}` + tokens object `t` (TOKENS_B)**. KHÔNG dùng Tailwind/CSS modules. Khi migrate sang Next.js/Tailwind → map `t.pink` → theme token, `style={{}}` → className.
3. **Responsive: media queries trong `<style>` global của `landing-page.html`** (không dùng CSS-in-JS matchMedia). ClassName pattern: `.rg-2/1`, `.rg-3/2`, `.r-hero-h1`, `.r-pad-48`, v.v. → mobile-first migrate: copy media queries sang `globals.css` hoặc Tailwind breakpoints.
4. **Routing: state-based trong `PageRouter`** (không dùng react-router). `onNavigate(page)` prop xuống tất cả PageNav/Footer/CTA. Khi migrate → thay bằng `next/link` hoặc `<Link>` router.
5. **i18n: prop `lang` ('vi' | 'en')** truyền xuống mọi component. Mọi object data có shape `{ vi: '...', en: '...' }`. Migrate → dùng `next-intl` hoặc `react-i18next`, map keys từ `data.jsx`.
6. **Data source:** tất cả mock trong `components/data.jsx`. Khi wire API → thay `KOC_DATA/STATS/NICHES/FEATURED_PRODUCTS/VIDEOS/TRENDING/BRANDS/STORY/PACKAGES/TESTIMONIALS/PROCESS/AUDIENCE/FAQS` bằng fetched data, giữ nguyên shape.

---

## 📋 Changelog

### v3 — 3D polish & completeness (HIỆN TẠI)

**Thêm:**
- **Tilt 3D** trên ProductCard, PortfolioCard, PackageCard, TestimonialCard — mouse-move → `transform: perspective(1000px) rotateX/rotateY` (max ±6°). Parent cần `transform-style: preserve-3d`.
- **Parallax hero** trên landing: Blob backgrounds + Sparkles di chuyển theo scrollY với hệ số khác nhau (0.15 / 0.3 / 0.5) → depth feel.
- **Card lift + inner glow trên hover:** shadow deepen, highlight edge sáng lên (inset highlight).
- **Sticky scroll progress bar** bên dưới nav (8px height, fill gradient pink→butter).
- **Count-up numbers** đã có sẵn từ v1 (Counter primitive).
- **Micro-interactions:** button press (translateY 2px + shadow squish), nav link slide-in underline, package card "featured" floats 4px cao hơn.

**KHÔNG thêm** (tránh slop):
- Không add particle background, animated gradients chạy nền, 3D blob morph — giữ clean.
- Không add video backgrounds, Lottie.
- Không thêm section mới — chỉ polish existing.

**Files changed in v3:**
- `components/variation-b.jsx` — hero parallax, product card tilt
- `components/variation-b-extras.jsx` — testimonial/package card tilt
- `components/page-portfolio.jsx` — portfolio card tilt
- `landing-page.html` — scroll progress bar, tilt helper CSS

---

### v2 — Responsive + routing + scope resize (trước đó)

**Breaking changes so với v1:**
- ❌ Xóa `components/variation-a.jsx` (Soft Clean bỏ hoàn toàn)
- ✅ Giữ chỉ Variation B (Clay Pop) làm design chính thức
- ➕ Thêm 4 page: About, Portfolio, Booking, Contact (`components/page-*.jsx`)
- 🔄 `VB_Nav` thêm prop `onNavigate` → trở thành shared nav component thật sự
- 🔄 `VariationB` thêm prop `onNavigate` để forward xuống nav
- ➕ `PageRouter` component trong `landing-page.html` làm state-based routing (`landing|about|portfolio|booking|contact`)

**Data rescope (scale xuống KOC nhỏ):**
| Field | v1 | v2 |
|---|---|---|
| Followers | 842K | 3.8K |
| Views/month | 12.4M | 48K |
| Engagement | 8.7% | 9.2% |
| Brand partners | 120+ | 6 |
| Timeline start | 2022 | 2025 Q1 |
| Packages | Gifting/Campaign 8-25tr | Gifting free-product / Campaign từ 2.5tr / Long-term 3 tháng |

**Responsive (v2):**
- Thêm media queries global trong `landing-page.html` (@1024px tablet, @640px mobile).
- Retrofit className `.rg-2/1`, `.rg-3/2`, `.rg-4/2`, `.rg-3/1`, `.rg-5-2`, `.rg-6-3`, `.rg-2/1-sm`, `.rg-4/2-sm` vào 15+ grids qua các page.
- Typography class: `.r-hero-h1` (72→64→44), `.r-h1` (44→52→36), `.r-h2` (52→38→28), `.r-sub`.
- Layout: `.r-pad-48` (48→28→16), `.r-pad-v-80`, `.r-nav` (stack dọc ở mobile), `.r-nav-links` (wrap), `.r-nav-cta` (full-width), `.r-portrait-stack` (collapse rotation).

---

### v1 — Base Clay Pop landing (gốc)

- 2 variation A/B trong canvas
- Single-page landing với tất cả sections trong variation-b
- Hardcoded numbers cho KOC tier lớn (842K followers)
- No routing, no mobile responsive

---

## 🚀 Hướng dẫn Claude Code migrate update (paste vào Claude Code)

> "Đây là prototype **v4** mới nhất của KOC profile. Bạn đã implement v1/v2/v3 rồi. Đọc `CHANGELOG.md` → chỉ migrate section **v4 — Dark mode · Avatar · Motion · Media Kit · SEO** vào codebase hiện tại. Sau đó thực hiện 3 task handoff **I / J / K** trong section 'Handoff: tasks còn lại cho Claude Code'. KHÔNG chạm các file/component khác."

---

## ⚠️ Gotchas

1. **Style object naming:** mỗi file có inline styles — KHÔNG tạo const tên `styles` chung → dùng inline hoặc named per-component (`productCardStyles`).
2. **iOS Safari backdrop-filter:** nav dùng `backdropFilter: 'blur(16px)'` — ở iOS < 14 sẽ fallback opaque.
3. **`<CursorGlow>` dùng mouse events** → disable trên mobile nếu cần (đã dùng `pointer-events: none`, không ảnh hưởng UX).
4. **Tilt 3D performance:** dùng `will-change: transform` trên card gốc để GPU-accelerate. Không apply hơn 20 card cùng lúc.
5. **Data shape đa ngôn ngữ:** một số field như `STORY[i].year` có thể là string HOẶC `{vi, en}` — check `typeof === 'object'` khi render.
