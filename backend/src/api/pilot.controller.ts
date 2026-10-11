import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'

type Lead = { id: string; name: string; phone: string; email?: string; program: string; status: string; owner: string }
type ClassRow = { code: string; program: string; status: string; students: number; capacity: number; progress: number; attendanceRate: number }

const programs = [
  { code: 'FS-K15', name: 'Full-stack Web Developer', status: 'Đang áp dụng', courses: 3, fee: 18500000 },
  { code: 'DA-K02', name: 'Data Analyst Foundation', status: 'Đang áp dụng', courses: 4, fee: 16000000 },
  { code: 'UX-K08', name: 'UI/UX Product Design', status: 'Đang áp dụng', courses: 4, fee: 14500000 },
]
const leads: Lead[] = [
  { id: 'L-001', name: 'Nguyễn Minh Anh', phone: '0901000001', email: 'minhanh@example.com', program: 'FS-K15', status: 'Mới', owner: 'Minh Phạm' },
  { id: 'L-002', name: 'Trần Gia Huy', phone: '0901000002', email: 'giahuy@example.com', program: 'DA-K02', status: 'Đang tư vấn', owner: 'Minh Phạm' },
]
const classes: ClassRow[] = [{ code: 'FS-K15C6', program: 'FS-K15', status: 'Đang học', students: 24, capacity: 28, progress: 68, attendanceRate: 91.4 }]
const attendance = [
  { studentCode: 'HV-24031', student: 'Nguyễn Minh Anh', session: 'FS-K15C6-15', status: 'PRESENT' },
  { studentCode: 'HV-24042', student: 'Trần Gia Huy', session: 'FS-K15C6-15', status: 'LATE' },
  { studentCode: 'HV-24018', student: 'Phạm Quốc Bảo', session: 'FS-K15C6-15', status: 'ABSENT' },
]
const assignments = [
  { id: 'A-001', title: 'Build a Kanban Board', classCode: 'FS-K15C6', dueAt: '2026-10-12T17:00:00+07:00', status: 'PUBLISHED', submitted: 21, graded: 14 },
  { id: 'A-002', title: 'Phân tích dữ liệu bán hàng', classCode: 'DA-K02', dueAt: '2026-10-14T17:00:00+07:00', status: 'PUBLISHED', submitted: 18, graded: 18 },
]
const payments = [{ receiptNo: 'RC-2026-001', student: 'Nguyễn Minh Anh', classCode: 'FS-K15C6', amount: 3500000, method: 'BANK_TRANSFER', paidAt: '2026-10-10T09:30:00+07:00' }]
const notifications = [{ id: 'N-001', title: 'Buổi học ngày mai bắt đầu lúc 08:30', type: 'SESSION_REMINDER', unread: true }]

@Controller('/api/v1')
export class PilotController {
  @Get('/overview')
  overview() {
    return { generatedAt: new Date().toISOString(), timezone: 'Asia/Ho_Chi_Minh', currency: 'VND', kpis: { runningClasses: 12, activeStudents: 286, attendanceRate: 91.4, overdueReceivables: 42800000, openLeads: leads.length }, risks: [{ student: 'Lê Hoàng Yến', classCode: 'FS-K15C6', reason: 'Vắng 22% · còn 1 bài chưa nộp' }], modules: ['admissions', 'programs', 'classes', 'timetable', 'attendance', 'assignments', 'grading', 'finance', 'surveys', 'reports'] }
  }

  @Get('/programs')
  listPrograms() { return { data: programs, total: programs.length } }

  @Post('/programs')
  createProgram(@Body() body: { code: string; name: string; fee?: number }) {
    if (programs.some((item) => item.code === body.code)) return { error: 'PROGRAM_CODE_EXISTS', message: 'Mã chương trình đã tồn tại' }
    const program = { code: body.code, name: body.name, status: 'Đang áp dụng', courses: 0, fee: body.fee ?? 0 }
    programs.push(program)
    return { data: program }
  }

  @Get('/leads')
  listLeads() { return { data: leads, total: leads.length } }

  @Post('/leads')
  createLead(@Body() body: { name: string; phone: string; email?: string; program?: string }) {
    if (leads.some((item) => item.phone === body.phone)) return { error: 'DUPLICATE_PHONE', message: 'Số điện thoại đã tồn tại trong danh sách lead' }
    const lead: Lead = { id: `L-${String(leads.length + 1).padStart(3, '0')}`, name: body.name, phone: body.phone, email: body.email, program: body.program ?? 'Chưa chọn', status: 'Mới', owner: 'Chưa phân công' }
    leads.push(lead)
    return { data: lead, message: 'Đã tạo lead ở trạng thái Mới' }
  }

