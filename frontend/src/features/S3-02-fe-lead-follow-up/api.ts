export type S302FeLeadFollowUpCommand = { storyId: 'S3-02'; payload: Record<string, unknown> }

export async function executeS302FeLeadFollowUp(command: S302FeLeadFollowUpCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
