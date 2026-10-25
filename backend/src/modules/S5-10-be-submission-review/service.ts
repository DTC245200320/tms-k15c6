export class S510BeSubmissionReviewService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-10', payload, status: 'scaffold' as const }
  }
}
