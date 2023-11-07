import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'react-toastify/dist/ReactToastify.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { FormAjuste } from './Pages/Formularios/FormAjuste';
import { AjusteOk } from './Pages/Formularios/FormAjuste/AjusteSucess';
import { RegisterServiceOrdem } from './routes/RegisterServiceOrder';
import { Historico } from './Pages/Formularios/Historico';
import { SearchProvider } from './contexts/SearchContext';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <RegisterServiceOrdem />,
        index: true,
      },
      {
        path: '/ajuste/success/:nr_seq_os',
        element: <AjusteOk />,
      },
      {
        path: '/historico',
        element: <SearchProvider><Historico /></SearchProvider>,
      }
    ],
  }
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
