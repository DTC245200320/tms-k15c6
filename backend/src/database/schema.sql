CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS citext;

-- EP-01: identity, RBAC, sessions and audit
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email CITEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, full_name VARCHAR(120) NOT NULL, phone VARCHAR(20),
  date_of_birth DATE, address TEXT, avatar_url TEXT,
  status VARCHAR(24) NOT NULL DEFAULT 'PENDING_ACTIVATION',
  failed_login_count INTEGER NOT NULL DEFAULT 0, locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS roles (code VARCHAR(32) PRIMARY KEY, name VARCHAR(80) NOT NULL, description TEXT);
CREATE TABLE IF NOT EXISTS permissions (code VARCHAR(80) PRIMARY KEY, description TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS role_permissions (role_code VARCHAR(32) REFERENCES roles(code) ON DELETE CASCADE, permission_code VARCHAR(80) REFERENCES permissions(code) ON DELETE CASCADE, PRIMARY KEY (role_code, permission_code));
CREATE TABLE IF NOT EXISTS user_roles (user_id UUID REFERENCES users(id) ON DELETE CASCADE, role_code VARCHAR(32) REFERENCES roles(code), assigned_by UUID REFERENCES users(id), assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(), PRIMARY KEY (user_id, role_code));
CREATE TABLE IF NOT EXISTS refresh_sessions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, revoked_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS password_reset_tokens (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, used_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS audit_logs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), actor_id UUID REFERENCES users(id), action VARCHAR(80) NOT NULL, entity_type VARCHAR(80) NOT NULL, entity_id UUID, before_json JSONB, after_json JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT now());

-- EP-02: program -> course -> lessons
CREATE TABLE IF NOT EXISTS programs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32) UNIQUE NOT NULL, name VARCHAR(160) NOT NULL, description TEXT, duration_sessions INTEGER NOT NULL CHECK (duration_sessions > 0), standard_fee NUMERIC(14,2) NOT NULL DEFAULT 0, status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE', created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS courses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32) UNIQUE NOT NULL, name VARCHAR(160) NOT NULL, sessions_count INTEGER NOT NULL CHECK (sessions_count > 0), weight NUMERIC(5,2) NOT NULL DEFAULT 100, learning_outcomes TEXT, status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE');
CREATE TABLE IF NOT EXISTS program_courses (program_id UUID REFERENCES programs(id) ON DELETE CASCADE, course_id UUID REFERENCES courses(id), sort_order INTEGER NOT NULL, prerequisite_course_id UUID REFERENCES courses(id), PRIMARY KEY (program_id, course_id));
CREATE TABLE IF NOT EXISTS course_lessons (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE, lesson_no INTEGER NOT NULL, topic VARCHAR(200) NOT NULL, objective TEXT, UNIQUE(course_id, lesson_no));

-- EP-03: public consultation, leads, students and enrollment
CREATE TABLE IF NOT EXISTS leads (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), full_name VARCHAR(120) NOT NULL, phone VARCHAR(20) NOT NULL, email CITEXT, source VARCHAR(80), interested_program_id UUID REFERENCES programs(id), owner_id UUID REFERENCES users(id), status VARCHAR(32) NOT NULL DEFAULT 'NEW', rejection_reason TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS idx_leads_status_owner ON leads(status, owner_id);
CREATE TABLE IF NOT EXISTS lead_activities (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE, actor_id UUID REFERENCES users(id), activity_type VARCHAR(32) NOT NULL, content TEXT NOT NULL, next_follow_up_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS students (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID UNIQUE REFERENCES users(id), student_code VARCHAR(32) UNIQUE NOT NULL, entry_level TEXT, notes TEXT, status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE');

-- EP-04: classes, rooms, timetable and student lifecycle
CREATE TABLE IF NOT EXISTS rooms (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32) UNIQUE NOT NULL, name VARCHAR(120) NOT NULL, capacity INTEGER CHECK (capacity > 0), meeting_url TEXT, status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE');
CREATE TABLE IF NOT EXISTS classes (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(32) UNIQUE NOT NULL, program_id UUID NOT NULL REFERENCES programs(id), expected_start_date DATE, max_students INTEGER NOT NULL CHECK (max_students > 0), delivery_mode VARCHAR(24) NOT NULL DEFAULT 'ONSITE', status VARCHAR(24) NOT NULL DEFAULT 'PREPARING', created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS class_courses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE, course_id UUID NOT NULL REFERENCES courses(id), sort_order INTEGER NOT NULL, instructor_id UUID REFERENCES users(id), UNIQUE(class_id, course_id));
CREATE TABLE IF NOT EXISTS class_assistants (class_course_id UUID REFERENCES class_courses(id) ON DELETE CASCADE, assistant_id UUID REFERENCES users(id), PRIMARY KEY(class_course_id, assistant_id));
CREATE TABLE IF NOT EXISTS enrollments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), class_id UUID NOT NULL REFERENCES classes(id), student_id UUID NOT NULL REFERENCES students(id), enrolled_at DATE NOT NULL DEFAULT CURRENT_DATE, ended_at DATE, lifecycle_status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE', UNIQUE(class_id, student_id));
CREATE TABLE IF NOT EXISTS student_transitions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id), from_class_id UUID REFERENCES classes(id), to_class_id UUID REFERENCES classes(id), transition_type VARCHAR(24) NOT NULL, effective_date DATE NOT NULL, reason TEXT NOT NULL, actor_id UUID REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS class_sessions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE, class_course_id UUID REFERENCES class_courses(id), lesson_id UUID REFERENCES course_lessons(id), starts_at TIMESTAMPTZ NOT NULL, ends_at TIMESTAMPTZ NOT NULL, room_id UUID REFERENCES rooms(id), instructor_id UUID REFERENCES users(id), status VARCHAR(24) NOT NULL DEFAULT 'SCHEDULED', cancellation_reason TEXT, UNIQUE(class_id, starts_at));
CREATE INDEX IF NOT EXISTS idx_class_sessions_time ON class_sessions(starts_at, ends_at);

