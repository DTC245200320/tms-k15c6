export class S208BePublicConsultationFormService {
  execute(payload: Record<string, unknown>) {
    return { storyId: 'S2-08', payload, status: 'scaffold' as const }
  }
}
