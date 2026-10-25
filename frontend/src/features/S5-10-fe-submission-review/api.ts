export type S510FeSubmissionReviewCommand = { storyId: 'S5-10'; payload: Record<string, unknown> }

export async function executeS510FeSubmissionReview(command: S510FeSubmissionReviewCommand) {
  // Replace with the typed API client when the NestJS endpoint is ready.
  return { ...command, status: 'demo' as const }
}
