# Mobile Responsive Design

_Started 2026-04-21 07:21 UTC_

---

## User

khách hàng của tôi là 1 KOC
hiện tại cần làm profile cho họ. trên profile sẽ gắn các sản phẩm mới, trend,  ... review này nọ
bạn hãy cho tôi ý tưởng thực hiện
và đề xuất cho tốt hơn. tôi muốn màu sáng, hiệu ứng 3d
cần thể hiện sự chuyên nghiệp
tôi cần làm landing page.
không rõ gì hỏi lại tôi.
chú ý cần chia component hợp lý. các layout placehoder

## Assistant

Chào bạn! Mình hiểu rồi — bạn cần một **landing page profile cho KOC** (Key Opinion Consumer) với tông sáng, hiệu ứng 3D, chuyên nghiệp, để showcase sản phẩm review, trend, v.v.

Trước khi bắt tay vào làm, mình cần hỏi thêm vài câu để design ra đúng ý bạn nhất. Đây là những điểm còn chưa rõ:

_[tool: questions_v2]_

## User

cho chọn nhiều option mỗi câu hỏi

## Assistant

Ok, mình sẽ cho phép chọn nhiều option ở những câu hỏi phù hợp (trừ những câu bản chất phải chọn 1 như ngôn ngữ, số variations, ưu tiên thiết bị).

_[tool: questions_v2]_

## User

Questions answered:
- koc_niche: Fashion / Thời trang, Beauty / Mỹ phẩm, Food / Ẩm thực, Fitness / Sức khỏe, Lifestyle / Đa ngành, Mom & Baby
- gender_tone: Trẻ trung, Gen-Z (playful, colorful), Nữ tính, ngọt ngào (pastel, soft), Decide for me
- color_direction: Decide for me, Pastel (hồng phấn, xanh mint, vàng nhạt)
- 3d_style: Decide for me
- sections: Hero (ảnh + tên + bio ngắn), Brand đã hợp tác (logo wall), Sản phẩm mới / Featured products, Trending / Hot reviews, Video reviews (TikTok/Reels embed), Newsletter / Follow social, Stats / Số liệu (followers, engagement, reach), Lịch booking / Liên hệ hợp tác
- product_display: Decide for me
- interactions: Cursor follow effect
- variations: 2 hướng (1 an toàn, 1 sáng tạo)
- device_priority: Cả hai — responsive
- language: Cả hai (song ngữ)

## Assistant

Tuyệt, mình đã có đủ thông tin. Tóm tắt hướng đi:

**Art direction:**
- KOC đa ngành (Fashion, Beauty, Food, Fitness, Lifestyle, Mom & Baby) → profile phải linh hoạt, không quá "niche-specific"
- Tông: trẻ trung Gen-Z + nữ tính ngọt ngào → pastel playful
- Màu: pastel (hồng phấn + mint + vàng nhạt) trên nền cream/ivory
- 3D style: mix **claymorphism** (khối bo tròn mềm, shadow mềm) + **floating shapes** (blob, sparkle nổi) — hợp gu Gen-Z + nữ tính
- 2 variations: **Variation A** (Safe — pastel clean, professional) / **Variation B** (Bold — claymorphism 3D colorful, playful hơn)

**Sections:** Hero → Stats → Featured Products → Trending Reviews → Video Reviews → Brand Wall → Booking → Newsletter

Mình sẽ dùng design_canvas để đặt 2 variations side-by-side, responsive, song ngữ VI/EN. Cursor follow effect ở cả 2.

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: snip]_

Bắt đầu build. Tạo cấu trúc thư mục + shared components trước.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Giờ build shared UI primitives + variation A.

_[tool: write_file]_

_[tool: snip]_

Now building Variation A (Soft Clean) landing page.

_[tool: write_file]_

_[tool: snip]_

Now building Variation B (Clay Pop — bold claymorphism 3D).

_[tool: write_file]_

_[tool: snip]_

Building the main HTML entry file now.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Đã xong 2 hướng landing page, đặt cạnh nhau trong canvas:

**A · Soft Clean** — pastel minimal, nhiều whitespace, typography Fraunces làm chủ đạo, 3D nhẹ qua floating cards + shadow mềm. Tông chuyên nghiệp, phù hợp brand cao cấp.

**B · Clay Pop** — claymorphism đậm (inner highlight + drop shadow 3D), rotation nhẹ, blob animation, sparkle, bento grid. Gen-Z playful, bắt mắt, energetic.

