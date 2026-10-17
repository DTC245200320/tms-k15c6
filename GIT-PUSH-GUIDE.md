# Hướng dẫn push code TMS Portal lên GitHub

Repository: `https://github.com/Dvihndg/tms-portal-k15c6`

## 1. Clone repository

```bash
git clone https://github.com/Dvihndg/tms-portal-k15c6.git
cd tms-portal-k15c6
```

## 2. Đồng bộ develop trước khi làm việc

```bash
git fetch origin
git switch develop
git pull --rebase origin develop
```

Không làm việc trực tiếp trên `main` hoặc `develop`.

## 3. Tạo feature branch

### Backend S1

```bash
git switch -c feature/S1-01-login
git switch -c feature/S1-02-session-logout
git switch -c feature/S1-03-password-reset
git switch -c feature/S1-04-change-password
git switch -c feature/S1-05-rbac
git switch -c feature/S1-06-permission-based-navigation-menu
git switch -c feature/S1-07-unauthorized-and-forbidden-handling
git switch -c feature/S1-08-user-account
git switch -c feature/S1-09-user-role-assignment
git switch -c feature/S1-10-account-lock-and-unlock
```

### Frontend S1

```bash
git switch -c feature/S1-01-login-ui
git switch -c feature/S1-02-session-logout-ui
git switch -c feature/S1-03-password-reset-ui
git switch -c feature/S1-04-change-password-ui
git switch -c feature/S1-05-rbac-ui
git switch -c feature/S1-06-permission-based-navigation-menu-ui
git switch -c feature/S1-07-unauthorized-and-forbidden-handling-ui
git switch -c feature/S1-08-user-account-ui
git switch -c feature/S1-09-user-role-assignment-ui
git switch -c feature/S1-10-account-lock-and-unlock-ui
```

Các sprint S2–S8 dùng đúng tiền tố:

```text
feature/S<n>-<id>-be-<ten-tinh-nang>
feature/S<n>-<id>-fe-<ten-tinh-nang>
```

## 4. Commit đúng quy tắc

```bash
git add .
git commit -m "feat(S1-01): implement login API"
```

Ví dụ khác:

```bash
git commit -m "fix(S1-02): resolve session timeout"
git commit -m "test(S4-07): cover attendance permission"
git commit -m "docs(S7-03): document receipt workflow"
```

## 5. Push feature branch

```bash
git push -u origin feature/S1-01-login
```

Hoặc FE:

```bash
git push -u origin feature/S1-01-login-ui
```

## 6. Tạo Pull Request

```bash
gh pr create \
  --base develop \
  --head feature/S1-01-login \
  --title "feat(S1-01): implement login API" \
  --body-file .github/pull_request_template.md
```

PR bắt buộc:

- Base branch là `develop`.
- Có ít nhất **1 reviewer** review và approve.
- CI build/lint/test phải xanh.
- Mô tả rõ story ID và acceptance criteria đã hoàn thành.
- Không merge trực tiếp vào `main`.

## 7. Sau khi PR được merge

```bash
git switch develop
git pull --rebase origin develop
git branch -d feature/S1-01-login
```

## 8. Release production

Chỉ người phụ trách release mới tạo PR:

```text
develop -> main
```

`main` là nhánh production ổn định. Không force push và không commit trực tiếp lên `main`.

## 9. Chạy hệ thống local

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run start:dev
```

Build kiểm tra:

```bash
npm run build
cd backend && npm run build
```
