import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store'
import { Provider } from 'react-redux'
import App from './App'
import './styles/global.scss'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
)
