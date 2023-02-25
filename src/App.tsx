import { BrowserRouter } from 'react-router-dom'
import PrimeReact from 'primereact/api'
import DefaultLayout from './layout/DefaultLayout'
import { AuthProvider } from './context/AuthProvider'
import './App.css'

import "primereact/resources/themes/vela-blue/theme.css"
import "primereact/resources/primereact.min.css"                  //core css
import "primeicons/primeicons.css"
import "/node_modules/primeflex/primeflex.css"

PrimeReact.ripple = true;

function App() {
  return (
    <BrowserRouter >
      <AuthProvider>
        <>
          <DefaultLayout />
        </>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
