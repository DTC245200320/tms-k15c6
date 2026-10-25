export class S102SessionLogoutService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-02', payload, status: 'scaffold' as const }
  }
}
