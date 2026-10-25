export type S303FeLeadConversionCommand = { storyId: 'S3-03'; payload: Record<string, unknown> }

export async function executeS303FeLeadConversion(command: S303FeLeadConversionCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
