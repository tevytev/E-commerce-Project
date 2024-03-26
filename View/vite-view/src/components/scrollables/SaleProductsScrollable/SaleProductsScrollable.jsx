import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import axios from "../../../api/axios";
import './SaleProductsScrollable.css'

export default function SaleProductsScrollable(props) {

    const { setWishlistPopup, setWishlistBubble, setCart, setWishList, isLoggedIn, setIsLoggedIn, setUser } = props;

    const [saleProducts, setSaleProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('sale-product-container');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('sale-product-container');

        var x = 320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`api/products/sale`,
                    {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });

                    setIsLoading(true);

                    if (response.status === 200) {

                        setIsLoading(false)
                        return setSaleProducts(response.data.slice(0,8));
                        
                    }
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <>
            <section className="sale-main-container">
                <div className='sale-header-container'>
                    <div className="sale-header-wrapper">
                        <h6>WOMENS</h6>
                        <div><h5>ON SALE THIS MONTH</h5> <Link to={'/women/products/filter/sale'}>View All</Link></div>
                    </div>
                    <div className='sale-btn-container'>
                        <button id='sale-prev-btn' className='sale-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                        <button id='sale-next-btn' className='sale-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
                    </div>
                </div>
                <div id='sale-product-container' className='sale-product-container x mandatory-scroll-snapping'>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                    <div className="loading-card-container">
                        <div className="loading-card-image">
                            <div class="typing-indicator">
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-circle"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                                <div class="typing-shadow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        )
    } else {
        return (
            <>
            <section className="sale-main-container">
                <div className='sale-header-container'>
                    <div className="sale-header-wrapper">
                        <h6>WOMENS</h6>
                        <div><h5>ON SALE THIS MONTH</h5> <Link to={'/women/products/filter/sale'}>View All</Link></div>
                    </div>
                    <div className='sale-btn-container'>
                        <button id='sale-prev-btn' className='sale-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                        <button id='sale-next-btn' className='sale-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
                    </div>
                </div>
                <div id='sale-product-container' className='sale-product-container x mandatory-scroll-snapping'>
                    {saleProducts.map((product, i) => {
                        return <ProductCard key={i} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} product={product} />
                    })}
                </div>
            </section>
            </>
        )
    }
}