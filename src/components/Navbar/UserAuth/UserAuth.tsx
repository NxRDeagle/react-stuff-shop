import React from 'react';
import { Drawer } from '../Drawer/Drawer';
import { UserSignUpForm } from '../UserSignUpForm/UserSignUpForm';
import { UserLoginForm } from '../UserLoginForm/UserLoginForm';
import { UserAuthSteps } from '../../../utils/enums';
import { useAuth } from '../../../hooks/useAuth';

interface UserAuthProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
}

export const UserAuth: React.FC<UserAuthProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { auth, isAnimating, toggleAuth } = useAuth();

  const content = (
    <div
      className={`transition-all duration-500 ${
        isAnimating ? '-translate-y-28 opacity-0' : 'translate-y-0 opacity-100'
      }`}>
      {auth === UserAuthSteps.REGISTER ? (
        <UserSignUpForm setIsOpen={setIsDrawerOpen} setAuth={toggleAuth} />
      ) : (
        <UserLoginForm setIsOpen={setIsDrawerOpen} setAuth={toggleAuth} />
      )}
    </div>
  );

  return <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} content={content} />;
};
