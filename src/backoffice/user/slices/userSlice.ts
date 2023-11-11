import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../common/types/user.type'

export interface initalState {
  //User
  selectedUser: User | null
  isDeleteUserModalOpen: boolean

  //UserPatient
  isUserPatientModalOpen: boolean
  isUserPatientUnlinkModalOpen: boolean

  //Family Member
  isFamilyMemberModalOpen: boolean

  //ChangePassword
  isChangePasswordModalOpen: boolean
}

const initialState: initalState = {
  //User
  selectedUser: null,
  isDeleteUserModalOpen: false,

  //UserPatient
  isUserPatientModalOpen: false,
  isUserPatientUnlinkModalOpen: false,

  //Family Member
  isFamilyMemberModalOpen: false,

  //ChangePassword
  isChangePasswordModalOpen: false,
}

export const userSlice = createSlice({
  name: 'securitySlice',
  initialState,
  reducers: {
    //User Reducers
    onSetSelectedUser: (state, { payload }) => {
      state.selectedUser = payload
    },

    //UserPatient Reducers
    onToggleDeleteUserModal: (state) => {
      state.isDeleteUserModalOpen = !state.isDeleteUserModalOpen
    },

    //UserPatient Reducers
    onToggleUserPatientModal: (state) => {
      state.isUserPatientModalOpen = !state.isUserPatientModalOpen
    },

    onToggleUserPatientUnlinkModal: (state) => {
      state.isUserPatientUnlinkModalOpen = !state.isUserPatientUnlinkModalOpen
    },

    //Family Member
    onToggleFamilyMemberModalOpen: (state) => {
      state.isFamilyMemberModalOpen = !state.isFamilyMemberModalOpen
    },

    //Family Member
    onToggleChangePasswordModalOpen: (state) => {
      state.isChangePasswordModalOpen = !state.isChangePasswordModalOpen
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  //User
  onSetSelectedUser,
  onToggleDeleteUserModal,

  //UserPatient
  onToggleUserPatientModal,
  onToggleUserPatientUnlinkModal,
  onToggleFamilyMemberModalOpen,

  //Chane Password
  onToggleChangePasswordModalOpen,
} = userSlice.actions

export default userSlice.reducer
