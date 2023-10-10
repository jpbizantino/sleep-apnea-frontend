import { createSlice } from '@reduxjs/toolkit'
import { Question } from '../../common/types'

export interface menuState {
  isMainMenuOpen: boolean
  selectedQuestion: Question | null
}

const initialState: menuState = {
  isMainMenuOpen: false,
  selectedQuestion: null,
}

export const backofficeSlice = createSlice({
  name: 'backofficeSlice',
  initialState,
  reducers: {
    onToggleMainMenu: (state) => {
      state.isMainMenuOpen = !state.isMainMenuOpen
    },
    onOpenMainMenu: (state) => {
      state.isMainMenuOpen = true
    },
    onSetSelectedQuestion: (state, { payload }) => {
      state.selectedQuestion = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { onToggleMainMenu, onOpenMainMenu, onSetSelectedQuestion } =
  backofficeSlice.actions

export default backofficeSlice.reducer
