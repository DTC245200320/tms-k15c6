# TMS Backend — NestJS + PostgreSQL

Backend production đặt mục tiêu phục vụ các module auth/RBAC, users, programs, courses, classes, sessions, leads, attendance, assignments, grading, finance, reports và audit logs.

## Auth contract

- `POST /auth/login` trả access token ngắn hạn và refresh token dài hạn.
- `POST /auth/refresh` rotate refresh token; token cũ bị revoke.
- `POST /auth/logout` revoke session ngay phía server.
- `POST /auth/change-password` yêu cầu mật khẩu hiện tại và revoke các session khác.
- `JwtAuthGuard` xác thực access token; `RolesGuard`/`PermissionsGuard` kiểm tra quyền ở server, mặc định deny.
- Tài khoản bị khóa phải revoke toàn bộ refresh session và không được login.

## Cấu trúc dự kiến

```text
src/
  auth/          controller, service, jwt strategy, guards, DTO
  users/         profile, role assignment, lock/unlock, bulk import
  programs/      program, course, roadmap, course sessions
  admissions/    public consultation, leads, assignment, funnel
  classes/       class lifecycle, enrollments, timetable conflicts
  attendance/    attendance, leave requests, risk flags
  assignments/   submission versions, rubric, grading
  finance/       fee plans, payments, receipts, receivables
  reports/       dashboards, exports, surveys, audit log
  database/      migrations and seed data
```

## Local run

Copy `.env.example` to `.env`, run `docker compose up postgres backend frontend --build`, then open the frontend. Production reads `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_ORIGIN` and never ships these values to the browser.

## Domain foundation từ Excel

- `src/database/schema.sql`: schema PostgreSQL cho EP-01 đến EP-09.
- `src/database/seed.sql`: dữ liệu pilot chương trình, lớp, phòng và lead.
- `GET /api/v1/overview`: KPI dashboard và danh sách module.
- `GET /api/v1/programs`, `GET /api/v1/leads`, `POST /api/v1/leads`, `GET /api/v1/classes`: API pilot cho vòng đời tuyển sinh/lớp.
- `GET /api/v1/health/modules`: coverage contract của 9 epic, 75 story và 8 role.

> Đây là foundation/pilot API. Trước production cần nối repository PostgreSQL, JWT guard, refresh rotation, queue email và object storage theo Definition of Done trong workbook.

## JWT API đã hoạt động

- `POST /auth/login`: trả access token 15 phút và refresh token 7 ngày.
- `POST /auth/refresh`: kiểm tra, xoay vòng và thu hồi refresh token cũ.
- `POST /auth/logout`: thu hồi refresh token.
- `POST /auth/change-password`: kiểm tra mật khẩu hiện tại và chính sách chữ + số, tối thiểu 8 ký tự.
- CRUD pilot: `/api/v1/programs`, `/api/v1/leads`, `/api/v1/classes`, `/api/v1/schedule`, `/api/v1/attendance`, `/api/v1/assignments`, `/api/v1/finance/payments`, `/api/v1/notifications`.
