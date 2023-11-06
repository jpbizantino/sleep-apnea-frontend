import './App.css'
import { AppRouter } from './common/router/AppRouter'
import { SurveyContextProvider } from './publicSurvey/views/context/SurveyContextContextProvider'

import { AppTheme } from './theme/AppTheme'

function App() {
  return (
    <>
      <SurveyContextProvider>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </SurveyContextProvider>
    </>
  )
}

export default App
