import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Root from './routes/Root';
import Home from './routes/Home/Home';
import Signup from './routes/authRoutes/signuo/Signup';
import Login from './routes/authRoutes/Login/Login';
import Protected from './routes/protected'
import MenProducts from './routes/Products/Men/MenProducts';
import WomenProducts from './routes/Products/Women/WomenProducts';
import MenProductDetails from './routes/Products/ProductDetails/MenProductDetailPage';
import WomenProductDetails from './routes/Products/ProductDetails/WomenProductDetailPage';
import Cart from './routes/Cart/Cart';
import Account from './routes/Account/Account';
import WishList from './routes/Products/WishList/WishList';
import axios from './api/axios';
const PERSIST_URL = '/api/users/persist';
const CART_URL = '/api/cart/';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('isLoggedIn') ? JSON.parse(window.localStorage.getItem('isLoggedIn')) : null);
  const [user, setUser] = useState(window.localStorage.getItem('userData') ? window.localStorage.getItem('userData') : null);
  const [breadCrumb, setBreadCrumb] = useState(null);
  const [cart, setCart] = useState([]);
  const [localCart, setLocalCart] = useState(0);
  const [wishList, setWishList] = useState([]);
  const [wishlistBubble, setWishlistBubble] = useState(false);
  const [wishlistPopup, setWishlistPopup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
      if (isLoggedIn) {
        (async () => {
          try {
            const response = await axios.get(CART_URL,
                          {
                            headers: { 
                                "Content-Type": "application/json" 
                            },
                            withCredentials: true
                        });
            
            if (response.status === 200) {
              window.localStorage.setItem('localCart', JSON.stringify(response.data.stocks.length));
              setLocalCart(window.localStorage.getItem('localCart'));
            }
          } catch (error) {
            console.log(error);
          }
  
        })();
      };

    return () => {

    }
  }, [cart, isLoggedIn]);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/cart') return;
    setBreadCrumb(location.pathname);
  }, [location])

  console.log(breadCrumb);

  

  return (
    <>
    <Routes>
    <Route path="/" element={<Root setWishlistPopup={setWishlistPopup} localCart={localCart} wishlistPopup={wishlistPopup} wishlistBubble={wishlistBubble} setWishlistBubble={setWishlistBubble} cart={cart} setCart={setCart} setWishList={setWishList} wishList={wishList} user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> }>
      <Route path="/signup" element={<Signup breadCrumb={breadCrumb} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> } />
      <Route path='/login' element={<Login breadCrumb={breadCrumb} user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

      {/* <Route path='/random' element={<ProductDetails  />} /> */}

      <Route path='/home' element={<Home setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />} />

      <Route path='/men'>
        <Route path='/men/products' element={<MenProducts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} cart={cart} setCart={setCart} />}></Route>
        <Route path='/men/products/filter/:filter' element={<MenProducts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} cart={cart} setCart={setCart} />}></Route>
      </Route>
      

      <Route path='/women'>
        <Route path='/women/products' element={<WomenProducts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} setCart={setCart} />}></Route>
        <Route path='/women/products/filter/:filter' element={<WomenProducts isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} setCart={setCart} />}></Route>
      </Route>
      
      {/* Product detail routes */}
      <Route path='men/products/:productId' element={<MenProductDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} setCart={setCart} />}></Route>
      <Route path='women/products/:productId' element={<WomenProductDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishList={setWishList} setWishlistBubble={setWishlistBubble} setCart={setCart} />}></Route>

      <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setWishList={setWishList} setWishlistBubble={setWishlistBubble} cart={cart} setCart={setCart} />}></Route>

      <Route path="/account" element={<Account isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} setUser={setUser} />}></Route>

      <Route path="/wishlist" element={<WishList isLoggedIn={isLoggedIn} wishList={wishList} setWishList={setWishList} setWishlistBubble={setWishlistBubble} setCart={setCart}  />}></Route>

    </Route>
    </Routes>
    </>
  )
}

export default App;
