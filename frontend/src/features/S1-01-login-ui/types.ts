export type S101LoginUiForm = {
  storyId: 'S1-01'
  payload: Record<string, unknown>
}

export type S101LoginUiState = 'idle' | 'loading' | 'success' | 'error'
