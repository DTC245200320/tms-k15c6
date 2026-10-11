# TMS Portal — System Audit & Build Plan

> Nguồn yêu cầu: `HỆTHỐNGQUẢNLÝĐÀOTẠO-TTCS_T926_K15C6.xlsx` (Product Overview, User Roles, Epics, Product Backlog, Sprint Plan).

## 1. Kết luận audit

- Workbook: **75 user story**, **9 epic**, **8 vai trò**, **350 point**, **8 sprint**.
- In-scope: vòng đời từ lead → ghi danh → lớp học → lịch → điểm danh → bài tập/chấm điểm → học phí → bảng điểm/tốt nghiệp → khảo sát/báo cáo.
- Non-functional: JWT access/refresh, bcrypt/Argon2, server-side RBAC, audit log, responsive 360px, Asia/Ho_Chi_Minh, VND, backup 7 bản.
- Out-of-scope theo Excel: mobile native, payment gateway, LMS/video/code auto-grading, chat realtime, SSO/LDAP, e-invoice, multi-tenant.

## 2. Trạng thái hiện tại

| Khu vực | Hiện trạng | Mức thiếu |
|---|---|---|
| Frontend shell | Dashboard, 9 view demo, role switcher, form demo | Chưa nối API/persistence; thiếu Student, TA, Guest; nhiều AC chưa có |
| Backend | Health endpoint, auth contract, 75 module scaffold | Chưa có auth controller/service thật, guard, DTO, repository, use case |
| Database | users, user_roles, refresh_sessions, audit_logs | Thiếu toàn bộ domain đào tạo, tuyển sinh, lớp, lịch, điểm danh, bài tập, học phí, khảo sát |
| CI/CD | GitHub Actions build frontend/backend | Chưa có migration/seed/integration test/deploy verification |
| Collaboration | main/develop/150 feature branches, templates | Cần cập nhật DoD và traceability theo story |

## 3. Phạm vi triển khai theo epic

| Epic | Module cần hoàn thiện | Ưu tiên |
|---|---|---|
| EP-01 | Auth, account, RBAC, profile, import, audit | P0 |
| EP-02 | Program → course → lesson/session catalog | P0 |
| EP-03 | Public consultation, lead funnel, assignment, conversion, enrollment | P0 |
| EP-04 | Classes, rooms, instructor assignment, timetable, transfer/hold/dropout | P0 |
| EP-05 | Attendance, leave request, thresholds, alerts, export | P0 |
| EP-06 | Assignment lifecycle, submissions, versions, grading, rubric, rework | P0 |
| EP-07 | Weighted grading, transcript, completion/graduation | P1 |
| EP-08 | Fee catalog, installment plans, receipts, discounts, receivables, revenue | P0 |
| EP-09 | Materials, announcements, notifications, surveys, dashboards/reports | P1 |

## 4. Ma trận story

| Story | Sprint | Epic | Priority | Backend | Frontend |
|---|---:|---|---|---|---|
| S1-01 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-02 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-03 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-04 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-05 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-06 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-07 | 1 | EP-01 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-08 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-09 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S1-10 | 1 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-01 | 2 | EP-01 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-02 | 2 | EP-01 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-03 | 2 | EP-01 | Could | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-04 | 2 | EP-02 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-05 | 2 | EP-02 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-06 | 2 | EP-02 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-07 | 2 | EP-02 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-08 | 2 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-09 | 2 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-10 | 2 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S2-11 | 2 | EP-03 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-01 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-02 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-03 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-04 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-05 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-06 | 3 | EP-03 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-07 | 3 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-08 | 3 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S3-09 | 3 | EP-04 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-01 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-02 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-03 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-04 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-05 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-06 | 4 | EP-04 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-07 | 4 | EP-05 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S4-08 | 4 | EP-05 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-01 | 5 | EP-05 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-02 | 5 | EP-05 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-03 | 5 | EP-05 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-04 | 5 | EP-05 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-05 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-06 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-07 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-08 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-09 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S5-10 | 5 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-01 | 6 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-02 | 6 | EP-06 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-03 | 6 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-04 | 6 | EP-06 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-05 | 6 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-06 | 6 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-07 | 6 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-08 | 6 | EP-09 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-09 | 6 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-10 | 6 | EP-09 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S6-11 | 6 | EP-01 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-01 | 7 | EP-08 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-02 | 7 | EP-08 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-03 | 7 | EP-08 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-04 | 7 | EP-08 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-05 | 7 | EP-08 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-06 | 7 | EP-08 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-07 | 7 | EP-08 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S7-08 | 7 | EP-08 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-01 | 8 | EP-07 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-02 | 8 | EP-07 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-03 | 8 | EP-07 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-04 | 8 | EP-07 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-05 | 8 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-06 | 8 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-07 | 8 | EP-09 | Must | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |
| S8-08 | 8 | EP-09 | Should | Scaffold / chưa hoàn thiện | Scaffold; module demo nếu nằm trong dashboard |

## 5. Lộ trình hoàn thiện

1. **P0 Foundation:** migrations, seed pilot, auth JWT rotation, lockout 15 phút, server-side RBAC, audit log, error contract.
2. **P0 Pilot flow:** program/course/session → lead → conversion → class/enrollment → schedule → attendance.
3. **P0 Learning loop:** assignment → submission/version → grading/rubric → publish/rework → notification.
4. **P0 Finance:** fee versioning → payment plan → receipt → receivable → reminder → revenue report.
5. **P1 Outcome:** final grades, transcript PDF, graduation eligibility, survey anonymity, dashboards.
6. **Quality gate:** mỗi story có DTO + service test + permission test + API contract + responsive UI + PR review + CI xanh.

## 6. Tiêu chí “hoàn chỉnh” đối chiếu Excel

- Không coi việc ẩn menu là phân quyền: mọi route/API phải có guard và scope dữ liệu ở server.
- Không coi mock form là persistence: mọi thao tác nghiệp vụ phải có transaction và audit khi chạm điểm, học phí, role.
- Seed được một lớp pilot chạy đủ chu trình để nghiệm thu Sprint 8.
- Có test cho Student, TA, Instructor, Admissions, Accountant, Training Manager và Admin; Guest chỉ được public consultation.
- Dữ liệu và thông báo dùng múi giờ `Asia/Ho_Chi_Minh`, tiền VND; file upload qua object-storage adapter.
