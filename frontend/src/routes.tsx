import { Home } from './pages/home/page'
import { AuthLayout } from './layouts/auth-layout'
import { SignIn } from './pages/sign-in/page'
import { NotFound } from './pages/not-found/page'
import { createBrowserRouter } from 'react-router'
import { PrivateRoute } from './components/private-route.tsx'
import { App } from './app'
import { Profile } from './pages/profile'
import { CommunityPage } from './pages/community/index.tsx'
import { CommunitiesPage } from './pages/communities/index.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App usa useAuthInit
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: '/profiles/:profileId', element: <Profile /> },
          { path: '/communities', element: <CommunitiesPage /> },
          { path: '/communities/:communityId', element: <CommunityPage /> },
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
