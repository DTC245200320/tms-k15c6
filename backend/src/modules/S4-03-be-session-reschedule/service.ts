export class S403BeSessionRescheduleService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S4-03', payload, status: 'scaffold' as const }
  }
}
