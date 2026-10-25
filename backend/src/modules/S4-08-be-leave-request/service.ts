export class S408BeLeaveRequestService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S4-08', payload, status: 'scaffold' as const }
  }
}
