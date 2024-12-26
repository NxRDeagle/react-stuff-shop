import React from 'react';
import { useDrawer } from '../../../hooks/useDrawer';

interface DrawerProps {
  content: React.ReactNode;
  footer?: React.ReactNode;
  isOpen: boolean;
  isAllwaysHidden?: boolean;
  setIsOpen: (state: boolean) => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  content,
  footer,
  isAllwaysHidden = true,
  isOpen,
  setIsOpen,
}) => {
  const { shouldRender, showModal, handleClose } = useDrawer(isOpen, isAllwaysHidden, setIsOpen);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 transition-all duration-300 bg-heroGray bg-opacity-80 z-[200] ${showModal ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />
      <div
        className={`z-[201] fixed w-full drawer-full:w-[500px] h-full top-0 bg-customGray transition-all duration-300 ${
          showModal ? 'right-0 opacity-100' : '-right-[500px] opacity-0'
        }`}
      >
        <button className="absolute top-[14px] right-[14px] group z-50" onClick={handleClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="stroke-current text-gray-400 group-hover:text-buttonPink transition-colors duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.375 4.375L15.625 15.625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.375 15.625L15.625 4.375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex flex-col justify-between h-full px-2 xs:px-4 py-3">
          <div className="flex-1">
            {content}
          </div>
          {footer}
        </div>
      </div>
    </>
  );
};
