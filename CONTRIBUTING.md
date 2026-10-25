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
- [ ] Có ít nhất 01 approval từ thành viên khác trước khi merge vào `develop`.

## GitHub enforcement

Workflow `.github/workflows/gitflow-policy.yml` sẽ kiểm tra PR vào `develop`: branch phải bắt đầu bằng `feature/` và phải có ít nhất một approval từ reviewer khác tác giả. GitHub API đã từ chối bật branch protection trực tiếp cho private repository trên plan hiện tại với thông báo cần GitHub Pro hoặc repository public. Khi repository được nâng plan hoặc chuyển public, bật thêm branch protection cho `develop` với `required_approving_review_count: 1`, dismiss stale reviews và required conversation resolution.

`main` là production branch; chỉ nhận thay đổi đã tích hợp qua release PR.
