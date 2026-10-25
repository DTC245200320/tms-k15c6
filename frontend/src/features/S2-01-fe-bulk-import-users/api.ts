export type S201FeBulkImportUsersCommand = { storyId: 'S2-01'; payload: Record<string, unknown> }

export async function executeS201FeBulkImportUsers(command: S201FeBulkImportUsersCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
