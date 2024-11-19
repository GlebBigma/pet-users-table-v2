import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ROUTES } from './routes/routes.ts';
import Root from './routes/root.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Users from './pages/Users/Users.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.USERS,
        element: <Users />
      }
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
