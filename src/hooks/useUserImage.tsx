import { useEffect, useState } from 'react';
import { User } from '../lib/types';

const userPlaceholder = '/images/user-avatar.svg';
export const useUserImage = (
  setIsMobileNavOpen: (state: boolean) => void,
  currentUser: User | null,
  isImageVisibleWithoutDelay: boolean,
  mobileNavOpen: boolean,
) => {
  const [userImage, setUserImage] = useState(userPlaceholder);

  useEffect(() => {
    if (!currentUser) {
      setUserImage('images/user-avatar.svg');
      return;
    }
    if (isImageVisibleWithoutDelay) {
      setUserImage(currentUser.avatar);
      return;
    }
    if (mobileNavOpen) {
      setTimeout(() => {
        setUserImage(currentUser.avatar);
      }, 300);
    } else {
      setUserImage(userPlaceholder);
    }
  }, [setIsMobileNavOpen, currentUser, mobileNavOpen, isImageVisibleWithoutDelay]);

  return userImage;
};
