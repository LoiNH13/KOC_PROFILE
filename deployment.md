# Hướng dẫn Deploy KOC_PROFILE

## Yêu cầu
- [Git](https://git-scm.com/downloads) đã được cài đặt
- [GitHub CLI (`gh`)](https://cli.github.com/) đã được cài đặt
- Tài khoản GitHub
- Tài khoản Cloudflare (miễn phí)

---

## Phần 1: Tạo Repository và Push lên GitHub

### Bước 1: Đăng nhập GitHub CLI
Mở terminal, chạy:
```bash
gh auth login
```
Chọn **GitHub.com** → **HTTPS** → **Login with a web browser** → làm theo hướng dẫn.

### Bước 2: Khởi tạo Git trong project
```bash
cd d:\Work\projects\ln
git init
git add .
git commit -m "Initial commit: KOC_PROFILE project"
```

### Bước 3: Tạo repo trên GitHub và push
```bash
gh repo create KOC_PROFILE --public --source=. --remote=origin --push
```

> **Lưu ý:** Thay `--public` bằng `--private` nếu muốn repo riêng tư.

Sau khi chạy xong, repo sẽ có tại:
```
https://github.com/<YOUR_USERNAME>/KOC_PROFILE
```

### Cập nhật code sau này
```bash
git add .
git commit -m "Your commit message"
git push
```

---

## Phần 2: Deploy lên Cloudflare Pages (Free Tier)

### Bước 1: Cấu hình Environment Variables
Copy file ví dụ và điền thông tin Supabase của bạn:
```bash
cp src/fe/.env.local.example src/fe/.env.local
```
Mở `src/fe/.env.local` và điền:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Quan trọng:** File `.env.local` đã được thêm vào `.gitignore`, sẽ không bị push lên GitHub.

### Bước 2: Tạo project trên Cloudflare Pages

1. Truy cập https://pages.cloudflare.com/
2. Click **Create a project**
3. Chọn **Connect to Git**
4. Kết nối tài khoản GitHub → chọn repo **KOC_PROFILE**
5. Click **Begin setup**

### Bước 3: Cấu hình Build

Điền các thông tin sau:

| Trường | Giá trị |
|---|---|
| **Project name** | `koc-profile` (hoặc tùy ý) |
| **Production branch** | `main` |
| **Framework preset** | `Vite` |
| **Root directory** | `src/fe` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### Bước 4: Thêm Environment Variables

Trong cùng trang setup, kéo xuống phần **Environment variables** và thêm:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | URL Supabase của bạn |
| `VITE_SUPABASE_ANON_KEY` | Anon key Supabase của bạn |

> Thêm cho cả **Production** và **Preview** environments.

### Bước 5: Deploy

Click **Save and Deploy**.

Cloudflare sẽ tự động build và deploy. Sau vài phút, site sẽ live tại:
```
https://koc-profile.pages.dev
```

---

## Phần 3: Auto Deploy (CI/CD)

Cloudflare Pages tự động deploy lại mỗi khi bạn push code lên branch `main`:

```bash
git add .
git commit -m "Update something"
git push origin main
# → Cloudflare tự động build & deploy
```

---

## Phần 4: Custom Domain (Tùy chọn)

Nếu bạn có domain riêng:
1. Vào Cloudflare Pages → project của bạn → **Custom domains**
2. Click **Set up a custom domain**
3. Nhập domain → làm theo hướng dẫn cấu hình DNS

---

## Tham khảo
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub CLI Docs](https://cli.github.com/manual/)
- [Vite Build Docs](https://vitejs.dev/guide/build)
