import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { onToggleMainMenu, onOpenMainMenu } from '../slices'

export const useApp = () => {
  const { isMainMenuOpen } = useSelector((state: RootState) => state.app)

  const dispatch = useAppDispatch()

  const toggleMainMenu = () => {
    dispatch(onToggleMainMenu())
  }

  const openMainMenu = () => {
    dispatch(onOpenMainMenu())
  }

  return {
    isMainMenuOpen,
    toggleMainMenu,
    openMainMenu,
  }
}
