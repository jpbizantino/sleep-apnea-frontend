import './App.css'
import { Survey } from './survey/Survey'
import { SurveyHeader } from './survey/components/SurveyHeader'
import { SurveyContextProvider } from './survey/views/context/SurveyContextContextProvider'
import { AppTheme } from './theme/AppTheme'

function App() {
  return (
    <>
      <SurveyContextProvider>
        <AppTheme>
          <SurveyHeader />
          <Survey />
        </AppTheme>
      </SurveyContextProvider>
    </>
  )
}

export default App
