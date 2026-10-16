export type S110AccountLockAndUnlockUiCommand = { storyId: 'S1-10'; payload: Record<string, unknown> }

export async function executeS110AccountLockAndUnlockUi(command: S110AccountLockAndUnlockUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
