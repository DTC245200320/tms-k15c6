export class S402BeTimetableConflictService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S4-02', payload, status: 'scaffold' as const }
  }
}
