import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import axios from "../../../api/axios";
import './NewProductsScrollable.css'

export default function NewProductsScrollable(props) {

    const { setWishlistPopup, setWishlistBubble, setCart, setWishList } = props;

    const [newProducts, setNewProducts] = useState([]);

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

                    if (response.status === 200) {
                        setNewProducts(response.data.slice(0,8));
                    console.log(response)
                    }
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

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
                    return <ProductCard key={i} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} setCart={setCart} product={product} />
                })}
            </div>
            {/* <div className='yml-overlay'></div> */}
        </section>
        </>
    )

}