export class S505BeAssignmentCreateService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-05', payload, status: 'scaffold' as const }
  }
}
