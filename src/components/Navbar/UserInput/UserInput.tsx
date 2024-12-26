import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import { useUserActions } from '../../../hooks/useUserActions';
import { useUserImage } from '../../../hooks/useUserImage';

interface UserInputProps {
  mobileNavOpen?: boolean;
  setIsDrawerOpen: (state: boolean) => void;
  setIsMobileNavOpen: (state: boolean) => void;
  isImageVisibleWithoutDelay?: boolean;
}

export const UserInput = React.memo(
  ({
    setIsDrawerOpen,
    setIsMobileNavOpen,
    mobileNavOpen = false,
    isImageVisibleWithoutDelay = true,
  }: UserInputProps) => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    const userImage = useUserImage(
      setIsMobileNavOpen,
      currentUser,
      isImageVisibleWithoutDelay,
      mobileNavOpen,
    );

    const { handleClick, handleLogout } = useUserActions(
      currentUser,
      setIsDrawerOpen,
      setIsMobileNavOpen,
    );

    return (
      <div className="flex justify-between gap-4">
        <button className="gap-[10px] items-center flex" onClick={handleClick}>
          <div className="flex items-center justify-center w-9 h-9 bg-customGray rounded-full">
            <img
              className={`rounded-full h-full w-full object-cover transition-opacity duration-300`}
              src={userImage}
              alt="Avatar"
            />
          </div>
          <p className="font-montserrat font-normal text-xs leading-3 text-lightGray hover:text-white transition-text duration-300">
            {currentUser ? currentUser.name : 'Login'}
          </p>
        </button>
        {currentUser && (
          <button
            className="text-xs text-lightGray hover:text-white transition-text duration-300 whitespace-nowrap"
            onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    );
  },
);
