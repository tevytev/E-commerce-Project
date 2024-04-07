import { useEffect, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import RevolvingHeader from "../../components/RevolvingHeader/RevolvingHeader";
import BlogCard from "../../components/BlogCard/BlogCard";
import AppCard from "../../components/AppCard/AppCard";
import YouMightLike from "../../components/YouMightLike/YouMightLike";
import NewProductsScrollable from "../../components/scrollables/NewProductsScrollable/NewProductsScrollable";
import SaleProductsScrollable from "../../components/scrollables/SaleProductsScrollable/SaleProductsScrollable";
import DsgnScrollable from "../../components/scrollables/DsgnScrollable/DsgnScrollable";
import "./Home.css";

const PERSIST_URL = '/api/users/persistOAuth'

export default function Home({ setWishlistPopup, setWishlistBubble, setWishList, setCart, isLoggedIn, setIsLoggedIn, setUser}) {

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(PERSIST_URL,
                      {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });
        
        if (response.status === 200) {
          console.log(response);

          const userData = {
            userName: response.data.UserName,
            email: response.data.email
          }

          window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
          setIsLoggedIn(JSON.parse(window.localStorage.getItem('isLoggedIn')));
          window.localStorage.setItem('userData', JSON.stringify(userData));
          setUser(window.localStorage.getItem('userData'));
        }
      } catch (error) {
        console.log(error);
      }

    })();
  }, [])

  const navigate = useNavigate();

    return (
      <main className="home-main-container">
        <RevolvingHeader />
        <section id="hero1" className="hero-section-container">
          <div className="hero-text">
            <h1>NEW THIS MONTH</h1>
            <p>A new fit = another excuse to go gym. Just let us know what we’re training first.</p>
            <div className="hero-btn-container">
              <Link to={'/women/products'}><button id="hero1-women-btn">SHOP WOMEN</button></Link>
              <Link to={'/men/products'}><button id="hero1-men-btn">SHOP MEN</button></Link>
            </div>
          </div>
        </section>
        <section className="home-new-this-month-section-container">
          <NewProductsScrollable isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} />
        </section>
        <section id="hero2" className="hero-section-container">
          <div className="hero-text">
            <h1>20% OFF* TRAINING ESSENTIALS</h1>
            <p>Get prepared for progress with the ‘fits you’ll become your best in. New styles added including Black Vital Seamless Leggings.</p>
            <div className="hero-btn-container">
              <Link to={'/women/products'}><button id="hero1-women-btn">SHOP WOMEN</button></Link>
              <Link to={'/men/products'}><button id="hero1-men-btn">SHOP MEN</button></Link>
            </div>
          </div>
        </section>
        <section className="home-new-this-month-section-container">
          <SaleProductsScrollable isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} />
          {/* <getSaleProducts setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} /> */}
        </section>
        <section id="hero3" className="hero-section-container">
          <div className="hero-text">
            <h1>DSGN STUDIO’S <br /> SIGNATURE SERIES IS HERE</h1>
            <p>DSGN studio’s touch on their favourite originals. Even a bad day is still a luxury, but let’s make today a good one.</p>
            <div className="hero-btn-container">
              <Link to={'/women/products/filter/DSGN'}><button id="hero3-btn">SHOP NOW</button></Link>
            </div>
          </div>
        </section>
        <section className="home-new-this-month-section-container">
          <DsgnScrollable isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} />
        </section>
        <section className="home-app-container">
          <h1>OUR APPS</h1>
          <div className="home-app-wrapper">
            <div className="home-app1-container"><BlogCard/></div>
            <div className="home-app2-container"><AppCard/></div>
          </div>
        </section>
        <section className="home-bottom-shop-container">
          <div className="bottom-shop-card-wrapper">
            <div id="bottom-shop-women" className="bottom-shop-card">
              <Link to={'/women/products'}><button>SHOP WOMEN</button></Link>
            </div>
          </div>
          <div className="bottom-shop-card-wrapper">
            <div id="bottom-shop-men" className="bottom-shop-card">
              <Link to={'/men/products'}><button>SHOP MEN</button></Link>
            </div>
          </div>
          <div className="bottom-shop-card-wrapper">
            <div id="bottom-shop-accessories" className="bottom-shop-card">
              <button>SHOP ACCESSORIES</button>
            </div>
          </div>
        </section>

      </main>
    );
};