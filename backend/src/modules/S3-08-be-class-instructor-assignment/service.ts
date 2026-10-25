export class S308BeClassInstructorAssignmentService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S3-08', payload, status: 'scaffold' as const }
  }
}
