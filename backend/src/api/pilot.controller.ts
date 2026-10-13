import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'

@Controller('/api/v1')
export class PilotController {
  constructor(private readonly db: DatabaseService) {}

  @Get('/overview')
  async overview() {
    const [classes, students, attendance, receivables, leads] = await Promise.all([
      this.db.query<{ count: string }>(`SELECT count(*)::text AS count FROM classes WHERE status IN ('RUNNING','ACTIVE')`),
      this.db.query<{ count: string }>(`SELECT count(*)::text AS count FROM students WHERE status='ACTIVE'`),
      this.db.query<{ rate: string | null }>(`SELECT round(avg(CASE WHEN status IN ('PRESENT','LATE') THEN 100 ELSE 0 END), 1)::text AS rate FROM attendance_records`),
      this.db.query<{ amount: string | null }>(`SELECT coalesce(sum(pi.amount - pi.paid_amount), 0)::text AS amount FROM payment_installments pi WHERE pi.status <> 'PAID'`),
      this.db.query<{ count: string }>(`SELECT count(*)::text AS count FROM leads WHERE status NOT IN ('ENROLLED','REJECTED')`),
    ])
    return { generatedAt: new Date().toISOString(), timezone: 'Asia/Ho_Chi_Minh', currency: 'VND', kpis: { runningClasses: Number(classes.rows[0]?.count ?? 0), activeStudents: Number(students.rows[0]?.count ?? 0), attendanceRate: Number(attendance.rows[0]?.rate ?? 0), overdueReceivables: Number(receivables.rows[0]?.amount ?? 0), openLeads: Number(leads.rows[0]?.count ?? 0) }, modules: ['admissions', 'programs', 'classes', 'timetable', 'attendance', 'assignments', 'grading', 'finance', 'surveys', 'reports'] }
  }

  @Get('/programs')
  async listPrograms() { const result = await this.db.query(`SELECT id, code, name, status, duration_sessions AS "durationSessions", standard_fee AS fee FROM programs ORDER BY created_at DESC`); return { data: result.rows, total: result.rowCount } }

  @Post('/programs')
  async createProgram(@Body() body: { code: string; name: string; durationSessions: number; fee?: number; description?: string }) {
    const result = await this.db.query(`INSERT INTO programs(code,name,description,duration_sessions,standard_fee) VALUES($1,$2,$3,$4,$5) RETURNING *`, [body.code, body.name, body.description ?? null, body.durationSessions, body.fee ?? 0])
    return { data: result.rows[0] }
  }

  @Get('/courses')
  async listCourses() { const result = await this.db.query(`SELECT id, code, name, sessions_count AS "sessionsCount", weight, learning_outcomes AS "learningOutcomes", status FROM courses ORDER BY code`); return { data: result.rows, total: result.rowCount } }

  @Post('/courses')
  async createCourse(@Body() body: { code: string; name: string; sessionsCount: number; weight?: number; learningOutcomes?: string }) {
    const result = await this.db.query(`INSERT INTO courses(code,name,sessions_count,weight,learning_outcomes) VALUES($1,$2,$3,$4,$5) RETURNING *`, [body.code, body.name, body.sessionsCount, body.weight ?? 100, body.learningOutcomes ?? null])
    return { data: result.rows[0] }
  }

  @Get('/leads')
  async listLeads() { const result = await this.db.query(`SELECT l.id, l.full_name AS name, l.phone, l.email, l.source, l.status, p.code AS program, l.created_at AS "createdAt" FROM leads l LEFT JOIN programs p ON p.id=l.interested_program_id ORDER BY l.created_at DESC`); return { data: result.rows, total: result.rowCount } }

  @Post('/leads')
  async createLead(@Body() body: { name: string; phone: string; email?: string; programCode?: string; source?: string }) {
    const result = await this.db.query(`INSERT INTO leads(full_name,phone,email,source,interested_program_id) VALUES($1,$2,$3,$4,(SELECT id FROM programs WHERE code=$5)) RETURNING id, full_name AS name, phone, email, source, status, created_at AS "createdAt"`, [body.name, body.phone, body.email ?? null, body.source ?? 'Website', body.programCode ?? null])
    return { data: result.rows[0], message: 'Đã tạo lead ở trạng thái NEW' }
  }

  @Patch('/leads/:id/status')
  async updateLeadStatus(@Param('id') id: string, @Body() body: { status: string; reason?: string }) {
    const result = await this.db.query(`UPDATE leads SET status=$2, rejection_reason=$3, updated_at=now() WHERE id=$1 RETURNING *`, [id, body.status, body.reason ?? null])
    return result.rowCount ? { data: result.rows[0] } : { error: 'LEAD_NOT_FOUND', message: 'Không tìm thấy lead' }
  }

  @Get('/classes')
  async listClasses() { const result = await this.db.query(`SELECT c.id, c.code, p.code AS program, p.name AS "programName", c.status, c.max_students AS capacity, count(e.id)::int AS students, c.expected_start_date AS "startDate" FROM classes c JOIN programs p ON p.id=c.program_id LEFT JOIN enrollments e ON e.class_id=c.id AND e.lifecycle_status='ACTIVE' GROUP BY c.id,p.code,p.name ORDER BY c.created_at DESC`); return { data: result.rows, total: result.rowCount } }

