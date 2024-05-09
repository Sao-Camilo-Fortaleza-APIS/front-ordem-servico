import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import { AjusteOk } from './Pages/Formularios/FormAjuste/AjusteSucess';
import { Historico } from './Pages/Formularios/Historico';
import { SearchProvider } from './contexts/SearchContext';
import { Login } from './routes/Login';
import { RegisterServiceOrdem } from './routes/RegisterServiceOrder';
import { SignIn } from './routes/SignIn';
import { ViewOrders } from './routes/ViewOrders';
import { GlobalStyles } from './styles/global';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <RegisterServiceOrdem />,
      },
      {
        path: '/ajuste/success/:nr_seq_os',
        element: <AjusteOk />,
      },
      {
        path: '/historico',
        element: <SearchProvider><Historico /></SearchProvider>,
      },
      {
        path: '/entrar',
        element: <SignIn />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/ordens',
        element:
          <ViewOrders />,
      },
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
