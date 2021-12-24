import { Routes, Route } from 'react-router-dom'

import AppHeader from 'components/AppHeader'

import ProblemPage from 'pages/ProblemPage'
import AuthorizationPage from 'pages/AuthorizationPage'

const App = () => {
  return (
    <div className="App__container">
      <AppHeader />
      <div className="App__route-wrapper">
        <Routes>
          <Route path="/problems" element={<ProblemPage />} />
          <Route path="/authorize" element={<AuthorizationPage />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
