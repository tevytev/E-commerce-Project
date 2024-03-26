import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import axios from "../../../api/axios";
import './DsgnScrollable.css'

export default function DsgnScrollable(props) {

    const { setWishlistPopup, setWishlistBubble, setCart, setWishList, isLoggedIn, setIsLoggedIn, setUser } = props;

    const [dsgnProducts, setDsgnProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('dsgn-product-container');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('dsgn-product-container');

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
                const response = await axios.get(`api/products/dsgn`,
                    {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });

                    setIsLoading(true);

                    if (response.status === 200) {
                        
                        const dsgnArr = response.data.map((arr) => {
                            const itemObj = arr.product;
                            return itemObj;
                        })

                        setIsLoading(false);
                        return setDsgnProducts(dsgnArr.slice(0,8));
                    }
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <>
            <section className="dsgn-main-container">
                <div className='dsgn-header-container'>
                    <div className="dsgn-header-wrapper">
                        <h6>WOMENS</h6>
                        <div><h5>DSGN STUDIO COLLECTION</h5> <Link to={'/women/products/filter/DSGN'}>View All</Link></div>
                    </div>
                    <div className='dsgn-btn-container'>
                        <button id='dsgn-prev-btn' className='dsgn-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                        <button id='dsgn-next-btn' className='dsgn-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
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
        <section className="dsgn-main-container">
            <div className='dsgn-header-container'>
                <div className="dsgn-header-wrapper">
                    <h6>WOMENS</h6>
                    <div><h5>DSGN STUDIO COLLECTION</h5> <Link to={'/women/products/filter/DSGN'}>View All</Link></div>
                </div>
                <div className='dsgn-btn-container'>
                    <button id='dsgn-prev-btn' className='dsgn-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                    <button id='dsgn-next-btn' className='dsgn-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
                </div>
            </div>
            <div id='dsgn-product-container' className='dsgn-product-container x mandatory-scroll-snapping'>
                {dsgnProducts.map((product, i) => {
                    return <ProductCard key={i} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} product={product} />
                })}
            </div>
        </section>
        </>
        )
    }

    

}