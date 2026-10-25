export class S302BeLeadFollowUpService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S3-02', payload, status: 'scaffold' as const }
  }
}
