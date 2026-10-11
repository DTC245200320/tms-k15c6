import { Body, Controller, Get, Post } from '@nestjs/common'

const programs = [
  { code: 'FS-K15', name: 'Full-stack Web Developer', status: 'Đang áp dụng', courses: 3, fee: 18500000 },
  { code: 'DA-K02', name: 'Data Analyst Foundation', status: 'Đang áp dụng', courses: 4, fee: 16000000 },
  { code: 'UX-K08', name: 'UI/UX Product Design', status: 'Đang áp dụng', courses: 4, fee: 14500000 },
]
const leads = [
  { id: 'L-001', name: 'Nguyễn Minh Anh', phone: '0901000001', program: 'FS-K15', status: 'Mới', owner: 'Minh Phạm' },
  { id: 'L-002', name: 'Trần Gia Huy', phone: '0901000002', program: 'DA-K02', status: 'Đang tư vấn', owner: 'Minh Phạm' },
]

@Controller('/api/v1')
export class PilotController {
  @Get('/overview')
  overview() {
    return {
      generatedAt: new Date().toISOString(),
      timezone: 'Asia/Ho_Chi_Minh',
      currency: 'VND',
      kpis: { runningClasses: 12, activeStudents: 286, attendanceRate: 91.4, overdueReceivables: 42800000, openLeads: 34 },
      risks: [{ student: 'Lê Hoàng Yến', classCode: 'FS-K15C6', reason: 'Vắng 22% · còn 1 bài chưa nộp' }],
      modules: ['admissions', 'programs', 'classes', 'timetable', 'attendance', 'assignments', 'grading', 'finance', 'surveys', 'reports'],
    }
  }

  @Get('/programs')
  listPrograms() { return { data: programs, total: programs.length } }

  @Get('/leads')
  listLeads() { return { data: leads, total: leads.length } }

  @Post('/leads')
  createLead(@Body() body: { name: string; phone: string; email?: string; program?: string }) {
    const lead = { id: `L-${String(leads.length + 1).padStart(3, '0')}`, ...body, program: body.program ?? 'Chưa chọn', status: 'Mới', owner: 'Chưa phân công' }
    leads.push(lead)
    return { data: lead, message: 'Đã tạo lead ở trạng thái Mới' }
  }

  @Get('/classes')
  listClasses() {
    return { data: [{ code: 'FS-K15C6', program: 'FS-K15', status: 'Đang học', students: 24, capacity: 28, progress: 68, attendanceRate: 91.4 }] }
  }

  @Get('/health/modules')
  moduleCoverage() {
    return { status: 'pilot-ready', persistence: 'PostgreSQL schema + seed prepared', authentication: 'JWT contract + frontend session demo', coverage: { epics: 9, stories: 75, roles: 8 } }
  }
}
