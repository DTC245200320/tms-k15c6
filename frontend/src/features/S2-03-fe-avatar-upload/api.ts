export type S203FeAvatarUploadCommand = { storyId: 'S2-03'; payload: Record<string, unknown> }

export async function executeS203FeAvatarUpload(command: S203FeAvatarUploadCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
