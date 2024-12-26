import { useState } from 'react';
import { UserAuthSteps } from '../utils/enums';

export const useAuth = () => {
  const [auth, setAuth] = useState(UserAuthSteps.REGISTER);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAuth = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setAuth((prevAuth) =>
        prevAuth === UserAuthSteps.REGISTER ? UserAuthSteps.LOGIN : UserAuthSteps.REGISTER,
      );
      setIsAnimating(false);
    }, 500);
  };

  return {
    auth,
    isAnimating,
    toggleAuth,
  };
};
