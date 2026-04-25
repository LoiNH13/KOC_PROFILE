# KOC Profile — Linh Chi

Website KOC cá nhân, bilingual VI/EN, Clay Pop design.

---

## Dev Setup

```bash
cp .env.local.example .env.local   # điền env vars (xem bên dưới)
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

### Environment Variables (`.env.local`)

| Biến | Lấy ở đâu |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon/public key |
| `VITE_SHEETS_ID` | URL của Google Sheet: `docs.google.com/spreadsheets/d/**{ID}**/edit` |
| `VITE_SHEETS_API_KEY` | Google Cloud Console → APIs & Services → Credentials → API Key |

> Nếu chưa có env vars, app vẫn chạy bình thường với **fallback data** từ `src/data/koc-data.ts`.

---

## Supabase — Tạo tables

Mở **Supabase Dashboard → SQL Editor**, chạy lần lượt:

```sql
-- Booking form
CREATE TABLE booking_submissions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  brand       text NOT NULL,
  contact     text NOT NULL,
  role        text,
  niche       text NOT NULL,
  package_id  text,
  budget      text NOT NULL,
  timeline    text NOT NULL,
  brief       text NOT NULL,
  lang        text NOT NULL DEFAULT 'vi',
  status      text NOT NULL DEFAULT 'new'
);

-- Contact form
CREATE TABLE contact_messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name       text NOT NULL,
  email      text NOT NULL,
  message    text NOT NULL,
  lang       text NOT NULL DEFAULT 'vi',
  status     text NOT NULL DEFAULT 'new'
);

-- Newsletter
CREATE TABLE newsletter_subscribers (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email      text NOT NULL UNIQUE,
  source     text NOT NULL DEFAULT 'landing'
);

