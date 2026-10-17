export type S102SessionLogoutUiCommand = { storyId: 'S1-02'; payload: Record<string, unknown> }

export async function executeS102SessionLogoutUi(command: S102SessionLogoutUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