Cả hai đều:
- Responsive-ready, song ngữ VI/EN (toggle góc phải trên)
- Cursor follow glow
- Animated counter cho stats
- Filter products theo ngách
- Marquee brand wall
- Sections: Hero · Stats · Niches · Products · Videos · Trending · Brands · Booking · Footer (B có thêm Newsletter)

**Gợi ý bước tiếp theo:**
- Cho mình biết thích hướng nào → mình refine sâu hơn (ảnh thật, animations scroll-triggered, 3D tilt cards...)
- Có thể mix: ví dụ lấy Hero của B + Products grid của A
- Cần thêm section nào (About story, FAQ, Media kit downloadable)?

## User

chọn cái 2. bỏ header này

## Assistant

_[tool: snip]_

_[tool: view_image]_

Bạn muốn: giữ lại Variation B, xóa tiêu đề "Sáu ngách, một giọng nói" + badge "🎯 CHUYÊN MÔN" ở section VB_Niches.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Đã xóa header "Sáu ngách, một giọng nói" ở Variation B. Grid 6 ô ngách vẫn giữ nguyên, chỉ bỏ phần title + badge phía trên.

## User

tiếp tục làm sâu thêm. các nội dung còn lại. 
không cần quan tâm Variation  A nữa

## Assistant

_[tool: snip]_

_[tool: read_file]_

Mình sẽ đào sâu các section còn lại của Variation B: thêm About/Story section, Testimonials từ brand, Process/Services, Media kit stats chi tiết hơn, FAQ. Cũng sẽ làm phong phú các section hiện có.

_[tool: snip]_

_[tool: read_file]_

_[tool: read_file]_

Mình sẽ (1) thêm data cho các section mới, (2) tạo file variation-b-extras.jsx chứa các section: About/Story, Services/Packages, Testimonials, Process, Media Kit, FAQ, và (3) enrich các section đang có.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Đã bổ sung xong các section chiều sâu cho Variation B:

**Mới thêm:**
- **About / Story** — timeline hành trình 2022 → 2026 với milestone từng năm, cộng 4 stat cards nhỏ
- **Testimonials** — 3 lời chứng thực từ brand (Hermosa, Bowl & Co., Lumi) với avatar, role, rating tổng 4.9/5
- **Media Kit** — phân tích audience chi tiết: 4 platforms (TikTok/IG/YT/FB), bar chart độ tuổi, donut chart giới tính, top 4 thành phố
- **Packages** — 3 gói (Gifting / Campaign / Ambassador), gói giữa featured với badge "phổ biến", checklist deliverables, giá tham khảo
- **Process** — 5 bước từ brief → report với thời gian cụ thể, mũi tên nối
- **FAQ** — accordion 6 câu (response time, ngành nhạy cảm, exclusivity, usage rights, hợp đồng/VAT, pre-launch)

**Thứ tự mới:** Hero → Stats → Niches → About → Products → Videos → Trending → Testimonials → Media Kit → Packages → Process → Brands → FAQ → Booking → Newsletter → Footer.

Tất cả giữ đúng style Clay Pop: rotation nhẹ, clay shadow, pastel palette, bilingual VI/EN, cursor glow. Artboard height đã tăng lên 6800px để vừa toàn bộ.

## User

KOC nhỏ, mới bắt đầu context hiện tại là vậy
xóa cái Variation  A.
thêm các page khác

## Assistant

_[tool: snip]_

_[tool: list_files]_

Ok, mình hiểu context mới: KOC nhỏ mới bắt đầu. Cần:
1. Xóa Variation A
2. Điều chỉnh data cho phù hợp KOC mới (giảm số liệu, số brand)
3. Thêm các page khác (ngoài landing) — thường KOC profile có: About, Portfolio/Reviews chi tiết, Contact/Booking standalone

Trước khi code, mình hỏi rõ để không làm lệch:

_[tool: questions_v2]_

## User

Questions timed out; go with defaults

## Assistant

<different_variant_snip>

_[tool: snip]_

Sẽ tiến hành với defaults: KOC nhỏ mới bắt đầu, thêm About + Portfolio + Booking + Contact pages, nav sticky, giữ placeholder + giảm số liệu.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: list_files]_

Let me check the existing structure first before refactoring.

_[tool: read_file]_

_[tool: read_file]_

Now I have the full picture. Let me plan: remove Variation A, scale down data for a small new KOC, and add extra pages (About, Portfolio, Booking, Contact). I'll use a multi-page setup where each page is a separate artboard, navigable via sticky nav in each page.

