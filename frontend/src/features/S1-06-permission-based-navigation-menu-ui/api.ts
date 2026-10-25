export type S106PermissionBasedNavigationMenuUiCommand = { storyId: 'S1-06'; payload: Record<string, unknown> }

export async function executeS106PermissionBasedNavigationMenuUi(command: S106PermissionBasedNavigationMenuUiCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
