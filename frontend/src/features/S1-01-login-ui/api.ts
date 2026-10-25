export type S101LoginUiCommand = { storyId: 'S1-01'; payload: Record<string, unknown> }

export async function executeS101LoginUi(command: S101LoginUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
