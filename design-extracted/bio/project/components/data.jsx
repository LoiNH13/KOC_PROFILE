// Mock data for KOC landing page (bilingual VI / EN)
// Context: small, newly-started KOC (~3-5K followers, 6 brand deals, 2025-2026)

const KOC_DATA = {
  name: 'Linh Chi',
  handle: '@linhchi.daily',
  tagline: {
    vi: 'KOC mới — Review thật · Chia sẻ chân thành',
    en: 'Emerging KOC · Honest reviews · Real voice',
  },
  bio: {
    vi: 'Mình là Linh Chi — một KOC mới bắt đầu, đang xây dựng cộng đồng quanh những trải nghiệm nhỏ nhưng thật. Sẵn sàng đồng hành cùng brand đúng tinh thần.',
    en: "I'm Linh Chi — an emerging KOC building a community around small, honest experiences. Open to collaborating with like-minded brands.",
  },
  location: 'Hà Nội',
  email: 'hello@linhchi.daily',
  phone: '+84 94 888 1234',
};

const STATS = [
  { label: { vi: 'Người theo dõi', en: 'Followers' }, value: '3.8K', sub: 'TikTok' },
  { label: { vi: 'Lượt xem/tháng', en: 'Views / month' }, value: '48K', sub: 'Cross-platform' },
  { label: { vi: 'Tỉ lệ tương tác', en: 'Engagement rate' }, value: '9.2%', sub: { vi: 'Trên trung bình micro', en: 'Above micro avg' } },
  { label: { vi: 'Brand đã hợp tác', en: 'Brand partners' }, value: '6', sub: '2025 – 2026' },
];

const NICHES = [
  { vi: 'Thời trang', en: 'Fashion', emoji: '👗' },
  { vi: 'Mỹ phẩm', en: 'Beauty', emoji: '💄' },
  { vi: 'Ẩm thực', en: 'Food', emoji: '🍜' },
  { vi: 'Sức khỏe', en: 'Fitness', emoji: '🧘' },
  { vi: 'Lifestyle', en: 'Lifestyle', emoji: '✨' },
  { vi: 'Mẹ & Bé', en: 'Mom & Baby', emoji: '🍼' },
];

const FEATURED_PRODUCTS = [
  { id: 'p1', brand: 'Hermosa', name: { vi: 'Son lì Velvet 04', en: 'Velvet Matte Lipstick 04' }, niche: { vi: 'Mỹ phẩm', en: 'Beauty' }, rating: 4.8, price: '320.000đ', tone: 'pink', tag: { vi: 'Gifting', en: 'Gifting' } },
  { id: 'p2', brand: 'Minto', name: { vi: 'Áo linen oversize', en: 'Oversized Linen Shirt' }, niche: { vi: 'Thời trang', en: 'Fashion' }, rating: 4.6, price: '589.000đ', tone: 'mint', tag: { vi: 'Affiliate', en: 'Affiliate' } },
  { id: 'p3', brand: 'Bowl & Co.', name: { vi: 'Granola hạt phủ mật', en: 'Honey-Glazed Granola' }, niche: { vi: 'Ẩm thực', en: 'Food' }, rating: 4.9, price: '145.000đ', tone: 'butter', tag: { vi: 'Yêu thích', en: 'Loved' } },
  { id: 'p4', brand: 'Lumi', name: { vi: 'Serum Vitamin C 10%', en: '10% Vitamin C Serum' }, niche: { vi: 'Mỹ phẩm', en: 'Beauty' }, rating: 4.7, price: '420.000đ', tone: 'peach', tag: { vi: 'Hot', en: 'Hot' } },
  { id: 'p5', brand: 'Pilates Home', name: { vi: 'Thảm tập 6mm', en: '6mm Yoga Mat' }, niche: { vi: 'Sức khỏe', en: 'Fitness' }, rating: 4.8, price: '690.000đ', tone: 'lilac', tag: { vi: 'Mới', en: 'New' } },
  { id: 'p6', brand: 'Baby Moon', name: { vi: 'Khăn sữa hữu cơ', en: 'Organic Muslin Wrap' }, niche: { vi: 'Mẹ & Bé', en: 'Mom & Baby' }, rating: 5.0, price: '249.000đ', tone: 'pink', tag: { vi: 'Gifting', en: 'Gifting' } },
];

const VIDEOS = [
  { id: 'v1', title: { vi: '7 ngày dùng serum Lumi', en: '7 days with Lumi serum' }, views: '18.2K', likes: '1.4K', duration: '0:47', tone: 'peach' },
  { id: 'v2', title: { vi: 'OOTD linen mùa thu', en: 'Autumn linen OOTD' }, views: '9.6K', likes: '820', duration: '1:12', tone: 'mint' },
  { id: 'v3', title: { vi: 'Sáng 6h — granola bowl', en: '6AM granola bowl' }, views: '24.8K', likes: '2.1K', duration: '0:38', tone: 'butter' },
  { id: 'v4', title: { vi: 'Unbox son Hermosa', en: 'Hermosa lipstick unbox' }, views: '12.4K', likes: '950', duration: '0:55', tone: 'pink' },
];

