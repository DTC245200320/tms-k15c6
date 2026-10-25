export class S104ChangePasswordService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-04', payload, status: 'scaffold' as const }
  }
}
