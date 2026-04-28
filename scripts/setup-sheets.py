"""
Setup / Migrate Google Sheets CMS cho KimNgan KOC Profile.

- Lần đầu: tạo tất cả tabs với dữ liệu mặc định.
- Các lần sau: CHỈ thêm cột mới / row mới — KHÔNG xóa hay ghi đè dữ liệu cũ.

Usage: python scripts/setup-sheets.py
"""
import gspread
import gspread.utils
from google.oauth2.service_account import Credentials

SERVICE_ACCOUNT_FILE = r"c:\Users\loinh\Downloads\gen-lang-client-0268243649-8c85a96d542f.json"
SHEET_ID = "15Egfr7kjHfjbCssTnMnDuJSexcV6hVtZKkW3d-jksTc"

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# ---------------------------------------------------------------------------
# Data
# ---------------------------------------------------------------------------

TABS = {
    "stats": {
        "key": "label_en",
        "headers": ["label_vi", "label_en", "value", "sub_vi", "sub_en"],
        "rows": [
            ["Người theo dõi", "Followers", "3.8K", "TikTok", "TikTok"],
            ["Lượt xem/tháng", "Views / month", "48K", "Cross-platform", "Cross-platform"],
            ["Tỉ lệ tương tác", "Engagement rate", "9.2%", "Trên trung bình micro", "Above micro avg"],
            ["Brand đã hợp tác", "Brand partners", "6", "2025 – 2026", "2025 – 2026"],
        ],
    },
    "portfolio_items": {
        "key": "id",
        "headers": ["id", "brand", "niche", "tone", "duration", "views", "likes", "title_vi", "title_en", "platform", "date", "format_vi", "format_en", "image_url"],
        "rows": [
            [1, "Hermosa",      "Beauty",    "peach",  "0:47", "18.2K", "1.4K", "7 ngày dùng serum Lumi",    "7 days with Lumi serum",      "TikTok",    "15/03/2025", "Review ngắn", "Short review", ""],
            [2, "Minto",        "Fashion",   "mint",   "1:12", "9.6K",  "820",  "OOTD linen mùa thu",        "Autumn linen OOTD",           "TikTok",    "22/04/2025", "OOTD",        "OOTD", ""],
            [3, "Bowl & Co.",   "Food",      "butter", "0:38", "24.8K", "2.1K", "Sáng 6h — granola bowl",    "6AM granola bowl",            "TikTok",    "10/05/2025", "Lifestyle",   "Lifestyle", ""],
            [4, "Hermosa",      "Beauty",    "pink",   "0:55", "12.4K", "950",  "Unbox son Hermosa",         "Hermosa lipstick unbox",      "Instagram", "28/06/2025", "Unboxing",    "Unboxing", ""],
            [5, "Pilates Home", "Fitness",   "lilac",  "1:30", "7.2K",  "610",  "Review thảm tập 6mm",       "6mm mat honest review",       "TikTok",    "14/07/2025", "Review dài",  "Long review", ""],
            [6, "Baby Moon",    "Lifestyle", "pink",   "0:52", "15.9K", "1.2K", "Khăn sữa hữu cơ Baby Moon", "Baby Moon organic muslin wrap", "Instagram", "01/08/2025", "Gifting",    "Gifting", ""],
        ],
    },
    "packages": {
        "key": "id",
        "headers": ["id", "name_vi", "name_en", "tagline_vi", "tagline_en", "price_vi", "price_en", "tone", "featured", "deliverables_vi", "deliverables_en"],
        "rows": [
            ["gift",       "Gifting",   "Gifting",   "Review chân thật",       "Honest review",        "Miễn phí / Sản phẩm", "Free / Product", "mint",   "false", "1 video TikTok (45-60s)|2 story Instagram|Phản hồi brief 48h|Usage rights 15 ngày",                   "1 TikTok video (45-60s)|2 Instagram stories|Brief reply within 48h|15-day usage rights"],
            ["campaign",   "Campaign",  "Campaign",  "Gói hợp tác nhẹ",        "Light collab",         "Từ 2.5tr",            "From $105",      "pink",   "true",  "1 video TikTok + 1 Reels|3 story + 1 post IG|Phản hồi 24h|Usage rights 60 ngày",                    "1 TikTok + 1 Reels|3 stories + 1 IG post|24h reply time|60-day usage rights"],
            ["ambassador", "Long-term", "Long-term", "Đồng hành 3 tháng",      "3-month commitment",   "Quote riêng",         "Custom quote",   "butter", "false", "3 tháng đồng hành|2 deliverables/tháng|Story-first content|Full usage rights 90 ngày",                "3-month partnership|2 deliverables/month|Story-first content|Full 90-day usage rights"],
        ],
    },
    "testimonials": {
        "key": "brand",
        "headers": ["brand", "person", "role_vi", "role_en", "quote_vi", "quote_en", "tone"],
        "rows": [
            ["Hermosa",     "Mai Anh",      "Marketing Executive", "Marketing Executive", "Với budget nhỏ, Ngân vẫn cho ra video chất — engagement gấp đôi KOC cùng tier.",       "Even on a small budget, Ngân delivered quality video — 2x engagement vs same-tier KOCs.", "pink"],
            ["Bowl & Co.",  "Thảo Nguyên",  "Founder",             "Founder",             "Video granola của Ngân rất chân thực. Brief được đọc kỹ, feedback nhanh.",               "Ngân's granola video felt real. She read the brief carefully, quick feedback.",            "butter"],
            ["Lumi",        "Hà Phương",    "Brand Manager",       "Brand Manager",       "Mới bắt đầu nhưng Ngân có giai điệu riêng. Content không rập khuôn KOC sale.",           "Still early but Ngân has her own voice. Content doesn't feel like a sales pitch.",         "mint"],
        ],
    },
    "faqs": {
        "key": "q_en",
        "headers": ["q_vi", "q_en", "a_vi", "a_en"],
        "rows": [
            ["Thời gian phản hồi brief?",              "Brief response time?",                "Mình phản hồi trong 24h làm việc. Call align trong 2-3 ngày sau đó.",                                     "I reply within 24 business hours. Alignment calls within 2-3 days after."],
            ["Có nhận ngành nhạy cảm không?",          "Accept sensitive categories?",        "KHÔNG: thuốc lá, casino, TPCN chưa kiểm định, vay nhanh. Các ngành khác OK.",                              "NOT accepted: tobacco, casino, unverified supplements, fast loans. Others fine."],
            ["Có gửi gifting mà không ghi quảng cáo?", "Gift without paid partnership tag?",  "Nếu mình thật sự thích mình sẽ review free — nhưng luôn disclose theo guideline TikTok/IG.",               "If I genuinely like it, I review free — but always disclose per TikTok/IG guidelines."],
            ["Usage rights bao lâu?",                  "Usage rights duration?",              "Gifting: 15 ngày. Campaign: 60 ngày. Long-term: 90 ngày trong thời gian hợp đồng.",                         "Gifting: 15 days. Campaign: 60 days. Long-term: 90 days during contract."],
            ["Có làm nội dung tiếng Anh không?",       "Do you create English content?",      "Trang cá nhân chủ yếu tiếng Việt, nhưng có thể thêm caption EN hoặc bản phụ đề EN nếu brand cần.",         "Primarily Vietnamese, but can add EN captions or subtitles if needed."],
        ],
    },
    "featured_products": {
        "key": "id",
        "headers": ["id", "brand", "name_vi", "name_en", "niche_vi", "niche_en", "rating", "price", "tone", "tag_vi", "tag_en", "link", "image_url"],
        "rows": [
            ["p1", "Hermosa",      "Son lì Velvet 04",       "Velvet Matte Lipstick 04", "Mỹ phẩm",   "Beauty",    4.8, "320.000đ", "pink",   "Gifting",  "Gifting",  "", ""],
            ["p2", "Minto",        "Áo linen oversize",      "Oversized Linen Shirt",    "Thời trang", "Fashion",   4.6, "589.000đ", "mint",   "Affiliate","Affiliate", "", ""],
            ["p3", "Bowl & Co.",   "Granola hạt phủ mật",    "Honey-Glazed Granola",     "Ẩm thực",   "Food",      4.9, "145.000đ", "butter", "Yêu thích","Loved",    "", ""],
            ["p4", "Lumi",         "Serum Vitamin C 10%",    "10% Vitamin C Serum",      "Mỹ phẩm",   "Beauty",    4.7, "420.000đ", "peach",  "Hot",      "Hot",      "", ""],
            ["p5", "Pilates Home", "Thảm tập 6mm",           "6mm Yoga Mat",             "Sức khỏe",  "Fitness",   4.8, "690.000đ", "lilac",  "Mới",      "New",      "", ""],
            ["p6", "Baby Moon",    "Khăn sữa hữu cơ",        "Organic Muslin Wrap",      "Mẹ & Bé",   "Mom & Baby",5.0, "249.000đ", "pink",   "Gifting",  "Gifting",  "", ""],
        ],
    },
    "koc_profile": {
        "key": None,
        "headers": ["name", "handle", "tagline_vi", "tagline_en", "bio_vi", "bio_en", "location", "email", "phone", "avatar_url", "logo_url", "tiktok_url", "instagram_url", "youtube_url", "facebook_url", "show_packages", "notify_emails"],
        "rows": [
            [
                "Hữu Lợi",
                "@kimngan.daily",
                "KOC mới — Review thật · Chia sẻ chân thành",
                "Emerging KOC · Honest reviews · Real voice",
                "Mình là Hữu Lợi — một KOC mới bắt đầu, đang xây dựng cộng đồng quanh những trải nghiệm nhỏ nhưng thật. Sẵn sàng đồng hành cùng brand đúng tinh thần.",
                "I'm Hữu Lợi — an emerging KOC building a community around small, honest experiences. Open to collaborating with like-minded brands.",
                "Hà Nội",
                "hello@kimngan.daily",
                "+84 94 888 1234",
                "",  # avatar_url
                "",  # logo_url
                "",  # tiktok_url
                "",  # instagram_url
                "",  # youtube_url
                "",  # facebook_url
                "",  # show_packages: điền 'true' để hiện phần gói hợp tác
                "",  # notify_emails: email nhận thông báo, cách nhau bằng dấu phẩy (vd: a@gmail.com,b@gmail.com)
            ]
        ],
    },
    "contact_channels": {
        "key": "kind",
        "headers": ["kind", "icon", "label_vi", "label_en", "value", "desc_vi", "desc_en", "href", "tone"],
        "rows": [
            ["email",     "✉️",  "Email",     "Email",     "", "Phản hồi trong 24h",          "Reply within 24h",          "", "pink"],
            ["zalo",      "💬",  "Zalo",      "Zalo",      "", "Nhanh nhất — phản hồi ngay",   "Fastest — reply instantly",  "", "mint"],
            ["tiktok",    "📸",  "TikTok",    "TikTok",    "", "DM qua TikTok",               "DM on TikTok",              "", "butter"],
            ["instagram", "📷",  "Instagram", "Instagram", "", "DM qua Instagram",            "DM on Instagram",           "", "lilac"],
        ],
    },
    "about_photos": {
        "key": "slot",
        "headers": ["slot", "url", "label_vi", "label_en"],
        "rows": [
            ["portrait", "", "Chân dung",   "Portrait"],
            ["studio",   "", "Studio",       "Studio"],
            ["behind",   "", "Hậu trường", "Behind scenes"],
        ],
    },
    "niches": {
        "key": "label_en",
        "headers": ["label_vi", "label_en", "emoji"],
        "rows": [
            ["Thời trang", "Fashion",   "👗"],
            ["Mỹ phẩm",   "Beauty",    "💄"],
            ["Ẩm thực",   "Food",      "🍜"],
            ["Sức khỏe",  "Fitness",   "🧘"],
            ["Lifestyle",  "Lifestyle", "✨"],
            ["Mẹ & Bé",   "Mom & Baby","🍼"],
        ],
    },
    "videos": {
        "key": "id",
        "headers": ["id", "title_vi", "title_en", "views", "likes", "duration", "tone", "image_url", "link"],
        "rows": [
            ["v1", "7 ngày dùng serum Lumi",  "7 days with Lumi serum",      "18.2K", "1.4K", "0:47", "peach", "", ""],
            ["v2", "OOTD linen mùa thu",       "Autumn linen OOTD",           "9.6K",  "820",  "1:12", "mint",  "", ""],
            ["v3", "Sáng 6h — granola bowl",   "6AM granola bowl",            "24.8K", "2.1K", "0:38", "butter","", ""],
            ["v4", "Unbox son Hermosa",         "Hermosa lipstick unbox",      "12.4K", "950",  "0:55", "pink",  "", ""],
        ],
    },
    "trending": {
        "key": "id",
        "headers": ["id", "title_vi", "title_en", "niche", "engagement"],
        "rows": [
            ["t1", "3 kem chống nắng dưới 300k",   "3 sunscreens under 300k",     "Beauty",  "11.4%"],
            ["t2", "Gu mặc linen mùa này",          "Linen style this season",     "Fashion", "9.8%"],
            ["t3", "Bữa sáng nhanh dưới 10 phút",  "Breakfast under 10 minutes",  "Food",    "12.2%"],
        ],
    },
    "brands": {
        "key": "name",
        "headers": ["name"],
        "rows": [
            ["Hermosa"],
            ["Minto"],
            ["Bowl & Co."],
            ["Lumi"],
            ["Pilates Home"],
            ["Baby Moon"],
        ],
    },
    "story": {
        "key": "year_en",
        "headers": ["year_vi", "year_en", "title_vi", "title_en", "desc_vi", "desc_en"],
        "rows": [
            ["2025 Q1", "2025 Q1", "Video đầu tiên",      "First video",            "Quay video review son lì đầu tiên trên TikTok — bất ngờ đạt 8K views.", "First TikTok lipstick review — surprisingly hit 8K views."],
            ["2025 Q3", "2025 Q3", "Chạm 1K",             "First 1K",               "1K followers đầu tiên. Brand gifting đầu tiên từ Hermosa.",              "First 1K followers. First gifting deal from Hermosa."],
            ["2026 Q1", "2026 Q1", "3.8K & đa ngách",     "3.8K & multi-niche",     "Mở rộng sang Fashion, Food, Lifestyle. 6 brand hợp tác.",                "Expanded to Fashion, Food, Lifestyle. 6 brand deals."],
            ["Hôm nay", "Today",   "Sẵn sàng đồng hành", "Ready to collaborate",   "Sẵn sàng nhận 2-3 project/tháng. Ưu tiên brand có story rõ ràng.",       "Open for 2-3 projects/month. Prioritize brands with clear story."],
        ],
    },
    "process": {
        "key": "step",
        "headers": ["step", "title_vi", "title_en", "desc_vi", "desc_en", "time"],
        "rows": [
            ["01", "Brief & Align", "Brief & Align",  "Call 20 phút để hiểu brand, KPI, audience.",    "20-min call to align on brand, KPI, audience.",       "1 day"],
            ["02", "Concept",       "Concept",         "Gửi 2 concept + script. Chờ feedback.",          "Deliver 2 concepts + script. Wait for feedback.",     "2 days"],
            ["03", "Sản xuất",      "Production",      "Quay + dựng tại nhà. Draft trong 4-5 ngày.",     "Shoot + edit at home studio. Draft in 4-5 days.",     "4-5 days"],
            ["04", "Duyệt & Đăng", "Review & Publish","2 vòng chỉnh sửa. Đăng theo lịch đã chốt.",     "2 revisions. Publish on agreed schedule.",            "2 days"],
            ["05", "Report",        "Report",          "Báo cáo analytics sau 10 ngày.",                  "Analytics report after 10 days.",                     "10 days"],
        ],
    },
    "audience": {
        "key": None,
        "headers": ["kind", "label_vi", "label_en", "label", "pct", "color", "value", "growth"],
        "rows": [
            # age
            ["age", "18-24", "18-24", "18-24", 52, "", "", ""],
            ["age", "25-34", "25-34", "25-34", 34, "", "", ""],
            ["age", "35-44", "35-44", "35-44", 10, "", "", ""],
            ["age", "45+",   "45+",   "45+",    4, "", "", ""],
            # gender
            ["gender", "Nữ",   "Female", "", 82, "var(--color-clay-pink)",   "", ""],
            ["gender", "Nam",  "Male",   "", 15, "var(--color-clay-sky)",    "", ""],
            ["gender", "Khác", "Other",  "",  3, "var(--color-clay-butter)", "", ""],
            # city
            ["city", "Hà Nội",  "Hanoi",     "Hà Nội",  44, "", "", ""],
            ["city", "TP. HCM", "Ho Chi Minh City", "TP. HCM", 28, "", "", ""],
            ["city", "Đà Nẵng", "Da Nang",   "Đà Nẵng",  9, "", "", ""],
            ["city", "Khác",    "Other",     "Khác",     19, "", "", ""],
            # platform
            ["platform", "TikTok",    "TikTok",    "TikTok",    "", "", "3.8K", "+32%"],
            ["platform", "Instagram", "Instagram", "Instagram", "", "", "1.2K", "+28%"],
            ["platform", "YouTube",   "YouTube",   "YouTube",   "", "", "420",  "+45%"],
            ["platform", "Facebook",  "Facebook",  "Facebook",  "", "", "680",  "+12%"],
        ],
    },
}

