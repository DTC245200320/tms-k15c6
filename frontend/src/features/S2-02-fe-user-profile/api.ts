export type S202FeUserProfileCommand = { storyId: 'S2-02'; payload: Record<string, unknown> }

export async function executeS202FeUserProfile(command: S202FeUserProfileCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
