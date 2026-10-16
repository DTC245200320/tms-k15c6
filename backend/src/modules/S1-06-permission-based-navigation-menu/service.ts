export class S106PermissionBasedNavigationMenuService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S1-06', payload, status: 'scaffold' as const }
  }
}
