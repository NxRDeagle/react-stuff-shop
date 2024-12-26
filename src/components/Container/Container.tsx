import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  flexGrow?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ children, flexGrow = false }) => {
  return (
    <div
      className={`max-w-[1290px] w-full mx-auto sm:max-w-[1306px] sm:px-4 px-2  ${
        flexGrow ? 'flex-grow h-auto flex flex-col' : 'h-full'
      } `}>
      {children}
    </div>
  );
};
