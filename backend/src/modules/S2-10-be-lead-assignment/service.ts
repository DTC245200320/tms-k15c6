export class S210BeLeadAssignmentService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-10', payload, status: 'scaffold' as const }
  }
}
