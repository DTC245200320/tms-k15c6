
-- Bootstrap production users. Override passwords and remove these rows after first deployment.
INSERT INTO users(email,password_hash,full_name,status)
VALUES
('admin@tms.edu.vn','$argon2id$v=19$m=65536,t=3,p=4$gIb7L+z2455mWoBSuRzN0Q$ST5zFDvRecEkGEt88ZdIUUpR3vwZwayBzfpmAKf64VM','Admin TMS','ACTIVE'),
('student@tms.edu.vn','$argon2id$v=19$m=65536,t=3,p=4$gIb7L+z2455mWoBSuRzN0Q$ST5zFDvRecEkGEt88ZdIUUpR3vwZwayBzfpmAKf64VM','Nguyễn Minh Anh','ACTIVE'),
('instructor@tms.edu.vn','$argon2id$v=19$m=65536,t=3,p=4$gIb7L+z2455mWoBSuRzN0Q$ST5zFDvRecEkGEt88ZdIUUpR3vwZwayBzfpmAKf64VM','Nguyễn Hoàng Long','ACTIVE')
ON CONFLICT (email) DO NOTHING;
INSERT INTO user_roles(user_id,role_code)
SELECT u.id, 'ADMIN' FROM users u WHERE u.email='admin@tms.edu.vn'
ON CONFLICT DO NOTHING;
INSERT INTO user_roles(user_id,role_code)
SELECT u.id, 'STUDENT' FROM users u WHERE u.email='student@tms.edu.vn'
ON CONFLICT DO NOTHING;
INSERT INTO user_roles(user_id,role_code)
SELECT u.id, 'INSTRUCTOR' FROM users u WHERE u.email='instructor@tms.edu.vn'
ON CONFLICT DO NOTHING;

INSERT INTO class_courses(class_id,course_id,sort_order,instructor_id)
SELECT cl.id, co.id, 1, u.id FROM classes cl, courses co, users u
WHERE cl.code='FS-K15C6' AND co.code='WEB-FE' AND u.email='instructor@tms.edu.vn'
ON CONFLICT (class_id,course_id) DO NOTHING;
INSERT INTO class_courses(class_id,course_id,sort_order,instructor_id)
SELECT cl.id, co.id, 2, u.id FROM classes cl, courses co, users u
WHERE cl.code='FS-K15C6' AND co.code='WEB-BE' AND u.email='instructor@tms.edu.vn'
ON CONFLICT (class_id,course_id) DO NOTHING;
INSERT INTO students(user_id,student_code,entry_level)
SELECT u.id,'HV-24031','Foundation' FROM users u WHERE u.email='student@tms.edu.vn'
ON CONFLICT (student_code) DO NOTHING;
INSERT INTO enrollments(class_id,student_id)
SELECT cl.id, st.id FROM classes cl, students st WHERE cl.code='FS-K15C6' AND st.student_code='HV-24031'
ON CONFLICT (class_id,student_id) DO NOTHING;
INSERT INTO class_sessions(class_id,class_course_id,starts_at,ends_at,room_id,instructor_id,status)
SELECT cl.id, cc.id, '2026-10-11 08:30:00+07','2026-10-11 11:30:00+07',r.id,u.id,'SCHEDULED'
FROM classes cl JOIN class_courses cc ON cc.class_id=cl.id JOIN courses co ON co.id=cc.course_id JOIN rooms r ON r.code='LAB-03' JOIN users u ON u.email='instructor@tms.edu.vn'
WHERE cl.code='FS-K15C6' AND co.code='WEB-FE'
AND NOT EXISTS (SELECT 1 FROM class_sessions s WHERE s.class_id=cl.id AND s.starts_at='2026-10-11 08:30:00+07');
INSERT INTO attendance_records(session_id,student_id,status)
SELECT cs.id, st.id, 'PRESENT' FROM class_sessions cs, students st WHERE st.student_code='HV-24031'
ON CONFLICT (session_id,student_id) DO NOTHING;
INSERT INTO assignments(class_course_id,title,description,due_at,max_score,status,created_by)
SELECT cc.id,'Build a Kanban Board','Xây dựng board React có drag and drop','2026-10-12 17:00:00+07',100,'PUBLISHED',u.id
FROM class_courses cc JOIN classes cl ON cl.id=cc.class_id JOIN courses co ON co.id=cc.course_id JOIN users u ON u.email='instructor@tms.edu.vn'
WHERE cl.code='FS-K15C6' AND co.code='WEB-FE'
AND NOT EXISTS (SELECT 1 FROM assignments a WHERE a.title='Build a Kanban Board');
INSERT INTO notifications(user_id,type,title,body,target_path)
SELECT id,'SESSION_REMINDER','Buổi học ngày mai bắt đầu lúc 08:30','Lớp FS-K15C6 học tại Lab 03.','/attendance'
FROM users WHERE email='student@tms.edu.vn'
AND NOT EXISTS (SELECT 1 FROM notifications n WHERE n.title='Buổi học ngày mai bắt đầu lúc 08:30');
