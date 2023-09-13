import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { FormAjuste } from './Pages/Formularios/FormAjuste'
import { AjusteOk } from './Pages/Formularios/FormAjuste/AjusteSucess'
import { GlobalStyles } from './Styles/global'
import { HeaderComponent } from './components/Header'
import { ContainerForm } from './components/ContainerForm'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <>
      <GlobalStyles />
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      {/*  <Router>
        <Routes> */}
      {/* Rota principal que exibe as opçoes de formularios  */}
      {/* <Route path='/' element={<FormAjuste />} />
          <Route path='/ajuste/success/:nr_seq_os' element={<AjusteOk />} />
        </Routes>
      </Router> */}
      <ContainerForm>
        <HeaderComponent />
        <NavBar />
        <Outlet />
      </ContainerForm>
    </>
  )
}

export default App
