# Quy chuẩn cộng tác

## Quy trình branch

1. Cập nhật `develop`: `git switch develop && git pull --rebase origin develop`.
2. Tạo feature branch đúng mẫu: `git switch -c feature/S1-01-login-api`.
3. Commit theo mẫu story, không gom nhiều story không liên quan.
4. Push branch và mở PR vào `develop`.
5. Chờ ít nhất một reviewer phê duyệt; xử lý comment trước khi merge.
6. Sau khi CI xanh và đủ approval, squash merge; xóa branch sau merge.

## PR checklist

- [ ] Tên branch chứa đúng ID Story.
- [ ] Commit tuân theo Conventional Commit + Story ID.
- [ ] Mô tả PR có mục tiêu, acceptance criteria và cách test.
- [ ] Không để secret trong source hoặc commit.
- [ ] CI build/typecheck/test xanh.
- [ ] Có ít nhất một approval từ thành viên khác trước khi merge vào `develop`.

## Quy tắc bảo vệ

Branch protection được cấu hình trên GitHub cho `develop` với required approving reviews = 1, dismiss stale reviews = true và required conversation resolution = true. `main` là production branch, chỉ nhận thay đổi đã tích hợp qua release PR.
