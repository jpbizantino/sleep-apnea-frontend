import { RootState, useAppDispatch } from '../../../store/store'
import { useSelector } from 'react-redux'
import {
  onSetSelectedUser,
  onToggleDeleteUserModal,
  onToggleUserPatientModal,
  onToggleUserPatientUnlinkModal,
  onToggleFamilyMemberModalOpen,
  onToggleChangePasswordModalOpen,
} from '../slices'
import { User } from '../../common/types/user.type'

export const useUser = () => {
  const {
    selectedUser,
    isUserPatientModalOpen,
    isUserPatientUnlinkModalOpen,
    isFamilyMemberModalOpen,
    isDeleteUserModalOpen,
    isChangePasswordModalOpen,
  } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  //User
  const setSelectedUser = (selectedUser: User) => {
    dispatch(onSetSelectedUser(selectedUser))
  }

  const toggleDeleteUserModal = () => {
    dispatch(onToggleDeleteUserModal())
  }

  //UserPatient
  const toggleUserPatientModal = () => {
    dispatch(onToggleUserPatientModal())
  }

  const toggleUserPatientUnlinkModal = () => {
    dispatch(onToggleUserPatientUnlinkModal())
  }

  //Family Member
  const toggleFamilyMemeberModaOpen = () => {
    dispatch(onToggleFamilyMemberModalOpen())
  }

  //Change Password
  const toggleChangePasswordModaOpen = () => {
    dispatch(onToggleChangePasswordModalOpen())
  }

  return {
    //User
    selectedUser,
    setSelectedUser,
    isDeleteUserModalOpen,
    toggleDeleteUserModal,

    //User Patient
    isUserPatientModalOpen,
    isUserPatientUnlinkModalOpen,

    toggleUserPatientModal,
    toggleUserPatientUnlinkModal,

    //Family Member
    isFamilyMemberModalOpen,
    toggleFamilyMemeberModaOpen,

    //Change Password
    isChangePasswordModalOpen,
    toggleChangePasswordModaOpen,
  }
}
