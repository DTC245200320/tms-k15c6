export type S502FeAttendanceAlertCommand = { storyId: 'S5-02'; payload: Record<string, unknown> }

export async function executeS502FeAttendanceAlert(command: S502FeAttendanceAlertCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