_[tool: update_todos]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

I need to keep this focused. Let me snip older messages and then build a multi-page app with a sticky nav that swaps between pages (Landing, About, Portfolio, Booking, Contact) inside a single artboard, removing Variation A.

_[tool: snip]_

Now let me look at the existing ClayCard patterns more, then build new pages. Let me check variation-b more for reusable patterns and figure out height:

_[tool: grep]_

_[tool: grep]_

Good. Now let me check the current variation-b structure (which sections it uses) and the full nav component to build consistent additional pages:

_[tool: grep]_

_[tool: grep]_

Hmm, grep is picky. Let me read the end of variation-b:

_[tool: read_file]_

Good. Now I have full context. My plan:

1. **Landing page** — keep the existing VB sections as-is
2. **Additional pages** — build 4 standalone pages: About, Portfolio, Booking, Contact
3. **Nav update** — make VB_Nav accept `page`/`onNavigate`, links switch pages
4. **Canvas** — 5 artboards stacked (Landing, About, Portfolio, Booking, Contact), but also each page has internal nav so you can click through within a fullscreen focus

Let me build the new pages file:

_[tool: write_file]_

Now build About page:

_[tool: write_file]_

Now the Portfolio page:

_[tool: write_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: write_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: write_file]_

<different_variant_snip>

_[tool: snip]_

Now I need to update the landing page's VB_Nav so its links route to other pages, and rewrite the main App to handle page routing. Let me update variation-b's nav to accept navigation props:

_[tool: read_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

Now I need to also update VB_Booking and VB_Newsletter buttons if they have "Book now" CTAs that should navigate. Let me search:

_[tool: grep]_

<different_variant_snip>

_[tool: grep]_

Fine, those CTAs don't need wiring. Now let me remove variation-a and rewrite the canvas + landing-page.html:

_[tool: delete_file]_

_[tool: write_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: done]_

<different_variant_snip>

_[tool: update_todos]_

_[tool: fork_verifier_agent]_

Đã xong theo context mới (KOC nhỏ, mới bắt đầu):

**Thay đổi chính:**
- ❌ Xóa Variation A (Soft Clean)
- 📉 Scale lại toàn bộ số liệu: 3.8K followers · 48K views/tháng · 6 brand (thay vì 842K · 12.4M · 120+)
- 📅 Timeline viết lại: Q1 2025 (video đầu) → Q3 2025 (1K) → Q1 2026 (3.8K + đa ngách)
- 💰 Packages chỉnh lại cho tier nhỏ: Gifting (miễn phí/sản phẩm) · Campaign (từ 2.5tr) · Long-term 3 tháng
- 💬 Testimonials đổi tone thực tế hơn (không còn "sold out 4 ngày" / "3x ROAS")

**4 page mới thêm:**
- **02 · About** — portrait stack 3 ảnh, 4 nguyên tắc làm việc, behind-the-scenes setup (iPhone 14, ring light, phòng 8m²)
- **03 · Portfolio** — 12 video có filter theo ngách (All/Beauty/Fashion/Food/Fitness/Lifestyle), stats tổng
- **04 · Booking** — form 3 bước (Bạn là ai? → Hình dung hợp tác → Kể mình nghe) + sidebar cam kết 24h
- **05 · Contact** — 4 kênh liên hệ, lịch làm việc, quick form + FAQ 4 câu

**Nav thống nhất:** sticky pill nav trên mọi page với 5 link (Home · About · Portfolio · Booking · Contact). Click logo về landing, nút "Book ngay" về booking. Trong fullscreen focus mode (nhấn Esc để thoát), nav hoạt động như SPA router thật sự.

## User

A background task has completed. Here are the results:

## Assistant

<different_variant_snip>

_[tool: snip]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: done]_

<different_variant_snip>

_[tool: fork_verifier_agent]_

Đã fix lỗi render (STORY có item `year` kiểu object gây crash). Giờ page chạy clean.

## User

A background task has completed. Here are the results:

## Assistant

## User

Save this design as a PDF: landing-page.html

## Assistant

## User

Send this design to Canva: landing-page.html

## Assistant

## User

tiếp tục, và làm responsive cho mobile nữa

## Assistant

_[tool: snip]_

<different_variant_snip>

_[tool: list_files]_

<different_variant_snip>

My approach for responsive: add a single shared CSS block (media queries @ 768px) into landing-page.html that targets specific classNames, and retrofit the key grids/padding in each page with those classNames. Less invasive than touching every inline style. Let me do this.

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

