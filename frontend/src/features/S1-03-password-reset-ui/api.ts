export type S103PasswordResetUiCommand = { storyId: 'S1-03'; payload: Record<string, unknown> }

export async function executeS103PasswordResetUi(command: S103PasswordResetUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
