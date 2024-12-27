import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/store';
import { Category } from '../../Categories/Category';
import { UserInput } from '../UserInput/UserInput';
import { UserAuth } from '../UserAuth/UserAuth';
import { useMobileNav } from '../../../hooks/useMobileNav';
import { SearchForm } from '../SearchInput/SearchForm';
interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen }) => {
  const { userInputDrawerOpen, setUserInputDrawerOpen, handleClose } = useMobileNav(
    isOpen,
    setIsOpen,
  );
  const { categoriesList } = useSelector((state: RootState) => state.categories);

  return (
    <>
      <UserAuth setIsDrawerOpen={setUserInputDrawerOpen} isDrawerOpen={userInputDrawerOpen} />
      <div
        className={`fixed w-full h-full transition-all transform duration-300 bg-heroGray z-[100] pr-5 sm:pr-12 ${
          isOpen ? '-translate-y-3 opacity-100' : '-translate-y-1/4 opacity-0 invisible'
        }`}>
        <div className="mb-3">
          <UserInput
            isImageVisibleWithoutDelay={false}
            mobileNavOpen={isOpen}
            setIsMobileNavOpen={setIsOpen}
            setIsDrawerOpen={setUserInputDrawerOpen}
          />
        </div>

        <SearchForm handleCloseMobileNav={handleClose} />

        <div className="category__nav--mobile mt-20 text-center overflow-y-auto max-h-[calc(100vh-250px)]">
          <p className="uppercase text-white font-montserrat font-semibold mb-5">Categories</p>
          <nav>
            <ul className="text-xl font-medium leading-8 text-lighterGray text-center">
              {categoriesList.map((category) => (
                <Category
                  key={category.id}
                  href={`products/category/${category.id}`}
                  text={category.name}
                  setIsOpen={handleClose}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
