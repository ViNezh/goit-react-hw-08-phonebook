import { selectAuthentificated } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RestrictedRoute = ({ children, redirectTo = '/contacts' }) => {
  const authenticated = useSelector(selectAuthentificated);
  return authenticated ? <Navigate to={redirectTo} replace /> : children;
};
export default RestrictedRoute;
