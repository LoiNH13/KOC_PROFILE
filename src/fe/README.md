# KOC Profile

Website KOC cá nhân, bilingual VI/EN, Clay Pop design.

---

## Chạy project lần đầu (step by step)

### Bước 1 — Clone & cài dependencies

```bash
git clone <repo-url>
cd ln/src/fe
npm install
```

### Bước 2 — Tạo file `.env.local`

```bash
cp .env.local.example .env.local
```

Mở `.env.local` và điền 4 giá trị:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_SHEETS_ID=15Egfr7kjHfjbCssTnMnDuJSexcV6hVtZKkW3d-jksTc
VITE_SHEETS_API_KEY=AIzaSy...
```

| Biến | Lấy ở đâu |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key |
| `VITE_SHEETS_ID` | URL Google Sheet: `spreadsheets/d/**{ID}**/edit` |
| `VITE_SHEETS_API_KEY` | Google Cloud Console → APIs & Services → Credentials → API Key (loại Browser key) |

### Bước 3 — Chạy dev server

```bash
npm run dev
# → http://localhost:5173
```

### Bước 4 — Build production

```bash
npm run build       # output: dist/
npm run preview     # preview bản build tại http://localhost:4173
```

> **Toàn bộ nội dung hiển thị đến từ Google Sheets.** Không có mock data.
> Nếu một tab Sheet trống / chưa tạo → section tương ứng tự **ẩn** (không hiện placeholder text).

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

## Google Sheets — Cấu trúc 14 tab

> Quan trọng: Dòng 1 là **header**, không xóa, không sửa tên cột. Tên tab phải khớp **chính xác**.
> `tone` luôn là một trong: `pink / mint / butter / lilac / peach / sky`.

### Đã có sẵn (theo bản README cũ)

#### Tab `koc_profile` — 1 dòng data, không thêm dòng khác
| `name` | `handle` | `tagline_vi` | `tagline_en` | `bio_vi` | `bio_en` | `location` | `email` | `phone` |

#### Tab `stats`
| `label_vi` | `label_en` | `value` | `sub_vi` | `sub_en` |

#### Tab `portfolio_items`
| `id` | `brand` | `niche` | `tone` | `duration` | `views` | `likes` | `title_vi` | `title_en` | `platform` | `date` | `format_vi` | `format_en` |

#### Tab `packages`
| `id` | `name_vi` | `name_en` | `tagline_vi` | `tagline_en` | `price_vi` | `price_en` | `tone` | `featured` | `deliverables_vi` | `deliverables_en` |
> `deliverables_*` dùng `|` để phân cách: `Item 1|Item 2|Item 3`. `featured` = `true` / `false`.

#### Tab `testimonials`
| `brand` | `person` | `role_vi` | `role_en` | `quote_vi` | `quote_en` | `tone` |

#### Tab `faqs`
| `q_vi` | `q_en` | `a_vi` | `a_en` |

#### Tab `featured_products`
| `id` | `brand` | `name_vi` | `name_en` | `niche_vi` | `niche_en` | `rating` | `price` | `tone` | `tag_vi` | `tag_en` |

---

### Sheet còn THIẾU — cần tạo thêm

> Hiện 7 section/page sẽ tự **ẩn** nếu các tab dưới chưa tồn tại. Tạo tab với cấu trúc bên dưới để bật.

#### Tab `niches` — Ngách nội dung (Hero, Niches grid, Media Kit)
| `label_vi` | `label_en` | `emoji` |
|---|---|---|
| Thời trang | Fashion | 👗 |
| Mỹ phẩm | Beauty | 💄 |

#### Tab `videos` — Video viral tuần này (section Videos)
| `id` | `title_vi` | `title_en` | `views` | `likes` | `duration` | `tone` |
|---|---|---|---|---|---|---|
| v1 | Tiêu đề VI | EN title | 12K | 950 | 0:55 | pink |

#### Tab `trending` — Hot topics (section Trending)
| `id` | `title_vi` | `title_en` | `niche` | `engagement` |
|---|---|---|---|---|
| t1 | 3 kem chống nắng dưới 300k | 3 sunscreens under 300k | Beauty | 11.4% |

#### Tab `brands` — Brand wall marquee
| `name` |
|---|
| Hermosa |
| Lumi |

#### Tab `story` — Timeline hành trình (About section)
| `year_vi` | `year_en` | `title_vi` | `title_en` | `desc_vi` | `desc_en` |
|---|---|---|---|---|---|
| 2025 Q1 | 2025 Q1 | Video đầu tiên | First video | Quay video đầu... | First video... |
| Hôm nay | Today | Sẵn sàng đồng hành | Ready to collaborate | ... | ... |

#### Tab `process` — Quy trình hợp tác (Process section)
| `step` | `title_vi` | `title_en` | `desc_vi` | `desc_en` | `time` |
|---|---|---|---|---|---|
| 01 | Brief & Align | Brief & Align | Call 20 phút... | 20-min call... | 1 day |

#### Tab `audience` — Demographics (Media Kit + MediaKitPage)

Dùng schema **dẹt** với cột `kind` để phân biệt loại dòng:

| `kind` | `label_vi` | `label_en` | `pct` | `value` | `growth` | `color` |
|---|---|---|---|---|---|---|
| age | 18-24 |  | 52 |  |  |  |
| age | 25-34 |  | 34 |  |  |  |
| gender | Nữ | Female | 82 |  |  | var(--color-clay-pink) |
| gender | Nam | Male | 15 |  |  | var(--color-clay-sky) |
| city | Hà Nội | Hà Nội | 44 |  |  |  |
| city | Khác | Other | 19 |  |  |  |
| platform | TikTok |  |  | 3.8K | +32% |  |
| platform | Instagram |  |  | 1.2K | +28% |  |

> `kind` ∈ `age | gender | city | platform`. Cột không dùng để trống.
> `color` cho gender chấp nhận CSS var hoặc hex.

---

## Architecture

```
src/
├── data/koc-data.ts        # Empty defaults (tất cả Sheets-driven)
├── lib/
│   ├── sheets.ts           # Google Sheets API fetchers + row mappers
│   └── supabase.ts         # Supabase client singleton
├── hooks/
│   ├── useSheetData.ts     # Stale-while-revalidate cache hook (15min TTL)
│   ├── useFormSubmit.ts    # Generic Supabase insert hook
│   ├── useKocData.tsx      # Sheets-backed KOC profile context
│   └── useLang.ts          # VI/EN language context
├── pages/                  # 6 pages: Landing, About, Portfolio, Booking, Contact, MediaKit
└── components/
    ├── sections/           # 15 landing page sections (mỗi section tự ẩn nếu sheet trống)
    ├── layout/             # Nav (mobile menu), PageHero, PageFooter
    ├── primitives/         # ClayCard, Blob, PhotoPlaceholder (ImgSlot style)…
    └── ui/                 # Button, Input, Accordion…
```

**Cập nhật content:**
- Mở app lần đầu sau khi sửa Sheet: **ngay lập tức**
- Đã mở app rồi: tối đa **15 phút** (cache hết hạn) hoặc **Ctrl+Shift+R**
