import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import axios from "../../../api/axios";
import './NewProductsScrollable.css'

export default function NewProductsScrollable(props) {

    const { setWishlistPopup, setWishlistBubble, setCart, setWishList, isLoggedIn, setIsLoggedIn, setUser } = props;

    const [newProducts, setNewProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('new-product-container');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('new-product-container');

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
                const response = await axios.get(`api/products/new`,
                    {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });

                    if (!isLoading) {
                        setIsLoading(true);
                    }

                    if (response.status === 200) {

                        setIsLoading(false);
                        return setNewProducts(response.data.slice(0,8));
                    }
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <>
            <section className="new-main-container">
                <div className='new-header-container'>
                    <div className="new-header-wrapper">
                        <h6>MENS</h6>
                        <div><h5>NEW THIS MONTH</h5> <Link to={'/men/products/filter/new'}>View All</Link></div>
                    </div>
                    
                    <div className='new-btn-container'>
                        <button id='new-prev-btn' className='new-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                        <button id='new-next-btn' className='new-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
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
            <section className="new-main-container">
                <div className='new-header-container'>
                    <div className="new-header-wrapper">
                        <h6>MENS</h6>
                        <div><h5>NEW THIS MONTH</h5> <Link to={'/men/products/filter/new'}>View All</Link></div>
                    </div>
                    
                    <div className='new-btn-container'>
                        <button id='new-prev-btn' className='new-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                        <button id='new-next-btn' className='new-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
                    </div>
                </div>
                <div id='new-product-container' className='new-product-container x mandatory-scroll-snapping'>
                    {newProducts.map((product, i) => {
                        return <ProductCard key={i} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} product={product} />
                    })}
                </div>
            </section>
            </>
        )
    }
}