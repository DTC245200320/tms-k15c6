export class S808BeInstructorDashboardService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S8-08', payload, status: 'scaffold' as const }
  }
}
