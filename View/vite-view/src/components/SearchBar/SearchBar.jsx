import './SearchBar.css';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ProductCard from '../ProductCard/ProductCard';


export default function SearchBar(props){

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

        const scrollContainer = document.getElementById('product-search-feed').scrollTo(0,0);

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

        const productFeed = document.getElementById('product-search-container');
        const trendingSection = document.getElementById('trending-search-product-container');

        if (searchResults.length > 1) {
            productFeed.style.opacity = 1;
            trendingSection.style.opacity = 1;
        }

    }, [searchResults])

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const snapScrollLeft = (e) => {
        const scrollContainer = document.getElementById('product-search-feed');

        var x = -320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    }

    const snapScrollRight = (e) => {
        const scrollContainer = document.getElementById('product-search-feed');

        var x = 320;
        var y = 0;

        scrollContainer.scrollBy({
            top: y,
            left: x,
            behavior : "smooth"
        })
    };

    const handleSearchClick = (e) => {

        const overlay = document.getElementById('search-overlay');
        const searchBar = document.getElementById('search-bar');
        const searchArea = document.getElementById('search-entry-area');
        const topHeader = document.getElementById('secondary-root-header');
        const trendingContainer = document.getElementById('trending-search-container');
        
        topHeader.style.zIndex = 30;
        overlay.style.display = 'flex';
        searchBar.style.display = 'flex';
        if (overlay.style.display === 'flex') {

          setTimeout(() => {
            overlay.classList.toggle('search-overlay-active');
            searchBar.classList.toggle('search-bar-active');
          }, 200);
    
          setTimeout(() => {
            searchArea.classList.toggle('search-entry-area-active');
            trendingContainer.classList.add('trending-search-container-active');
          }, 800);
      }
    
      };
    
    const handleSearchClose = () => {
    
        const overlay = document.getElementById('search-overlay');
        const searchBar = document.getElementById('search-bar');
        const searchArea = document.getElementById('search-entry-area');
        const topHeader = document.getElementById('secondary-root-header');
        const trendingContainer = document.getElementById('trending-search-container');
        
        if (overlay.classList.contains('search-overlay-active')) {
            setTimeout(() => {
            overlay.classList.toggle('search-overlay-active');
            searchBar.classList.toggle('search-bar-active');
            searchArea.classList.toggle('search-entry-area-active');
            trendingContainer.classList.remove('trending-search-container-active');
            }, 200);
        
            setTimeout(() => {
            overlay.style.display = 'none';
            searchBar.style.display = 'none';
            topHeader.style.zIndex = 25;
            setSearchTerm('');
            }, 500);
        } else {
            return;
        }
        
        
    }

    useEffect(() => {
        const overlay = document.getElementById('search-overlay');

        if (overlay && windowWidth < 1024) {
            handleSearchClose();
        } else {
            return;
        }

    }, [windowWidth])

    if (isLoading) {
        return (
            <>
            <div className="search-overlay" id="search-overlay"></div>
            <div className='search-bar' id="search-bar">
                <div className='search-input-container'>
                    <div className='search-entry-area' id='search-entry-area'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <input 
                        onBlur={() => {
                        const searchArea = document.getElementById('search-entry-area');
                        searchArea.style.border = 'none'
                        }} 
                        onFocus={() => {
                        const searchArea = document.getElementById('search-entry-area');
                        searchArea.style.border = 'solid 1px #161616'
                        }}
                        onMouseOver={() => {
                            const searchArea = document.getElementById('search-entry-area');
                            const searchInput = document.getElementById('search-inout');
                            searchArea.style.backgroundColor = '#e0e0e0';
                            searchInput.style.backgroundColor = '#e0e0e0';
                        }}
                        onMouseLeave={() => {
                            const searchArea = document.getElementById('search-entry-area');
                            const searchInput = document.getElementById('search-inout');
                            searchArea.style.backgroundColor = '#EBEBEB';
                            searchInput.style.backgroundColor = '#EBEBEB';
                        }}
                        value={searchTerm} onChange={handleSearchTermChange} className='search-input' placeholder='Search for a Product' type="text" name="" id="search-inout" autocomplete="off" />
                        {
                            searchTerm ? <div onClick={() => {
                                setSearchTerm('');
                            }} className='clear-search'><i className="fa-solid fa-x"></i></div>
                            :
                            <></>
                        }
                        
                    </div>
                    <button onClick={handleSearchClose} className='search-close-btn'><i className="fa-solid fa-x"></i></button>
                </div>
                <div className='search-results-container'>
                        {
                            searchTerm ?
                            <>
                            <div id='trending-search-product-container' className='trending-search-product-container'>
                                <div className='trending-search-product-header-container'>
                                    <h3>TRENDING SEARCHES</h3>
                                </div>
                                <div className='trending-search-product-term-container'>
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
                            <div id='product-search-container' className='product-search-container'>
                                <div className='product-search-header-container'>
                                    <h3>PRODUCTS</h3>
                                    <div className='search-btn-container'>
                                        <button onClick={snapScrollLeft} id='new-prev-btn' className='search-prev-btn' ><div className="arrow-left"></div></button>
                                        <button onClick={snapScrollRight} id='new-next-btn' className='search-next-btn' ><div className="arrow-right"></div></button>
                                    </div>
                                </div>
                                <div className='product-search-feed  x mandatory-scroll-snapping' id='product-search-feed'>
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
                            <div id='trending-search-container' className='trending-search-container trending-search-container-active'>
                                <h3>TRENDING SEARCHES</h3>
                                <div className='trending-searches-wrapper'>
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
                <div onClick={handleSearchClose} className='search-blank-space'></div>
            </div>
            <button onClick={handleSearchClick} className="search-btn">
                <i class="fa-solid fa-magnifying-glass text-base"></i> <p>Search for a Product</p>
            </button>
            <button onClick={handleSearchClick} className='responsive-search-btn'>
                <i class="fa-solid fa-magnifying-glass text-base"></i>
            </button>
            </>
        )
    } else {
        return (
            <>
            <div className="search-overlay" id="search-overlay"></div>
            <div className='search-bar' id="search-bar">
                <div className='search-input-container'>
                    <div className='search-entry-area' id='search-entry-area'>
                        <i class="fa-solid fa-magnifying-glass text-base"></i>
                        <input 
                        onBlur={() => {
                        const searchArea = document.getElementById('search-entry-area');
                        searchArea.style.border = 'none'
                        }} 
                        onFocus={() => {
                        const searchArea = document.getElementById('search-entry-area');
                        searchArea.style.border = 'solid 1px #161616'
                        }}
                        onMouseOver={() => {
                            const searchArea = document.getElementById('search-entry-area');
                            const searchInput = document.getElementById('search-inout');
                            searchArea.style.backgroundColor = '#e0e0e0';
                            searchInput.style.backgroundColor = '#e0e0e0';
                        }}
                        onMouseLeave={() => {
                            const searchArea = document.getElementById('search-entry-area');
                            const searchInput = document.getElementById('search-inout');
                            searchArea.style.backgroundColor = '#EBEBEB';
                            searchInput.style.backgroundColor = '#EBEBEB';
                        }}
                        value={searchTerm} onChange={handleSearchTermChange} className='search-input' placeholder='Search for a Product' type="text" name="" id="search-inout" autocomplete="off" />
                        {
                            searchTerm ? <div onClick={() => {
                                setSearchTerm('');
                            }} className='clear-search'><i className="fa-solid fa-x"></i></div>
                            :
                            <></>
                        }
                        
                    </div>
                    <button onClick={handleSearchClose} className='search-close-btn'><i className="fa-solid fa-x"></i></button>
                </div>
                <div className='search-results-container'>
                        {
                            searchTerm ?
                            <>
                            <div id='trending-search-product-container' className='trending-search-product-container'>
                                <div className='trending-search-product-header-container'>
                                    <h3>TRENDING SEARCHES</h3>
                                </div>
                                <div className='trending-search-product-term-container'>
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
                            <div id='product-search-container' className='product-search-container'>
                                <div className='product-search-header-container'>
                                    <h3>PRODUCTS</h3>
                                    <div className='search-btn-container'>
                                        <button onClick={snapScrollLeft} id='new-prev-btn' className='search-prev-btn' ><div className="arrow-left"></div></button>
                                        <button onClick={snapScrollRight} id='new-next-btn' className='search-next-btn' ><div className="arrow-right"></div></button>
                                    </div>
                                </div>
                                <div className='product-search-feed  x mandatory-scroll-snapping' id='product-search-feed'>
                                    {
                                        searchResults ?
                                        searchResults.map((product, i) => {
                                            return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} searchProduct={true} handleSearchClose={handleSearchClose} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} /> 
                                        }) 
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                            </>
                            
                            :
                            <div id='trending-search-container' className='trending-search-container trending-search-container-active'>
                                <h3>TRENDING SEARCHES</h3>
                                <div className='trending-searches-wrapper'>
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
                <div onClick={handleSearchClose} className='search-blank-space'></div>
            </div>
            <button onClick={handleSearchClick} className="search-btn">
                <i class="fa-solid fa-magnifying-glass text-base"></i> <p>Search for a Product</p>
            </button>
            <button onClick={handleSearchClick} className='responsive-search-btn'>
                <i class="fa-solid fa-magnifying-glass text-base"></i>
            </button>
            </>
        )
    }
}