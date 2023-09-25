import './App.css'
import { Survey } from './survey/Survey'
import { SurveyContextProvider } from './survey/views/context/SurveyContextContextProvider'

function App() {
  return (
    <>
      <SurveyContextProvider>
        <Survey />
      </SurveyContextProvider>
    </>
  )
}

export default App
