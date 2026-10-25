# Git Flow & quy chuẩn cộng tác TMS

## Nhánh chuẩn

| Nhánh | Mục đích | Quyền merge |
|---|---|---|
| `main` | Nhánh sản phẩm ổn định, production | Release PR sau khi `develop` xanh |
| `develop` | Nhánh tích hợp code chính của các thành viên | PR bắt buộc có ít nhất 1 reviewer approved |
| `feature/<ID-Story>-<ten-tinh-nang>` | Nhánh làm tính năng cá nhân | Không push trực tiếp vào `develop` |

Các nhánh FE/BE được ánh xạ thành thư mục riêng trong `branches/FE` và `branches/BE`. Với S1, FE dùng hậu tố `-ui`, BE dùng tên story thuần; từ S2 trở đi dùng tiền tố `-fe-` và `-be-`. Tên `feature/S1-08-user-account-` được chuẩn hóa thành `feature/S1-08-user-account` để tránh dấu gạch ở cuối.

## Commit và PR

Commit phải bắt đầu bằng loại thay đổi và ID story, ví dụ `feat(S1-01): implement login API` hoặc `fix(S1-02): resolve session timeout`. Một PR chỉ nên bao phủ một story hoặc một slice kỹ thuật nhỏ. Tiêu đề PR nên ghi `[S1-01] Login API`, mô tả có AC đã hoàn thành, ảnh preview nếu có UI, rủi ro migration và cách test.

PR vào `develop` cần ít nhất **một thành viên review và phê duyệt trước khi merge**. CI phải xanh cho typecheck, lint, unit test và build. Không dùng force-push lên `main`/`develop`; nếu conflict, rebase trên nhánh feature rồi cập nhật PR.

## CI/CD và công cụ

GitHub Actions kiểm tra mọi PR; Docker Compose cung cấp frontend, NestJS backend và PostgreSQL cục bộ. Jira là nguồn theo dõi story/point; mã Jira nên xuất hiện trong branch/commit/PR. Slack nhận thông báo CI, PR, release và cảnh báo staging. `main` phát hành production, `develop` triển khai staging.

## Definition of Done

Story chỉ được đóng khi AC đã được kiểm chứng, code đã qua review, unit test service đạt nhánh mới tối thiểu 60%, CI xanh, quyền được chặn ở server và bản staging chạy được. Các thay đổi schema phải có migration additive, không xóa dữ liệu nếu chưa có phê duyệt.
