import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ContainerApp } from './components/ContainerApp'

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
        stacked
        theme="light" />
      <ContainerApp>
        <Outlet />
      </ContainerApp>
    </>
  )
}

export default App
