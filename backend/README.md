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
