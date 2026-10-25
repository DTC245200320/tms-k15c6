export type S803FeTranscriptExportCommand = { storyId: 'S8-03'; payload: Record<string, unknown> }

export async function executeS803FeTranscriptExport(command: S803FeTranscriptExportCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
