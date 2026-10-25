export class S506BeAssignmentListService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-06', payload, status: 'scaffold' as const }
  }
}
