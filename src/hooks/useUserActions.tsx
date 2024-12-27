import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../features/user/userSlice';

export const useUserActions = (
  currentUser: any,
  setIsDrawerOpen: (state: boolean) => void,
  setIsMobileNavOpen: (state: boolean) => void,
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (currentUser) {
      navigate(`/user/${currentUser.id}`);
      setIsMobileNavOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  }, [currentUser, navigate, setIsDrawerOpen, setIsMobileNavOpen]);

  const handleLogout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return { handleClick, handleLogout };
};
