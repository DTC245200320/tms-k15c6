# TMS Portal — Hệ thống quản lý đào tạo

TMS Portal là hệ thống điều hành đào tạo dựa trên backlog `HỆTHỐNGQUẢNLÝĐÀOTẠO-TTCS_T926_K15C6.xlsx`.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- Authentication: JWT access token + refresh token rotation
- Tooling: GitHub, Jira, Docker, Slack

## Git Flow

- `main`: nhánh sản phẩm ổn định (Production).
- `develop`: nhánh tích hợp code chính của các thành viên.
- `feature/<ID-Story>-<ten-tinh-nang>`: nhánh làm tính năng cá nhân, ví dụ `feature/S1-01-login-api`.

Không push trực tiếp vào `develop` hoặc `main`. Mọi thay đổi đi qua Pull Request. PR vào `develop` phải có ít nhất **01 thành viên review và phê duyệt** trước khi merge.

## Commit convention

```text
feat(S1-01): implement login API
fix(S1-02): resolve session timeout
```

Format: `<type>(<ID-Story>): <imperative description>`. Các type thường dùng: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.

## Local run

```bash
npm install
npm run dev

cd backend
npm install
npm run build
```

Khởi chạy toàn bộ service bằng `docker compose up --build`. Chi tiết branch mapping theo từng story nằm trong `branches/FE`, `branches/BE`; quy chuẩn cộng tác đầy đủ ở [`docs/git-flow.md`](docs/git-flow.md).

## Feature source scaffold

Mỗi branch trong `branches/FE` và `branches/BE` có thư mục source tương ứng. Frontend sample nằm ở `frontend/src/features/<branch-folder>` với `feature.config.ts`, `api.ts`, `screen.tsx`; backend sample nằm ở `backend/src/modules/<branch-folder>` với `module.ts`, `controller.ts`, `service.ts`. Đây là điểm bắt đầu độc lập cho từng story, không thay thế acceptance criteria của story.

## Interactive preview

Dashboard hiện hỗ trợ điều hướng theo module, lọc pipeline, đổi góc nhìn RBAC, responsive menu, mở form thao tác nhanh và submit các form demo. Dữ liệu form đang lưu ở phiên client để review UX; khi story BE hoàn thành, thay `api.ts` bằng HTTP client tới endpoint NestJS và thêm persistence PostgreSQL.

## Audit theo workbook

- Báo cáo đối chiếu 75 story, 9 epic, 8 vai trò: [`docs/system-audit.md`](docs/system-audit.md).
- Schema và seed domain: [`backend/src/database/schema.sql`](backend/src/database/schema.sql), [`backend/src/database/seed.sql`](backend/src/database/seed.sql).
- Hệ thống hiện đã có foundation/pilot API; các module còn lại phải hoàn thiện theo thứ tự P0/P1 trong audit, không coi scaffold branch là tính năng đã hoàn thành.

## Production deployment

Đây là cấu hình deploy thật, không chỉ mock UI:

```bash
export JWT_ACCESS_SECRET="$(openssl rand -hex 32)"
export JWT_REFRESH_SECRET="$(openssl rand -hex 32)"
export VITE_API_URL=http://localhost:3000
docker compose up --build
```

Frontend chạy trên `:8080`, backend NestJS trên `:3000`, PostgreSQL trên `:5432`. Backend tự migrate schema/seed khi `AUTO_MIGRATE=true`; refresh session và business records được lưu PostgreSQL. Vite bundle production dùng `VITE_API_URL` lúc build và Nginx đã bật SPA fallback cho `/login` và các route nội bộ.

Preview Sandbox không thay thế deploy production. Docker CLI không có trong môi trường kiểm tra hiện tại, vì vậy cần chạy lệnh compose trên máy/CI có Docker trước khi public Internet.