Now let me add those responsive classNames to the page components. I'll batch-edit the critical grids and typography.

_[tool: grep]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

Now let me also add responsive to the landing page (variation-b) hero and key grids. Let me check which grids in variation-b need to collapse:

_[tool: grep]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Đã xong responsive cho mobile & tablet. Các thay đổi chính:

**Breakpoints:**
- **Tablet (< 1024px):** grid 3/4/5/6 cột → 2 cột, 2 cột (2-col hero) → 1 cột, h1 72px → 64px, padding 48px → 28px
- **Mobile (< 640px):** tất cả grid → 1 cột (trừ stats 4-col giữ 2-col), nav stack dọc + wrap links, h1 → 44px, padding → 16px, portrait stack collapse reset-transform

**Áp dụng ở mọi page:** Landing (hero, stats, niches 6-col, products bento, videos, trending, packages, testimonials, process 5-step, audience, CTA), About (portrait stack, values 4-col, BTS), Portfolio (3-col grid), Booking (form + sidebar 1.6/1), Contact (4 channels, hours, quick form).

Test responsive bằng cách: click artboard vào fullscreen focus (Esc thoát), rồi resize browser hoặc dùng DevTools mobile view.

## User

thêm hiệu ứng 3d phù hợp, nếu không cần thì không thêm
làm nó hoàn thiện hơn.
chú ghi chú thêm các điểm cần lưu ý so với version trước.
vì tôi đã dùng claude code làm 1 webui rồi, giờ update thì làm sao để claude code biết mà không phải claude code làm lại từ đầu

## Assistant

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

I'll add tasteful 3D polish (tilt on cards, parallax on hero, subtle depth) and create a detailed changelog for Claude Code handoff.

_[tool: write_file]_

_[tool: read_file]_

_[tool: snip]_

_[tool: read_file]_

_[tool: snip]_

Now let me add 3D tilt helper + scroll progress bar to landing-page.html, then apply tilt to product/portfolio/package/testimonial cards and parallax to the hero.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: grep]_

<different_variant_snip>

_[tool: read_file]_

_[tool: read_file]_

<different_variant_snip>

_[tool: snip]_

<different_variant_snip>

Now let me add tilt + parallax. I'll add data-tilt to product cards and parallax to hero blobs/sparkles:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: read_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: read_file]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

<different_variant_snip>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<different_variant_snip>

Now let me also add a scroll progress bar in variation-b and ensure the design-canvas scroll-container is accessible. Let me check the artboard scroll structure:

_[tool: snip]_

_[tool: grep]_

<different_variant_snip>

Good — artboards use overflow hidden, and the hero parallax listens to `window.scrollY` as fallback. The scroll progress bar is tricky in canvas mode. Let me verify the build works first and skip the scroll progress bar since it doesn't fit the artboard model well. Let me finalize.

_[tool: snip]_

_[tool: done]_

<different_variant_snip>

_[tool: snip]_

_[tool: fork_verifier_agent]_

Đã xong v3 — 3D polish + CHANGELOG handoff.

## ✨ 3D đã thêm (tasteful, không slop)

- **Tilt 3D trên card** — chuột di qua → card nghiêng theo (perspective 1200px, max ±6°). Áp dụng: Product cards (landing), Story timeline (About), Package cards, Testimonial cards, Portfolio cards, Portfolio stats. Implement qua attribute `[data-tilt]` + global mousemove handler trong `landing-page.html` → dễ bật/tắt.
- **Parallax hero** — Blob backgrounds & Sparkles di chuyển theo scroll với các hệ số khác nhau (0.08 / 0.15 / 0.25 / 0.3 / 0.5 / -0.2) tạo cảm giác chiều sâu.
- **Package "featured" float** — gói Campaign giờ float lên 8px thay vì scale(1.04) → nhẹ nhàng, chuyên nghiệp hơn.

**KHÔNG thêm** (đã cân nhắc): animated gradient bg, particle, Lottie, 3D blob morph — dễ thành slop, hại chuyên nghiệp.

## 📋 CHANGELOG.md cho Claude Code

Đã tạo `CHANGELOG.md` ở root. Nó có:
1. **File structure** — danh sách file + vai trò
2. **Contracts** — 6 ràng buộc migration quan trọng (inline style, lang prop, data shape, routing, i18n, responsive)
3. **Changelog v1 → v2 → v3** — chi tiết breaking changes, data rescope, files changed
4. **Prompt sẵn** để paste vào Claude Code:
   > "Đây là prototype v3 mới nhất. Đọc CHANGELOG.md → chỉ migrate phần **v3** vào codebase hiện tại. KHÔNG chạm file khác."
