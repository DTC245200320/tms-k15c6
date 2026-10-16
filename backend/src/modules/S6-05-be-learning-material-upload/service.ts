export class S605BeLearningMaterialUploadService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S6-05', payload, status: 'scaffold' as const }
  }
}
