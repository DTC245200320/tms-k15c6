import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListFilter,
  Menu,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import './styles.css'

type ViewKey = 'dashboard' | 'admissions' | 'programs' | 'schedule' | 'attendance' | 'assignments' | 'finance' | 'reports' | 'users'
type Role = 'Quản lý đào tạo' | 'Tư vấn tuyển sinh' | 'Giảng viên' | 'Kế toán' | 'Quản trị hệ thống'
type StatusTone = 'mint' | 'yellow' | 'coral' | 'blue' | 'violet'

type NavItem = { id: ViewKey; label: string; icon: LucideIcon; badge?: string; roles?: Role[] }
type Lead = { name: string; program: string; source: string; owner: string; age: string; status: string; tone: StatusTone }
type ClassRow = { code: string; name: string; instructor: string; progress: number; students: string; status: string; tone: StatusTone }

const navGroups: { title: string; items: NavItem[] }[] = [
  {
    title: 'Điều hành',
    items: [
      { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
      { id: 'admissions', label: 'Tuyển sinh & lead', icon: Target, badge: '12' },
      { id: 'programs', label: 'Chương trình & lớp', icon: BookOpen },
      { id: 'schedule', label: 'Lịch học', icon: CalendarDays },
    ],
  },
  {
    title: 'Học tập',
    items: [
      { id: 'attendance', label: 'Điểm danh', icon: ClipboardCheck, badge: '3' },
      { id: 'assignments', label: 'Bài tập & chấm điểm', icon: FileText },
      { id: 'finance', label: 'Học phí & công nợ', icon: CreditCard, roles: ['Kế toán', 'Quản lý đào tạo'] },
    ],
  },
  {
    title: 'Phân tích & quản trị',
    items: [
      { id: 'reports', label: 'Báo cáo', icon: TrendingUp },
      { id: 'users', label: 'Người dùng & quyền', icon: ShieldCheck, roles: ['Quản trị hệ thống'] },
    ],
  },
]

const roleAccess: Record<Role, ViewKey[]> = {
  'Quản lý đào tạo': ['dashboard', 'admissions', 'programs', 'schedule', 'attendance', 'assignments', 'finance', 'reports'],
  'Tư vấn tuyển sinh': ['dashboard', 'admissions', 'programs', 'schedule', 'reports'],
  'Giảng viên': ['dashboard', 'programs', 'schedule', 'attendance', 'assignments', 'reports'],
  'Kế toán': ['dashboard', 'finance', 'reports'],
  'Quản trị hệ thống': ['dashboard', 'users', 'reports'],
}

const roleLabels: Record<Role, string> = {
  'Quản lý đào tạo': 'Training Manager',
  'Tư vấn tuyển sinh': 'Admissions',
  'Giảng viên': 'Instructor',
  'Kế toán': 'Accountant',
  'Quản trị hệ thống': 'Admin',
}

const leads: Lead[] = [
  { name: 'Nguyễn Minh Anh', program: 'Full-stack K15', source: 'Facebook', owner: 'Linh Trần', age: '12 phút', status: 'Mới', tone: 'blue' },
  { name: 'Trần Gia Huy', program: 'Data Analyst', source: 'Landing page', owner: 'Minh Phạm', age: '1 giờ', status: 'Đang tư vấn', tone: 'violet' },
  { name: 'Lê Hoàng Yến', program: 'Full-stack K15', source: 'Giới thiệu', owner: 'Linh Trần', age: '3 giờ', status: 'Hẹn học thử', tone: 'yellow' },
  { name: 'Phạm Quốc Bảo', program: 'UI/UX Foundation', source: 'Google', owner: 'Minh Phạm', age: 'Hôm qua', status: 'Đã liên hệ', tone: 'mint' },
]

const classRows: ClassRow[] = [
  { code: 'FS-K15C6', name: 'Full-stack Web Developer', instructor: 'Nguyễn Hoàng Long', progress: 68, students: '24 / 28', status: 'Đang học', tone: 'mint' },
  { code: 'DA-K02', name: 'Data Analyst Foundation', instructor: 'Trần Minh Quân', progress: 42, students: '18 / 24', status: 'Đang học', tone: 'mint' },
  { code: 'UX-K08', name: 'UI/UX Product Design', instructor: 'Phạm Ngọc Hà', progress: 16, students: '21 / 25', status: 'Chuẩn bị', tone: 'yellow' },
  { code: 'FS-K14C4', name: 'Full-stack Web Developer', instructor: 'Lê Anh Tuấn', progress: 100, students: '26 / 26', status: 'Kết thúc', tone: 'blue' },
]

const sessions = [
  { time: '08:30', title: 'React State & Data Flow', className: 'FS-K15C6', room: 'Lab 03', person: 'Nguyễn Hoàng Long', tone: 'violet' as StatusTone },
  { time: '13:30', title: 'SQL Window Functions', className: 'DA-K02', room: 'Phòng 204', person: 'Trần Minh Quân', tone: 'mint' as StatusTone },
  { time: '18:30', title: 'Design System Workshop', className: 'UX-K08', room: 'Online · Zoom', person: 'Phạm Ngọc Hà', tone: 'yellow' as StatusTone },
]

const tasks = [
  { title: 'Chấm bài Sprint 04', detail: 'FS-K15C6 · 7 bài chưa chấm', due: 'Hôm nay, 17:00', tone: 'coral' as StatusTone },
  { title: 'Duyệt đơn xin vắng', detail: '3 đơn chờ xử lý', due: 'Cần xử lý', tone: 'yellow' as StatusTone },
  { title: 'Gửi lịch khai giảng', detail: 'UX-K08 · 25 học viên', due: 'Ngày mai', tone: 'mint' as StatusTone },
]

const attendanceRows = [
  { name: 'Nguyễn Minh Anh', code: 'HV-24031', sessions: '14 / 15', rate: 93, flag: 'Ổn định', tone: 'mint' as StatusTone },
  { name: 'Trần Gia Huy', code: 'HV-24042', sessions: '11 / 15', rate: 73, flag: 'Theo dõi', tone: 'yellow' as StatusTone },
  { name: 'Phạm Quốc Bảo', code: 'HV-24018', sessions: '9 / 15', rate: 60, flag: 'Rủi ro cao', tone: 'coral' as StatusTone },
  { name: 'Lê Hoàng Yến', code: 'HV-24037', sessions: '15 / 15', rate: 100, flag: 'Ổn định', tone: 'mint' as StatusTone },
]

const invoices = [
  { name: 'Nguyễn Minh Anh', className: 'FS-K15C6', amount: '18.500.000 đ', paid: '12.000.000 đ', due: '6.500.000 đ', status: 'Còn 2 ngày', tone: 'yellow' as StatusTone },
  { name: 'Trần Gia Huy', className: 'DA-K02', amount: '16.000.000 đ', paid: '16.000.000 đ', due: '0 đ', status: 'Đã hoàn tất', tone: 'mint' as StatusTone },
  { name: 'Phạm Quốc Bảo', className: 'FS-K15C6', amount: '18.500.000 đ', paid: '6.000.000 đ', due: '12.500.000 đ', status: 'Quá hạn 4 ngày', tone: 'coral' as StatusTone },
]

const formatCurrency = (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)} đ`

function Logo() {
  return (
    <div className="logo-lockup">
      <div className="logo-bars" aria-hidden="true"><i /><i /><i /></div>
      <div><strong>TMS<span>.</span></strong><small>TRAINING OPERATING SYSTEM</small></div>
    </div>
  )
}

function StatusPill({ children, tone = 'mint' }: { children: ReactNode; tone?: StatusTone }) {
  return <span className={`status-pill ${tone}`}><i />{children}</span>
}

function MiniSparkline({ color = 'mint', down = false }: { color?: StatusTone; down?: boolean }) {
  return <div className={`mini-sparkline ${color} ${down ? 'down' : ''}`} aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
}

type ActionType = 'quick' | 'lead' | 'class' | 'attendance' | 'assignment' | 'payment' | 'account'

const actionCopy: Record<Exclude<ActionType, 'quick'>, { title: string; description: string; fields: string[]; submit: string }> = {
  lead: { title: 'Tạo lead mới', description: 'Thêm một tín hiệu tuyển sinh vào pipeline để đội tư vấn tiếp tục chăm sóc.', fields: ['Họ và tên', 'Số điện thoại', 'Chương trình quan tâm'], submit: 'Tạo lead' },
  class: { title: 'Mở lớp mới', description: 'Khởi tạo lớp từ catalogue chương trình và gán giảng viên phụ trách.', fields: ['Mã lớp', 'Chương trình', 'Giảng viên phụ trách'], submit: 'Mở lớp' },
  attendance: { title: 'Điểm danh buổi học', description: 'Cập nhật nhanh trạng thái tham dự cho lớp đang diễn ra.', fields: ['Lớp học', 'Buổi học', 'Ghi chú ngoại lệ'], submit: 'Lưu điểm danh' },
  assignment: { title: 'Tạo bài tập', description: 'Giao một bài tập mới và đặt hạn nộp cho học viên.', fields: ['Tên bài tập', 'Lớp học', 'Hạn nộp'], submit: 'Tạo bài tập' },
  payment: { title: 'Ghi nhận thanh toán', description: 'Lưu khoản thu vào sổ công nợ và phát hành biên lai.', fields: ['Học viên', 'Số tiền', 'Phương thức thanh toán'], submit: 'Ghi nhận khoản thu' },
  account: { title: 'Thêm tài khoản', description: 'Tạo tài khoản và gán vai trò theo nguyên tắc RBAC.', fields: ['Họ và tên', 'Email công việc', 'Vai trò'], submit: 'Tạo tài khoản' },
}

function ActionModal({ type, onClose, onSaved }: { type: ActionType; onClose: () => void; onSaved: (message: string) => void }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const config = type === 'quick' ? null : actionCopy[type]
    onClose()
    onSaved(config ? `${config.title} đã được lưu vào phiên demo.` : 'Đã chọn một tác vụ nhanh cho workspace.')
  }
  if (type === 'quick') return <div className="modal-backdrop" onMouseDown={onClose}><div className="action-modal quick-modal" onMouseDown={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">QUICK ACTIONS</p><h2>Chọn việc cần làm</h2><p>Mở đúng form thay vì chỉ xem thông báo.</p></div><button className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="quick-actions"><button onClick={() => onSaved('Đã chọn form tạo lead mới.')}><Target size={17} /><span><strong>Tạo lead</strong><small>Thêm tín hiệu vào pipeline</small></span><ArrowUpRight size={14} /></button><button onClick={() => onSaved('Đã chọn form mở lớp mới.')}><BookOpen size={17} /><span><strong>Mở lớp</strong><small>Khởi tạo từ catalogue</small></span><ArrowUpRight size={14} /></button><button onClick={() => onSaved('Đã chọn form gửi thông báo.')}><Bell size={17} /><span><strong>Gửi thông báo</strong><small>Chạm tới một nhóm học viên</small></span><ArrowUpRight size={14} /></button></div></div></div>
  const config = actionCopy[type]
  return <div className="modal-backdrop" onMouseDown={onClose}><form className="action-modal" onSubmit={save} onMouseDown={(event) => event.stopPropagation()}><div className="modal-heading"><div><p className="eyebrow">INTERACTIVE DEMO</p><h2>{config.title}</h2><p>{config.description}</p></div><button type="button" className="icon-button" onClick={onClose}><X size={18} /></button></div><div className="modal-fields">{config.fields.map((field, index) => <label key={field}>{field}<input required value={values[field] ?? ''} onChange={(event) => setValues({ ...values, [field]: event.target.value })} placeholder={index === 0 ? 'Nhập thông tin...' : 'Chọn hoặc nhập giá trị'} /></label>)}</div><div className="modal-actions"><button type="button" className="button button-ghost" onClick={onClose}>Hủy</button><button type="submit" className="button button-dark"><Check size={15} />{config.submit}</button></div></form></div>
}

function LoginView({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('linh.tran@tms.edu.vn')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || password.length < 4) { setError('Vui lòng nhập email và mật khẩu tối thiểu 4 ký tự.'); return }
    if (remember) window.sessionStorage.setItem('tms_session', 'demo-access-token')
    onLogin()
  }
  return <div className="login-page"><div className="login-glow glow-one" /><div className="login-glow glow-two" /><div className="login-brand"><Logo /><span className="secure-chip"><ShieldCheck size={14} /> JWT protected workspace</span></div><div className="login-layout"><section className="login-story"><p className="eyebrow light">TRAINING OPERATING SYSTEM</p><h1>Đăng nhập để<br /><em>giữ nhịp đào tạo.</em></h1><p>Điều hành tuyển sinh, lớp học và trải nghiệm học viên trong một control room thống nhất.</p><div className="login-story-stats"><span><strong>642</strong><small>học viên đang học</small></span><span><strong>18</strong><small>lớp đang chạy</small></span><span><strong>92,4%</strong><small>chuyên cần</small></span></div></section><form className="login-card" onSubmit={submit}><div className="login-card-heading"><p className="eyebrow">WELCOME BACK</p><h2>Chào Linh.</h2><p>Đăng nhập vào workspace <strong>TTCS · K15C6</strong></p></div><label>Email công việc<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ten@tms.edu.vn" autoComplete="email" /></label><label>Mật khẩu<div className="password-field"><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" autoComplete="current-password" /><span><ShieldCheck size={15} /></span></div></label><div className="login-options"><label className="checkbox-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> Ghi nhớ phiên đăng nhập</label><button type="button" className="link-button" onClick={() => setError('Đã gửi hướng dẫn đặt lại mật khẩu đến email demo.')}>Quên mật khẩu?</button></div>{error && <p className="login-error">{error}</p>}<button className="button button-dark login-submit" type="submit">Đăng nhập workspace <ArrowUpRight size={16} /></button><div className="login-divider"><span>hoặc tiếp tục với</span></div><button type="button" className="sso-button" onClick={() => { setPassword('demo'); onLogin() }}><span className="sso-mark">G</span> Đăng nhập Google Workspace</button><p className="login-footnote"><ShieldCheck size={13} /> Access Token + Refresh Token · RBAC enabled</p></form></div><p className="login-copyright">TMS Portal · TTCS K15C6 <span>·</span> Hệ thống quản lý đào tạo</p></div>
}

function SectionHeading({ eyebrow, title, description, action, onAction }: { eyebrow: string; title: string; description?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="heading-description">{description}</p>}</div>
      {action && <button className="button button-dark" onClick={onAction}><Plus size={16} />{action}</button>}
    </div>
  )
}

function MetricCard({ label, value, delta, note, icon: Icon, tone, down = false }: { label: string; value: string; delta: string; note: string; icon: LucideIcon; tone: StatusTone; down?: boolean }) {
  return (
    <article className="metric-card">
      <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={17} /></span></div>
      <strong className="metric-value">{value}</strong>
      <div className="metric-bottom"><span className={down ? 'delta down' : 'delta'}>{down ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}{delta}</span><span>{note}</span><MiniSparkline color={tone} down={down} /></div>
    </article>
  )
}

function DashboardView({ onNavigate, onToast }: { onNavigate: (view: ViewKey) => void; onToast: (text: string) => void }) {
  return (
    <>
      <SectionHeading eyebrow="THỨ HAI · 11 THÁNG 10, 2026" title="Chào buổi sáng, Linh." description="Mọi nhịp vận hành đang trong tầm kiểm soát. Đây là những điều cần bạn chú ý hôm nay." action="Tạo nhanh" onAction={() => onToast('Quick action đã sẵn sàng: tạo lead, mở lớp hoặc gửi thông báo.')} />
      <div className="metric-grid">
        <MetricCard label="Lớp đang chạy" value="18" delta="4,8%" note="so với tháng trước" icon={BriefcaseBusiness} tone="violet" />
        <MetricCard label="Học viên đang học" value="642" delta="8,2%" note="so với tháng trước" icon={UsersRound} tone="mint" />
        <MetricCard label="Chuyên cần trung bình" value="92,4%" delta="1,6%" note="so với tuần trước" icon={ClipboardCheck} tone="yellow" />
        <MetricCard label="Công nợ cần xử lý" value="184,6M" delta="12,4%" note="so với tháng trước" icon={CreditCard} tone="coral" down />
      </div>
      <div className="dashboard-grid">
        <article className="hero-card">
          <div className="hero-card-top"><span className="live-label"><i /> LIVE CONTROL ROOM</span><button className="icon-button light"><MoreHorizontal size={18} /></button></div>
          <div className="hero-copy"><p className="eyebrow light">FOCUS OF THE DAY</p><h2>Chốt nhịp vận hành<br /><em>trước 10:00.</em></h2><p>3 lớp có lịch hôm nay, 7 bài cần chấm và 12 lead đang chờ được chạm tới.</p></div>
          <div className="hero-actions"><button className="button button-mint" onClick={() => onNavigate('schedule')}>Mở lịch hôm nay <ArrowUpRight size={15} /></button><button className="text-button light-text" onClick={() => onNavigate('reports')}>Xem báo cáo ngày <ArrowUpRight size={15} /></button></div>
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-dots" />
        </article>
        <article className="panel schedule-panel">
          <div className="panel-heading"><div><p className="eyebrow">LỊCH HÔM NAY</p><h3>Nhịp học trong ngày</h3></div><button className="text-button" onClick={() => onNavigate('schedule')}>Xem tất cả <ArrowUpRight size={14} /></button></div>
          <div className="session-list">{sessions.map((session) => <div className="session-row" key={session.time}><span className="session-time">{session.time}</span><span className={`session-dot ${session.tone}`} /><div className="session-copy"><strong>{session.title}</strong><span>{session.className} · {session.room}</span></div><span className="session-person">{session.person}</span></div>)}</div>
        </article>
        <article className="panel funnel-panel">
          <div className="panel-heading"><div><p className="eyebrow">EP-03 · TUYỂN SINH</p><h3>Phễu trong tháng</h3></div><button className="icon-button"><MoreHorizontal size={18} /></button></div>
          <div className="funnel-total"><strong>128</strong><span>lead mới <b>+18,6%</b></span></div>
          <div className="funnel-bars"><div className="funnel-line"><span>Mới</span><i style={{ width: '100%' }} /><b>128</b></div><div className="funnel-line"><span>Đã liên hệ</span><i style={{ width: '76%' }} /><b>97</b></div><div className="funnel-line"><span>Đang tư vấn</span><i style={{ width: '48%' }} /><b>61</b></div><div className="funnel-line"><span>Chốt</span><i style={{ width: '20%' }} /><b>26</b></div></div>
          <div className="panel-footnote"><span>Tỷ lệ chuyển đổi</span><strong>20,3%</strong><span className="delta">+3,1%</span></div>
        </article>
        <article className="panel tasks-panel">
          <div className="panel-heading"><div><p className="eyebrow">CẦN XỬ LÝ</p><h3>Danh sách ưu tiên</h3></div><span className="count-badge">03</span></div>
          <div className="task-list">{tasks.map((task) => <button className="task-row" key={task.title} onClick={() => onToast(`Đã mở: ${task.title}`)}><span className={`task-mark ${task.tone}`}><Zap size={14} /></span><span className="task-copy"><strong>{task.title}</strong><small>{task.detail}</small></span><span className="task-due">{task.due}<ArrowUpRight size={13} /></span></button>)}</div>
        </article>
      </div>
    </>
  )
}

function AdmissionsView({ onToast }: { onToast: (text: string) => void }) {
  const [filter, setFilter] = useState('Tất cả')
  const filters = ['Tất cả', 'Mới', 'Đang tư vấn', 'Hẹn học thử', 'Đã liên hệ']
  const filtered = filter === 'Tất cả' ? leads : leads.filter((lead) => lead.status === filter)
  return <>
    <SectionHeading eyebrow="EP-03 · SALES PIPELINE" title="Tuyển sinh & lead" description="Từ tín hiệu đầu tiên đến một học viên đã sẵn sàng nhập học." action="Thêm lead" onAction={() => onToast('Đã mở form tạo lead mới.')} />
    <div className="content-grid two-thirds"><article className="panel pipeline-panel"><div className="panel-heading"><div><p className="eyebrow">PIPELINE VIEW</p><h3>Nhịp chăm sóc hôm nay</h3></div><div className="filter-row">{filters.map((item) => <button className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="lead-table"><div className="table-head"><span>Lead</span><span>Chương trình quan tâm</span><span>Phụ trách</span><span>Trạng thái</span><span /></div>{filtered.map((lead) => <div className="table-row" key={lead.name}><div className="person-cell"><span className="avatar avatar-blue">{lead.name.split(' ').slice(-1)[0][0]}</span><span><strong>{lead.name}</strong><small>{lead.source} · {lead.age}</small></span></div><span className="muted-cell">{lead.program}</span><span className="muted-cell">{lead.owner}</span><StatusPill tone={lead.tone}>{lead.status}</StatusPill><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article><aside className="side-stack"><article className="panel conversion-card"><p className="eyebrow">CONVERSION PULSE</p><h3>26 lead đã chốt</h3><p>Trong 128 lead mới của tháng này.</p><div className="big-progress"><i style={{ width: '20.3%' }} /></div><div className="conversion-foot"><strong>20,3%</strong><span className="delta"><ArrowUpRight size={13} />3,1%</span></div></article><article className="panel source-card"><div className="panel-heading"><div><p className="eyebrow">ACQUISITION</p><h3>Nguồn hiệu quả</h3></div><MoreHorizontal size={17} /></div><div className="source-list"><div><span><i className="source-dot violet" />Facebook</span><b>38%</b></div><div><span><i className="source-dot mint" />Landing page</span><b>27%</b></div><div><span><i className="source-dot yellow" />Giới thiệu</span><b>21%</b></div><div><span><i className="source-dot coral" />Google</span><b>14%</b></div></div></article></aside></div>
  </>
}

function ProgramsView({ onToast }: { onToast: (text: string) => void }) {
  return <>
    <SectionHeading eyebrow="EP-02 · CATALOGUE" title="Chương trình & lớp học" description="Một nguồn dữ liệu cho chương trình → môn học → lớp học → kết quả." action="Mở lớp mới" onAction={() => onToast('Đã mở flow mở lớp từ chương trình có sẵn.')} />
    <div className="summary-strip"><div><span>Chương trình đang áp dụng</span><strong>08</strong></div><div><span>Lớp đang chạy</span><strong>18</strong></div><div><span>Sĩ số trung bình</span><strong>82%</strong></div><div><span>Giảng viên active</span><strong>24</strong></div></div>
    <article className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">CLASS OPERATIONS</p><h3>Lớp học gần đây</h3></div><div className="panel-tools"><button className="button button-ghost"><ListFilter size={15} />Bộ lọc</button><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className="data-table"><div className="table-head class-head"><span>Mã lớp / chương trình</span><span>Giảng viên</span><span>Tiến độ</span><span>Sĩ số</span><span>Trạng thái</span><span /></div>{classRows.map((row) => <div className="table-row class-row" key={row.code}><div><strong>{row.code}</strong><small>{row.name}</small></div><span className="muted-cell">{row.instructor}</span><div className="progress-cell"><div className="progress-track"><i style={{ width: `${row.progress}%` }} /></div><span>{row.progress}%</span></div><span className="student-count">{row.students}</span><StatusPill tone={row.tone}>{row.status}</StatusPill><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article>
  </>
}

function ScheduleView({ onToast }: { onToast: (text: string) => void }) {
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  return <>
    <SectionHeading eyebrow="EP-04 · CALENDAR" title="Lịch học" description="Theo dõi các buổi học và điểm chạm cần chuẩn bị trong tuần." action="Sinh lịch theo mẫu" onAction={() => onToast('Đã mở flow sinh lịch lặp cho lớp.')} />
    <div className="calendar-toolbar"><div className="calendar-month"><button className="icon-button"><ArrowDownRight size={15} /></button><strong>Tháng 10, 2026</strong><button className="icon-button"><ArrowUpRight size={15} /></button></div><div className="view-toggle"><button className="active">Tuần</button><button>Tháng</button><button>Agenda</button></div></div>
    <article className="panel calendar-panel"><div className="week-head">{dayNames.map((day, index) => <div className={index === 0 ? 'today' : ''} key={day}><small>{day}</small><strong>{12 + index}</strong>{index === 0 && <i>Hôm nay</i>}</div>)}</div><div className="calendar-body"><div className="calendar-times"><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span></div><div className="calendar-columns">{dayNames.map((day, index) => <div className="calendar-column" key={day}>{index === 0 && <div className="calendar-event violet-event" style={{ top: 21 }}><strong>React State</strong><small>FS-K15C6 · Lab 03</small></div>}{index === 1 && <div className="calendar-event mint-event" style={{ top: 194 }}><strong>SQL Window</strong><small>DA-K02 · Phòng 204</small></div>}{index === 2 && <div className="calendar-event yellow-event" style={{ top: 366 }}><strong>Design System</strong><small>UX-K08 · Zoom</small></div>}{index === 4 && <div className="calendar-event coral-event" style={{ top: 280 }}><strong>Mentor hour</strong><small>FS-K15C6 · Lab 01</small></div>}</div>)}</div></div></article>
  </>
}

function AttendanceView({ onToast }: { onToast: (text: string) => void }) {
  return <>
    <SectionHeading eyebrow="EP-05 · ATTENDANCE" title="Điểm danh & chuyên cần" description="Chỉ số rủi ro được đưa lên trước để đội đào tạo can thiệp đúng lúc." action="Điểm danh buổi hôm nay" onAction={() => onToast('Đã mở bảng điểm danh FS-K15C6.')} />
    <div className="attendance-highlight"><div><span className="eyebrow">FS-K15C6 · BUỔI 15 / 60</span><h2>React State & Data Flow</h2><p>Hôm nay, 08:30 — Lab 03 · Nguyễn Hoàng Long</p></div><div className="attendance-score"><strong>92,4%</strong><span>chuyên cần trung bình</span></div><button className="button button-mint" onClick={() => onToast('Đã đánh dấu tất cả có mặt, bạn có thể chỉnh ngoại lệ.')}>Đánh dấu tất cả có mặt <Check size={16} /></button></div>
    <article className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">RISK RADAR</p><h3>Học viên cần chú ý</h3></div><div className="panel-tools"><button className="button button-ghost"><ListFilter size={15} />FS-K15C6</button><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className="data-table"><div className="table-head attendance-head"><span>Học viên</span><span>Đã tham gia</span><span>Chuyên cần</span><span>Cờ rủi ro</span><span /></div>{attendanceRows.map((row) => <div className="table-row attendance-row" key={row.code}><div className="person-cell"><span className="avatar avatar-purple">{row.name.split(' ').slice(-1)[0][0]}</span><span><strong>{row.name}</strong><small>{row.code}</small></span></div><span className="muted-cell">{row.sessions}</span><div className="progress-cell"><div className="progress-track"><i className={row.rate < 70 ? 'danger' : ''} style={{ width: `${row.rate}%` }} /></div><span>{row.rate}%</span></div><StatusPill tone={row.tone}>{row.flag}</StatusPill><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article>
  </>
}

function AssignmentsView({ onToast }: { onToast: (text: string) => void }) {
  const assignmentRows = [
    { title: 'Build a Kanban Board', course: 'React Fundamentals · FS-K15C6', submitted: '21 / 24', graded: '14 / 24', due: 'Hôm nay, 17:00', tone: 'coral' as StatusTone },
    { title: 'Phân tích dữ liệu bán hàng', course: 'SQL Foundation · DA-K02', submitted: '18 / 18', graded: '18 / 18', due: 'Đã chấm xong', tone: 'mint' as StatusTone },
    { title: 'Moodboard sản phẩm EdTech', course: 'Design System · UX-K08', submitted: '12 / 21', graded: '4 / 21', due: 'Ngày mai, 12:00', tone: 'yellow' as StatusTone },
  ]
  return <>
    <SectionHeading eyebrow="EP-06 · LEARNING LOOP" title="Bài tập & chấm điểm" description="Từ giao bài, nộp bài đến phản hồi đều nằm trong một luồng khép kín." action="Tạo bài tập" onAction={() => onToast('Đã mở form tạo bài tập mới.')} />
    <div className="assignment-cards"><div className="assignment-kpi violet"><FileText size={17} /><span>Bài đang mở</span><strong>14</strong><small>+4 so với tuần trước</small></div><div className="assignment-kpi mint"><ClipboardCheck size={17} /><span>Đã chấm tuần này</span><strong>86</strong><small>92% đúng hạn</small></div><div className="assignment-kpi yellow"><Clock3 size={17} /><span>Chờ phản hồi</span><strong>09</strong><small>cần xử lý hôm nay</small></div></div>
    <article className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">ASSIGNMENT QUEUE</p><h3>Danh sách bài tập</h3></div><button className="button button-ghost"><ListFilter size={15} />Bộ lọc</button></div><div className="data-table"><div className="table-head assignment-head"><span>Bài tập</span><span>Đã nộp</span><span>Đã chấm</span><span>Hạn nộp</span><span /></div>{assignmentRows.map((row) => <div className="table-row assignment-row" key={row.title}><div><strong>{row.title}</strong><small>{row.course}</small></div><span className="muted-cell">{row.submitted}</span><span className="muted-cell">{row.graded}</span><StatusPill tone={row.tone}>{row.due}</StatusPill><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article>
  </>
}

function FinanceView({ onToast }: { onToast: (text: string) => void }) {
  return <>
    <SectionHeading eyebrow="EP-08 · CASHFLOW" title="Học phí & công nợ" description="Nắm được phải thu, đã thu và ai cần một lời nhắc đúng lúc." action="Ghi nhận thanh toán" onAction={() => onToast('Đã mở form ghi nhận khoản thu.')} />
    <div className="finance-hero"><div><p className="eyebrow light">COLLECTION HEALTH</p><h2>78,6%</h2><p>tỷ lệ thu học phí toàn trung tâm trong kỳ.</p></div><div className="finance-ring"><span>184,6M</span><small>còn phải thu</small></div><div className="finance-breakdown"><div><span>Đã thu</span><strong>672,4M</strong></div><div><span>Quá hạn</span><strong className="coral-text">42,8M</strong></div><div><span>Học bổng</span><strong>86,2M</strong></div></div></div>
    <article className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">RECEIVABLES</p><h3>Khoản cần theo dõi</h3></div><div className="panel-tools"><button className="button button-ghost" onClick={() => onToast('Đang chuẩn bị file Excel công nợ.')}>Xuất Excel</button><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className="data-table"><div className="table-head finance-head"><span>Học viên</span><span>Phải thu</span><span>Đã thu</span><span>Còn nợ</span><span>Trạng thái</span><span /></div>{invoices.map((row) => <div className="table-row finance-row" key={row.name}><div className="person-cell"><span className="avatar avatar-coral">{row.name.split(' ').slice(-1)[0][0]}</span><span><strong>{row.name}</strong><small>{row.className}</small></span></div><span className="muted-cell">{row.amount}</span><span className="muted-cell">{row.paid}</span><strong className={row.due === '0 đ' ? 'mint-text' : row.tone === 'coral' ? 'coral-text' : 'yellow-text'}>{row.due}</strong><StatusPill tone={row.tone}>{row.status}</StatusPill><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article>
  </>
}

function ReportsView() {
  return <>
    <SectionHeading eyebrow="EP-09 · INSIGHT LAYER" title="Báo cáo vận hành" description="Từ dữ liệu rời rạc thành một câu chuyện đủ rõ để ra quyết định." action="Tạo báo cáo" />
    <div className="report-grid"><article className="panel chart-panel"><div className="panel-heading"><div><p className="eyebrow">ENROLLMENT VELOCITY</p><h3>Tuyển sinh theo tháng</h3></div><button className="button button-ghost">2026 <ChevronDown size={14} /></button></div><div className="chart-legend"><span><i className="legend-dot violet" />Lead mới</span><span><i className="legend-dot mint" />Đã nhập học</span></div><div className="bar-chart">{[['T5', 44, 18], ['T6', 58, 26], ['T7', 51, 23], ['T8', 74, 31], ['T9', 68, 39], ['T10', 86, 44]].map(([month, a, b]) => <div className="bar-col" key={month as string}><div className="bars"><i style={{ height: `${a}%` }} /><b style={{ height: `${b}%` }} /></div><span>{month}</span></div>)}</div></article><article className="panel report-score"><p className="eyebrow">PROGRAM HEALTH</p><h3>Chất lượng lớp học</h3><div className="score-ring"><div><strong>8,7</strong><span>/ 10</span></div></div><p>Điểm khảo sát trung bình từ 186 phản hồi cuối kỳ.</p><div className="score-row"><span>Giảng viên</span><strong>9,1</strong></div><div className="score-row"><span>Học liệu</span><strong>8,5</strong></div><div className="score-row"><span>Lịch học</span><strong>8,4</strong></div></article><article className="panel report-table"><div className="panel-heading"><div><p className="eyebrow">RISK RADAR</p><h3>Học viên cần can thiệp</h3></div><button className="text-button">Xem toàn bộ <ArrowUpRight size={14} /></button></div>{attendanceRows.filter((row) => row.rate < 90).map((row) => <div className="risk-row" key={row.code}><span className="risk-index">0{row.rate < 70 ? 1 : 2}</span><span><strong>{row.name}</strong><small>{row.code} · Chuyên cần {row.rate}%</small></span><span className={`risk-tag ${row.tone}`}>{row.flag}</span></div>)}</article></div>
  </>
}

function UsersView({ onToast }: { onToast: (text: string) => void }) {
  const users = [
    { name: 'Trần Minh Quân', email: 'quan.tran@tms.vn', role: 'Giảng viên', status: 'Hoạt động', tone: 'mint' as StatusTone },
    { name: 'Linh Trần', email: 'linh.tran@tms.vn', role: 'Quản lý đào tạo', status: 'Hoạt động', tone: 'mint' as StatusTone },
    { name: 'Phạm Ngọc Hà', email: 'ha.pham@tms.vn', role: 'Giảng viên · TA', status: 'Hoạt động', tone: 'mint' as StatusTone },
    { name: 'Đỗ Mai Anh', email: 'mai.anh@tms.vn', role: 'Tư vấn tuyển sinh', status: 'Chờ kích hoạt', tone: 'yellow' as StatusTone },
  ]
  return <>
    <SectionHeading eyebrow="EP-01 · ACCESS CONTROL" title="Người dùng & quyền" description="RBAC rõ ràng, session an toàn và menu hiển thị đúng phần việc." action="Thêm tài khoản" onAction={() => onToast('Đã mở form thêm tài khoản mới.')} />
    <div className="access-banner"><div className="access-shield"><ShieldCheck size={21} /></div><div><strong>RBAC đang hoạt động</strong><span>8 vai trò nghiệp vụ · mặc định từ chối ở tầng server · audit log bật</span></div><StatusPill tone="mint">Protected</StatusPill></div>
    <article className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">IDENTITY DIRECTORY</p><h3>Danh sách tài khoản</h3></div><div className="search-inline"><Search size={15} /><input placeholder="Tìm tên hoặc email" /></div></div><div className="data-table"><div className="table-head users-head"><span>Tài khoản</span><span>Vai trò</span><span>Trạng thái</span><span>Phiên gần nhất</span><span /></div>{users.map((user, index) => <div className="table-row users-row" key={user.email}><div className="person-cell"><span className={`avatar avatar-${index % 2 === 0 ? 'blue' : 'purple'}`}>{user.name.split(' ').slice(-1)[0][0]}</span><span><strong>{user.name}</strong><small>{user.email}</small></span></div><span className="muted-cell">{user.role}</span><StatusPill tone={user.tone}>{user.status}</StatusPill><span className="muted-cell">{index === 3 ? 'Chưa đăng nhập' : `${index + 1} giờ trước`}</span><button className="icon-button"><MoreHorizontal size={17} /></button></div>)}</div></article>
  </>
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => window.sessionStorage.getItem('tms_session') === 'demo-access-token')
  const [view, setView] = useState<ViewKey>('dashboard')
  const [role, setRole] = useState<Role>('Quản lý đào tạo')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [search, setSearch] = useState('')
  const [action, setAction] = useState<ActionType | null>(null)

  const allowedViews = roleAccess[role]
  const activeLabel = useMemo(() => navGroups.flatMap((group) => group.items).find((item) => item.id === view)?.label ?? 'Tổng quan', [view])
  const showToast = (message: string) => {
    if (message.includes('Quick action')) { setAction('quick'); return }
    const actionMatch: [string, ActionType][] = [['form tạo lead', 'lead'], ['flow mở lớp', 'class'], ['bảng điểm danh', 'attendance'], ['form tạo bài tập', 'assignment'], ['form ghi nhận', 'payment'], ['form thêm tài khoản', 'account']]
    const matched = actionMatch.find(([needle]) => message.includes(needle))
    if (matched) { setAction(matched[1]); return }
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }
  const navigate = (next: ViewKey) => {
    if (!allowedViews.includes(next)) {
      showToast(`Vai trò ${role} chưa có quyền truy cập mục này.`)
      return
    }
    setView(next)
    setMobileOpen(false)
  }
  const changeRole = (next: Role) => {
    setRole(next)
    setRoleOpen(false)
    if (!roleAccess[next].includes(view)) setView('dashboard')
    showToast(`Đã chuyển sang góc nhìn ${next}.`)
  }
  const renderView = () => {
    switch (view) {
      case 'admissions': return <AdmissionsView onToast={showToast} />
      case 'programs': return <ProgramsView onToast={showToast} />
      case 'schedule': return <ScheduleView onToast={showToast} />
      case 'attendance': return <AttendanceView onToast={showToast} />
      case 'assignments': return <AssignmentsView onToast={showToast} />
      case 'finance': return <FinanceView onToast={showToast} />
      case 'reports': return <ReportsView />
      case 'users': return <UsersView onToast={showToast} />
      default: return <DashboardView onNavigate={navigate} onToast={showToast} />
    }
  }

  if (!authenticated) return <LoginView onLogin={() => setAuthenticated(true)} />

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-top"><Logo /><button className="mobile-close icon-button light" onClick={() => setMobileOpen(false)}><X size={18} /></button></div>
        <div className="workspace-switch"><span className="workspace-dot" /><span><small>WORKSPACE</small><strong>TTCS · K15C6</strong></span><ChevronDown size={15} /></div>
        <nav className="main-nav">{navGroups.map((group) => <div className="nav-group" key={group.title}><p>{group.title}</p>{group.items.filter((item) => !item.roles || item.roles.includes(role)).map((item) => <button className={view === item.id ? 'nav-item active' : 'nav-item'} key={item.id} onClick={() => navigate(item.id)}><item.icon size={17} strokeWidth={view === item.id ? 2.3 : 1.8} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</button>)}</div>)}</nav>
        <div className="sidebar-bottom"><div className="sidebar-tip"><Sparkles size={16} /><span><strong>Gợi ý hôm nay</strong><small>Đang có 3 học viên ở vùng rủi ro chuyên cần.</small></span><ArrowUpRight size={14} /></div><button className="nav-item"><Settings2 size={17} /><span>Cài đặt hệ thống</span></button><div className="sidebar-footer"><span>v1.0.0 · Staging</span><span className="online-dot" /> <span>All systems go</span></div></div>
      </aside>
      {mobileOpen && <button className="sidebar-overlay" aria-label="Đóng menu" onClick={() => setMobileOpen(false)} />}
      <main className="main-area">
        <header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)}><Menu size={20} /></button><div className="breadcrumb"><span>TMS Portal</span><b>/</b><strong>{activeLabel}</strong></div><div className="topbar-actions"><div className="global-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm nhanh mọi thứ..." /><kbd>⌘ K</kbd></div><button className="notification-button" onClick={() => showToast('Bạn có 4 thông báo chưa đọc.')}><Bell size={19} /><i>4</i></button><div className="role-switcher"><button className="user-menu" onClick={() => setRoleOpen((open) => !open)}><span className="avatar avatar-mint">LT</span><span><strong>Linh Trần</strong><small>{roleLabels[role]}</small></span><ChevronDown size={15} /></button>{roleOpen && <div className="role-menu"><p>Góc nhìn demo</p>{(Object.keys(roleLabels) as Role[]).map((option) => <button className={option === role ? 'selected' : ''} key={option} onClick={() => changeRole(option)}><span className="role-menu-dot" />{option}{option === role && <Check size={14} />}</button>)}</div>}</div></div></header>
        <div className="main-content">{renderView()}</div>
      </main>
      {action && <ActionModal type={action} onClose={() => setAction(null)} onSaved={(message) => { setAction(null); showToast(message) }} />}
      {toast && <div className="toast"><span><Check size={15} /></span>{toast}<button onClick={() => setToast('')}><X size={14} /></button></div>}
    </div>
  )
}