5. **Gotchas** — 5 cạm bẫy khi migrate

## 🚀 Flow làm việc với Claude Code

1. Trong Claude Code: bảo nó đọc `CHANGELOG.md` trước
2. Nó diff `Files changed in v3` với codebase của nó
3. Chỉ apply patch 3D (tilt handler global + `data-tilt` attributes + parallax hook trong hero)
4. Lần sau bạn update tiếp, mình sẽ thêm section **v4** vào changelog theo cùng format

## User

Verifier agent check completed

## Assistant

Đúng, verifier thấy vấn đề thật. Fix 3 issue:

_[tool: read_file]_

<different_variant_snip>

_[tool: read_file]_

<different_variant_snip>

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now fix the sparkle parallax/spin collision by wrapping sparkles in a parallax parent while letting the child animate its own spin:

_[tool: str_replace_edit]_

Now fix nav wrapping for "Về mình":

_[tool: read_file]_

<different_variant_snip>

_[tool: str_replace_edit]_

Check the shared PageNav (used on about/portfolio/booking/contact) — needs same fix:

_[tool: grep]_

<different_variant_snip>

_[tool: str_replace_edit]_

_[tool: done]_

<different_variant_snip>

_[tool: fork_verifier_agent]_

Đã fix 3 issue:

1. **Hero stickers** giờ đọc từ `STATS` data → "từ 6 brand" và "48K views / Tháng này" (đúng với data KOC nhỏ).
2. **Sparkle parallax** — wrap 2 lớp: outer `<div>` translate theo scroll, inner `<Sparkle>` spin độc lập. Cũng reposition ra xa cột text (top: 60 → right: 22%, top: 360 → right: 4%, bottom: 80 → left: 6%).
3. **Nav "Về mình" wrap** — giảm padding 16px → 14px và thêm `whiteSpace: nowrap` (cho cả `VB_Nav` trên landing và `PageNav` shared).

Cập nhật CHANGELOG v3 phần hotfix nếu cần khi bạn migrate sang Claude Code.

## User

Verifier agent check completed

## Assistant

Đúng. Giải pháp chuẩn: move sparkles vào bên trong wrapper cột phải (portrait), để chúng không bao giờ lấn sang text.

_[tool: read_file]_

Remove these 3 top-level sparkles, then add them inside the portrait wrapper on the right column.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

<different_variant_snip>

_[tool: fork_verifier_agent]_

Fixed. Sparkles giờ nằm trong wrapper cột phải (cạnh portrait), không còn đè lên text bio. 3 vị trí mới:
- Top-left của portrait (-24/-10)
- Middle-right (280/-28)
- Bottom-right (bottom -16, right 80)

Parallax vẫn giữ nguyên nhưng scope trong cột phải → an toàn ở mọi viewport.

## User

cho tôi các option để làm nó tốt hơn

## Assistant

Dưới đây là các hướng cải thiện theo nhóm, từ dễ đến phức tạp:

---

## 🎨 Visual & UI

**A. Avatar thật / placeholder đẹp hơn**
Hiện tại portrait là gradient trơn. Có thể thêm illustrated avatar style (SVG silhouette + clay frame) hoặc hướng dẫn cách swap ảnh thật vào.

**B. Dark mode toggle**
Thêm Tweak switch Light ↔ Dark — palette Clay Pop tối rất đẹp (deep plum bg, neon accent).

**C. Micro-animations trên scroll**
Fade-in + slide-up khi các section xuất hiện (IntersectionObserver, không cần lib). Hiện chỉ có counter và blob float.

**D. Hero animated text**
Tên "Linh Chi" gõ ra từng chữ (typewriter) hoặc gradient shimmer sweep.

---

## 📄 Content & Pages

**E. Trang Media Kit PDF-ready**
Một page riêng layout 1 trang A4, tối ưu print — brand lấy về gửi cho client. Số liệu, audience, package, logo brands đã hợp tác.

**F. Feed TikTok/IG embed thật**
Thay video placeholder bằng oEmbed hoặc iframe thật từ TikTok/IG public URL.

**G. Trang Blog / Content tips**
3-4 bài ngắn về experience review, tips cho brand — thể hiện expertise.