  @Post('/classes')
  async createClass(@Body() body: { code: string; programCode: string; startDate?: string; capacity?: number; deliveryMode?: string }) {
    const result = await this.db.query(`INSERT INTO classes(code,program_id,expected_start_date,max_students,delivery_mode) VALUES($1,(SELECT id FROM programs WHERE code=$2),$3,$4,$5) RETURNING *`, [body.code, body.programCode, body.startDate ?? null, body.capacity ?? 25, body.deliveryMode ?? 'ONSITE'])
    return { data: result.rows[0] }
  }

  @Get('/schedule')
  async listSchedule() { const result = await this.db.query(`SELECT s.id, c.code AS "classCode", co.name AS course, s.starts_at AS "startsAt", s.ends_at AS "endsAt", r.name AS room, s.status FROM class_sessions s JOIN classes c ON c.id=s.class_id LEFT JOIN class_courses cc ON cc.id=s.class_course_id LEFT JOIN courses co ON co.id=cc.course_id LEFT JOIN rooms r ON r.id=s.room_id ORDER BY s.starts_at`); return { data: result.rows } }

  @Get('/attendance')
  async listAttendance() { const result = await this.db.query(`SELECT ar.id, ar.status, ar.note, st.student_code AS "studentCode", u.full_name AS student, cs.starts_at AS "startsAt", c.code AS "classCode" FROM attendance_records ar JOIN students st ON st.id=ar.student_id LEFT JOIN users u ON u.id=st.user_id JOIN class_sessions cs ON cs.id=ar.session_id JOIN classes c ON c.id=cs.class_id ORDER BY cs.starts_at DESC`); return { data: result.rows } }

  @Post('/attendance/bulk-present')
  async markAllPresent(@Body() body: { sessionId: string; markedBy?: string }) { const result = await this.db.query(`UPDATE attendance_records SET status='PRESENT', marked_at=now() WHERE session_id=$1 RETURNING id`, [body.sessionId]); return { message: 'Đã đánh dấu tất cả học viên có mặt', updated: result.rowCount } }

  @Patch('/attendance/:id')
  async updateAttendance(@Param('id') id: string, @Body() body: { status: string; note?: string }) { const result = await this.db.query(`UPDATE attendance_records SET status=$2,note=$3,marked_at=now() WHERE id=$1 RETURNING *`, [id, body.status, body.note ?? null]); return result.rowCount ? { data: result.rows[0] } : { error: 'ATTENDANCE_NOT_FOUND' } }

  @Get('/assignments')
  async listAssignments() { const result = await this.db.query(`SELECT a.id, a.title, a.description, a.due_at AS "dueAt", a.max_score AS "maxScore", a.status, c.code AS "classCode", count(s.id)::int AS submissions FROM assignments a LEFT JOIN class_courses cc ON cc.id=a.class_course_id LEFT JOIN classes c ON c.id=cc.class_id LEFT JOIN submissions s ON s.assignment_id=a.id GROUP BY a.id,c.code ORDER BY a.due_at`); return { data: result.rows, total: result.rowCount } }

  @Post('/assignments')
  async createAssignment(@Body() body: { title: string; description?: string; dueAt: string; maxScore?: number; classCourseId?: string }) { const result = await this.db.query(`INSERT INTO assignments(title,description,due_at,max_score,class_course_id,status) VALUES($1,$2,$3,$4,$5,'PUBLISHED') RETURNING *`, [body.title, body.description ?? null, body.dueAt, body.maxScore ?? 100, body.classCourseId ?? null]); return { data: result.rows[0] } }

  @Post('/assignments/:id/submit')
  async submitAssignment(@Param('id') id: string, @Body() body: { studentId: string; repoUrl?: string }) { const submission = await this.db.query(`INSERT INTO submissions(assignment_id,student_id,status) VALUES($1,$2,'SUBMITTED') ON CONFLICT(assignment_id,student_id) DO UPDATE SET status='SUBMITTED' RETURNING id`, [id, body.studentId]); const version = await this.db.query(`INSERT INTO submission_versions(submission_id,version_no,repo_url) VALUES($1,1,$2) RETURNING *`, [submission.rows[0].id, body.repoUrl ?? null]); return { data: version.rows[0] } }

  @Get('/finance/payments')
  async listPayments() { const result = await this.db.query(`SELECT p.id, p.receipt_no AS "receiptNo", p.amount, p.method, p.paid_at AS "paidAt", pi.due_date AS "dueDate", st.student_code AS "studentCode" FROM payments p JOIN payment_installments pi ON pi.id=p.installment_id JOIN payment_plans pp ON pp.id=pi.plan_id JOIN students st ON st.id=pp.student_id ORDER BY p.paid_at DESC`); return { data: result.rows, total: result.rowCount } }

  @Get('/notifications')
  async listNotifications() { const result = await this.db.query<{ readAt: string | null }>(`SELECT id,type,title,body,target_path AS "targetPath",read_at AS "readAt",created_at AS "createdAt" FROM notifications ORDER BY created_at DESC`); return { data: result.rows, unread: result.rows.filter((item) => !item.readAt).length } }

  @Patch('/notifications/:id/read')
  async markNotificationRead(@Param('id') id: string) { const result = await this.db.query(`UPDATE notifications SET read_at=now() WHERE id=$1 RETURNING *`, [id]); return result.rowCount ? { data: result.rows[0] } : { error: 'NOTIFICATION_NOT_FOUND' } }

  @Get('/health/modules')
  moduleCoverage() { return { status: 'production-foundation', persistence: 'PostgreSQL migrations + seed', authentication: 'JWT contract', coverage: { epics: 9, stories: 75, roles: 8 } } }
}
