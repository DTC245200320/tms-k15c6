-- Demo seed for the Excel pilot flow. Replace password hashes before production.
INSERT INTO roles (code, name, description) VALUES
('GUEST','Khách truy cập','Gửi yêu cầu tư vấn công khai'),
('STUDENT','Học viên','Xem lịch, bài tập, điểm và học phí của mình'),
('INSTRUCTOR','Giảng viên','Điểm danh, giao bài, chấm điểm lớp phụ trách'),
('TA','Trợ giảng','Hỗ trợ điểm danh/chấm bài trong phạm vi được ủy quyền'),
('TRAINING_MANAGER','Quản lý đào tạo','Vận hành chương trình, lớp, lịch và chất lượng'),
('ADMISSIONS','Tư vấn tuyển sinh','Quản lý lead và chuyển đổi nhập học'),
('ACCOUNTANT','Kế toán','Quản lý biểu phí, thu tiền và công nợ'),
('ADMIN','Quản trị hệ thống','Quản trị tài khoản, quyền và nhật ký')
ON CONFLICT (code) DO NOTHING;

INSERT INTO permissions(code, description) VALUES
('users:read','Xem tài khoản'),('users:write','Quản trị tài khoản'),('programs:read','Xem chương trình'),('programs:write','Quản trị chương trình'),('leads:read','Xem lead'),('leads:write','Quản trị lead'),('attendance:read','Xem điểm danh'),('attendance:write','Ghi điểm danh'),('assignments:read','Xem bài tập'),('assignments:write','Quản trị bài tập'),('grading:read','Xem điểm'),('grading:write','Chấm điểm'),('finance:read','Xem học phí'),('finance:write','Ghi nhận thanh toán'),('reports:read','Xem báo cáo'),('audit:read','Xem nhật ký')
ON CONFLICT (code) DO NOTHING;

INSERT INTO programs(code,name,description,duration_sessions,standard_fee) VALUES
('FS-K15','Full-stack Web Developer','Lộ trình React, NestJS, PostgreSQL và triển khai sản phẩm',60,18500000),
('DA-K02','Data Analyst Foundation','SQL, phân tích dữ liệu và trực quan hóa',36,16000000),
('UX-K08','UI/UX Product Design','Nghiên cứu người dùng và thiết kế sản phẩm',32,14500000)
ON CONFLICT (code) DO NOTHING;

INSERT INTO courses(code,name,sessions_count,weight,learning_outcomes) VALUES
('WEB-FE','Frontend Engineering','24',40,'Xây dựng giao diện React có cấu trúc'),
('WEB-BE','Backend Engineering','24',40,'Thiết kế API NestJS và dữ liệu PostgreSQL'),
('WEB-CAP','Capstone Project','12',20,'Hoàn thiện và demo sản phẩm')
ON CONFLICT (code) DO NOTHING;

INSERT INTO rooms(code,name,capacity,meeting_url) VALUES
('LAB-03','Lab 03',28,NULL),('ROOM-204','Phòng 204',24,NULL),('ONLINE-01','Online Zoom',100,'https://zoom.example.com/tms-demo')
ON CONFLICT (code) DO NOTHING;

INSERT INTO leads(full_name,phone,email,source,interested_program_id,status)
SELECT 'Nguyễn Minh Anh','0901000001','minhanh@example.com','Facebook',id,'NEW' FROM programs WHERE code='FS-K15'
AND NOT EXISTS (SELECT 1 FROM leads WHERE phone='0901000001');
INSERT INTO leads(full_name,phone,email,source,interested_program_id,status)
SELECT 'Trần Gia Huy','0901000002','giahuy@example.com','Landing page',id,'CONSULTING' FROM programs WHERE code='DA-K02'
AND NOT EXISTS (SELECT 1 FROM leads WHERE phone='0901000002');

INSERT INTO classes(code,program_id,expected_start_date,max_students,delivery_mode,status)
SELECT 'FS-K15C6',id,'2026-10-19',28,'HYBRID','RUNNING' FROM programs WHERE code='FS-K15'
AND NOT EXISTS (SELECT 1 FROM classes WHERE code='FS-K15C6');

INSERT INTO fee_catalog(program_id,effective_from,amount)
SELECT id,'2026-01-01',standard_fee FROM programs
ON CONFLICT (program_id,effective_from) DO NOTHING;
