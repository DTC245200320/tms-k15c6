export class S202BeUserProfileService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-02', payload, status: 'scaffold' as const }
  }
}
