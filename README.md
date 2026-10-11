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
