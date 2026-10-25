export type S105RbacUiCommand = { storyId: 'S1-05'; payload: Record<string, unknown> }

export async function executeS105RbacUi(command: S105RbacUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
