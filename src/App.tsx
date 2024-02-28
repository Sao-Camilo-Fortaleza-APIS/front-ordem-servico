import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ContainerApp } from './components/ContainerApp'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
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
        <Outlet />
      </ContainerApp>
    </>
  )
}

export default App
