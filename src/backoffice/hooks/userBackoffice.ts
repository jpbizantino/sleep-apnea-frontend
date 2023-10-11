import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import {
  onToggleMainMenu,
  onOpenMainMenu,
  onSetSelectedQuestion,
  onSetSelectedChoice,
  onToggleChoiceModal,
} from '../slices'
import { Choice, Question } from '../../common/types'

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

  const addNewChoice = (question: Question, choice: Choice) => {
    dispatch(
      onSetSelectedQuestion({
        ...question,
        choices: [...question.choices, choice],
      })
    )
  }

  const removeChoice = (question: Question, choice: Choice) => {
    dispatch(
      onSetSelectedQuestion({
        ...selectedQuestion,
        choices: question.choices.filter((p) => p._id !== choice._id),
      })
    )
  }

  const updateChoice = (question: Question, choice: Choice) => {
    const index = question.choices.findIndex((p) => p._id == choice._id)

    question.choices[index] = choice

    onSetSelectedQuestion({
      ...selectedQuestion,
      choices: question.choices,
    })
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
    addNewChoice,
    removeChoice,
    //Choice
    toggleChoiceModal,
    updateChoice,
    setSelectedChoice,
    openNewChoice,
    isChoiceModalOpen,
    selectedChoice,
  }
}
