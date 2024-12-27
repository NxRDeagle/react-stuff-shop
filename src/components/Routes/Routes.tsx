import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Product } from '../Product/Product';
import { Shop } from '../Shop/Shop';
import { Favorites } from '../Favorites/Favorites';
import { UserProfile } from '../UserProfile/UserProfile';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { UserAuth } from '../Navbar/UserAuth/UserAuth';

export const AppRoutes = () => {
  const { currentUser } = useSelector((root: RootState) => root.user);
  const [open, setOpen] = useState(true);
  return (
    <Routes>
      <Route index element={<Home></Home>} />
      <Route path="/product/:id" element={<Product></Product>} />
      <Route path="/shop" element={<Shop></Shop>} />
      <Route path="/user/:id" element={<UserProfile></UserProfile>} />
      <Route
        path="/user"
        element={<UserAuth setIsDrawerOpen={setOpen} isDrawerOpen={open}></UserAuth>}
      />
      <Route path="/favorites" element={<Favorites></Favorites>} />
    </Routes>
  );
};
