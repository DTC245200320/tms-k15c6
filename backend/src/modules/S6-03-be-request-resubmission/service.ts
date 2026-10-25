export class S603BeRequestResubmissionService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S6-03', payload, status: 'scaffold' as const }
  }
}
