export type S604FeStudentFeedbackCommand = { storyId: 'S6-04'; payload: Record<string, unknown> }

export async function executeS604FeStudentFeedback(command: S604FeStudentFeedbackCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
