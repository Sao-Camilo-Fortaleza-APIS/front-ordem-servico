import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from './Styles/global'
import { Header } from './components/Header'
import { ContainerForm } from './components/ContainerForm'
import { Navbar } from './components/Navbar'

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
        <Header />
        <Navbar />
        <Outlet />
      </ContainerForm>
    </>
  )
}

export default App
