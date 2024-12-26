import { useState } from 'react';
import { Container } from '../Container/Container';
import { Link } from 'react-router-dom';

import { MobileNav } from './MobileNav/MobileNav';
import { SearchInput } from './SearchInput/SearchInput';
import { UserAuth } from './UserAuth/UserAuth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { UserInput } from './UserInput/UserInput';
import { Cart } from './Cart/Cart';
import { SearchForm } from './SearchInput/SearchForm';

export const Navbar = () => {
  const [userSignUpIsOpen, setUserSignUpIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { cart } = useSelector((state: RootState) => state.user);
  return (
    <Container>
      <UserAuth isDrawerOpen={userSignUpIsOpen} setIsDrawerOpen={setUserSignUpIsOpen}></UserAuth>
      <header className="relative flex z-[199] justify-normal navInputHide:justify-between items-center  mr-1  py-5 gap-5">
        <Link to={'/'} className="flex-shrink-0">
          {' '}
          <img src="images/logo.svg" alt="Logo" onClick={() => setIsMobileNavOpen(false)} />
        </Link>
        <div className="hidden navInputHide:block">
          <UserInput
            setIsMobileNavOpen={setIsMobileNavOpen}
            setIsDrawerOpen={setUserSignUpIsOpen}></UserInput>
        </div>
        <div className="hidden navInputHide:block max-w-[303px] w-full">
          <SearchForm></SearchForm>
        </div>
        <div className="flex items-center flex-shrink-0 ml-auto navInputHide:ml-0">
          <Link
            to={'/favorites'}
            onClick={() => setIsMobileNavOpen(false)}
            className="mr-5 group border-none outline-none bg-transparent">
            <svg
              className="stroke-current text-gray-400 group-hover:text-buttonPink transition-colors duration-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 12C0.75 9 1.5 4.5 5.25 3C9 1.5 11.25 4.5 12 6C12.75 4.5 15.75 1.5 19.5 3C23.25 4.5 23.25 9 21 12C18.75 15 12 21 12 21C12 21 5.25 15 3 12Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <button
            onClick={() => setCartIsOpen(true)}
            className="group border-none outline-none bg-transparent relative">
            <svg
              className="stroke-current text-gray-400 group-hover:text-buttonPink transition-colors duration-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.94 18.06L19.26 8.31C19.1453 7.47997 18.7404 6.71734 18.1172 6.15725C17.4939 5.59716 16.6926 5.27576 15.855 5.25H15.75C15.75 4.25544 15.3549 3.30161 14.6517 2.59835C13.9484 1.89509 12.9946 1.5 12 1.5C11.0055 1.5 10.0516 1.89509 9.34837 2.59835C8.64511 3.30161 8.25002 4.25544 8.25002 5.25H8.14502C7.30749 5.27576 6.50611 5.59716 5.88287 6.15725C5.25963 6.71734 4.85477 7.47997 4.74002 8.31L3.06002 18.06C2.95683 18.6256 2.97926 19.2071 3.12572 19.7631C3.27217 20.3191 3.53907 20.8361 3.90752 21.2775C4.21796 21.6565 4.60803 21.9625 5.05003 22.1738C5.49204 22.385 5.97513 22.4964 6.46502 22.5H17.535C18.0249 22.4964 18.508 22.385 18.95 22.1738C19.392 21.9625 19.7821 21.6565 20.0925 21.2775C20.461 20.8361 20.7279 20.3191 20.8743 19.7631C21.0208 19.2071 21.0432 18.6256 20.94 18.06ZM12 3C12.5968 3 13.1691 3.23705 13.591 3.65901C14.013 4.08097 14.25 4.65326 14.25 5.25H9.75002C9.75002 4.65326 9.98707 4.08097 10.409 3.65901C10.831 3.23705 11.4033 3 12 3ZM18.945 20.31C18.7755 20.522 18.5612 20.6938 18.3174 20.8131C18.0736 20.9325 17.8064 20.9963 17.535 21H6.46502C6.19362 20.9963 5.92643 20.9325 5.68263 20.8131C5.43883 20.6938 5.2245 20.522 5.05502 20.31C4.82646 20.0365 4.66149 19.7157 4.57199 19.3707C4.4825 19.0257 4.47073 18.6651 4.53752 18.315L6.21752 8.565C6.27335 8.08382 6.49737 7.63782 6.85004 7.30574C7.20271 6.97365 7.66135 6.77683 8.14502 6.75H15.855C16.3387 6.77683 16.7973 6.97365 17.15 7.30574C17.5027 7.63782 17.7267 8.08382 17.7825 8.565L19.4625 18.315C19.5293 18.6651 19.5175 19.0257 19.428 19.3707C19.3386 19.7157 19.1736 20.0365 18.945 20.31Z"
                fill="#B8B8B8"
              />
            </svg>
            {cart.cartItems.length > 0 && (
              <span className="absolute right-0 -bottom-[2px] h-3 w-3 rounded-full px-1 py-[1px] bg-categoriesPink text-white font-bold text-[9px] flex items-center justify-center">
                {cart.cartItems.reduce((accumulator, cartItem) => {
                  return accumulator + cartItem.quantity;
                }, 0)}
              </span>
            )}
          </button>
          <button
            className="mobile-nav-btn cursor-pointer"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}>
            <div className={`nav-icon ${isMobileNavOpen ? 'nav-icon--active' : ''}`}></div>
          </button>
        </div>
      </header>
      <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen}></MobileNav>
      <Cart isDrawerOpen={cartIsOpen} setIsDrawerOpen={setCartIsOpen}></Cart>
    </Container>
  );
};
