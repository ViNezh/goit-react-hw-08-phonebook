import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshThunk } from './redux/auth/authSlice';

import Navigation from './Navigation/Navigation';
import Loader from './Loader/loader';

const Home = lazy(() => import('./pages/home'));
const Contacts = lazy(() => import('./pages/contacts'));
const Registration = lazy(() => import('./pages/register'));
const Login = lazy(() => import('./pages/login'));

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/registration', element: <Registration /> },
  { path: '/login', element: <Login /> },
  { path: '/contacts', element: <Contacts /> },
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
