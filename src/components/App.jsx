import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshThunk } from '../redux/auth/authSlice';

import Navigation from './Navigation/Navigation';
import Loader from './Loader/loader';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictRoute/RestrictedRoute';

const Home = lazy(() => import('../pages/home'));
const Contacts = lazy(() => import('../pages/contacts'));
const Registration = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));

export const appRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/registration',
    element: (
      <RestrictedRoute>
        <Registration />
      </RestrictedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RestrictedRoute>
        <Login />
      </RestrictedRoute>
    ),
  },
  {
    path: '/contacts',
    element: (
      <PrivateRoute>
        <Contacts />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  return (
    <>
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Routes>
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
};
export default App;
