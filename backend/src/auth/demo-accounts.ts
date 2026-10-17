export const demoAccounts = [
  { email: 'admin@tms.edu.vn', password: 'Admin@123', name: 'Admin TMS', role: 'Quản trị hệ thống' },
  { email: 'manager@tms.edu.vn', password: 'Manager@123', name: 'Linh Trần', role: 'Quản lý đào tạo' },
  { email: 'admissions@tms.edu.vn', password: 'Admissions@123', name: 'Minh Phạm', role: 'Tư vấn tuyển sinh' },
  { email: 'instructor@tms.edu.vn', password: 'Instructor@123', name: 'Nguyễn Hoàng Long', role: 'Giảng viên' },
  { email: 'accounting@tms.edu.vn', password: 'Accounting@123', name: 'Thu Hà', role: 'Kế toán' },
] as const

// Demo-only fixtures. Production passwords must be replaced by Argon2/bcrypt hashes.
