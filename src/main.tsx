import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'react-toastify/dist/ReactToastify.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FormAjuste } from './Pages/Formularios/FormAjuste';
import { AjusteOk } from './Pages/Formularios/FormAjuste/AjusteSucess';
import { RegisterServiceOrdem } from './routes/RegisterServiceOrder';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/ajuste',
        element: <RegisterServiceOrdem />,
      },
      {
        path: '/ajuste/success/:nr_seq_os',
        element: <AjusteOk />,
      }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
