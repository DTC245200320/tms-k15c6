export type S805FeQualitySurveyCommand = { storyId: 'S8-05'; payload: Record<string, unknown> }

export async function executeS805FeQualitySurvey(command: S805FeQualitySurveyCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