const TRENDING = [
  { id: 't1', title: { vi: '3 kem chống nắng dưới 300k', en: '3 sunscreens under 300k' }, niche: 'Beauty', engagement: '11.4%' },
  { id: 't2', title: { vi: 'Gu mặc linen mùa này', en: 'Linen style this season' }, niche: 'Fashion', engagement: '9.8%' },
  { id: 't3', title: { vi: 'Bữa sáng nhanh dưới 10 phút', en: 'Breakfast under 10 minutes' }, niche: 'Food', engagement: '12.2%' },
];

const BRANDS = [
  'Hermosa', 'Minto', 'Bowl & Co.', 'Lumi', 'Pilates Home', 'Baby Moon',
];

// About / Story timeline — journey of a new KOC
const STORY = [
  { year: '2025 Q1', title: { vi: 'Video đầu tiên', en: 'First video' }, desc: { vi: 'Quay video review son lì đầu tiên trên TikTok — bất ngờ đạt 8K views.', en: 'First TikTok lipstick review — surprisingly hit 8K views.' } },
  { year: '2025 Q3', title: { vi: 'Chạm 1K', en: 'First 1K' }, desc: { vi: '1K followers đầu tiên. Brand gifting đầu tiên từ Hermosa.', en: 'First 1K followers. First gifting deal from Hermosa.' } },
  { year: '2026 Q1', title: { vi: '3.8K & đa ngách', en: '3.8K & multi-niche' }, desc: { vi: 'Mở rộng sang Fashion, Food, Lifestyle. 6 brand hợp tác.', en: 'Expanded to Fashion, Food, Lifestyle. 6 brand deals.' } },
  { year: { vi: 'Hôm nay', en: 'Today' }, title: { vi: 'Sẵn sàng đồng hành', en: 'Ready to collaborate' }, desc: { vi: 'Sẵn sàng nhận 2-3 project/tháng. Ưu tiên brand có story rõ ràng.', en: 'Open for 2-3 projects/month. Prioritize brands with clear story.' } },
];

// Service packages — sized for a new KOC
const PACKAGES = [
  {
    id: 'gift', name: { vi: 'Gifting', en: 'Gifting' }, tagline: { vi: 'Review chân thật', en: 'Honest review' },
    price: { vi: 'Miễn phí / Sản phẩm', en: 'Free / Product' }, tone: 'mint',
    deliverables: {
      vi: ['1 video TikTok (45-60s)', '2 story Instagram', 'Phản hồi brief 48h', 'Usage rights 15 ngày'],
      en: ['1 TikTok video (45-60s)', '2 Instagram stories', 'Brief reply within 48h', '15-day usage rights'],
    },
  },
  {
    id: 'campaign', name: { vi: 'Campaign', en: 'Campaign' }, tagline: { vi: 'Gói hợp tác nhẹ', en: 'Light collab' },
    price: { vi: 'Từ 2.5tr', en: 'From $105' }, tone: 'pink', featured: true,
    deliverables: {
      vi: ['1 video TikTok + 1 Reels', '3 story + 1 post IG', 'Phản hồi 24h', 'Usage rights 60 ngày'],
      en: ['1 TikTok + 1 Reels', '3 stories + 1 IG post', '24h reply time', '60-day usage rights'],
    },
  },
  {
    id: 'ambassador', name: { vi: 'Long-term', en: 'Long-term' }, tagline: { vi: 'Đồng hành 3 tháng', en: '3-month commitment' },
    price: { vi: 'Quote riêng', en: 'Custom quote' }, tone: 'butter',
    deliverables: {
      vi: ['3 tháng đồng hành', '2 deliverables/tháng', 'Story-first content', 'Full usage rights 90 ngày'],
      en: ['3-month partnership', '2 deliverables/month', 'Story-first content', 'Full 90-day usage rights'],
    },
  },
];

// Testimonials — from small brands, realistic tone
const TESTIMONIALS = [
  {
    brand: 'Hermosa', person: 'Mai Anh', role: { vi: 'Marketing Executive', en: 'Marketing Executive' },
    quote: {
      vi: 'Với budget nhỏ, Chi vẫn cho ra video chất — engagement gấp đôi KOC cùng tier. Rất đáng đồng hành tiếp.',
      en: 'Even on a small budget, Chi delivered quality video — 2x engagement vs same-tier KOCs. Worth partnering long-term.',
    },
    tone: 'pink',
  },
  {
    brand: 'Bowl & Co.', person: 'Thảo Nguyên', role: { vi: 'Founder', en: 'Founder' },
    quote: {
      vi: 'Video granola của Chi rất chân thực. Brief được đọc kỹ, feedback nhanh. Khách inbox hỏi món đó liên tục.',
      en: "Chi's granola video felt real. She read the brief carefully, quick feedback. Customers kept asking about that bowl.",
    },
    tone: 'butter',
  },
  {
    brand: 'Lumi', person: 'Hà Phương', role: { vi: 'Brand Manager', en: 'Brand Manager' },
    quote: {
      vi: 'Mới bắt đầu nhưng Chi có giai điệu riêng. Content không rập khuôn KOC sale. Sẽ book thêm lần 2.',
      en: "Still early but Chi has her own voice. Content doesn't feel like a sales pitch. Will book again.",
    },
    tone: 'mint',
  },
];

