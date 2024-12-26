import { useState, useEffect, useCallback } from 'react';
import { enableScrollbar, disabledScrollbar } from '../utils/common';
import { useDispatch } from 'react-redux';
import { toggleScrollbar } from '../features/scrollbar/scrollbarSlice';

export const useMobileNav = (isOpen: boolean, setIsOpen: (state: boolean) => void) => {
  const [userInputDrawerOpen, setUserInputDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    setTimeout(() => setIsOpen(false), 300);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      disabledScrollbar();
      dispatch(toggleScrollbar(true));
    } else {
      enableScrollbar();
      dispatch(toggleScrollbar(false));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 745 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, setIsOpen]);

  return {
    userInputDrawerOpen,
    setUserInputDrawerOpen,
    handleClose,
  };
};
