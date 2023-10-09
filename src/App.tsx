import './App.css'
import { AppRouter } from './routes/AppRouter'
import { SurveyContextProvider } from './survey/views/context/SurveyContextContextProvider'
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
