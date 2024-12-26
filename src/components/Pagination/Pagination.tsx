import React from 'react';

interface PaginationProps {
  page: number;
}

export const Pagination: React.FC<PaginationProps> = ({ page }) => {
  return (
    <div className="flex justify-center items-center gap-[10px]">
      <span
        className={`cursor-pointer py-3 px-4 font-semibold text-sm leading-4 rounded-lg text-white ${
          page === 1 ? 'bg-buttonPink' : 'bg-heroGray'
        }`}>
        {page}
      </span>
      <span className="cursor-pointer py-3 px-4 font-semibold text-sm leading-4 rounded-lg text-white bg-heroGray transition-bg duration-300 hover:bg-buttonPink hover:bg-opacity-60">
        2
      </span>
      <span className="cursor-pointer py-3 px-4 font-semibold text-sm leading-4 rounded-lg text-white bg-heroGray  transition-bg duration-300 hover:bg-buttonPink hover:bg-opacity-60">
        3
      </span>
    </div>
  );
};
