import { useState, useEffect } from 'react';
import { enableScrollbar, disabledScrollbar } from '../utils/common';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

export const useDrawer = (
  isOpen: boolean,
  isAllwaysHidden: boolean,
  setIsOpen: (state: boolean) => void,
) => {
  const [showModal, setShowModal] = useState(isOpen);
  const mobileNavOpen = useSelector((state: RootState) => state.scrollbar.mobileNavOpen);
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      disabledScrollbar();
    } else {
      setShowModal(false);
      if (!mobileNavOpen) enableScrollbar();
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  if (isAllwaysHidden && !isOpen) {
    return { shouldRender: false, handleClose };
  }

  return { shouldRender: true, showModal, handleClose };
};