const PROCESS = [
  { step: '01', title: { vi: 'Brief & Align', en: 'Brief & Align' }, desc: { vi: 'Call 20 phút để hiểu brand, KPI, audience.', en: '20-min call to align on brand, KPI, audience.' }, time: '1 day' },
  { step: '02', title: { vi: 'Concept', en: 'Concept' }, desc: { vi: 'Gửi 2 concept + script. Chờ feedback.', en: 'Deliver 2 concepts + script. Wait for feedback.' }, time: '2 days' },
  { step: '03', title: { vi: 'Sản xuất', en: 'Production' }, desc: { vi: 'Quay + dựng tại nhà. Draft trong 4-5 ngày.', en: 'Shoot + edit at home studio. Draft in 4-5 days.' }, time: '4-5 days' },
  { step: '04', title: { vi: 'Duyệt & Đăng', en: 'Review & Publish' }, desc: { vi: '2 vòng chỉnh sửa. Đăng theo lịch đã chốt.', en: '2 revisions. Publish on agreed schedule.' }, time: '2 days' },
  { step: '05', title: { vi: 'Report', en: 'Report' }, desc: { vi: 'Báo cáo analytics sau 10 ngày.', en: 'Analytics report after 10 days.' }, time: '10 days' },
];

const AUDIENCE = {
  age: [
    { range: '18-24', pct: 52 },
    { range: '25-34', pct: 34 },
    { range: '35-44', pct: 10 },
    { range: '45+', pct: 4 },
  ],
  gender: [
    { label: { vi: 'Nữ', en: 'Female' }, pct: 82, color: 'pink' },
    { label: { vi: 'Nam', en: 'Male' }, pct: 15, color: 'sky' },
    { label: { vi: 'Khác', en: 'Other' }, pct: 3, color: 'butter' },
  ],
  cities: [
    { name: 'Hà Nội', pct: 44 },
    { name: 'TP. HCM', pct: 28 },
    { name: 'Đà Nẵng', pct: 9 },
    { name: { vi: 'Khác', en: 'Other' }, pct: 19 },
  ],
  platforms: [
    { name: 'TikTok', value: '3.8K', growth: '+32%' },
    { name: 'Instagram', value: '1.2K', growth: '+28%' },
    { name: 'YouTube', value: '420', growth: '+45%' },
    { name: 'Facebook', value: '680', growth: '+12%' },
  ],
};

const FAQS = [
  { q: { vi: 'Thời gian phản hồi brief?', en: 'Brief response time?' }, a: { vi: 'Mình phản hồi trong 24h làm việc. Call align trong 2-3 ngày sau đó.', en: 'I reply within 24 business hours. Alignment calls within 2-3 days after.' } },
  { q: { vi: 'Có nhận ngành nhạy cảm không?', en: 'Accept sensitive categories?' }, a: { vi: 'KHÔNG: thuốc lá, casino, TPCN chưa kiểm định, vay nhanh. Các ngành khác OK.', en: 'NOT accepted: tobacco, casino, unverified supplements, fast loans. Others fine.' } },
  { q: { vi: 'Có gửi gifting mà không ghi quảng cáo được không?', en: 'Can I gift without paid partnership tag?' }, a: { vi: 'Nếu mình thật sự thích mình sẽ review free — nhưng luôn disclose honest review theo guideline TikTok/IG.', en: 'If I genuinely like it, I review free — but always disclose per TikTok/IG guidelines.' } },
  { q: { vi: 'Usage rights bao lâu?', en: 'Usage rights duration?' }, a: { vi: 'Gifting: 15 ngày. Campaign: 60 ngày. Long-term: 90 ngày trong thời gian hợp đồng.', en: 'Gifting: 15 days. Campaign: 60 days. Long-term: 90 days during contract.' } },
  { q: { vi: 'Có hợp đồng & xuất VAT không?', en: 'Contract & VAT invoice?' }, a: { vi: 'Với gói Campaign và Long-term: có hợp đồng cá nhân + biên bản thanh toán. Gifting không cần hợp đồng.', en: 'Campaign & Long-term: personal contract + payment receipt. Gifting: no contract needed.' } },
  { q: { vi: 'Có nhận sản phẩm chưa ra mắt?', en: 'Accept pre-launch products?' }, a: { vi: 'Có, với NDA và brief đầy đủ. Mình đã làm launch cho 2 SKU mới trong 2026.', en: 'Yes, with NDA and full brief. I launched 2 new SKUs in 2026.' } },
];

Object.assign(window, { KOC_DATA, STATS, NICHES, FEATURED_PRODUCTS, VIDEOS, TRENDING, BRANDS, STORY, PACKAGES, TESTIMONIALS, PROCESS, AUDIENCE, FAQS });
