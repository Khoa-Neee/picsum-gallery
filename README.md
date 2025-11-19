# IA02 – Picsum Photo Gallery

Ứng dụng React hoàn chỉnh giúp hiển thị ảnh từ **Lorem Picsum API**, hỗ trợ:

- Lưới ảnh responsive cùng tên tác giả
- Cuộn vô hạn với trạng thái tải và báo hết dữ liệu
- Xem chi tiết ảnh cùng liên kết tải xuống / trang nguồn
- Điều hướng bằng React Router (`/photos`, `/photos/:id`)
- Giao diện hiện đại dựa trên Material UI, hoạt động tốt trên mobile & desktop

## Chạy dự án

```bash
cd picsum-gallery
npm install
npm run dev
```

Sau khi chạy, truy cập địa chỉ mà Vite hiển thị (mặc định là http://localhost:5173).

## Kiến trúc & kỹ thuật

- **Vite + React + TypeScript**
- **React Router** cho điều hướng đa trang
- **Material UI** cho layout, theme và các component
- **Custom hook `useInfinitePhotos`** để quản lý tải dữ liệu phân trang, cuộn vô hạn và xử lý lỗi
- **API layer** tách riêng (`src/api/picsum.ts`) để dễ bảo trì và kiểm thử

## Build

```bash
npm run build
```

Kết quả build sẽ nằm trong thư mục `dist/`, sẵn sàng triển khai lên static hosting bất kỳ.
