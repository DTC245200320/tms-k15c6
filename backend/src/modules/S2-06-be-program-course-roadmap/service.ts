export class S206BeProgramCourseRoadmapService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-06', payload, status: 'scaffold' as const }
  }
}