# ---------------------------------------------------------------------------
# Migration logic
# ---------------------------------------------------------------------------

def rc(row, col):
    """1-based (row, col) → A1 notation."""
    return gspread.utils.rowcol_to_a1(row, col)


def migrate_tab(spreadsheet, existing_sheets, tab_name, config):
    headers = config["headers"]
    default_rows = config["rows"]
    key_col = config.get("key")

    # ── Case 1: Tab chưa tồn tại → tạo mới ──────────────────────────────
    if tab_name not in existing_sheets:
        ws = spreadsheet.add_worksheet(
            title=tab_name,
            rows=max(len(default_rows) + 10, 20),
            cols=max(len(headers), 10),
        )
        data = [headers] + [[str(c) for c in r] for r in default_rows]
        ws.update(data, value_input_option="USER_ENTERED")
        ws.format("1:1", {"textFormat": {"bold": True}})
        print(f"  [{tab_name}] created — {len(default_rows)} row(s)")
        return

    ws = existing_sheets[tab_name]
    current = ws.get_all_values()

    # ── Case 2: Tab rỗng ─────────────────────────────────────────────────
    if not current:
        data = [headers] + [[str(c) for c in r] for r in default_rows]
        ws.update(data, value_input_option="USER_ENTERED")
        ws.format("1:1", {"textFormat": {"bold": True}})
        print(f"  [{tab_name}] was empty — wrote {len(default_rows)} row(s)")
        return

    cur_headers = list(current[0])
    cur_rows = current[1:]
    added_cols = []
    added_rows_count = 0

    # ── Step 1: Thêm cột mới (không đụng cột cũ) ────────────────────────
    new_cols = [h for h in headers if h not in cur_headers]
    if new_cols:
        needed_cols = len(cur_headers) + len(new_cols)
        if ws.col_count < needed_cols:
            ws.resize(rows=ws.row_count, cols=needed_cols)
        start_col = len(cur_headers) + 1  # 1-based
        end_col = start_col + len(new_cols) - 1
        updates = [
            {"range": f"{rc(1, start_col)}:{rc(1, end_col)}", "values": [new_cols]},
        ]
        if cur_rows:
            updates.append({
                "range": f"{rc(2, start_col)}:{rc(1 + len(cur_rows), end_col)}",
                "values": [[""] * len(new_cols) for _ in cur_rows],
            })
        ws.batch_update(updates, value_input_option="USER_ENTERED")
        ws.format("1:1", {"textFormat": {"bold": True}})
        cur_headers = cur_headers + new_cols
        added_cols = new_cols

    # ── Step 2: Append row mới theo key (không đụng row cũ) ─────────────
    if key_col and key_col in headers:
        key_idx = headers.index(key_col)
        if key_col in cur_headers:
            ek_idx = cur_headers.index(key_col)
            existing_keys = {
                (r[ek_idx] if len(r) > ek_idx else "") for r in cur_rows
            }
        else:
            existing_keys = set()

        to_append = []
        for dr in default_rows:
            rk = str(dr[key_idx])
            if rk not in existing_keys:
                row = []
                for h in cur_headers:
                    if h in headers:
                        hi = headers.index(h)
                        row.append(str(dr[hi]) if hi < len(dr) else "")
                    else:
                        row.append("")
                to_append.append(row)

        if to_append:
            ws.append_rows(to_append, value_input_option="USER_ENTERED")
            added_rows_count = len(to_append)

    parts = []
    if added_cols:
        parts.append(f"added cols: {added_cols}")
    if added_rows_count:
        parts.append(f"added {added_rows_count} new row(s)")
    print(f"  [{tab_name}] {'migrated — ' + ', '.join(parts) if parts else 'up to date'}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("Authenticating...")
    creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    gc = gspread.authorize(creds)

    print(f"Opening spreadsheet {SHEET_ID}...")
    spreadsheet = gc.open_by_key(SHEET_ID)
    existing = {ws.title: ws for ws in spreadsheet.worksheets()}

    for tab_name, config in TABS.items():
        migrate_tab(spreadsheet, existing, tab_name, config)

    # Xóa Sheet1 mặc định nếu còn
    remaining = {ws.title: ws for ws in spreadsheet.worksheets()}
    if "Sheet1" in remaining and len(remaining) > len(TABS):
        try:
            spreadsheet.del_worksheet(remaining["Sheet1"])
            print("  [Sheet1] removed")
        except Exception:
            pass

    print("\nDone! Spreadsheet URL:")
    print(f"  https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit")


if __name__ == "__main__":
    main()
