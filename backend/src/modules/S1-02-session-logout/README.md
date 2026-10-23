# S1-02-session-logout

- Team: BE
- Story: S1-02
- Branch: `feature/S1-02-session-logout-backend`

## Scope

- Nhận refresh token qua `POST /auth/logout`.
- Băm token bằng SHA-256 trước khi truy vấn cơ sở dữ liệu.
- Thu hồi phiên tương ứng bằng cách cập nhật `refresh_sessions.revoked_at`.
- Logout có tính idempotent: token đã thu hồi hoặc không tồn tại vẫn trả về `success: true`, nhưng `revoked: false`.
- Không trả refresh token hoặc dữ liệu nhạy cảm trong response.

## Request

```json
{ "refreshToken": "<refresh-token>" }
```

## Response

```json
{ "success": true, "revoked": true }
```
