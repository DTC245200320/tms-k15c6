export type S610FeNotificationCenterCommand = { storyId: 'S6-10'; payload: Record<string, unknown> }

export async function executeS610FeNotificationCenter(command: S610FeNotificationCenterCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
