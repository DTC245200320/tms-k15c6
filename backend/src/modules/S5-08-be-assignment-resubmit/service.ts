export class S508BeAssignmentResubmitService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-08', payload, status: 'scaffold' as const }
  }
}
