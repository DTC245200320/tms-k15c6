export type S208FePublicConsultationFormCommand = { storyId: 'S2-08'; payload: Record<string, unknown> }

export async function executeS208FePublicConsultationForm(command: S208FePublicConsultationFormCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
