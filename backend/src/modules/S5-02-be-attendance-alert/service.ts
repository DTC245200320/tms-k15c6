export class S502BeAttendanceAlertService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S5-02', payload, status: 'scaffold' as const }
  }
}
