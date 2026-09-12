# banhang.ntcons

Web app quản lý **bán hàng · kho · công nợ** cho doanh nghiệp vừa và nhỏ, xây dựng bằng React, theo phong cách giao diện quen thuộc của phần mềm kế toán Việt Nam (đậm bảng biểu, nhiều số liệu).

Ứng dụng được xây dựng dựa trên mẫu Excel "Quản lý Bán hàng – Kho – Công nợ" và tham khảo công năng của các phần mềm quản lý bán hàng SME phổ biến tại Việt Nam. Đây **không phải** bản sao chép mã nguồn/giao diện của bất kỳ phần mềm thương mại nào — toàn bộ giao diện và mã nguồn được thiết kế và viết mới.

## Tính năng

- **Bảng điều khiển**: doanh thu tháng, công nợ phải thu, cảnh báo tồn kho thấp, biểu đồ doanh thu 7 ngày
- **Danh mục**: Hàng hóa (kèm thuế suất GTGT), Khách hàng, Nhà cung cấp
- **Bảng giá / chiết khấu theo khách hàng**: thiết lập bảng giá riêng cho từng nhóm khách hàng + % chiết khấu mặc định, áp dụng tự động khi lập đơn
- **Đơn đặt hàng (Sales Order)**: ghi nhận đơn khách đặt trước, chuyển thành hóa đơn bán hàng khi giao hàng
- **Giao dịch**: Bán hàng, Mua hàng, Trả hàng bán, Trả hàng mua — tự động điều chỉnh tồn kho và công nợ
- **Kho**: Nhập kho / Xuất kho thủ công (điều chỉnh, chuyển kho), bảng tồn kho với cảnh báo hàng sắp hết
- **Sổ quỹ & Công nợ**: Phiếu thu, Phiếu chi (theo phương thức thanh toán/quỹ riêng), Sổ quỹ (số dư tồn quỹ theo thời gian), bảng công nợ phải thu/phải trả theo từng khách hàng/NCC
- **Nhập - Xuất - Tồn chi tiết**: tồn đầu kỳ + nhập − xuất = tồn cuối kỳ theo từng mặt hàng, xem chi tiết từng chứng từ phát sinh
- **Kênh bán hàng**: gắn nhãn cửa hàng/chi nhánh/kênh online cho đơn bán hàng, xem doanh thu theo từng kênh
- **Nhân sự**: quản lý nhân viên, bảng lương cơ bản theo tháng (lương + phụ cấp + thưởng − khấu trừ), in phiếu lương
- **Báo cáo**: doanh thu & lợi nhuận theo tháng, hàng bán chạy, doanh thu theo kênh
- **Báo cáo thuế (ước tính cơ bản)**: thuế GTGT đầu ra/đầu vào/phải nộp theo tháng, ước tính thuế TNDN
- **In phiếu / Xuất PDF**: mọi chứng từ đều có thể in qua hộp thoại in của trình duyệt (chọn "Lưu dưới dạng PDF")
- **Xuất Excel**: các báo cáo (Tồn kho, Công nợ, Sổ quỹ, NXT, Báo cáo kinh doanh, Báo cáo thuế, Bảng lương) đều xuất được file `.xlsx`
- **Đăng nhập & phân quyền cơ bản**: 4 vai trò — Quản trị viên, Nhân viên bán hàng, Kế toán, Thủ kho — mỗi vai trò chỉ thấy menu phù hợp
- **Giao diện tối ưu cho di động**: sidebar thu vào ngăn kéo, bảng dữ liệu hiển thị dạng thẻ trên màn hình nhỏ
- **Đồng bộ đa thiết bị (tùy chọn)**: khi kết nối Postgres, mọi thiết bị/trình duyệt dùng chung một bộ dữ liệu thật qua API trong `api/storage.js`

## Chạy thử ở máy local

```bash
npm install
npm run dev
```

Mở địa chỉ hiện ra trong terminal (mặc định `http://localhost:5173`).

Đăng nhập lần đầu bằng tài khoản mặc định:

```
Tên đăng nhập: admin
Mật khẩu: admin123
```

## Build bản production

```bash
npm run build
npm run preview
```

Thư mục `dist/` sau khi build có thể deploy lên bất kỳ static host nào (Vercel, Netlify, Cloudflare Pages, GitHub Pages...).

## Lưu trữ dữ liệu

Ứng dụng được thiết kế ban đầu để chạy như một **Claude.ai Artifact**, nơi nó dùng API lưu trữ đám mây tích hợp sẵn của Claude (`window.storage`) để lưu dữ liệu thật, đồng bộ giữa các phiên.

