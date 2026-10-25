export type S301FeLeadFunnelCommand = { storyId: 'S3-01'; payload: Record<string, unknown> }

export async function executeS301FeLeadFunnel(command: S301FeLeadFunnelCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
