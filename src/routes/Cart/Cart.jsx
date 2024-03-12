import './Cart.css';
import AppCard from '../../components/AppCard/AppCard';
import BlogCard from '../../components/BlogCard/BlogCard';
import RevolvingHeader from '../../components/RevolvingHeader/RevolvingHeader';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { memImageObj } from '../../assets/menProductImagesObj';
import { womenImageObj } from '../../assets/womenProductImagesObj';
import loadingSvg from '../../assets/Pulse.svg'
import CartItem from '../../components/CartItem/CartItem';
import klarnaLogo from '../../assets/logos/klarna/Klarna.png';
import afterpayLogo from '../../assets/logos/afterpay/Afterpay.jpeg';
import { useEffect } from 'react';
import axios from '../../api/axios';
const CART_URL = '/api/cart/';


export default function Cart(props) {
    
    const { cart, setCart, setWishList } = props;

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);



    useEffect(() => {

        setSubtotal(0);
        setDiscount(0);
        setTotal(0);
  
        const newCartArr = cart.map((stockObj) => {
          const itemObj = stockObj.cart_stocks
          itemObj.productId = stockObj.productId;
            let priceToAddToSubtotal = itemObj.price;
            let discountToAdd = itemObj.salePrice === null ? 0 : (itemObj.price - itemObj.salePrice);
            let priceToAddToTotal = itemObj.salePrice === null ? itemObj.price  : itemObj.salePrice;
            setSubtotal(prev => prev + priceToAddToSubtotal);
            setDiscount(prev => prev + discountToAdd);
            setTotal(prev => prev + priceToAddToTotal);
            console.log(itemObj);
          return itemObj;
        });
    

            setCartItems(newCartArr);
            console.log(cartItems);


          return () => {

          }
    }, [cart]);

    const handleCollapseClick = (e) => {
        const lastContent = document.getElementById('last-content');
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        const line1 = e.target.children[0].firstChild

        if (content.style.maxHeight){
            if (e.target.id === 'last-coll') {
                e.target.classList.add('last-coll');
                lastContent.classList.toggle('last-dropdwn');
            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = null;
        
        } else {
            if (e.target.id === 'last-coll') {
                e.target.classList.remove('last-coll');
                lastContent.classList.toggle('last-dropdwn');
            }
        line1.classList.toggle('line1-active');
        content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    useEffect(() => {
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
                setCart(response.data.stocks);
              }
            } catch (error) {
              console.log(error);
            }
          })();
    }, []);


    // console.log(cartItems)
    if (cart.length === 0) {
        return (
            <>
            <main className="empty-main-cart-container">
                <div className='main-cart-wrapper'>
                    <div className='flex flex-col gap-4 text-center'>
                        <p className='font-bold text-lg'>YOUR CART IS EMPTY</p>
                        <p className='font-light text-sm'>There are no products in your cart</p>
                        <Link to={'/men/products'} className="empty-cart-btn">SHOP MEN</Link>
                        <Link to={'/women/products'} className="empty-cart-btn">SHOP WOMEN</Link>
                    </div>
                </div>
            </main>
            </>
        )
    }
    return (
        <>
        <main className="main-cart-container">
            <RevolvingHeader />
            <div className='main-cart-wrapper'>
                <section className='main-cart-left-container'>
                    <h2 className='text-3xl font-bold'>YOUR CART</h2>
                    <p> <i class="fa-solid fa-circle-info"></i> <span className='decoration-solid'>Your items aren’t reserved</span>, checkout quickly to make sure you don’t miss out!</p>
                    <div className='main-cart-item-wrapper'>
                        {cartItems.map((itemObj, i) => {
                        return <CartItem setWishList={setWishList} cart={cart} setCart={setCart} key={i} setTotal={setTotal} subtotal={subtotal} setSubtotal={setSubtotal} setDiscount={setDiscount} cartItems={cartItems} setCartItems={setCartItems} itemObj={itemObj} initialQuantity={itemObj.quantity}  />
                        })}
                    </div>
                </section>
                <section className='main-checkout-comtainer'>
                    <div className="main-checkout-header-container">
                        <h2 className='text-3xl font-bold'>SUMMARY</h2>
                    </div>
                    <div className="main-totals-container">
                        <div className="total-wrapper"><p>Subtotal</p> <p>${subtotal}</p></div>
                        <div className="total-wrapper"><p>Shipping</p> <p>Free Standard</p></div>
                        <div className="total-wrapper"><p>Discount</p> <p>${discount}</p></div>
                        <div className="total-wrapper font-bold"><p>Total</p> <p>${total}</p></div>
                    </div>
                    <button className='main-cart-checkout-btn'><i class="fa-solid fa-tags mr-3"></i>PROCEED TO CHECKOUT</button>
                    <h3 className='font-bold text-xl'>CHECKOUT TODAY. INTEREST FREE.</h3>
                    <div className='main-cart-icon-card-container'>
                        <div className='main-cart-icon-row'>
                            <div className='main-cart-icon'>
                                <img src={klarnaLogo} alt="" />
                            </div>
                            <div className='main-cart-icon-text'>
                                <p>Pay in 4 installments</p>
                                <p className='font-light text-xs'>Minimum order value of $35</p>
                                <p className='underline underline-offset-2 hover:cursor-pointer text-sm inline-block'>Learn more</p>
                            </div>
                        </div>
                        <div className='main-cart-icon-row'>
                            <div className='main-cart-icon'>
                                <img className='rounded-md' src={afterpayLogo} alt="" />
                            </div>
                            <div className='main-cart-icon-text'>
                                <p>Pay in 4 installments</p>
                                <p className='font-light text-xs'>Minimum order value of $35</p>
                                <p className='underline underline-offset-2 hover:cursor-pointer text-sm inline-block'>Learn more</p>
                            </div>
                        </div>
                    </div>
                    <h3 className='font-bold text-xl'>DELIVERED TO YOUR DOOR.</h3>
                    <div className='main-cart-icon-card-container'>
                        <div className='main-cart-icon-row'>
                            <div className='main-cart-icon'>
                                <i class="fa-solid fa-rotate-left text-2xl text-black"></i>
                            </div>
                            <div className='main-cart-icon-text'>
                                <p>Free 30-Day Return Policy! Excluding Final Sale Items</p>
                            </div>
                        </div>
                        <div className='main-cart-icon-row'>
                            <div className='main-cart-icon'>
                                <i class="fa-solid fa-box text-2xl text-black"></i>
                            </div>
                            <div className='main-cart-icon-text'>
                                <p>Free Standard Shipping Over $75</p>
                            </div>
                        </div>
                        <div className='main-cart-icon-row'>
                            <div className='main-cart-icon'>
                                <i class="fa-solid fa-truck-fast text-2xl text-black"></i>
                            </div>
                            <div className='main-cart-icon-text'>
                                <p>Free Express Delivery over $150</p>
                            </div>
                        </div>
                    </div>
                    <section className="main-cart-dropdown-container">
                    <button onClick={handleCollapseClick} class="main-cart-collapsible font-semibold">NEED HELP?
                        <div className="main-cart-plus-minus-container">
                            <span className="line1"></span>
                            <span className="line2"></span>
                        </div>
                    </button>
                        <div className="main-cart-content">
                            <div className='main-inner-container'>
                                <Link className='delivery-info' href="">Delivery Information</Link>
                                <Link className='make-return-info' href="">Make a return</Link>
                            </div>
                            
                        </div>
                    </section>
                    <AppCard />
                    <BlogCard />
                </section>
            </div>
        </main>
        </>
    )
}