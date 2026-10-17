export type S601FeGradeSubmissionForm = {
  storyId: 'S6-01'
  payload: Record<string, unknown>
}

export type S601FeGradeSubmissionState = 'idle' | 'loading' | 'success' | 'error'
