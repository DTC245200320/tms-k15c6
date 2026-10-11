# Tài khoản demo theo RBAC

> Đây là tài khoản demo cho preview. Khi triển khai thật, mật khẩu phải được hash bằng Argon2/bcrypt, không lưu plaintext.

| Email | Mật khẩu demo | Vai trò | Quyền chính |
|---|---|---|---|
| `admin@tms.edu.vn` | `Admin@123` | Quản trị hệ thống | Dashboard, người dùng & quyền, báo cáo |
| `manager@tms.edu.vn` | `Manager@123` | Quản lý đào tạo | Điều hành, học tập, tài chính, báo cáo |
| `admissions@tms.edu.vn` | `Admissions@123` | Tư vấn tuyển sinh | Tuyển sinh, chương trình, lịch học, báo cáo |
| `instructor@tms.edu.vn` | `Instructor@123` | Giảng viên | Chương trình, lịch học, điểm danh, bài tập, báo cáo |
| `accounting@tms.edu.vn` | `Accounting@123` | Kế toán | Học phí & công nợ, báo cáo |

## Preview

Mở `/login`, chọn tài khoản ở danh sách **TÀI KHOẢN DEMO THEO QUYỀN**, nhập mật khẩu tương ứng rồi đăng nhập. Role được lưu trong `sessionStorage` cho phiên demo và sẽ được thay bằng JWT access/refresh token khi nối API NestJS.
