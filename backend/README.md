# TMS Backend — NestJS + PostgreSQL

Backend phục vụ các module auth/RBAC, users, programs, courses, classes, sessions, leads, attendance, assignments, grading, finance, reports và audit logs.

## Production runtime

Backend dùng PostgreSQL thật qua `DATABASE_URL`. Khi khởi động, `DatabaseService` kiểm tra kết nối, chạy `src/database/schema.sql` và seed idempotent trong `src/database/seed.sql` nếu `AUTO_MIGRATE=true`.

```bash
cp .env.example .env
npm install
npm run build
npm run start:dev
```

## JWT API

- `POST /auth/login`: access token 15 phút + refresh token 7 ngày.
- `POST /auth/refresh`: kiểm tra session trong PostgreSQL và xoay refresh token.
- `POST /auth/logout`: revoke refresh session.
- `POST /auth/change-password`: đổi mật khẩu và revoke các phiên cũ.
- Login failure được đếm; từ lần thất bại thứ 5 tài khoản bị khóa tạm thời.

## Business API

- `/api/v1/overview`
- `/api/v1/programs`, `/api/v1/courses`
- `/api/v1/leads`
- `/api/v1/classes`, `/api/v1/schedule`
- `/api/v1/attendance`
- `/api/v1/assignments`
- `/api/v1/finance/payments`
- `/api/v1/notifications`

Các API ghi dữ liệu trực tiếp vào bảng PostgreSQL, có `RETURNING`, unique constraints và audit-ready fields. Guard/permission decorators cần được bật trên từng route trước khi public Internet.

## Docker Compose

Từ thư mục gốc:

```bash
export JWT_ACCESS_SECRET="$(openssl rand -hex 32)"
export JWT_REFRESH_SECRET="$(openssl rand -hex 32)"
export VITE_API_URL=http://localhost:3000
docker compose up --build
```

- Frontend: `http://localhost:8080`
- Backend health: `http://localhost:3000/health`
- PostgreSQL: `localhost:5432`

Tài khoản bootstrap seed phải đổi mật khẩu ngay sau lần deploy đầu tiên:

```text
admin@tms.edu.vn / Admin@123
```

## Cấu trúc domain

```text
src/
  auth/          JWT login, refresh rotation, logout, change password
  api/           PostgreSQL-backed business API
  database/      schema, seed, DatabaseService, transactions
```
