export class S201BeBulkImportUsersService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-01', payload, status: 'scaffold' as const }
  }
}
