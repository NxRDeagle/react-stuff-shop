import { Link } from 'react-router-dom';
import { Category } from './Category';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';

export const Categories = () => {
  const { categoriesList, isLoading } = useSelector((state: RootState) => state.categories);

  return (
    <div className="categories bg-customGray flex-none min-w-[230px] max-w-[100%] h-auto p-6 mr-0 navInputHide:mr-5 rounded-md overflow-y-auto mb-5 hidden navInputHide:block overflow-hidden max-h-[423px]">
      <div className="flex flex-col justify-between h-full text-lighterGray min-h-[375px]">
        <div className="top">
          <p className="uppercase text-white font-montserrat font-semibold mb-8">Categories</p>
          <nav className="pb-4">
            <ul className="text-sm font-medium leading-4">
              {categoriesList.map((category) => (
                <Category
                  key={category.id}
                  href={`/shop?categoryId=${category.id}`}
                  text={category.name}></Category>
              ))}
            </ul>
          </nav>
        </div>
        <div className="pb-4">
          <div className="flex justify-between font-medium text-xs leading-3 flex-wrap gap-2">
            <Link className="hover:underline " to={'/'}>
              Help
            </Link>
            <Link className="hover:underline" to={'/'}>
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
