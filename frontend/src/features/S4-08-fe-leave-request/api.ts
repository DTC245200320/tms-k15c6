export type S408FeLeaveRequestCommand = { storyId: 'S4-08'; payload: Record<string, unknown> }

export async function executeS408FeLeaveRequest(command: S408FeLeaveRequestCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
