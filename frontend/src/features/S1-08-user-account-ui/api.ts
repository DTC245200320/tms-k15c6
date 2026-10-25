export type S108UserAccountUiCommand = { storyId: 'S1-08'; payload: Record<string, unknown> }

export async function executeS108UserAccountUi(command: S108UserAccountUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
