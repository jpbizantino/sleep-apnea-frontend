import { createSlice } from '@reduxjs/toolkit'
import { Choice, Question } from '../../common/types'

export interface menuState {
  isMainMenuOpen: boolean
  isChoiceModalOpen: boolean
  selectedQuestion: Question | null
  selectedChoice: Choice | null
}

const initialState: menuState = {
  isMainMenuOpen: false,
  selectedQuestion: null,
  isChoiceModalOpen: false,
  selectedChoice: null,
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

    onToggleChoiceModal: (state) => {
      state.isChoiceModalOpen = !state.isChoiceModalOpen
    },

    onSetSelectedChoice: (state, { payload }) => {
      state.selectedChoice = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  // Main
  onToggleMainMenu,
  onOpenMainMenu,
  // Question
  onSetSelectedQuestion,
  // Choice
  onToggleChoiceModal,
  onSetSelectedChoice,
} = backofficeSlice.actions

export default backofficeSlice.reducer
