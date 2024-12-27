import { Categories } from '../Categories/Categories';
import { Hero } from '../Hero/Hero';
import { Showcase } from '../Showcase/Showcase';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { useShopQueryParams } from '../../hooks/useShopQueryParams';
import { useShopSearch } from '../../hooks/useShopSearch';
import { Loading } from '../Loading/Loading';
import { ShopSearch } from './ShopSearch';
import { useSearchUI } from '../../hooks/useSearchUI';
import { useLoading } from '../../hooks/useLoading';

export const Shop = () => {
  const { data, isLoading, isFetching, title, categoryId, price } = useShopQueryParams();
  const { categoriesList } = useSelector((state: RootState) => state.categories);
  const searchUI = useSearchUI();

  const { localTitle, handleTitleChange, localPrice, handlePriceChange, handleSearchSubmit } =
    useShopSearch(title, categoryId, price, searchUI.handleBlur, searchUI.handleFocus);

  const { showLoading, fadeIn } = useLoading(isLoading, isFetching);
  return (
    <>
      <div className="flex ">
        <Categories></Categories>
        <Hero></Hero>
      </div>
      <div className="bg-customGray w-full py-6 h-full flex-grow flex flex-col">
        <h3 className="text-white text-center font-semibold text-xl leading-6">
          {categoriesList.find((e) => e.id === Number(categoryId))?.name || 'Shop'}
        </h3>
        <form className="flex flex-col xs:flex-row gap-5 mb-7 p-3" onSubmit={handleSearchSubmit}>
          <div className="w-full xs:max-w-[230px] relative z-50">
            <ShopSearch
              searchUI={searchUI}
              handleTitleChange={handleTitleChange}
              localTitle={localTitle}></ShopSearch>
          </div>
          <input
            value={localPrice}
            onChange={handlePriceChange}
            placeholder="Price from"
            type="text"
            className="w-full px-6 h-8 rounded-lg bg-heroGray xs:max-w-[230px] outline-none border-none text-white text-xs"
          />
          <button type="submit" style={{ display: 'none' }} />
        </form>
        {showLoading ? (
          <Loading></Loading>
        ) : data.length ? (
          <div
            className={`transition-all duration-700 ${
              fadeIn ? 'opacity-100' : 'opacity-0 translate-y-12'
            } `}>
            <Showcase data={data}></Showcase>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img src="images/no-product-found.png" alt="No product found" />
          </div>
        )}
        {/* <Pagination page={1}></Pagination> */}
      </div>
    </>
  );
};
