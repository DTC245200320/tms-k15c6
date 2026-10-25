export class S602BeRubricGradingService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S6-02', payload, status: 'scaffold' as const }
  }
}