Khi chạy **độc lập** (như bản deploy trên Vercel này), `src/storage-shim.js` cung cấp `window.storage` theo 2 chế độ:

1. **Có database thật (khuyến nghị)** — nếu bạn đã tạo Postgres database trong tab "Storage" của project trên Vercel, `api/storage.js` (một Vercel Function) sẽ đọc/ghi vào database đó. Mọi thiết bị, mọi trình duyệt dùng chung một bộ dữ liệu thật — đây là chế độ đồng bộ đa thiết bị.
2. **Chưa có database, hoặc API tạm thời không phản hồi** — tự động dự phòng bằng `localStorage` của trình duyệt, để app vẫn dùng được bình thường, chỉ là không đồng bộ giữa các thiết bị cho tới khi API hoạt động trở lại.

### Thiết lập database thật (để đồng bộ đa thiết bị)

1. Vào project trên Vercel → tab **Storage** → **Create Database** → chọn **Postgres**. Vercel sẽ tự động thêm các biến môi trường kết nối (`POSTGRES_URL` hoặc `DATABASE_URL`) vào project — không cần cấu hình gì thêm.
2. (Tùy chọn, khuyến nghị) Thêm 2 biến môi trường trong Project Settings → Environment Variables để hạn chế truy cập API ngẫu nhiên từ bên ngoài:
   - `STORAGE_API_SECRET` = một chuỗi bí mật bất kỳ (VD: một UUID)
   - `VITE_STORAGE_API_SECRET` = **giá trị giống hệt** biến trên
   
   ⚠️ Lưu ý: vì `VITE_STORAGE_API_SECRET` được đóng gói vào mã JavaScript công khai của trình duyệt, đây chỉ là một lớp ngăn chặn cơ bản (chống truy cập ngẫu nhiên), **không phải bảo mật thật sự** — tương tự như lưu ý về đăng nhập bên dưới.
3. Deploy lại (push code mới, hoặc bấm "Redeploy" trên Vercel) để các biến môi trường có hiệu lực.

Bảng dữ liệu (`ntcons_kv`) được tự động tạo trong lần gọi API đầu tiên — không cần chạy migration thủ công.

## ⚠️ Lưu ý quan trọng về bảo mật đăng nhập

Lớp đăng nhập/phân quyền trong app này là **phân quyền cơ bản để tổ chức công việc nội bộ**, KHÔNG phải bảo mật cấp doanh nghiệp:

- Mật khẩu được lưu ở dạng **chưa mã hóa (plain text)** trong storage.
- Không có xác thực phía server — bất kỳ ai có quyền truy cập mã nguồn/storage đều có thể xem hoặc chỉnh sửa danh sách tài khoản.
- Phù hợp để dùng nội bộ với đồng nghiệp/nhân viên đáng tin cậy. **Không phù hợp** nếu cần bảo vệ dữ liệu khỏi người ngoài hoặc dữ liệu nhạy cảm cần tuân thủ quy định bảo mật.
- Nếu cần bảo mật thật (mã hóa mật khẩu, xác thực JWT/session phía server, HTTPS-only cookies...), cần xây dựng thêm một backend riêng.

## Báo cáo thuế — miễn trừ trách nhiệm

Số liệu ở trang "Báo cáo thuế" là **ước tính cơ bản** dựa trên dữ liệu bán/mua hàng trong hệ thống (thuế suất GTGT lấy theo từng mặt hàng, thuế TNDN tính đơn giản trên lợi nhuận gộp — chưa trừ chi phí quản lý, khấu hao, các khoản điều chỉnh thuế...). Đây **không phải** căn cứ kê khai thuế chính thức — vui lòng đối chiếu với kế toán/đơn vị tư vấn thuế trước khi nộp báo cáo thuế thật.

## Công nghệ sử dụng

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (biểu đồ)
- [Lucide React](https://lucide.dev/) (icon)
- [SheetJS / xlsx](https://sheetjs.com/) (xuất Excel)

## Cấu trúc thư mục

```
├── index.html
├── api/
│   └── storage.js         # Vercel Function: API lưu trữ key-value backed bởi Postgres
├── src/
│   ├── main.jsx           # entry point, mount app + nạp storage shim
│   ├── storage-shim.js    # window.storage: gọi api/storage.js, dự phòng localStorage nếu lỗi
│   ├── index.css          # Tailwind entry
│   └── BanHangApp.jsx     # toàn bộ ứng dụng (component chính)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
