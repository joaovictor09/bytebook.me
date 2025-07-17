import { Home } from './pages/home/page'
import { AuthLayout } from './layouts/auth-layout'
import { SignIn } from './pages/sign-in/page'
import { NotFound } from './pages/not-found/page'
import { createBrowserRouter } from 'react-router'
import { PrivateRoute } from './components/private-route.tsx'
import { App } from './app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App usa useAuthInit
    children: [
      {
        element: <PrivateRoute />, // Tudo daqui pra baixo exige auth
        children: [
          { index: true, element: <Home /> },
          { path: 'dashboard', element: <div>Dashboard</div> },
          { path: 'profile', element: <div>Perfil</div> },
          // Adicione outras rotas privadas aqui
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [{ index: true, element: <SignIn /> }],
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
])