-- EP-05: attendance and leave requests
CREATE TABLE IF NOT EXISTS attendance_records (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID NOT NULL REFERENCES class_sessions(id) ON DELETE CASCADE, student_id UUID NOT NULL REFERENCES students(id), status VARCHAR(24) NOT NULL CHECK (status IN ('PRESENT','LATE','EXCUSED','ABSENT')), note TEXT, marked_by UUID REFERENCES users(id), marked_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(session_id, student_id));
CREATE TABLE IF NOT EXISTS leave_requests (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID NOT NULL REFERENCES class_sessions(id), student_id UUID NOT NULL REFERENCES students(id), reason TEXT NOT NULL, evidence_url TEXT, status VARCHAR(24) NOT NULL DEFAULT 'PENDING', reviewed_by UUID REFERENCES users(id), reviewed_at TIMESTAMPTZ, review_note TEXT);

-- EP-06 and EP-09: materials, announcements, assignments and submissions
CREATE TABLE IF NOT EXISTS file_assets (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), storage_key TEXT UNIQUE NOT NULL, original_name TEXT NOT NULL, mime_type VARCHAR(120) NOT NULL, size_bytes BIGINT NOT NULL, uploaded_by UUID REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS learning_materials (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), session_id UUID REFERENCES class_sessions(id), title VARCHAR(200) NOT NULL, asset_id UUID REFERENCES file_assets(id), external_url TEXT, uploaded_by UUID REFERENCES users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS announcements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title VARCHAR(200) NOT NULL, body TEXT NOT NULL, author_id UUID REFERENCES users(id), published_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS announcement_classes (announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE, class_id UUID REFERENCES classes(id) ON DELETE CASCADE, PRIMARY KEY(announcement_id, class_id));
CREATE TABLE IF NOT EXISTS assignments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), class_course_id UUID REFERENCES class_courses(id), session_id UUID REFERENCES class_sessions(id), title VARCHAR(200) NOT NULL, description TEXT, due_at TIMESTAMPTZ NOT NULL, max_score NUMERIC(6,2) NOT NULL CHECK (max_score > 0), late_policy VARCHAR(24) NOT NULL DEFAULT 'ALLOW_MARK_LATE', status VARCHAR(24) NOT NULL DEFAULT 'DRAFT', created_by UUID REFERENCES users(id));
CREATE TABLE IF NOT EXISTS assignment_assets (assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE, asset_id UUID REFERENCES file_assets(id), PRIMARY KEY(assignment_id, asset_id));
CREATE TABLE IF NOT EXISTS submissions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE, student_id UUID NOT NULL REFERENCES students(id), status VARCHAR(24) NOT NULL DEFAULT 'NOT_SUBMITTED', published_score NUMERIC(6,2), published_at TIMESTAMPTZ, UNIQUE(assignment_id, student_id));
CREATE TABLE IF NOT EXISTS submission_versions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE, version_no INTEGER NOT NULL, repo_url TEXT, submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), is_late BOOLEAN NOT NULL DEFAULT false, UNIQUE(submission_id, version_no));
CREATE TABLE IF NOT EXISTS rubrics (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(160) NOT NULL, total_weight NUMERIC(5,2) NOT NULL DEFAULT 100, created_by UUID REFERENCES users(id));
CREATE TABLE IF NOT EXISTS rubric_criteria (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), rubric_id UUID NOT NULL REFERENCES rubrics(id) ON DELETE CASCADE, name VARCHAR(160) NOT NULL, weight NUMERIC(5,2) NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS grades (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE, grader_id UUID REFERENCES users(id), score NUMERIC(6,2) NOT NULL, feedback TEXT NOT NULL, status VARCHAR(24) NOT NULL DEFAULT 'DRAFT', rework_due_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());

