export type Role = 'GUEST' | 'STUDENT' | 'INSTRUCTOR' | 'TA' | 'TRAINING_MANAGER' | 'ADMISSIONS' | 'ACCOUNTANT' | 'ADMIN'

export type AccessClaims = {
  sub: string
  email: string
  roles: Role[]
  type: 'access'
}

export type RefreshClaims = {
  sub: string
  sessionId: string
  type: 'refresh'
}

export const AUTH_ROUTES = {
  login: 'POST /auth/login',
  refresh: 'POST /auth/refresh',
  logout: 'POST /auth/logout',
  changePassword: 'POST /auth/change-password',
} as const

export const PERMISSIONS = {
  usersRead: 'users:read',
  usersWrite: 'users:write',
  programsWrite: 'programs:write',
  leadsWrite: 'leads:write',
  attendanceWrite: 'attendance:write',
  gradingWrite: 'grading:write',
  financeWrite: 'finance:write',
  reportsRead: 'reports:read',
} as const

/** NestJS implementation note: JwtAuthGuard validates access tokens; RolesGuard checks route metadata.
 * Refresh tokens are hashed in the database, rotated on every refresh and revoked on logout or lock.
 */
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  GUEST: [],
  STUDENT: ['reports:read'],
  INSTRUCTOR: ['attendance:write', 'grading:write', 'reports:read'],
  TA: ['attendance:write', 'reports:read'],
  TRAINING_MANAGER: Object.values(PERMISSIONS),
  ADMISSIONS: ['leads:write', 'programs:write', 'reports:read'],
  ACCOUNTANT: ['finance:write', 'reports:read'],
  ADMIN: Object.values(PERMISSIONS),
}