**H. Booking form có logic thật**
Form hiện chỉ UI. Nối Formspree / EmailJS để nhận email thật khi brand submit.

---

## ⚙️ Kỹ thuật

**I. SEO & Meta tags**
og:image, twitter card, structured data (JSON-LD Person schema) — quan trọng khi share link với brand.

**J. Standalone HTML (offline)**
Bundle toàn bộ thành 1 file HTML duy nhất có thể gửi qua email/Zalo mà không cần host.

**K. Xuất PPTX**
Slide deck media kit 5-6 trang từ data hiện có → gửi thẳng cho brand qua email.

**L. Analytics nhẹ**
Thêm `plausible.io` hoặc Umami (privacy-first) để track ai xem trang, click booking.

---

## 🚀 Growth features

**M. Referral / collab section**
"Brand đã đồng hành" → logo grid có thể click → case study mini.

**N. Testimonial video quotes**
Thay text quote bằng video ngắn 15s từ brand gửi lời chứng thực.

---

**Bạn muốn mình làm ngay option nào?** Hoặc chọn nhiều cái để mình plan theo thứ tự ưu tiên.

## User

đây chỉ là design nên nội dung tôi sẽ bổ sung sau:
lầm thêm: A,B,C,D,E,I,J,K. vì là design bạn có thể mô tả cho claude-code biết và thực hiện

## Assistant

_[tool: update_todos]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: write_file]_

_[tool: write_file]_

Bắt đầu. Plan:

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

<different_variant_snip>

_[tool: str_replace_edit]_

Now add Reveal wrappers around major sections and build the Media Kit page + wire into landing-page.html:

_[tool: read_file]_

<different_variant_snip>

VariationB needs to accept `t` prop so dark mode works. Let me refactor:

_[tool: str_replace_edit]_

<different_variant_snip>

Now build the Media Kit A4 print page, then wire everything:

_[tool: write_file]_

Now wire everything into landing-page.html — add dark mode toggle, new script includes, mediakit nav, SEO tags, print CSS. Let me check the current structure:

_[tool: read_file]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: snip]_

_[tool: snip]_

_[tool: snip]_

_[tool: read_file]_

The about page uses the avatar-style pattern. Let me verify things load and check current CHANGELOG, then update it.

_[tool: read_file]_

_[tool: done]_

Clean load. Now append v4 section with I/J/K handoff instructions:

_[tool: read_file]_

Now replace the v3 handoff paragraph and add v4 section on top:

_[tool: str_replace_edit]_

_[tool: done]_

The v3 marker already changed in edit 2. Fix handoff edit separately:

_[tool: str_replace_edit]_

_[tool: fork_verifier_agent]_

Xong v4. Tóm tắt:

## ✨ Đã thêm vào design

**A · Avatar SVG** — `components/avatar.jsx`. Abstract stylized portrait (silhouette + hair + blush + smile + earrings). Auto-retone theo dark mode. Thay cho box gradient cũ ở hero và media kit.

**B · Dark mode** — toggle 🌙/☀️ ở top-right. Palette `TOKENS_B_DARK` (plum/aubergine base). Persist `localStorage`. Đã thread `t` prop qua mọi page/section.

**C · Scroll reveal** — `<Reveal>` fade-up 24px khi section vào viewport. Wrap 14 section trên landing. Dùng IntersectionObserver, unobserve sau khi trigger.

**D · Hero shimmer** — tên "Linh Chi" có gradient sweep 200% background-size trên `background-clip: text`. 5s loop, subtle.

**E · Media Kit A4 print** — artboard thứ 6 (860×1200), page thật 794×1123px, có nút "🖨️ In / Lưu PDF" → `window.print()` → isolate data-mediakit thành A4 full page, hide chrome.

## 📋 Handoff cho Claude Code (I / J / K)

Đã viết section mới trong `CHANGELOG.md`:

- **I. SEO complete** — og-image 1200×630 cần tạo thật, canonical URL, sitemap/robots, Rich Results test. Meta tags + JSON-LD Person schema đã set sẵn làm template.
- **J. Standalone HTML** — gợi ý dùng `vite-plugin-singlefile`, inline fonts base64, pre-compile JSX, swap dev→prod React. Output 1 file < 2MB gửi qua email.
- **K. Export PPTX** — 6 slide 16:9 từ `data.jsx`, dùng `pptxgenjs` editable mode, font fallback Calibri/Georgia, hex từ TOKENS_B.

Prompt sẵn ở cuối `CHANGELOG.md` — paste vào Claude Code để migrate v4.