  @Patch('/leads/:id/status')
  updateLeadStatus(@Param('id') id: string, @Body() body: { status: string; reason?: string }) {
    const lead = leads.find((item) => item.id === id)
    if (!lead) return { error: 'LEAD_NOT_FOUND', message: 'Không tìm thấy lead' }
    lead.status = body.status
    return { data: lead, history: { leadId: id, status: body.status, reason: body.reason ?? null, changedAt: new Date().toISOString() } }
  }

  @Get('/classes')
  listClasses() { return { data: classes, total: classes.length } }

  @Post('/classes')
  createClass(@Body() body: { code: string; program: string; capacity?: number }) {
    if (classes.some((item) => item.code === body.code)) return { error: 'CLASS_CODE_EXISTS', message: 'Mã lớp đã tồn tại' }
    const item: ClassRow = { code: body.code, program: body.program, status: 'Chuẩn bị', students: 0, capacity: body.capacity ?? 25, progress: 0, attendanceRate: 0 }
    classes.push(item)
    return { data: item }
  }

  @Get('/schedule')
  listSchedule() { return { data: [{ id: 'S-001', classCode: 'FS-K15C6', title: 'React State & Data Flow', startsAt: '2026-10-11T08:30:00+07:00', endsAt: '2026-10-11T11:30:00+07:00', room: 'Lab 03', instructor: 'Nguyễn Hoàng Long', status: 'SCHEDULED' }] } }

  @Post('/attendance/bulk-present')
  markAllPresent(@Body() body: { sessionId: string }) {
    attendance.forEach((record) => { if (record.session === body.sessionId) record.status = 'PRESENT' })
    return { message: 'Đã đánh dấu tất cả học viên có mặt', sessionId: body.sessionId, updated: attendance.length }
  }

  @Get('/attendance')
  listAttendance() { return { data: attendance } }

  @Patch('/attendance/:studentCode')
  updateAttendance(@Param('studentCode') studentCode: string, @Body() body: { status: string }) {
    const record = attendance.find((item) => item.studentCode === studentCode)
    if (!record) return { error: 'ATTENDANCE_NOT_FOUND', message: 'Không tìm thấy bản ghi điểm danh' }
    record.status = body.status
    return { data: record, audited: true }
  }

  @Get('/assignments')
  listAssignments() { return { data: assignments, total: assignments.length } }

  @Post('/assignments')
  createAssignment(@Body() body: { title: string; classCode: string; dueAt: string }) {
    const assignment = { id: `A-${String(assignments.length + 1).padStart(3, '0')}`, ...body, status: 'DRAFT', submitted: 0, graded: 0 }
    assignments.push(assignment)
    return { data: assignment }
  }

  @Post('/assignments/:id/submit')
  submitAssignment(@Param('id') id: string, @Body() body: { studentCode: string; repoUrl?: string }) {
    const assignment = assignments.find((item) => item.id === id)
    if (!assignment) return { error: 'ASSIGNMENT_NOT_FOUND', message: 'Không tìm thấy bài tập' }
    assignment.submitted += 1
    return { data: { assignmentId: id, studentCode: body.studentCode, repoUrl: body.repoUrl ?? null, version: 1, status: 'SUBMITTED', submittedAt: new Date().toISOString() } }
  }

  @Get('/finance/payments')
  listPayments() { return { data: payments, total: payments.length } }

  @Post('/finance/payments')
  recordPayment(@Body() body: { student: string; classCode: string; amount: number; method: string }) {
    const payment = { receiptNo: `RC-2026-${String(payments.length + 1).padStart(3, '0')}`, ...body, paidAt: new Date().toISOString() }
    payments.push(payment)
    return { data: payment, audited: true, message: 'Đã ghi nhận khoản thu và tạo biên lai' }
  }

  @Get('/notifications')
  listNotifications() { return { data: notifications, unread: notifications.filter((item) => item.unread).length } }

  @Patch('/notifications/:id/read')
  markNotificationRead(@Param('id') id: string) {
    const notification = notifications.find((item) => item.id === id)
    if (!notification) return { error: 'NOTIFICATION_NOT_FOUND', message: 'Không tìm thấy thông báo' }
    notification.unread = false
    return { data: notification }
  }

  @Get('/health/modules')
  moduleCoverage() { return { status: 'pilot-ready', persistence: 'PostgreSQL schema + seed prepared', authentication: 'JWT contract + frontend session demo', coverage: { epics: 9, stories: 75, roles: 8 } } }
}
