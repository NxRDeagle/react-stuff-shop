import React from 'react';
import { Category, Product, ShowcaseTypes } from '../../lib/types';
import { ShowcaseProduct } from './ShowcaseProduct';
import { ShowcaseCategory } from './ShowcaseCategory';
import { isProduct } from '../../utils/common';

interface ShowcaseCardProps {
  data: ShowcaseTypes;
}
export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ data }) => {
  if (isProduct(data)) return <ShowcaseProduct product={data} />;

  return <ShowcaseCategory category={data} />;
};
