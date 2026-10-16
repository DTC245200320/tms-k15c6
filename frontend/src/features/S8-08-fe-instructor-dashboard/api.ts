export type S808FeInstructorDashboardCommand = { storyId: 'S8-08'; payload: Record<string, unknown> }

export async function executeS808FeInstructorDashboard(command: S808FeInstructorDashboardCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
