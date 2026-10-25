export class S203BeAvatarUploadService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-03', payload, status: 'scaffold' as const }
  }
}
