import { selectAuthUser } from 'components/redux/auth/authSelectors';
import { logOutThunk } from 'components/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserMenu = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOutThunk());
  };
  return (
    <div>
      <p>Welcome {user.name}</p>
      <button type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
export default UserMenu;
