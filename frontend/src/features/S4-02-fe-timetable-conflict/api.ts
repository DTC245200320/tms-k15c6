export type S402FeTimetableConflictCommand = { storyId: 'S4-02'; payload: Record<string, unknown> }

export async function executeS402FeTimetableConflict(command: S402FeTimetableConflictCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
