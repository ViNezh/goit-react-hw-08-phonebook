import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshThunk } from './redux/auth/authSlice';

import Navigation from './Navigation/Navigation';
import Loader from './Loader/loader';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictRoute/RestrictedRoute';
import { ToastContainer } from 'react-toastify';

const Home = lazy(() => import('./pages/home'));
const Contacts = lazy(() => import('./pages/contacts'));
const Registration = lazy(() => import('./pages/register'));
const Login = lazy(() => import('./pages/login'));

const appRoutes = [
  {
    path: '/',
    element: (
      <RestrictedRoute>
        <Home />
      </RestrictedRoute>
    ),
  },
  {
    path: '/registration',
    element: <Registration />,
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
      />
    </>
  );
};
export default App;
