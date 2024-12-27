import React, { useEffect, useState } from 'react';
import { ShowcaseCard } from './ShowcaseCard';
import { Button } from '../Button/Button';
import { ShowcaseTypesArray } from '../../lib/types';
import { useWindowSize } from '../../hooks/useWindowSize';

interface ShowcaseProps {
  header?: string;
  data: ShowcaseTypesArray;
}

export const Showcase: React.FC<ShowcaseProps> = ({ header, data }) => {
  const windowSize = useWindowSize();

  const getVisibleProductCount = () => {
    if (windowSize <= 640) return 1;
    if (windowSize <= 768) return 2;
    if (windowSize <= 1024) return 3;
    if (windowSize <= 1280) return 4;
    return 5;
  };

  const [visibleProductsCount, setVisibleProductsCount] = useState(getVisibleProductCount());

  const loadMoreProducts = () => {
    const maxVisible = getVisibleProductCount();
    setVisibleProductsCount((prevCount) => Math.min(prevCount + maxVisible, data.length));
  };

  useEffect(() => {
    setVisibleProductsCount(getVisibleProductCount());
  }, [windowSize]);
  return (
    <div className="bg-customGray w-full text-center rounded-md flex flex-col items-center flex-1">
      {header && <h3 className="font-semibold text-xl text-white py-6">{header}</h3>}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-3 gap-5 justify-center pb-5`}>
        {data.slice(0, visibleProductsCount).map((item) => (
          <ShowcaseCard key={item.id} data={item} />
        ))}
      </div>
      {visibleProductsCount < data.length && (
        <Button className="mt-8 mb-4" onClick={loadMoreProducts}>
          See more
        </Button>
      )}
    </div>
  );
};
