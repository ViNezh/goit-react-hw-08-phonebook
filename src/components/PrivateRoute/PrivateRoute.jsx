import { selectAuthentificated } from 'components/redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo = '/login' }) => {
  const authenticated = useSelector(selectAuthentificated);
  return authenticated ? children : <Navigate to={redirectTo} replace />;
};
export default PrivateRoute;