-- EP-07: final results and graduation
CREATE TABLE IF NOT EXISTS grading_configs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), program_id UUID REFERENCES programs(id), class_id UUID REFERENCES classes(id), pass_score NUMERIC(5,2) NOT NULL DEFAULT 50, attendance_threshold NUMERIC(5,2) NOT NULL DEFAULT 80, components JSONB NOT NULL DEFAULT '[]');
CREATE TABLE IF NOT EXISTS final_grades (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id), class_course_id UUID NOT NULL REFERENCES class_courses(id), score NUMERIC(6,2), result VARCHAR(24) NOT NULL DEFAULT 'INCOMPLETE', locked_at TIMESTAMPTZ, locked_by UUID REFERENCES users(id), UNIQUE(student_id, class_course_id));
CREATE TABLE IF NOT EXISTS graduation_reviews (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id), class_id UUID NOT NULL REFERENCES classes(id), eligible BOOLEAN NOT NULL DEFAULT false, reasons JSONB NOT NULL DEFAULT '[]', confirmed_at TIMESTAMPTZ, confirmed_by UUID REFERENCES users(id), UNIQUE(student_id, class_id));

-- EP-08: fee catalogue, plans, receipts and receivables
CREATE TABLE IF NOT EXISTS fee_catalog (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), program_id UUID NOT NULL REFERENCES programs(id), effective_from DATE NOT NULL, amount NUMERIC(14,2) NOT NULL CHECK (amount >= 0), status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE', UNIQUE(program_id, effective_from));
CREATE TABLE IF NOT EXISTS scholarships (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id), kind VARCHAR(16) NOT NULL, amount NUMERIC(14,2) NOT NULL, reason TEXT NOT NULL, approved_by UUID REFERENCES users(id));
CREATE TABLE IF NOT EXISTS payment_plans (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), student_id UUID NOT NULL REFERENCES students(id), class_id UUID NOT NULL REFERENCES classes(id), gross_amount NUMERIC(14,2) NOT NULL, discount_amount NUMERIC(14,2) NOT NULL DEFAULT 0, net_amount NUMERIC(14,2) NOT NULL, status VARCHAR(24) NOT NULL DEFAULT 'ACTIVE');
CREATE TABLE IF NOT EXISTS payment_installments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), plan_id UUID NOT NULL REFERENCES payment_plans(id) ON DELETE CASCADE, installment_no INTEGER NOT NULL, due_date DATE NOT NULL, amount NUMERIC(14,2) NOT NULL, paid_amount NUMERIC(14,2) NOT NULL DEFAULT 0, status VARCHAR(24) NOT NULL DEFAULT 'UNPAID', UNIQUE(plan_id, installment_no));
CREATE TABLE IF NOT EXISTS payments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), installment_id UUID NOT NULL REFERENCES payment_installments(id), receipt_no VARCHAR(40) UNIQUE NOT NULL, amount NUMERIC(14,2) NOT NULL CHECK (amount > 0), method VARCHAR(24) NOT NULL, paid_at TIMESTAMPTZ NOT NULL DEFAULT now(), received_by UUID REFERENCES users(id), note TEXT);

-- EP-09: notifications, surveys and reporting
CREATE TABLE IF NOT EXISTS notifications (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, type VARCHAR(40) NOT NULL, title VARCHAR(200) NOT NULL, body TEXT NOT NULL, target_path TEXT, read_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS notification_preferences (user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, email_enabled BOOLEAN NOT NULL DEFAULT true, reminder_hours INTEGER NOT NULL DEFAULT 12);
CREATE TABLE IF NOT EXISTS surveys (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), class_id UUID NOT NULL REFERENCES classes(id), title VARCHAR(200) NOT NULL, opens_at TIMESTAMPTZ NOT NULL, closes_at TIMESTAMPTZ NOT NULL, anonymous_to_instructor BOOLEAN NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS survey_questions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE, prompt TEXT NOT NULL, question_type VARCHAR(24) NOT NULL, sort_order INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS survey_responses (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE, student_id UUID NOT NULL REFERENCES students(id), submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(survey_id, student_id));
CREATE TABLE IF NOT EXISTS survey_answers (response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE, question_id UUID REFERENCES survey_questions(id) ON DELETE CASCADE, score NUMERIC(6,2), text_answer TEXT, PRIMARY KEY(response_id, question_id));

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read_at);
CREATE INDEX IF NOT EXISTS idx_installments_due ON payment_installments(due_date, status);
