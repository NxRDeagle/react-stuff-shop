import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../lib/types';

interface ShowcaseCategoryProps {
  category: Category;
}

export const ShowcaseCategory: React.FC<ShowcaseCategoryProps> = ({ category }) => {
  return (
    <div className="group hover:shadow-customPink transition-shadow duration-300 relative card flex flex-col rounded-b-lg bg-heroGray flex-shrink-0">
      {/* Change to id */}
      <Link className="absolute inset-0" to={`/shop?categoryId=${category.id}`}></Link>
      <img
        className="rounded-t-md object-cover xl:w-[234px] xl:h-[234px] h-full w-full"
        src={category.image}
        alt="Category image"
      />
      <h3 className="flex items-center justify-center text-white font-semibold leading-4 py-3 text-sm max-w-[200px] mb-3">
        {category.name}
      </h3>
    </div>
  );
};
