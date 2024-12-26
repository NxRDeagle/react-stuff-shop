import React from 'react'
import { Container } from '../Container/Container'
import { Showcase } from '../Showcase/Showcase'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store';
import { FavoriteCard } from './FavoriteCard';

export const Favorites = () => {
  const favorites = useSelector((state : RootState)=> state.favorites.favorites)

  return (    
  <div className='bg-customGray w-full text-center rounded-md flex flex-col items-center flex-1'>
    <h3 className='font-semibold text-xl text-white py-6'>Favorites</h3>
    {favorites.length ? 
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-3 gap-5 justify-center pb-5'> 
        {favorites.map(favorite=> <FavoriteCard product={favorite}></FavoriteCard>)} 
    </div> :
              <div className="flex justify-center items-center flex-col">
              <img src="images/no-product-found.png" alt="No product found" />
            </div>
    }

  </div>
  )
}
