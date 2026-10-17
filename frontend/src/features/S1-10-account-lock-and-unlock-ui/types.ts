export type S110AccountLockAndUnlockUiForm = {
  storyId: 'S1-10'
  payload: Record<string, unknown>
}

export type S110AccountLockAndUnlockUiState = 'idle' | 'loading' | 'success' | 'error'
