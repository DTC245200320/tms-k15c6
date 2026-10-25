export type S603FeRequestResubmissionCommand = { storyId: 'S6-03'; payload: Record<string, unknown> }

export async function executeS603FeRequestResubmission(command: S603FeRequestResubmissionCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
