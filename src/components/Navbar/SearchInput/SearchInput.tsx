import React from 'react';
import { Link } from 'react-router-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Product, SearchUI } from '../../../lib/types';

const searchInputVariants = cva('search-form flex items-center', {
  variants: {
    variant: {
      default: 'bg-customGray hover:bg-heroGray',
      heroGray: 'bg-heroGray ',
      rounded: 'rounded-lg bg-heroGray',
    },
    size: {
      default: 'h-7 w-full',
      large: 'h-10 px-4',
    },
    animation: {
      delay1s: 'search-delay-1s',
      delay3s: 'search-delay-3s',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Пропсы для компонента SearchInput
interface SearchInputProps extends VariantProps<typeof searchInputVariants> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  products: Product[];
  searchUI: SearchUI;
  className?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, products, searchUI, variant, size, animation, className, ...props }, ref) => {
    const { isExpanded, isAnimating, handleFocus, handleBlur } = searchUI;

    return (
      <div className="relative">
        <div
          className={`${isExpanded ? 'rounded-t-md' : 'rounded-md'} ${cn(
            searchInputVariants({ variant, size, animation, className }),
          )}`}>
          <img
            className="text-white ml-[10px] mr-4 w-3 h-3 cursor-pointer"
            src="images/loop.svg"
            alt="Loop"
          />
          <input
            value={value}
            ref={ref}
            className="w-[100%] outline-none bg-transparent border-none text-white text-xs pr-3"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onChange}
            placeholder="Search for anything..."
            type="text"
            {...props}
          />
        </div>

        {isExpanded && (
          <div
            className={`search__products absolute w-full bg-white rounded-b-md shadow-md z-10 transition-opacity duration-300 ease-in-out max-h-[295px] overflow-y-auto ${
              isAnimating ? 'opacity-100' : 'opacity-0'
            }`}>
            {products.length > 0 &&
              products.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`flex gap-5 items-center p-1 hover:shadow-customPink transition-shadow duration-300 ${
                    index !== products.length - 1 ? 'border-b' : ''
                  }`}>
                  <div className="w-10 h-10">
                    <img
                      className="w-full h-full rounded-md"
                      src={product.images[0].replace(/[\[\]\"]/g, '')}
                      alt="Product image"
                    />
                  </div>
                  <span className="text-black text-xs">{product.title}</span>
                </Link>
              ))}
          </div>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
