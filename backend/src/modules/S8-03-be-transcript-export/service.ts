export class S803BeTranscriptExportService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S8-03', payload, status: 'scaffold' as const }
  }
}
