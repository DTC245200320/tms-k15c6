export class S306BeClassEnrollmentService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S3-06', payload, status: 'scaffold' as const }
  }
}
