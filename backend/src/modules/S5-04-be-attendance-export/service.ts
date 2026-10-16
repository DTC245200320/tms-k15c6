export class S504BeAttendanceExportService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-04', payload, status: 'scaffold' as const }
  }
}
