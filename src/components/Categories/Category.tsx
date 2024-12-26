import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface CategoryProps {
  text: string;
  href: string;
  setIsOpen?: (state: boolean) => void;
}

export const Category: React.FC<CategoryProps> = ({ text, href, setIsOpen }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const isActive = location.pathname + location.search === href;

  return (
    <li className="mb-3">
      <NavLink
        to={href}
        onClick={(e) => {
          setIsOpen && setIsOpen(false);
          if (isActive) {
            e.preventDefault();
            navigation('/shop');
          }
        }}
        className={`capitalize hover:text-categoriesPink transition-colors duration-300 ${
          isActive ? 'text-categoriesPink' : ''
        }`}>
        {text}
      </NavLink>
    </li>
  );
};
