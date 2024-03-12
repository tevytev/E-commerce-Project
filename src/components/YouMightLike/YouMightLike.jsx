import './YouMightLike.css';
import { useEffect, useState } from "react";
import ProductCard from '../ProductCard/ProductCard';
import axios from '../../api/axios';

export default function YouMightLike(props) {

    const { product, setCart } = props;

    // const [productsScroll, setProductsScroll] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [detailedProduct, setDetailedProduct] = useState();

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('yml-product-container');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('yml-product-container');

        var x = 320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    };

    useEffect(() => {
        setDetailedProduct(product);
        (async () => {
            try {
                const response = await axios.get(`api/products/?gender=${product.gender}&category=${product.category}`,
                    {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });

                    if (response.status === 200) {
                    setRecommendedProducts(response.data.filter((arrProduct) => arrProduct.id !== product.id).slice(0, 6));
                    console.log(response)
                    }
            } catch (error) {
                console.log(error)
            }
        })();
    }, [product])

    // useEffect(() => {
    //     if (productsScroll === 1) {
    //         document.getElementById('yml-product-container').style.opacity = .5;
    //     } else if (productsScroll === 0) {

    //     }

    // }, [productsScroll])

    // console.log(product);

    return (
        <>
        <section className="yml-main-container">
            <div className='yml-header-container'>
                <h5>YOU MIGHT ALSO LIKE</h5>
                <div className='yml-btn-container'>
                    <button id='yml-prev-btn' className='yml-prev-btn' onClick={snapScrollLeft}><div className="arrow-left"></div></button>
                    <button id='yml-next-btn' className='yml-next-btn' onClick={snapScrollRight}><div className="arrow-right"></div></button>
                </div>
            </div>
            <div id='yml-product-container' className='yml-product-container x mandatory-scroll-snapping'>
                {recommendedProducts.map((product, i) => {
                    return <ProductCard key={i} setCart={setCart} product={product} />
                })}
                {/* <div className='placeholder-card'></div>
                <div className='placeholder-card'></div>
                <div className='placeholder-card'></div>
                <div className='placeholder-card'></div>
                <div className='placeholder-card'></div>
                <div className='placeholder-card'></div>
                <div className='placeholder-card'></div> */}
            </div>
            {/* <div className='yml-overlay'></div> */}
        </section>
        </>
    )
}