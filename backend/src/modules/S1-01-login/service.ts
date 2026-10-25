export class S101LoginService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-01', payload, status: 'scaffold' as const }
  }
}
