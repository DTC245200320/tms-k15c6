export type S504FeAttendanceExportCommand = { storyId: 'S5-04'; payload: Record<string, unknown> }

export async function executeS504FeAttendanceExport(command: S504FeAttendanceExportCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
