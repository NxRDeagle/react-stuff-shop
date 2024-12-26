import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../../lib/types'
import { useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../features/favorites/favoritesSlice';

interface FavoriteCardProps{
    product : Product;
}

export const FavoriteCard : React.FC<FavoriteCardProps>= ({
    product
}) => {
  const dispatch = useDispatch();
  return (
<div className='group hover:shadow-customPink transition-shadow duration-300 relative card flex flex-col rounded-b-lg bg-heroGray flex-shrink-0'>
        <Link className='absolute inset-0' to={`/product/${product.id}`}></Link>  
        <img className="rounded-t-md object-cover" src={product.images[0]} alt="Product photo" />
        <img src="/images/delete-stop-svgrepo-com.svg" className='absolute w-10 h-10 right-4 top-4 cursor-pointer' onClick={()=>dispatch(removeFromFavorites(product.id))} alt="Delete" />
        <div className="flex flex-col justify-between px-3 mt-3 h-full">
          <div className="flex flex-col justify-center items-center">
          <h3 className='text-white font-semibold leading-4 text-sm max-w-[200px] mb-3'>{product.title}</h3>
          <p className='font-medium text-xs leading-3 mt-1 text-lightGray '>{product.category.name}</p>
          </div>
          <div className="card-bottom py-2 gap-2 flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <span className='font-bold text-xl text-buttonPink'>{product.price}$</span>
              <span className='text-lighterGray line-through text-sm font-medium leading-[15px]'>{product.oldPrice}</span>
            </div>
              <span className='font-medium text-[10px] leading-3 text-lighterGray'>{product.numberSold || 19} people purchased</span>
          </div>
        </div>
    </div>
  )
}
