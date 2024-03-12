import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./ProductCard.css";
import { memImageObj } from '../../assets/menProductImagesObj';
import { womenImageObj } from '../../assets/womenProductImagesObj';
import axios from '../../api/axios';
const CART_URL = '/api/cart/';
const WISHLIST_URL = '/api/wishlist/';

export default function ProductCard (props){

    const { product, cart, setCart, products, sizeFilter, setWishList, setWishlistBubble, setWishlistPopup, responsiveSearchProduct, handleResponsiveSearchClose, searchProduct, handleSearchClose } = props;

    const [cardProduct, setCardProduct] = useState(product);
    const [wishedFor, setWishedFor] = useState(null);
    const [filteredSize, setFilteredSize] = useState(null);
    const [newProduct, setNewProduct] = useState(false);
    const [saleProduct, setSaleProduct] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState(false);
    const [responsiveSearchedProduct, setResponsiveSearchedProduct] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const navigate = useNavigate();

    const handleCardClick = (e) => {

        if (searchedProduct) {
            handleSearchClose();
        } else if (responsiveSearchProduct) {
            handleResponsiveSearchClose();
        }
        navigate(`/${product.gender}/products/${product.id}`);

        console.log('hello')
    }

    // Card MouseOver image change and quick add animations
    let quickAddTimeout
    function startQuickAddTimeout(option) {

            const quickAdd = document.getElementById(`quick-add-${product.id}`);
            const highlight = document.getElementById(`highlight-${product.id}`);

        const animateInQuickAdd = () => {
            
            quickAdd.classList.remove('quick-add-section');
            quickAdd.classList.add('quick-add-section-active');
            highlight.classList.toggle('card-highlight-info-active');
        }

        if (option === 'start') {
            quickAddTimeout = setTimeout(animateInQuickAdd, 500);
        } else {
            clearTimeout(quickAddTimeout);
        }
    }

    const cardMouseOver = (e) => {
        // Image change
        const img = document.getElementById(`${product.id}`);
        if (product.gender === 'men') {
            img.src = memImageObj[product.id][1];
        } else {
            img.src = womenImageObj[product.id][1];
        }
        // Quick add animate in
        startQuickAddTimeout('start');
        // console.log(e);
    };

    const cardMouseLeave = (e) => {
        // Image change
        const img = document.getElementById(`${product.id}`);
        if (product.gender === 'men') {
            img.src = memImageObj[product.id][0];
        } else {
            img.src = womenImageObj[product.id][0];
        }

        // Quick add animate out
        const quickAdd = document.getElementById(`quick-add-${product.id}`);
        const highlight = document.getElementById(`highlight-${product.id}`);

        // console.log(quickAdd.getBoundingClientRect().top)

        if (quickAdd.classList.contains('quick-add-section-active')) {
            quickAdd.classList.remove('quick-add-section-active');
            quickAdd.classList.add('quick-add-section');
            highlight.classList.remove('card-highlight-info-active');
        } else {
            startQuickAddTimeout('stop');
        }
    }

    const stopParentBubble = (event) => {
        event.stopPropagation();
    }

    const handleCartClick = async (e) => {

        // console.log(cart);
        if (searchedProduct) {
            handleSearchClose();
            const topHeader = document.getElementById('secondary-root-header');
            topHeader.style.zIndex = 25;
        } 

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
            
            const overlay = document.getElementById('overlay');
            const leftSide = document.getElementById('cart-container');
            overlay.style.display = 'flex';
            if (overlay.style.display === 'flex') {
                overlay.classList.toggle('overlay-active');
                setTimeout(() => {
                leftSide.classList.toggle('left-cart-container-active');
                }, 100)
            }
          }
        } catch (error) {
          console.log(error);
        }
    }

    const handleQuickAddToCart = async (e) => {

        if (filteredSize) {

            let productSize;
            
            switch (sizeFilter) {
                case 'extra small':
                    productSize = 'extraSmall';
                    break;
                case 'small':
                    productSize = 'small';
                    break;
                case 'medium': 
                    productSize = 'medium';
                    break;
                case 'large': 
                    productSize = 'large';
                    break;
                case 'extra large': 
                    productSize = 'extraLarge';
                    
            };
        
            const requestBody = {
                quantity: 1,
                size: productSize
            }

            try {
                const response = await axios.post(`api/cart/${cardProduct.id}`,
                    JSON.stringify(requestBody),
                    {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (response.status === 201) {
                    handleCartClick();
                }
            } catch (error) {
                if (error?.response?.status === 401) alert('please sign in')
                console.log(error)
            }

        } else {
            const productSize = e.target.value;
        
            const requestBody = {
                quantity: 1,
                size: productSize
            }

            
            
            try {
                const response = await axios.post(`api/cart/${cardProduct.id}`,
                    JSON.stringify(requestBody),
                    {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                if (response.status === 201) {
                    handleCartClick();
                }
            } catch (error) {
                if (error?.response?.status === 401) alert('please sign in')
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (sizeFilter === null) {
            return setFilteredSize(null);
        }

        return setFilteredSize(sizeFilter);

    }, [sizeFilter])

    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get(`api/wishlist/${product.id}`,
                    {
                      headers: {
                          "Content-Type": "application/json"
                      },
                      withCredentials: true
                  });
    
                  if (response.data === true) {
                    setWishedFor(true);
                  } else {
                    setWishedFor(false);
                  }
            } catch (error) {
                console.log(error)
            }

        })();

    }, [product]);
    
    useEffect(() => {
        setCardProduct(product);

        return () => {

        }
    }, [product]);

    const handleAddToWishList = async (e) => {

        e.stopPropagation();
        document.getElementById(`${product.name}-wishlist-icom`).style.animation = null;
        
        const requestBody = {
            productId: cardProduct.id
        };

        try {
            const response = await axios.post(WISHLIST_URL,
                JSON.stringify(requestBody),
                {
                  headers: {
                      "Content-Type": "application/json"
                  },
                  withCredentials: true
              });

              if (response.status === 201) {
                setWishedFor(true);
                setWishList(response.data.products);
                setWishlistBubble(true);
                document.getElementById(`${product.name}-wishlist-icom`).style.animation = 'wish-animate 400ms';

                setWishlistPopup(true);

                setTimeout(() => {
                    setWishlistPopup(false);
                }, 5000);

                console.log(response);
              }

        } catch (error) {
            console.log(error)
        }
    };

    const handleRemoveFromWishlist = async (e) => {

        e.stopPropagation();
        
        try {
            const response = await axios.delete(`/api/wishlist/${cardProduct.id}`,
                {
                  headers: {
                      "Content-Type": "application/json"
                  },
                  withCredentials: true
              });

              if (response.status === 200) {
                setWishedFor(false);
                setWishList(response.data.products);
                setWishlistBubble(false);
                console.log(response);
              }
        } catch (error) {
            console.log(error)
        }
    };

    // set new product effect
    useEffect(() => {
        if (product.new === true) {
            setNewProduct(true);
        } else {
            setNewProduct(false);
        }
    }, [product]);

    // set sale product effect
    useEffect(() => {
        if (product.salePrice) {
            setSaleProduct(true);
        }

    }, [product]);

    useEffect(() => {
        if (searchProduct === true) {
            setSearchedProduct(true);
        } else {
            setSearchedProduct(false);
        }

    }, [product, searchProduct]);

    useEffect(() => {
        if (responsiveSearchedProduct === true) {
            setResponsiveSearchedProduct(true);
        } else {
            setResponsiveSearchedProduct(false);
        }

    }, [product, responsiveSearchProduct])
    
    if (product.gender === 'men') {
        if (product.salePrice) {
            return (
                <>
                <div 
                onMouseEnter={cardMouseOver}
                onMouseLeave={cardMouseLeave} 
                onClick={handleCardClick} className="card-container">
                    <div className="card-image-container">
                        <img id={product.id} className="card-img" src={memImageObj[product.id][0]} alt="" />
                        {
                        filteredSize ? 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='filtered-size-quick-add-section'>
                            <button className='filtered-size-btn' onClick={handleQuickAddToCart}>ADD TO CART</button>
                        </div>
                            : 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='quick-add-section'>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraSmall'}>XS</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'small'}>S</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'medium'}>M</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'large'}>L</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraLarge'}>XL</button>
                        </div>
                        }

                        {
                        wishedFor ? <button onClick={handleRemoveFromWishlist} className='card-wishlist-btn'><i className="fa-solid fa-heart"></i></button> 
                        : <button onClick={handleAddToWishList} className='card-wishlist-btn'><i id={`${product.name}-wishlist-icom`} className="fa-regular fa-heart"></i></button>
                        }

                        <div id={`highlight-${product.id}`} className='card-highlight-info'>SALE <i class="fa-solid fa-fire text-red-500"></i></div>

                    </div>
                    <div className="text-container">
                        <h2 className="">{product.name}</h2>
                        <div className='price-container'>
                        <p className="text-black font-bold">${product.salePrice}</p><small className="text-red-500">${product.price}</small>
                        </div>
                    </div>
                </div>
                </>
                )
        } else {
            return (
            <>
            <div 
            onMouseEnter={cardMouseOver}
            onMouseLeave={cardMouseLeave} 
            onClick={handleCardClick} className="card-container">
                <div className="card-image-container">
                    <img id={product.id} className="card-img" src={memImageObj[product.id][0]} alt="" />
                    {
                    filteredSize ? 
                    <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='filtered-size-quick-add-section'>
                        <button className='filtered-size-btn' onClick={handleQuickAddToCart}>ADD TO CART</button>
                    </div>
                        : 
                    <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='quick-add-section'>
                         <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraSmall'}>XS</button>
                         <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'small'}>S</button>
                         <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'medium'}>M</button>
                         <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'large'}>L</button>
                         <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraLarge'}>XL</button>
                     </div>
                        }
                        {
                        wishedFor ? <button onClick={handleRemoveFromWishlist} className='card-wishlist-btn'><i className="fa-solid fa-heart"></i></button> 
                        : <button onClick={handleAddToWishList} className='card-wishlist-btn'><i id={`${product.name}-wishlist-icom`} className="fa-regular fa-heart"></i></button>
                        }
                        {
                        newProduct ? <div id={`highlight-${product.id}`} className='card-highlight-info'>NEW</div> : <></>
                        }
                </div>
                <div className="text-container">
                    <h2 className="">{product.name}</h2>
                    <div className='price-container'>
                        <p className="text-black font-bold">${product.price}</p>
                    </div>
                </div>
            </div>
            </>
            )
        }
    } else if (product.gender === 'women') {
        if (product.salePrice) {
            return (
                <>
                <div 
                onMouseEnter={cardMouseOver}
                onMouseLeave={cardMouseLeave} 
                onClick={handleCardClick} className="card-container">
                    <div className="card-image-container">
                        <img id={product.id} className="card-img" src={womenImageObj[product.id][0]} alt="" />
                        {
                        filteredSize ? 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='filtered-size-quick-add-section'>
                            <button className='filtered-size-btn' onClick={handleQuickAddToCart}>ADD TO CART</button>
                        </div>
                            : 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='quick-add-section'>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraSmall'}>XS</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'small'}>S</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'medium'}>M</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'large'}>L</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraLarge'}>XL</button>
                        </div>
                        }
                        {
                        wishedFor ? <button onClick={handleRemoveFromWishlist} className='card-wishlist-btn'><i className="fa-solid fa-heart"></i></button> 
                        : <button onClick={handleAddToWishList} className='card-wishlist-btn'><i id={`${product.name}-wishlist-icom`} className="fa-regular fa-heart"></i></button>
                        }
                        <div id={`highlight-${product.id}`} className='card-highlight-info'>SALE <i class="fa-solid fa-fire text-red-500"></i></div>
                    </div>
                    <div className="text-container">
                        <h2 className="">{product.name}</h2>
                        <div className='price-container'>
                        <p className="text-black font-bold">${product.salePrice}</p><small className="text-red-500">${product.price}</small>
                        </div>
                    </div>
                </div>
                </>
                )
        } else {
            return (
                <>
                <div 
                onMouseEnter={cardMouseOver}
                onMouseLeave={cardMouseLeave} 
                onClick={handleCardClick} className="card-container">
                    <div className="card-image-container">
                        <img id={product.id} className="card-img" src={womenImageObj[product.id][0]} alt="" />
                        {
                        filteredSize ? 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='filtered-size-quick-add-section'>
                            <button className='filtered-size-btn' onClick={handleQuickAddToCart}>ADD TO CART</button>
                        </div>
                            : 
                        <div onClick={stopParentBubble} id={`quick-add-${product.id}`} className='quick-add-section'>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraSmall'}>XS</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'small'}>S</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'medium'}>M</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'large'}>L</button>
                            <button className='unfiltered-size-btn' onClick={handleQuickAddToCart} value={'extraLarge'}>XL</button>
                        </div>
                        }
                        {
                        wishedFor ? <button onClick={handleRemoveFromWishlist} className='card-wishlist-btn'><i className="fa-solid fa-heart"></i></button> 
                        : <button onClick={handleAddToWishList} className='card-wishlist-btn'><i id={`${product.name}-wishlist-icom`} className="fa-regular fa-heart"></i></button>
                        }
                        {
                        newProduct ? <div id={`highlight-${product.id}`} className='card-highlight-info'>NEW</div> : <></>
                        }
                    </div>
                    <div className="text-container">
                        <h2 className="">{product.name}</h2>
                        <div className='price-container'>
                            <p className="text-black font-bold">${product.price}</p>
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }
    
}

// to={`/men/${product.name.replaceAll(" ",'-')}`}