import "./ProductDetailPage.css";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import klarnaLogo from '../../../assets/logos/klarna/Klarna.png';
import afterpayLogo from '../../../assets/logos/afterpay/afterpay.jpeg';
import axios from "../../../api/axios";
import { womenImageObj } from '../../../assets/womenProductImagesObj';
import swipeIcon from '../../../assets/arrow.png';
import RevolvingHeader from "../../../components/RevolvingHeader/RevolvingHeader";
import AppCard from "../../../components/AppCard/AppCard";
import BlogCard from "../../../components/BlogCard/BlogCard";
import YouMightLike from "../../../components/YouMightLike/YouMightLike";
const CART_URL = '/api/cart/';
const WISHLIST_URL = '/api/wishlist/';

export default function WomenProductDetails(props) {
    
    const { setCart, setWishList, setWishlistBubble, setWishlistPopup, isLoggedIn, setIsLoggedIn, setUser } = props;
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [productSize, setProductSize] = useState('PLEASE SELECT');
    const [primaryImage, setPrimaryImage] = useState(null);
    const [newProduct, setNewProduct] = useState(false);
    const [saleProduct, setSaleProduct] = useState(false);
    const [sizeToDisplay, setSizeToDisplay] = useState('');
    const [wishedFor, setWishedFor] = useState(null);
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobileGalleryWidth, setMobileGalleryWidth] = useState(0);
    const [userScrollMobileGallery, setUserScrollMobileGallery] = useState(0)
    const [activeMobileImg, setActiveMobileImg] = useState(1);

 
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth <= 768) {
            setMobileGalleryWidth(document.getElementById('small-desktop-image-container').scrollWidth)
        }
        
    }, [windowWidth]);

    useEffect(() => {
        document.getElementById('small-desktop-image-container').scrollBy((mobileGalleryWidth * -1), 0);
        setActiveMobileImg(1);
    }, [product]);

    useEffect(() => {
        
        let galleryWidthTreshold = mobileGalleryWidth / 3;

        if (userScrollMobileGallery >= 0 && userScrollMobileGallery < (galleryWidthTreshold / 2)) {
            setActiveMobileImg(1);
        } if (userScrollMobileGallery >= (galleryWidthTreshold / 2) && userScrollMobileGallery < galleryWidthTreshold * 1.5) {
            setActiveMobileImg(2);
        } if (userScrollMobileGallery >= galleryWidthTreshold * 1.5) {
            setActiveMobileImg(3);
        }

    }, [userScrollMobileGallery])

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
    
    const handleCartClick = async (e) => {
        
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

    const handleAddToCart = async () => {

        if (!isLoggedIn) {
            return;
        }
        
        const requestBody = {
            quantity: 1,
            size: productSize
        }
        
        try {
            const response = await axios.post(`api/cart/${productId}`,
                JSON.stringify(requestBody),
                {
                  headers: { 
                      "Content-Type": "application/json" 
                  },
                  withCredentials: true
              });

              if (response.status === 201) {
                console.log(response.data);
                handleCartClick();
              }
        } catch (error) {
            
            if (error.response?.status === 401) {
                window.localStorage.clear();
                setIsLoggedIn(null);
                setUser(null);
                navigate('/login')
            }
            console.log(error)
        }
    };

    useEffect(() => {
        const ymlScrollContainer = document.getElementById('yml-product-container');

        ymlScrollContainer.scrollTo(0,0);
    }, [product]);
    
    useEffect(() => {
        
        if (productId) {
            (async () => {
                try {
                    const response = await axios.get(`api/products/${productId}`,
                        {
                          headers: { 
                              "Content-Type": "application/json" 
                          },
                          withCredentials: true
                      });
    
                      if (response.status === 200) {

                        setNewProduct(response.data.new);

                        if (response.data.salePrice) {
                            setSaleProduct(true);
                        } else {
                            setSaleProduct(false);
                        }
                        return setProduct(response.data);

                      }
                } catch (error) {
                    console.log(error)
                }
    
            })();
        }

        return () => {

        }
    }, [productId]);


    useEffect(() => {

        const xsmallProduct = document.getElementById('XS');
        const smallProduct = document.getElementById('S');
        const mediumProduct = document.getElementById('M');
        const largeProduct = document.getElementById('L');
        const xlargeProduct = document.getElementById('XL');

        const sizeArr = [xsmallProduct, smallProduct, mediumProduct, largeProduct, xlargeProduct]

        for (let i = 0; i < sizeArr.length; i++) {
            if (sizeArr[i].value === productSize) {
                sizeArr[i].classList.remove('unselected-size')
                sizeArr[i].classList.add('selected-size')
            } else {
                sizeArr[i].classList.remove('selected-size')
                sizeArr[i].classList.add('unselected-size')
            }
        }

        switch (productSize) {
            case 'PLEASE SELECT':
                setSizeToDisplay('PLEASE SELECT')
                break;
            case 'extraSmall':
                setSizeToDisplay('Extra Small')
                break;
            case 'small': 
                setSizeToDisplay('Small')
                break;
            case 'medium': 
                setSizeToDisplay('Medium')
                break;
            case 'large': 
                setSizeToDisplay('Large')
                break;
            case 'extraLarge': 
                setSizeToDisplay('Extra Large')
        };


        return () => {

        }
    }, [productSize])

    useEffect(() => {

        const galleryImg1 = document.getElementById('gallery-img-1');
        const galleryImg2 = document.getElementById('gallery-img-2');
        const galleryImg3 = document.getElementById('gallery-img-3');

        const galleryImgArr = [galleryImg1, galleryImg2, galleryImg3]

        if (primaryImage) {

            for (let i = 0; i < galleryImgArr.length; i++) {
                if (galleryImgArr[i].src === primaryImage) {
                    galleryImgArr[i].classList.remove('inactive-gallery-image');
                    galleryImgArr[i].classList.add('active-gallery-image');
                } else {
                    galleryImgArr[i].classList.remove('active-gallery-image');
                    galleryImgArr[i].classList.add('inactive-gallery-image');
                }
            };
            
        };

        return () => {

        }
    }, [primaryImage]);

    useEffect(() => {

        const galleryImg1 = document.getElementById('gallery-img-1');
        const galleryImg2 = document.getElementById('gallery-img-2');
        const galleryImg3 = document.getElementById('gallery-img-3');

        galleryImg1.classList.remove('inactive-gallery-image');
        galleryImg1.classList.add('active-gallery-image');

        galleryImg2.classList.remove('active-gallery-image');
        galleryImg2.classList.add('inactive-gallery-image');

        galleryImg3.classList.remove('active-gallery-image');
        galleryImg3.classList.add('inactive-gallery-image');
            
        return () => {

        }
    }, [productId]);

    const handleUnauthorizedAddToCart = () => {
        navigate('/cart');
    }

    const handleUnauthorizedAddToWishlist = () => {
        navigate('/wishlist');
    }

    const selectProductSize = (e) => {
        
        const elementSize = e.target.value;
        
        if (elementSize === productSize) {
            setProductSize('PLEASE SELECT')
        } else {
            setProductSize(elementSize);
        }
    };

    const handleGalleryClick = (e) => {

        const newPrimaryImage = e.target.src;
        const primaryImg = document.getElementById('primary-img');

        if (newPrimaryImage === primaryImage) {
            return;
        } else {
            setPrimaryImage(newPrimaryImage)
            primaryImg.src = newPrimaryImage;
        }
    };

    const handleAddToWishList = async (e) => {

        if (!isLoggedIn) {
            return;
        }
        
        const requestBody = {
            productId: productId
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

                setWishlistPopup(true);
                setTimeout(() => {
                    setWishlistPopup(false);
                }, 5000);

                console.log(response);
              }
        } catch (error) {

            if (error.response?.status === 401) {
                window.localStorage.clear();
                setIsLoggedIn(null);
                setUser(null);
                navigate('/login')
            }
            console.log(error)
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        
        try {
            const response = await axios.delete(`/api/wishlist/${productId}`,
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

            if (error.response?.status === 401) {
                window.localStorage.clear();
                setIsLoggedIn(null);
                setUser(null);
                navigate('/login')
            }
            console.log(error)
        }
    };

    useEffect(() => {

        if (!isLoggedIn) return;

        (async () => {
            try {
                const response = await axios.get(`api/wishlist/${productId}`,
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

    const strikeThroughPrice = <p className="text-2xl mt-2 text-black">${product.salePrice} <span className="line-through text-red-500 text-base">${product.price}</span></p>;
    const regularPrice = <p className="text-2xl mt-2 text-black">${product.price}</p>;

        return (
            <>
            <main className="detail-main-container">
                <RevolvingHeader />
                <section id="detail-component-container" className="detail-component-container">
                <div className="product-image-container">
                    <img className="image" id="primary-img" src={womenImageObj[productId][0]} alt="" />
                    <div className="gallery-container">
                        <img id="gallery-img-1" onClick={handleGalleryClick} className="active-gallery-image" src={womenImageObj[productId][0]} alt="" />
                        <img id="gallery-img-2" onClick={handleGalleryClick} className="inactive-gallery-image" src={womenImageObj[productId][1]} alt="" />
                        <img id="gallery-img-3" onClick={handleGalleryClick} className="inactive-gallery-image" src={womenImageObj[productId][2]} alt="" />
                    </div>
                </div>
                <div onScroll={() => {
                    setUserScrollMobileGallery(document.getElementById('small-desktop-image-container').scrollLeft)
                }} id="small-desktop-image-container" className="small-desktop-image-container x mandatory-scroll-snapping">
                    <img className="small-desktop-image" src={womenImageObj[productId][0]} alt="" />
                    <img className="small-desktop-image" src={womenImageObj[productId][1]} alt="" />
                    <img className="small-desktop-image" src={womenImageObj[productId][2]} alt="" />
                </div>
                <div className="image-index-container">
                    <div className="image-index-bar">
                        <img src={swipeIcon} alt="" />
                    </div>
                </div>
                <div className="product-info-container">
                    <div>
                        {saleProduct ? <div className="detail-highlight-info font-bold mb-2">SALE <i class="fa-solid fa-fire text-red-500"></i></div> : newProduct ? <div className="detail-highlight-info font-bold mb-2">NEW</div> : <></> }
                        <h1 className="text-2xl font-semibold">{product.name ? product.name.toUpperCase() : product.name}</h1>
                    </div>
                    <div className="mt-2">
                        <p className="font-light text-xs text-red-500">HALF PRICE EXPRESS SHIPPING!*<br />DISCOUNT APPLIED!</p>
                        <p className="text-2xl mt-2 font-semibold">{product.salePrice ? strikeThroughPrice : regularPrice}</p>
                        <p className="mt-2">COLOR: <span className="font-normal">{product.color ? product.color.toUpperCase() : product.color}</span></p>
                        <p className="mt-2">SIZE: <span className="font-normal">{sizeToDisplay}</span></p>
                    </div>
                    <div className="size-list-container">
                        <ul className="size-list">
                            <li>
                                <button className="unselected-size" onClick={selectProductSize} value={'extraSmall'} id="XS">XS</button>
                            </li>
                            <li >
                                <button className="unselected-size" onClick={selectProductSize} value={'small'} id="S">S</button>
                            </li>
                            <li>
                                <button className="unselected-size" onClick={selectProductSize} value={'medium'} id="M">M</button>
                            </li>
                            <li>
                                <button className="unselected-size" onClick={selectProductSize} value={'large'} id="L">L</button>
                            </li>
                            <li>
                                <button className="unselected-size" onClick={selectProductSize} value={'extraLarge'} id="XL">XL</button>
                            </li>
                        </ul>
                    </div>
                    <div className="btn-container mt-4 mb-6">
                        <button  disabled={productSize != 'PLEASE SELECT' ? false : true} onClick={isLoggedIn ? handleAddToCart : handleUnauthorizedAddToCart} className="add-to-cart-btn text-white text-sm disabled:opacity-75 disabled:cursor-not-allowed"><i class="fa-solid fa-cart-plus mr-4"></i>ADD TO CART</button>
                        {wishedFor ? <button onClick={handleRemoveFromWishlist} className="add-to-wish-list-btn text-sm"><i className="fa-solid fa-heart mr-4"></i>REMOVE FROM WISHLIST</button> : <button onClick={isLoggedIn ? handleAddToWishList : handleUnauthorizedAddToWishlist} className="add-to-wish-list-btn text-sm"><i className="fa-regular fa-heart mr-4"></i>ADD TO WISHLIST</button> }
                    </div>
                    <div className="product-detail-below-btn-container">
                        <div className="product-description-container mb-4">
                            <section className="product-detail-dropdown-container">
                                <button onClick={handleCollapseClick} class="product-detail-collapsible font-semibold">PRODUCT DESCRIPTION
                                    <div className="product-detail-plus-minus-container">
                                        <span className="line1"></span>
                                        <span className="line2"></span>
                                    </div>
                                </button>
                                <div className="product-detail-content">
                                    <div className='main-inner-container'>
                                        <section className="graphic-image-section">
                                            <h4 className="mb-2">GRAPHIC IMAGES</h4>
                                            <p className="mb-4 font-normal">Versatile fits & authentic lifting graphics. Step up your staples with our graphic styles.</p>
                                            <p className="font-normal">• “Heavy duty” graphic to back</p>
                                            <p className="font-normal">• Premium heavyweight fabric for full comfort</p>
                                        </section>
                                        <section className="size-and-fit-section">
                                            <h4 className="mb-2">SIZE & FIT</h4>
                                            <p className="font-normal">• Oversized fit</p>
                                            <p className="font-normal">• Model is 5'10" and wears size M</p>
                                        </section>
                                        <section className="material-section">
                                            <h4 className="mb-2">MATERIALS & CARE</h4>
                                            <p className="font-normal">• Main: 100% Cotton</p>
                                            <p className="font-normal">• 300gsm, heavyweight fabric</p>
                                        </section>
                                    </div>
                                    
                                </div>
                            </section>
                            <section className="product-detail-dropdown-container">
                                <button onClick={handleCollapseClick} class="product-detail-collapsible font-semibold">DELIVERY & RETURNS
                                    <div className="product-detail-plus-minus-container">
                                        <span className="line1"></span>
                                        <span className="line2"></span>
                                    </div>
                                </button>
                                <div className="product-detail-content">
                                    <div className='main-inner-container'>
                                        <a className='delivery-info' href="">Delivery Information</a>
                                        <a className='make-return-info' href="">Make a return</a>
                                    </div>
                                    
                                </div>
                            </section>
                        </div>
                            <div className="product-detail-card-container">
                                <div className="detail-card-wrapper">
                                    <h2 className="font-semibold">CHECKOUT TODAY. INTEREST FREE.</h2>
                                    <div className='product-detail-icon-card-container'>
                                        <div className='product-detail-icon-row'>
                                            <div className='product-detail-icon'>
                                                <img src={klarnaLogo} alt="" />
                                            </div>
                                            <div className='product-detail-icon-text'>
                                                <p>Pay in 4 installments</p>
                                                <p className='font-light text-xs'>Minimum order value of $35</p>
                                                <p className='underline underline-offset-2 hover:cursor-pointer text-sm inline-block'>Learn more</p>
                                            </div>
                                        </div>
                                        <div className='product-detail-icon-row'>
                                            <div className='product-detail-icon'>
                                                <img className='rounded-md' src={afterpayLogo} alt="" />
                                            </div>
                                            <div className='product-detail-icon-text'>
                                                <p>Pay in 4 installments</p>
                                                <p className='font-light text-xs'>Minimum order value of $35</p>
                                                <p className='underline underline-offset-2 hover:cursor-pointer text-sm inline-block'>Learn more</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-card-wrapper">
                                    <h2 className="font-semibold">DELIVERED TO YOUR DOOR.</h2>
                                    <div className='product-detail-icon-card-container'>
                                        <div className='product-detail-icon-row'>
                                            <div className='product-detail-icon'>
                                                <i class="fa-solid fa-rotate-left text-2xl text-black"></i>
                                            </div>
                                            <div className='product-detail-icon-text'>
                                                <p>Free 30-Day Return Policy! Excluding Final Sale Items</p>
                                            </div>
                                        </div>
                                        <div className='product-detail-icon-row'>
                                            <div className='product-detail-icon'>
                                                <i class="fa-solid fa-box text-2xl text-black"></i>
                                            </div>
                                            <div className='product-detail-icon-text'>
                                                <p>Free Standard Shipping Over $75</p>
                                            </div>
                                        </div>
                                        <div className='product-detail-icon-row'>
                                            <div className='product-detail-icon'>
                                                <i class="fa-solid fa-truck-fast text-2xl text-black"></i>
                                            </div>
                                            <div className='product-detail-icon-text'>
                                                <p>Free Express Delivery over $150</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>                            
                        </div>  
                    </div>
                </div>
            </section>
            <YouMightLike setWishlistBubble={setWishlistBubble} setWishList={setWishList} isLoggedIn={isLoggedIn} setCart={setCart} product={product} />
            <section className="product-detail-app-section">
                <h3>OUR APPS</h3>
                <div className="product-detail-app-container">
                    <AppCard />
                    <BlogCard />
                </div>
            </section>
            </main>
            
            </>
        )
};