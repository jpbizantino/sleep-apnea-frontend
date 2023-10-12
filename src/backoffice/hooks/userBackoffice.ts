import { useSelector } from 'react-redux'
import { Choice, Question } from '../../common/types'
import { RootState, useAppDispatch } from '../../store/store'
import {
  onOpenMainMenu,
  onSetSelectedChoice,
  onSetSelectedQuestion,
  onToggleChoiceModal,
  onToggleMainMenu,
} from '../slices'

export const useBackoffice = () => {
  const {
    isMainMenuOpen,
    selectedQuestion,
    isChoiceModalOpen,
    selectedChoice,
  } = useSelector((state: RootState) => state.backoffice)

  const dispatch = useAppDispatch()

  const toggleMainMenu = () => {
    dispatch(onToggleMainMenu())
  }

  const openMainMenu = () => {
    dispatch(onOpenMainMenu())
  }

  const setSelectedQuestion = (question: Question) => {
    dispatch(onSetSelectedQuestion(question))
  }

  const openNewChoice = () => {
    dispatch(onSetSelectedChoice(null))
    dispatch(onToggleChoiceModal())
  }

  const toggleChoiceModal = () => {
    dispatch(onToggleChoiceModal())
  }

  const setSelectedChoice = (choice: Choice) => {
    dispatch(onSetSelectedChoice(choice))
  }

  return {
    //Main
    isMainMenuOpen,
    toggleMainMenu,
    openMainMenu,
    //Question
    setSelectedQuestion,
    selectedQuestion,
    //Choice
    toggleChoiceModal,
    openNewChoice,
    setSelectedChoice,
    isChoiceModalOpen,
    selectedChoice,
  }
}
