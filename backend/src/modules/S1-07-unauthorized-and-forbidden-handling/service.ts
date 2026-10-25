export class S107UnauthorizedAndForbiddenHandlingService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-07', payload, status: 'scaffold' as const }
  }
}
