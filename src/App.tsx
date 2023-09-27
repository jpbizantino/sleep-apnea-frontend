import './App.css'
import { Survey } from './survey/Survey'
import { SurveyHeader } from './survey/components/SurveyHeader'
import { SurveyContextProvider } from './survey/views/context/SurveyContextContextProvider'

function App() {
  return (
    <>
      <SurveyContextProvider>
        <SurveyHeader />
        <Survey />
      </SurveyContextProvider>
    </>
  )
}

export default App
