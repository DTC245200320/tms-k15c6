export type S605FeLearningMaterialUploadCommand = { storyId: 'S6-05'; payload: Record<string, unknown> }

export async function executeS605FeLearningMaterialUpload(command: S605FeLearningMaterialUploadCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
