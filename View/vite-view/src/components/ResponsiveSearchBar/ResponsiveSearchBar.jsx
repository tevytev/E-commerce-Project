import './ResponsiveSearchBar.css';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ProductCard from '../ProductCard/ProductCard';


export default function ResponsiveSearchBar(props){

    const { setWishlistPopup, setWishlistBubble, setWishList, cart, setCart, isLoggedIn, setIsLoggedIn, setUser } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        if (!searchTerm) return;

        const scrollContainer = document.getElementById('small-product-search-feed').scrollTo(0,0);

        (async () => {
            try {
                const response = await axios.get(`api/products/search?searchTerm=${searchTerm}`,
                    {
                        headers: { 
                            "Content-Type": "application/json" 
                        },
                        withCredentials: true
                    });

                    setIsLoading(true);

                    if (response.status === 200) {
                        setIsLoading(false);
                        return setSearchResults(response.data);
                    }
            } catch (error) {
                console.log(error)
            }
        })();

    }, [searchTerm]);

    useEffect(() => {

        const productFeed = document.getElementById('small-product-search-container');
        const trendingSection = document.getElementById('small-trending-search-product-container');

        if (searchResults.length > 1) {
            productFeed.style.opacity = 1;
            trendingSection.style.opacity = 1;
        }

    }, [searchResults])

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('small-product-search-feed');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('small-product-search-feed');

        var x = 320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    };

    const handleNavClose = (e) => {
        const nav = document.getElementById('responsive-nav-container');
        const navContent = document.getElementById('responsive-nav-wrapper');

        nav.classList.toggle('responsive-nav-container-active');
        navContent.classList.toggle('responsive-nav-wrapper-active');
        const navScrollArea = document.getElementById('responsive-nav-container');
        navScrollArea.scrollTo(0, 0);

        
        const collapsible1 = document.getElementsByClassName('responsive-nav-collapsible')[0];
        const content1 = collapsible1.nextElementSibling;
        const line1 = collapsible1.children[0].firstChild
        if (content1.style.maxHeight) {
            content1.style.maxHeight = null;
            line1.classList.toggle('line1-active');
        }

        const collapsible2 = document.getElementsByClassName('responsive-nav-collapsible')[1];
        const content2 = collapsible2.nextElementSibling;
        const line2 = collapsible2.children[0].firstChild
        if (content2.style.maxHeight) {
            content2.style.maxHeight = null;
            line2.classList.toggle('line1-active');
        } 

        const collapsible3 = document.getElementsByClassName('responsive-nav-collapsible')[2];
        const content3 = collapsible3.nextElementSibling;
        const line3 = collapsible3.children[0].firstChild
        if (content3.style.maxHeight) {
            content3.style.maxHeight = null;
            line3.classList.toggle('line1-active');
        } 
        


        setTimeout(() => {
            nav.style.display = 'none';
        }, 400);

    }

    const handleSearchClick = (e) => {

        const searchBar = document.getElementById('small-search-bar');
        const searchArea = document.getElementById('small-search-entry-area');
        const topHeader = document.getElementById('secondary-root-header');
        
        topHeader.style.zIndex = 30;
        searchBar.style.display = 'flex';
        if (searchBar.style.display === 'flex') {

            setTimeout(() => {
                searchBar.classList.toggle('small-search-bar-active');
            }, 200);
        
            setTimeout(() => {
                searchArea.classList.toggle('small-search-entry-area-active');
            }, 800);
        }
    
      };
    
    const handleResponsiveSearchClose = () => {
    
        const searchBar = document.getElementById('small-search-bar');
        const searchArea = document.getElementById('small-search-entry-area');
        const topHeader = document.getElementById('secondary-root-header');
        
        if (searchBar.classList.contains('small-search-bar-active')) {
            searchBar.classList.toggle('small-search-bar-active');
            searchArea.classList.toggle('small-search-entry-area-active');
            const responsiveNav = document.getElementById('responsive-nav-container');

            if (responsiveNav.style.display === 'flex') {
                handleNavClose();
                setTimeout(() => {
                    searchBar.style.display = 'none';
                    topHeader.style.zIndex = 25;
                    setSearchTerm('');
                }, 1000);
                
            } else {

                setTimeout(() => {
                    searchBar.style.display = 'none';
                    topHeader.style.zIndex = 25;
                    setSearchTerm('');
                }, 1000);
            }
        }

        
    }

    useEffect(() => {
        const searchBar = document.getElementById('small-search-bar');

        if (searchBar && windowWidth > 1024) {
            handleResponsiveSearchClose();
        } else {
            return;
        }

    }, [windowWidth])

    if (isLoading) {

        return (
            <>
            <div className='small-search-bar' id="small-search-bar">
                <div className='small-search-input-container'>
                    <i onClick={handleResponsiveSearchClose} id='small-search-close-btn' className="fa-solid fa-chevron-left"></i>
                    <div className='small-search-entry-area' id='small-search-entry-area'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <input 
                        onBlur={() => {
                        const searchArea = document.getElementById('small-search-entry-area');
                        searchArea.style.border = 'none'
                        }} 
                        onFocus={() => {
                        const searchArea = document.getElementById('small-search-entry-area');
                        searchArea.style.border = 'solid 1px #161616'
                        }}
                        onMouseOver={() => {
                            const searchArea = document.getElementById('small-search-entry-area');
                            const searchInput = document.getElementById('small-search-inout');
                            searchArea.style.backgroundColor = '#e0e0e0';
                            searchInput.style.backgroundColor = '#e0e0e0';
                        }}
                        onMouseLeave={() => {
                            const searchArea = document.getElementById('small-search-entry-area');
                            const searchInput = document.getElementById('small-search-inout');
                            searchArea.style.backgroundColor = '#EBEBEB';
                            searchInput.style.backgroundColor = '#EBEBEB';
                        }}
                        value={searchTerm} onChange={handleSearchTermChange} className='small-search-input' placeholder='Search for a Product' type="text" name="" id="small-search-inout" autocomplete="off" />
                        {
                            searchTerm ? <div onClick={() => {
                                setSearchTerm('');
                            }} className='small-clear-search'><i className="fa-solid fa-x"></i></div>
                            :
                            <></>
                        }
                        
                    </div>
                </div>
                <div className='small-search-results-container'>
                        {
                            searchTerm ?
                            <>
                            <div id='small-trending-search-product-container' className='small-trending-search-product-container'>
                                <div className='small-trending-search-product-header-container'>
                                    <h3>TRENDING SEARCHES</h3>
                                </div>
                                <div className='small-trending-search-product-term-container'>
                                    <div onClick={() => {
                                        setSearchTerm('shorts')
                                    }}>SHORTS</div>
                                    <div onClick={() => {
                                        setSearchTerm('leggings')
                                    }}>LEGGINGS</div>
                                    <div onClick={() => {
                                        setSearchTerm('sports bra')
                                    }}>SPORTS BRA</div>
                                    <div onClick={() => {
                                        setSearchTerm('hoodie')
                                    }}>HOODIE</div>
                                </div>
                            </div>
                            <div id='small-product-search-container' className='small-product-search-container'>
                                <div className='small-product-search-header-container'>
                                    <h3>PRODUCTS</h3>
                                    <div className='small-search-btn-container'>
                                        <button onClick={snapScrollLeft} id='new-prev-btn' className='small-search-prev-btn' ><div className="arrow-left"></div></button>
                                        <button onClick={snapScrollRight} id='new-next-btn' className='small-search-next-btn' ><div className="arrow-right"></div></button>
                                    </div>
                                </div>
                                <div className='small-product-search-feed  x mandatory-scroll-snapping' id='small-product-search-feed'>
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
                            </div>
                            </>
                            
                            :
                            <div id='small-trending-search-container' className='small-trending-search-container trending-search-container-active'>
                                <h3>TRENDING SEARCHES</h3>
                                <div className='small-trending-searches-wrapper'>
                                    <div onClick={() => {
                                        setSearchTerm('shorts')
                                    }}>SHORTS</div>
                                    <div onClick={() => {
                                        setSearchTerm('leggings')
                                    }}>LEGGINGS</div>
                                    <div onClick={() => {
                                        setSearchTerm('sports bra')
                                    }}>SPORTS BRA</div>
                                    <div onClick={() => {
                                        setSearchTerm('hoodie')
                                    }}>HOODIE</div>
                                </div>
                            </div>
                        }
                </div>
            </div>
            <button onClick={handleSearchClick} className='small-search-btn'>
                <i class="fa-solid fa-magnifying-glass text-base"></i>
            </button>
            </>
        )

    } else {

        return (
            <>
            <div className='small-search-bar' id="small-search-bar">
                <div className='small-search-input-container'>
                    <i onClick={handleResponsiveSearchClose} id='small-search-close-btn' className="fa-solid fa-chevron-left"></i>
                    <div className='small-search-entry-area' id='small-search-entry-area'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <input 
                        onBlur={() => {
                        const searchArea = document.getElementById('small-search-entry-area');
                        searchArea.style.border = 'none'
                        }} 
                        onFocus={() => {
                        const searchArea = document.getElementById('small-search-entry-area');
                        searchArea.style.border = 'solid 1px #161616'
                        }}
                        onMouseOver={() => {
                            const searchArea = document.getElementById('small-search-entry-area');
                            const searchInput = document.getElementById('small-search-inout');
                            searchArea.style.backgroundColor = '#e0e0e0';
                            searchInput.style.backgroundColor = '#e0e0e0';
                        }}
                        onMouseLeave={() => {
                            const searchArea = document.getElementById('small-search-entry-area');
                            const searchInput = document.getElementById('small-search-inout');
                            searchArea.style.backgroundColor = '#EBEBEB';
                            searchInput.style.backgroundColor = '#EBEBEB';
                        }}
                        value={searchTerm} onChange={handleSearchTermChange} className='small-search-input' placeholder='Search for a Product' type="text" name="" id="small-search-inout" autocomplete="off" />
                        {
                            searchTerm ? <div onClick={() => {
                                setSearchTerm('');
                            }} className='small-clear-search'><i className="fa-solid fa-x"></i></div>
                            :
                            <></>
                        }
                        
                    </div>
                </div>
                <div className='small-search-results-container'>
                        {
                            searchTerm ?
                            <>
                            <div id='small-trending-search-product-container' className='small-trending-search-product-container'>
                                <div className='small-trending-search-product-header-container'>
                                    <h3>TRENDING SEARCHES</h3>
                                </div>
                                <div className='small-trending-search-product-term-container'>
                                    <div onClick={() => {
                                        setSearchTerm('shorts')
                                    }}>SHORTS</div>
                                    <div onClick={() => {
                                        setSearchTerm('leggings')
                                    }}>LEGGINGS</div>
                                    <div onClick={() => {
                                        setSearchTerm('sports bra')
                                    }}>SPORTS BRA</div>
                                    <div onClick={() => {
                                        setSearchTerm('hoodie')
                                    }}>HOODIE</div>
                                </div>
                            </div>
                            <div id='small-product-search-container' className='small-product-search-container'>
                                <div className='small-product-search-header-container'>
                                    <h3>PRODUCTS</h3>
                                    <div className='small-search-btn-container'>
                                        <button onClick={snapScrollLeft} id='new-prev-btn' className='small-search-prev-btn' ><div className="arrow-left"></div></button>
                                        <button onClick={snapScrollRight} id='new-next-btn' className='small-search-next-btn' ><div className="arrow-right"></div></button>
                                    </div>
                                </div>
                                <div className='small-product-search-feed  x mandatory-scroll-snapping' id='small-product-search-feed'>
                                    {
                                        searchResults ?
                                        searchResults.map((product, i) => {
                                            return <ProductCard key={i} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} responsiveSearchProduct={true} handleResponsiveSearchClose={handleResponsiveSearchClose} handleNavClose={handleNavClose} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} /> 
                                        }) 
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            </>
                            
                            :
                            <div id='small-trending-search-container' className='small-trending-search-container trending-search-container-active'>
                                <h3>TRENDING SEARCHES</h3>
                                <div className='small-trending-searches-wrapper'>
                                    <div onClick={() => {
                                        setSearchTerm('shorts')
                                    }}>SHORTS</div>
                                    <div onClick={() => {
                                        setSearchTerm('leggings')
                                    }}>LEGGINGS</div>
                                    <div onClick={() => {
                                        setSearchTerm('sports bra')
                                    }}>SPORTS BRA</div>
                                    <div onClick={() => {
                                        setSearchTerm('hoodie')
                                    }}>HOODIE</div>
                                </div>
                            </div>
                        }
                </div>
            </div>
            <button onClick={handleSearchClick} className='small-search-btn'>
                <i class="fa-solid fa-magnifying-glass text-base"></i>
            </button>
            </>
        )
    }

    
}