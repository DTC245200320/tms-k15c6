export class S303BeLeadConversionService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S3-03', payload, status: 'scaffold' as const }
  }
}
