export class S103PasswordResetService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-03', payload, status: 'scaffold' as const }
  }
}
