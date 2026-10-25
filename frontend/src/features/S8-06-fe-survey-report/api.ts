export type S806FeSurveyReportCommand = { storyId: 'S8-06'; payload: Record<string, unknown> }

export async function executeS806FeSurveyReport(command: S806FeSurveyReportCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
