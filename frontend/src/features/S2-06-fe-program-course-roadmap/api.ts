export type S206FeProgramCourseRoadmapCommand = { storyId: 'S2-06'; payload: Record<string, unknown> }

export async function executeS206FeProgramCourseRoadmap(command: S206FeProgramCourseRoadmapCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
