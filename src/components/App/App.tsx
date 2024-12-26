import React, { useEffect } from 'react';
import { AppRoutes } from '../Routes/Routes';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/categories/categoriesSlice';
import { AppDispatch, RootState } from '../../features/store';
import { Container } from '../Container/Container';
import { getProducts } from '../../features/products/productsSlice';
import { Footer } from '../Footer/Footer';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className="app">
      <Toaster></Toaster>
      <Navbar></Navbar>
      <main>
        <Container flexGrow>
          <AppRoutes></AppRoutes>
        </Container>
      </main>
      <Container>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
