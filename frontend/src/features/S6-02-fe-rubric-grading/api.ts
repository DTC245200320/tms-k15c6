export type S602FeRubricGradingCommand = { storyId: 'S6-02'; payload: Record<string, unknown> }

export async function executeS602FeRubricGrading(command: S602FeRubricGradingCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
