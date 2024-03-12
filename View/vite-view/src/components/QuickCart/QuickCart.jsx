import QuickCartItem from './QuickCartItem/QuickCartItem';
import './QuickCart.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function QuickCart(props) {

    const { cart, setCart, setWishList, setWishlistBubble } = props;
    const [quickCartItems, setQuickCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [active, setActive] = useState(document.getElementById('overlay') ? document.getElementById('overlay').classList.contains('overlay-active') : false)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    window.addEventListener("resize", (e) => {

      let w = window.innerWidth;

      setScreenWidth(w);
  });

  useEffect(() => {
    // console.log(screenWidth)
  },[screenWidth]);
    
    const handleCartClose = (e) => {
        const overlay = document.getElementById('overlay');
        const leftSide = document.getElementById('cart-container');
        overlay.classList.toggle('overlay-active');
        leftSide.classList.toggle('left-cart-container-active');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 200);
    }

    useEffect(() => {

      setSubtotal(0);
      setDiscount(0);
      setTotal(0);

      const newCartArr = cart.map((stockObj) => {
        const itemObj = stockObj.cart_stocks
        // console.log(itemObj);
        itemObj.productId = stockObj.productId;
        let priceToAddToSubtotal = itemObj.price;
        let discountToAdd = itemObj.salePrice === null ? 0 : (itemObj.price - itemObj.salePrice);
        let priceToAddToTotal = itemObj.salePrice === null ? itemObj.price  : itemObj.salePrice;
        setSubtotal(prev => prev + priceToAddToSubtotal);
        setDiscount(prev => prev + discountToAdd);
        setTotal(prev => prev + priceToAddToTotal);
        return itemObj;
      });

      setQuickCartItems(newCartArr);

      return () => {
        
      }

    },[cart]);

    if (screenWidth > 1024) {
      if (quickCartItems.length === 0) {
        return (
          <>
          <div className="overlay" id="overlay">
            <div onClick={handleCartClose} className="right-empty-space"></div>
            <div id="cart-container" className="left-cart-container">
              <div className="empty-scroll-container">
                <header className="cart-header-container">
                  <h3 className=" font-bold">YOUR CART</h3>
                  <button onClick={handleCartClose} className="close-cart-btn"><i className="fa-solid fa-x"></i></button>
                </header>
                <div className='empty-item-container'>
                  <p className='font-bold text-lg'>YOUR CART IS EMPTY</p>
                  <p className='font-light text-sm'>There are no products in your cart</p>
                  <Link onClick={handleCartClose} to={'/men/products'} className="empty-cart-btn">SHOP MEN</Link>
                  <Link onClick={handleCartClose} to={'/women/products'} className="empty-cart-btn">SHOP WOMEN</Link>
                </div>
              </div>
            </div>
          </div>
          </>
      )
  
      } else {
        return (
          <>
          <div className="overlay" id="overlay">
            <div onClick={handleCartClose} className="right-empty-space"></div>
            <div id="cart-container" className="left-cart-container">
              <div className="scroll-container">
                <header className="cart-header-container">
                  <h3 className=" font-bold">YOUR CART</h3>
                  <button onClick={handleCartClose} className="close-cart-btn"><i className="fa-solid fa-x"></i></button>
                </header>
                <div className="item-flow-container">
                  {quickCartItems.map((itemObj, i) => {
                    return <QuickCartItem handleCartClose={handleCartClose} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} key={i} setTotal={setTotal} subtotal={subtotal} setSubtotal={setSubtotal} setDiscount={setDiscount} quickCartItems={quickCartItems} setQuickCartItems={setQuickCartItems} itemObj={itemObj} initialQuantity={itemObj.quantity}  />
                  })}
                  <div className="totals-container">
                    <div className="total-wrapper"><p>Subtotal</p> <p>${subtotal}</p></div>
                    <div className="total-wrapper"><p>Shipping</p> <p>Free Standard</p></div>
                    <div className="total-wrapper"><p>Discount</p> <p>${discount}</p></div>
                    <div className="total-wrapper font-bold"><p>Total</p> <p>${total}</p></div>
                  </div>
                </div>
              </div>
              <footer className="cart-footer-container">
                  <button className="cart-checkout-btn"><i class="fa-solid fa-tags mr-3"></i>PROCEED TO CHECKOUT</button>
                  <Link to={'/cart'} onClick={handleCartClose} className="cart-view-btn"><i className="fa-solid fa-cart-shopping mr-3"></i> VIEW FULL CART</Link>
                </footer>
            </div>
          </div>
          </>
        )
      }
    } else {
      if (quickCartItems.length === 0) {
        return (
          <>
          <div className="overlay" id="overlay">
            <div onClick={handleCartClose} className="right-empty-space"></div>
            <div id="cart-container" className="left-cart-container">
              <div className="empty-scroll-container">
                <header className="cart-header-container">
                  <h3 className=" font-bold">YOUR CART</h3>
                  <button onClick={handleCartClose} className="close-cart-btn"><i className="fa-solid fa-x"></i></button>
                </header>
                <div className='empty-item-container'>
                  <p className='font-bold text-lg'>YOUR CART IS EMPTY</p>
                  <p className='font-light text-sm'>There are no products in your cart</p>
                  <Link onClick={handleCartClose} to={'/men/products'} className="empty-cart-btn">SHOP MEN</Link>
                  <Link onClick={handleCartClose} to={'/women/products'} className="empty-cart-btn">SHOP WOMEN</Link>
                </div>
              </div>
            </div>
          </div>
          </>
      )
  
      } else {
        return (
          <>
          <div className="overlay" id="overlay">
              <div onClick={handleCartClose} className="right-empty-space"></div>
              <div id="cart-container" className="left-cart-container">
                <div className="scroll-container">
                  <header className="cart-header-container">
                    <h3 className=" font-bold">YOUR CART</h3>
                    <button onClick={handleCartClose} className="close-cart-btn"><i className="fa-solid fa-x"></i></button>
                  </header>
                  <div className="item-flow-container">
                    {quickCartItems.map((itemObj, i) => {
                      return <QuickCartItem handleCartClose={handleCartClose} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} key={i} setTotal={setTotal} subtotal={subtotal} setSubtotal={setSubtotal} setDiscount={setDiscount} quickCartItems={quickCartItems} setQuickCartItems={setQuickCartItems} itemObj={itemObj} initialQuantity={itemObj.quantity}  />
                    })}
                    <div className="totals-container">
                      <div className="total-wrapper"><p>Subtotal</p> <p>${subtotal}</p></div>
                      <div className="total-wrapper"><p>Shipping</p> <p>Free Standard</p></div>
                      <div className="total-wrapper"><p>Discount</p> <p>${discount}</p></div>
                      <div className="total-wrapper font-bold"><p>Total</p> <p>${total}</p></div>
                    </div>
                  </div>
                </div>
                <footer className="cart-footer-container">
                  <button className="cart-checkout-btn"><i class="fa-solid fa-tags mr-3"></i>PROCEED TO CHECKOUT</button>
                  <Link to={'/cart'} onClick={handleCartClose} className="cart-view-btn"><i className="fa-solid fa-cart-shopping mr-3"></i> VIEW FULL CART</Link>
                </footer>
              </div>
          </div>
          
          </>
        )
      }
    }
}