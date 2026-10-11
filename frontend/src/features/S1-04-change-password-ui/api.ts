export type S104ChangePasswordUiCommand = { storyId: 'S1-04'; payload: Record<string, unknown> }

export async function executeS104ChangePasswordUi(command: S104ChangePasswordUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
