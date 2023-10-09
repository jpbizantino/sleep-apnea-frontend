import { createSlice } from '@reduxjs/toolkit'

export interface menuState {
  isMainMenuOpen: boolean
}

const initialState: menuState = {
  isMainMenuOpen: false,
}

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    onToggleMainMenu: (state) => {
      state.isMainMenuOpen = !state.isMainMenuOpen
    },
    onOpenMainMenu: (state) => {
      state.isMainMenuOpen = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { onToggleMainMenu, onOpenMainMenu } = appSlice.actions

export default appSlice.reducer
