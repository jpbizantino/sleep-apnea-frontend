import { BackofficePage } from '../pages/BackofficePage'
import { QuestionList } from './QuestionList'

export const BackofficeView = () => {
  return (
    <>
      <BackofficePage>
        <QuestionList />
      </BackofficePage>
    </>
  )
}

export default BackofficeView
