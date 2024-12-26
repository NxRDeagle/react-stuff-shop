import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-customGray mt-5 p-6">
      <div className="container mx-auto flex justify-between items-center flex-col gap-5 xs:flex-row">
        <Link to={'/'} className="flex-shrink-0">
          {' '}
          <img src="images/logo.svg" alt="Logo" />
        </Link>

        <div className="text-sm text-gray-400">
          Developed by{' '}
          <a href="#" className="text-purple-500">
            some smart dude
          </a>
        </div>

        <div className="flex space-x-3">
          <Link
            to="/"
            className="text-gray-500 transition-color duration-300 hover:text-buttonPink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6zM12 2a10 10 0 1010 10A10 10 0 0012 2zm5 10l-7 4V8z" />
            </svg>
          </Link>
          <Link
            to="/"
            className="text-gray-500 transition-color duration-300  hover:text-buttonPink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M22 12a10 10 0 10-18.4 5.8v-4.4H2v-3.4h1.6v-2.4a3.6 3.6 0 013.6-3.6h2.4v3.4H7.2c-.5 0-.8.2-.8.6v1.6h3.4v3.4H6.4v4.4A10 10 0 1022 12z" />
            </svg>
          </Link>
          <Link
            to="/"
            className="text-gray-500 transition-color duration-300 hover:text-buttonPink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M12 2.04c-5.522 0-10 4.477-10 10 0 4.418 3.001 8.14 7.22 9.495.527.1.721-.228.721-.507v-1.754c-2.926.631-3.534-1.41-3.534-1.41-.477-1.213-1.166-1.538-1.166-1.538-.952-.652.073-.639.073-.639 1.053.074 1.607 1.084 1.607 1.084.936 1.604 2.457 1.14 3.054.871.096-.677.366-1.141.666-1.403-2.33-.266-4.777-1.164-4.777-5.178 0-1.144.407-2.082 1.079-2.814-.108-.267-.468-1.345.102-2.802 0 0 .88-.282 2.883 1.077a9.914 9.914 0 015.26 0c2.003-1.359 2.883-1.077 2.883-1.077.57 1.457.21 2.535.102 2.802.673.732 1.079 1.67 1.079 2.814 0 4.026-2.452 4.91-4.79 5.167.376.325.714.966.714 1.947v2.88c0 .284.186.611.727.505A10.01 10.01 0 0022 12.04c0-5.523-4.478-10-10-10z" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};