-- Row-level security (anon chỉ INSERT, không SELECT)
ALTER TABLE booking_submissions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon insert" ON booking_submissions    FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon insert" ON contact_messages       FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon insert" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
```

---

## Google Sheets — Hướng dẫn cập nhật nội dung

> Dành cho **Linh Chi** — không cần biết code, chỉ cần sửa spreadsheet.

### 1. Tạo Google Sheet

1. Vào [sheets.google.com](https://sheets.google.com) → tạo spreadsheet mới
2. Đặt tên: `linhchi-cms`
3. Tạo **7 sheet tabs** với tên chính xác bên dưới (click dấu `+` góc dưới trái)
4. Share → "Anyone with the link" → **Viewer**

### 2. Cấu trúc từng tab

> **Quan trọng:** Dòng đầu tiên là **header** — không xóa, không sửa tên cột.

---

#### Tab `stats` — Số liệu tổng quan

| `label_vi` | `label_en` | `value` | `sub_vi` | `sub_en` |
|---|---|---|---|---|
| Người theo dõi | Followers | 3.8K | TikTok | TikTok |
| Lượt xem/tháng | Views / month | 48K | Cross-platform | Cross-platform |
| Tỉ lệ tương tác | Engagement rate | 9.2% | Trên trung bình micro | Above micro avg |
| Brand đã hợp tác | Brand partners | 6 | 2025 – 2026 | 2025 – 2026 |

→ **Cập nhật:** Thay đổi cột `value` khi follower/views thay đổi.

---

#### Tab `portfolio_items` — Video trong portfolio

| Cột | Ý nghĩa | Ví dụ |
|---|---|---|
| `id` | Số thứ tự | 1, 2, 3... |
| `brand` | Tên brand | Hermosa |
| `niche` | Ngách (dùng đúng tên) | Beauty / Fashion / Food / Fitness / Lifestyle |
| `tone` | Màu card | pink / mint / butter / lilac / peach / sky |
| `duration` | Thời lượng | 0:47 |
| `views` | Lượt xem | 18.2K |
| `likes` | Lượt thích | 1.4K |
| `title_vi` | Tiêu đề tiếng Việt | 7 ngày dùng serum Lumi |
| `title_en` | Tiêu đề tiếng Anh | 7 days with Lumi serum |
| `platform` | Nền tảng | TikTok / Instagram / YouTube |
| `date` | Ngày đăng | 15/03/2025 |
| `format_vi` | Định dạng VI | Review ngắn |
| `format_en` | Định dạng EN | Short review |

→ **Thêm video mới:** Copy dòng cuối, paste xuống dưới, sửa thông tin.

---

#### Tab `packages` — Gói hợp tác & giá

| Cột | Ý nghĩa | Ví dụ |
|---|---|---|
| `id` | Mã gói | gift / campaign / ambassador |
| `name_vi` | Tên gói VI | Gifting |
| `name_en` | Tên gói EN | Gifting |
| `tagline_vi` | Mô tả ngắn VI | Trải nghiệm sản phẩm |
| `tagline_en` | Mô tả ngắn EN | Product experience |
| `price_vi` | Giá VI | Miễn phí sản phẩm |
| `price_en` | Giá EN | Product only |
| `tone` | Màu card | mint / pink / lilac |
| `featured` | Nổi bật nhất | true / false |
| `deliverables_vi` | Bao gồm VI (dùng `\|` để phân cách) | 1 video TikTok 30–60s\|2 vòng chỉnh sửa\|Analytics report |
| `deliverables_en` | Bao gồm EN | 1 TikTok video 30–60s\|2 revision rounds\|Analytics report |

→ **Cập nhật giá:** Sửa cột `price_vi` / `price_en`.

---

#### Tab `testimonials` — Đánh giá từ brand

| `brand` | `person` | `role_vi` | `role_en` | `quote_vi` | `quote_en` | `tone` |
|---|---|---|---|---|---|---|
| Hermosa | Nguyễn Mai | Marketing Manager | Marketing Manager | "Chi đọc brief..." | "Chi read the brief..." | pink |

---

#### Tab `faqs` — Câu hỏi thường gặp

| `q_vi` | `q_en` | `a_vi` | `a_en` |
|---|---|---|---|
| Bạn nhận gifting không? | Do you accept gifting? | Có, nếu... | Yes, if... |

→ **Thêm câu hỏi mới:** Thêm dòng mới ở cuối.

---

#### Tab `featured_products` — Sản phẩm đang review

| Cột | Ví dụ |
|---|---|
| `id` | p1 |
| `brand` | Hermosa |
| `name_vi` | Son lì Velvet 04 |
| `name_en` | Velvet Matte Lipstick 04 |
| `niche_vi` | Mỹ phẩm |
| `niche_en` | Beauty |
| `rating` | 4.8 |
| `price` | 320.000đ |
| `tone` | pink |
| `tag_vi` | Gifting |
| `tag_en` | Gifting |

---

#### Tab `koc_profile` — Thông tin cá nhân

Chỉ có **1 dòng data** (dòng 2), không thêm dòng khác.

| `name` | `handle` | `tagline_vi` | `tagline_en` | `bio_vi` | `bio_en` | `location` | `email` | `phone` |
|---|---|---|---|---|---|---|---|---|
| Linh Chi | @linhchi.daily | KOC mới... | Emerging KOC... | Mình là... | I'm... | Hà Nội | hello@... | +84... |

---

### 3. Bao lâu thì website cập nhật?

- Mở app lần đầu sau khi sửa Sheet: **ngay lập tức** (fetch mới)
- Nếu đã mở app rồi: tối đa **15 phút** (cache hết hạn)
- Muốn cập nhật ngay: **Ctrl+Shift+R** (hard refresh)

### 4. Lưu ý quan trọng

- ❌ Không xóa **dòng header** (dòng 1)
- ❌ Không thay đổi **tên cột** trong header
- ❌ Không thay đổi **tên tab sheet**
- ✅ Chỉ sửa dòng data (dòng 2 trở đi)
- ✅ Cột `tone` phải là một trong: `pink / mint / butter / lilac / peach / sky / ink`
- ✅ Cột `niche` trong portfolio_items phải khớp với filter: `Beauty / Fashion / Food / Fitness / Lifestyle`

---

## Architecture

```
src/
├── data/koc-data.ts        # Fallback data (dùng khi Sheets chưa config)
├── lib/
│   ├── sheets.ts           # Google Sheets API fetchers + row mappers
│   └── supabase.ts         # Supabase client singleton
├── hooks/
│   ├── useSheetData.ts     # Stale-while-revalidate cache hook (15min TTL)
│   ├── useFormSubmit.ts    # Generic Supabase insert hook
│   └── useLang.ts          # VI/EN language context
├── pages/                  # 5 pages: Landing, About, Portfolio, Booking, Contact
└── components/
    ├── sections/           # 15 landing page sections
    ├── layout/             # Nav, PageHero, PageFooter
    ├── primitives/         # ClayCard, Blob, Counter, ...
    └── ui/                 # Button, Input, Accordion, ...
```

**Data flow:** `useSheetData` → localStorage cache → Google Sheets API → fallback `koc-data.ts`

**Form flow:** `useFormSubmit` → Supabase (anon insert, RLS enforced)
