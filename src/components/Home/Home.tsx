import { useEffect } from 'react';
import { Categories } from '../Categories/Categories';
import { Hero } from '../Hero/Hero';
import { Showcase } from '../Showcase/Showcase';
import { SaleAdd } from '../SaleAdd/SaleAdd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { filterByPrice } from '../../features/products/productsSlice';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);
  const categories = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (!products.productsList.length) return;
    dispatch(filterByPrice(100));
  }, [dispatch, products.productsList]);
  return (
    <>
      <div className="flex ">
        <Categories></Categories>
        <Hero></Hero>
      </div>
      <div className="mb-5">
        <Showcase header="Trending" data={products.productsList}></Showcase>
      </div>
      <div className="mb-5">
        <Showcase header="Worth seeing" data={categories.categoriesList}></Showcase>
      </div>
      <div className="mb-9">
        <SaleAdd
          title="new year"
          imgRight="images/snowman.png"
          imgLeftF="images/imgLeftF.png"
          imgLeftS="images/imgLeftS.png"
          saveMoney="50%"></SaleAdd>
      </div>
      <Showcase header="Less than 100$" data={products.filtered}></Showcase>
    </>
  );
};
