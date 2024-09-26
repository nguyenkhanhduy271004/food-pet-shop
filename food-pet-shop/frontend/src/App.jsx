import React, { useContext, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import MyOrders from './pages/MyOrders/MyOrders';
import AllProduct from './pages/AllProduct/AllProduct';
import { StoreContext } from './context/StoreContext';
import ItemDetails from './pages/ItemDetails/ItemDetails';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
  flex: 1,
  marginTop: 240,
  justifyContent: 'center',
  alignItems: 'center'
};

function App() {
  const { showModalLogin, setShowModalLogin, token, setToken } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const fetchingUserAccount = async () => {
    try {
      if (token === '') {
        setIsLoading(true);
        const response = await axios.post('http://localhost:4000/api/user/get-user-account', {}, {
          withCredentials: true,
        });

        if (response.data.success) {
          setIsLoading(false);
          setToken(response.data.data.access_token);
        } else {
          console.log('Failed to fetch user account');
        }

      } else {
        console.log('Failed to fetch user account');
      }
    } catch (error) {
      console.log('Error fetching user account:', error);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchingUserAccount();
  }, [token]);

  return (
    <>
      {isLoading ? (
        <ClipLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          {showModalLogin && <Login />}
          <div className='app'>
            <Navbar setShowModalLogin={setShowModalLogin} />
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/my-orders' element={<MyOrders />} />
              <Route path='/all-products' element={<AllProduct />} />
              <Route path='/all-products/product-for-dog' element={<AllProduct category='dog' title='All Product For Dog' />} />
              <Route path='/all-products/product-for-cat' element={<AllProduct category='cat' title='All Product For Cat' />} />
              <Route path='/all-products/product-for-bird' element={<AllProduct category='bird' title='All Product For Bird' />} />
              <Route path='/all-products/product-for-turtle-and-fish' element={<AllProduct category='turtle-and-fish' title='All Product For Turtle And Fish' />} />
              <Route path='/all-products/dog-food' element={<AllProduct category='dog' subCategory='food' title='Dog Food' />} />
              <Route path='/all-products/dog-grooming' element={<AllProduct category='dog' subCategory='grooming' title='Dog Grooming' />} />
              <Route path='/all-products/dog-toys' element={<AllProduct category='dog' subCategory='toys' title='Dog Toys' />} />
              <Route path='/all-products/dog-accessories' element={<AllProduct category='dog' subCategory='accessories' title='Dog Accessories' />} />
              <Route path='/all-products/dog-supplements' element={<AllProduct category='dog' subCategory='supplements' title='Dog Supplements' />} />
              <Route path='/all-products/cat-food' element={<AllProduct category='cat' subCategory='food' title='Cat Food' />} />
              <Route path='/all-products/cat-treats' element={<AllProduct category='cat' subCategory='treats' title='Cat Treats' />} />
              <Route path='/all-products/cat-toys' element={<AllProduct category='cat' subCategory='toys' title='Cat Toys' />} />
              <Route path='/all-products/cat-accessories' element={<AllProduct category='cat' subCategory='accessories' title='Cat Accessories' />} />
              <Route path='/all-products/cat-carriers' element={<AllProduct category='cat' subCategory='carriers' title='Cat Carriers' />} />
              <Route path="/products/:id" element={<ItemDetails />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
