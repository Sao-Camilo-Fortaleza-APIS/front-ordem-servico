import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles } from './Styles/global'
import { ContainerApp } from './components/ContainerApp'
import { Header } from './components/Header'
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
      <ContainerApp>
        <Header />
        <Navbar />
        <Outlet />
      </ContainerApp>
    </>
  )
}

export default App
