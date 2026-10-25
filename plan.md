# TMS Portal — kế hoạch triển khai

## Phạm vi đã chọn

Bản preview tập trung vào **Sprint 1–2 và control room vận hành** để người dùng có thể thử ngay luồng quản lý đào tạo: tổng quan chỉ số, tuyển sinh, chương trình & lớp học, lịch học, điểm danh, bài tập, học phí, báo cáo và quản trị người dùng. Dữ liệu demo được suy ra từ workbook `HỆTHỐNGQUẢNLÝĐÀOTẠO-TTCS_T926_K15C6.xlsx` (8 sprint, 9 epic, 75 story, 350 point).

Kiến trúc đích giữ đúng yêu cầu: React + TypeScript ở frontend; NestJS + PostgreSQL ở backend; JWT access token + refresh token; Docker, GitHub, Jira và Slack cho vận hành. Preview dùng dữ liệu cục bộ có kiểu dữ liệu rõ ràng để không phụ thuộc DB trong lúc review UI; các module backend và migration contract được đặt sẵn trong `backend/`.

## Cấu trúc triển khai

- `src/App.tsx`: shell dashboard, role-aware navigation, các view vận hành và trạng thái demo.
- `src/styles.css`: hệ thống visual control-room, responsive 360px, bảng, biểu đồ CSS và motion.
- `backend/src/auth/`: contract NestJS cho JWT, refresh-token rotation, RBAC guard.
- `backend/src/database/`: mô hình PostgreSQL/Prisma dự kiến cho users, leads, programs, classes, sessions, attendance, assignments, invoices và audit logs.
- `docs/git-flow.md`: quy tắc nhánh, commit, PR review và CI/CD.
- `branches/`: thư mục mapping riêng theo từng nhánh FE/BE để đội dự án clone đúng scope.

## Thiết kế

- **Design movement:** editorial operations dashboard kết hợp Swiss grid có nhịp lệch và chất “morning control room”, tránh cảm giác admin template đại trà.
- **Core principles:** một màn hình nắm được nhịp vận hành; ưu tiên thứ cần xử lý hôm nay; dữ liệu có ngữ cảnh; quyền hiển thị theo vai trò.
- **Color philosophy:** navy mực tạo cảm giác kiểm soát và tin cậy; mint là tín hiệu tiến độ; coral chỉ dành cho rủi ro; nền kem giúp dữ liệu bớt lạnh.
- **Layout paradigm:** sidebar neo cố định + canvas rộng, hero card lệch nhịp, các module dùng đường kẻ và timeline thay vì card đồng kích thước.
- **Signature elements:** logo ba cột như biểu đồ tiến độ; nhãn `LIVE / TODAY / RISK`; progress bar mint và chấm trạng thái dạng pulse.
- **Interaction:** click menu thay đổi view ngay, filter tìm kiếm theo dữ liệu demo, quick action tạo toast, role switcher mô phỏng RBAC.
- **Animation:** fade-up 220ms cho panel, slide nhẹ ở sidebar mobile, pulse chậm cho trạng thái live; tôn trọng `prefers-reduced-motion`.
- **Typography:** Manrope cho tiêu đề/nhãn số; DM Sans cho dữ liệu và microcopy.
- **Brand essence:** “TMS biến backlog đào tạo thành nhịp vận hành nhìn thấy được”; điềm tĩnh, sắc sảo, hữu dụng.
- **Brand voice:** headline nói bằng động từ rõ ràng; CTA cụ thể. Ví dụ: “Chốt nhịp vận hành hôm nay” và “Mở lớp từ chương trình có sẵn”.
- **Wordmark/logo:** ba cột màu mint–yellow–coral nằm trong khối navy, gợi chương trình → lớp → kết quả.
- **Signature brand color:** `#79e2c2` mint TMS.

## Build workflow

1. `npm install`
2. `npm run build`
3. `npm run dev` trên port 3000 cho WebDev Preview.
4. Backend production sẽ chạy riêng qua Docker Compose, đọc `DATABASE_URL` và `JWT_*` từ environment; không nhúng secret vào bundle frontend.
5. CI trên GitHub chạy lint/typecheck/build/test; merge vào `develop` cần ít nhất một reviewer; `main` chỉ nhận release PR.
