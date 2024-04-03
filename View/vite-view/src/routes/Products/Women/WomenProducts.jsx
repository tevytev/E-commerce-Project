import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import RevolvingHeader from "../../../components/RevolvingHeader/RevolvingHeader";
import "../ShoppingStyles/shoppingStyles.css";
import axios from "../../../api/axios";

export default function WomenProducts(props) {

    const { filter } = useParams();

    const { isLoggedIn, setIsLoggedIn, setUser, cart, setCart, setWishList, setWishlistBubble, setWishlistPopup } = props;

    const [product, setProduct] = useState(filter ? '' : 'tops');
    const [productType, setProductType] = useState('');
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(null);
    const [sortByFilter, setSortByFilter] = useState(null);
    const [collectionFilter, setCollectionFilter] = useState(filter === 'DSGN' ? 'DSGN Studio' : null);
    const [responsiveItemView, setResponsiveItemView] = useState('double');
    const [userScrollY, setUserScrollY] = useState(window.scrollY);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeFilterTotal, setActiveFilterTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResponsiveItemViewChange = () => {
        if (responsiveItemView === 'double') {
            setResponsiveItemView('single');
        } else {
            setResponsiveItemView('double');
        }
    };

    const handleCollectionFilterChange = (e) => {
        setCollectionFilter(e.target.id);
    };

    const handleCollectionFilterRemove = () => {
        setCollectionFilter(null);
    };

    const handleSortByFilterChange = (e) => {
        setSortByFilter(e.target.value);
    };

    const handleSortByFilterRemove = () => {
        setSortByFilter(null);
    };


    const handleSizeFilterChange = (e) => {
        setSizeFilter(e.target.id);
    };

    const handleSizeFilterRemove = () => {
        setSizeFilter(null);
    };
    
    const handleColorFilterChange = (e) => {
        setColorFilter(e.target.id);
    };

    const handleColorFilterRemove = () => {
        setColorFilter(null);
    };

    const handlePriceFilterChange = (e) => {
        setPriceFilter(e.target.value);
    };

    const handlePriceFilterRemove = () => {
        setPriceFilter(null);
    };

    const changeProductType = (e) => {
        setProductType(e.target.id);
    }

    const handleResponsiveFilterClick = () => {

        const overlay = document.getElementById('responsive-filter-overlay');
        const filter = document.getElementById('responsive-filter-container');
        overlay.style.display = 'flex';
        if (overlay.style.display === 'flex') {
            setTimeout(() => {
              overlay.classList.toggle('responsive-filter-fixed-container-active');
            }, 100)
            setTimeout(() => {
                filter.classList.toggle('responsive-filter-container-active');
            }, 300)
        }
    };

    const handleResponsiveFilterClose = (e) => {
        const overlay = document.getElementById('responsive-filter-overlay');
        const filter = document.getElementById('responsive-filter-container');
        if(overlay.classList.contains('responsive-filter-fixed-container-active')) {
            overlay.classList.toggle('responsive-filter-fixed-container-active');
            filter.classList.toggle('responsive-filter-container-active');
        } else {
            return;
        }
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 200);
    };

    const handleSeeProducts = (e) => {
        window.scrollTo(0, 0);
        const overlay = document.getElementById('responsive-filter-overlay');
        const filter = document.getElementById('responsive-filter-container');
        overlay.classList.toggle('responsive-filter-fixed-container-active');
        filter.classList.toggle('responsive-filter-container-active');
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 200);
    };

    const onCollapseClick = (e) => {
        const lastContent = document.getElementById('last-content');
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        const arrow = e.target.children[document.getElementById('responsive-filter-overlay').style.display === 'flex' ? 1 : 0].firstChild

        if (content.style.maxHeight){
            arrow.classList.toggle('thick-arrow-down');
            arrow.classList.toggle('thick-arrow-up');
            content.style.maxHeight = null;
        
        } else {
            arrow.classList.toggle('thick-arrow-down');
            arrow.classList.toggle('thick-arrow-up');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    };

    const handleClearAllFilters = () => {
        setProductType('');
        setColorFilter(null);
        setPriceFilter(null);
        setSizeFilter(null);
        setSortByFilter(null);
        setCollectionFilter(null);
    };
    
    const changeProduct = async (e) => {
        setProductType('');
        if (product === e.target.id) {

            if (collectionFilter) {
                if (priceFilter) {
                    try {
                        const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}&collectionFilter=DSGN`,
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
                            window.scrollTo(0, 0);
                            return setProducts(response.data);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        console.log(error);
                    }
                } else {
                    try {
                        const response = await axios.get(`api/products/clothingType/${product}?gender=women&collectionFilter=DSGN`,
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
                            window.scrollTo(0, 0);
                            return setProducts(response.data);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {
                if (priceFilter) {
                    try {
                        const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}`,
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
                            window.scrollTo(0, 0);
                            return setProducts(response.data);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        console.log(error);
                    }
                } else {
                    try {
                        const response = await axios.get(`api/products/clothingType/${product}?gender=women`,
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
                            window.scrollTo(0, 0);
                            return setProducts(response.data);
                        }
                    } catch (error) {
                        setIsLoading(false);
                        console.log(error)
                    }
                }
            }
                
        } else {
            setProduct(e.target.id);
        }
    }
    const topsProductTypeBtns = [<button onClick={changeProduct} id="tops">All</button>, <button onClick={changeProductType} id="sports bras">Sports bras</button>, <button onClick={changeProductType} id="t-shirts">T-shirts</button>, <button onClick={changeProductType} id="long sleeves">Long sleeves</button>, <button onClick={changeProductType} id="hoodies">Hoodies</button>];

    const bottomsProductTypeBtns = [<button onClick={changeProduct} id="bottoms">All</button>, <button onClick={changeProductType} id="leggings">Leggings</button>, <button onClick={changeProductType} id="shorts">Shorts</button>, <button onClick={changeProductType} id="sweatpants">Sweatpants</button>];

    window.addEventListener("scroll", (e) => {
        setUserScrollY(window.scrollY);
    });

    useEffect(() => {

        switch (filter) {
            case 'tops':
                setProduct('tops');
                break;
            case 'bottoms': 
                setProduct('bottoms');
                break;
            case 't-shirts': 
                setProduct('tops');
                setProductType('t-shirts');
                break;
            case 'longsleeves': 
                setProduct('tops');
                setProductType('long sleeves');
                break;
            case 'hoodies': 
                setProduct('tops');
                setProductType('hoodies');
                break;
            case 'sportsbras': 
                setProduct('tops');
                setProductType('sports bras');
                break;
            case 'shorts': 
                setProduct('bottoms');
                setProductType('shorts');
                break;
            case 'leggings': 
                setProduct('bottoms');
                setProductType('leggings');
                break;
            case 'sweatpants': 
                setProductType('sweatpants');
                setProduct('bottoms');
                break;
            case 'new': 
                setSortByFilter('new');
                setProduct('tops');
                break;
            case 'sale': 
                setSortByFilter('sale');
                setProduct('tops');
                break;
            case 'DSGN':
                setCollectionFilter('DSGN');
                setProduct('tops');
                break;
        }

    }, [filter])

    useEffect(() => {
        const filterHead = document.getElementById('filter-head');

        if (windowWidth < 767) return;

        if (userScrollY > 50) {
            filterHead.style.boxShadow =  "rgba(33, 35, 38, 0.1) 0px 12px 12px -10px";
        } else {
            filterHead.style.boxShadow =  "none";
        }
    }, [userScrollY, windowWidth]);

    // CLOSE MOBILE FILTER IF WINDOW WIDTH GROWS
    useEffect(() => {
        const filter = document.getElementById('responsive-filter-container');

        if (filter && windowWidth > 1024) {
            handleResponsiveFilterClose();
        } else {
            return;
        }

    }, [windowWidth]);

    // RESPONSIVE ITEM VIEW EFFECT
    useEffect(() => {
        const activeDiv = document.getElementById('active-responsive-item-display');
        const doubleItemContainer = document.getElementById('double-item-symbol-container');
        const singleItemSymbol = document.getElementById('single-item-symbol');
        const productFeed = document.getElementById('product-feed');
        
        if (windowWidth > 766) {
            productFeed.style.gridTemplateColumns = null;
            return;
        }

        if (responsiveItemView === 'double') {

            singleItemSymbol.classList.remove('single-item-symbol-active');
            activeDiv.style.transform = null;
            doubleItemContainer.classList.add('double-item-symbol-container-active');
            productFeed.style.gridTemplateColumns = '49% 49%';

        } else {

            doubleItemContainer.classList.remove('double-item-symbol-container-active');
            singleItemSymbol.classList.add('single-item-symbol-active');
            activeDiv.style.transform = 'translateX(82%)';
            productFeed.style.gridTemplateColumns = '100%';
        }

    }, [responsiveItemView, windowWidth]);


    // console.log(responsiveItemView);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (collectionFilter) {
                if (product === 'tops') {
                    if (priceFilter && productType === '') {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}&collectionFilter=DSGN`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                  }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter && !productType) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&collectionFilter=DSGN`,
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
                                    window.scrollTo(0, 0);
                                    console.log(response.data);
                                    return setProducts(response.data);
                                  }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else if (priceFilter && productType) {
                        return;
                    }
    
                } else if (product === 'bottoms') {
                    if (priceFilter && productType === '') {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}&collectionFilter=DSGN`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                  }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter && !productType) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&collectionFilter=DSGN`,
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
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                  }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else if (priceFilter && productType) {
                        return;
                    }
                }
            } else {
                if (product === 'tops') {
                    if (priceFilter && productType === '') {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter && !productType) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women`,
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
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data); 

                                    
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else if (priceFilter && productType) {
                        return;
                    }

                } else if (product === 'bottoms') {
                    if (priceFilter && productType === '') {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women&priceFilter=${priceFilter}`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter && !productType) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/clothingType/${product}?gender=women`,
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
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else if (priceFilter && productType) {
                        return;
                    }
                }
            }
                
        }

        return () => {
            mounted = false
        }
    }, [product, productType, priceFilter, collectionFilter, filter]);

    useEffect(() => {
        let mounted = true;
        if (productType === '') {
            return;

        } else {

            if (mounted) {

                if (collectionFilter) {

                    if (priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/?gender=women&category=${productType}&priceFilter=${priceFilter}&collectionFilter=DSGN`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else {
                        (async () => {
                        try {
                            const response = await axios.get(`api/products/?gender=women&category=${productType}&collectionFilter=DSGN`,
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
                                window.scrollTo(0, 0);
                                return setProducts(response.data);
                                }
                        } catch (error) {
                            setIsLoading(false);
                            console.log(error)
                        }
            
                        })();
                    }
                } else {
                    if (priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/products/?gender=women&category=${productType}&priceFilter=${priceFilter}`,
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

                                    if (priceFilter === 'high to low') {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return b.salePrice - a.salePrice;
    
                                        } else if (b.salePrice) {
    
                                            return b.salePrice - a.price;
    
                                        } else if (a.salePrice) {
    
                                            return b.price - a.salePrice;
    
                                        } else {
    
                                            return b.price - a.price;
    
                                        }
                                        
                                        })
                                    } else {
                                        const priceAdjustedArr = response.data.sort((a,b) => {
                                        if (b.salePrice && a.salePrice) {
    
                                            return a.salePrice - b.salePrice;
    
                                        } else if (a.salePrice) {
    
                                            return a.salePrice - b.price;
    
                                        } else if (b.salePrice) {
    
                                            return a.price - b.salePrice;
    
                                        } else {
    
                                            return a.price - b.price;
                                            
                                        }
                                        
                                        })
                                    }

                                    window.scrollTo(0, 0);
                                    return setProducts(response.data);
                                }
                            } catch (error) {
                                setIsLoading(false);
                                console.log(error)
                            }
                
                        })();
                    } else {
                        (async () => {
                        try {
                            const response = await axios.get(`api/products/?gender=women&category=${productType}`,
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
                                window.scrollTo(0, 0);
                                return setProducts(response.data);
                                }
                        } catch (error) {
                            setIsLoading(false);
                            console.log(error)
                        }
            
                        })();
                    }
                }
            }
        }

        return () => {
            mounted = false
        }
    }, [productType, priceFilter, collectionFilter, filter]);

    useEffect(() => {
        if (isLoading) return setTotalItems(0);

        setTotalItems(document.getElementById('product-feed').children.length);
    }, [productType, priceFilter, colorFilter, products, sortByFilter]);

    const sortByFunc = (productObj) => {
        if (sortByFilter === 'new') {
            return productObj.new === true;
        } else if (sortByFilter === 'sale') {
            return productObj.salePrice !== null;
        }
    };

    useEffect(() => {
        const filterArr = [productType, priceFilter, colorFilter, sizeFilter, sortByFilter, collectionFilter];

        setActiveFilterTotal(0);

        for (let i = 0; i < filterArr.length; i++) {
            if (filterArr[i]) {
                setActiveFilterTotal(prev => prev + 1);
            }
            
        }

    }, [productType, priceFilter, colorFilter, sizeFilter, sortByFilter, collectionFilter]);

    const collectionFilterFunc = (productObj) => {
        return productObj.dsgn !== null;
    }
    
    if (isLoading) {
        return (
            <>
            <section className="shopping-section-container">
                <RevolvingHeader></RevolvingHeader>
                <div id="filter-head" className="filter-header-container">
                    <div className="product-heading-container">
                        <h2 className="font-semibold text-sm">WOMEN</h2>
                        <div className="product-heading-bottom">
                            <h3>{product.toUpperCase()}{productType === '' ? <></> : ` & ${productType.toUpperCase()}`}</h3>
                            {products ? <p>({totalItems} products)</p> : <></>}
                            
                        </div>
                    </div>
                    <div className="active-filter-container">
                        <div className="responsive-item-display-btn">
                            <div id="active-responsive-item-display" className="active-responsive-item-display"></div> 
                            <button onClick={handleResponsiveItemViewChange} className="responsive-single-item-view"><div id="single-item-symbol" className="single-item-symbol"></div></button> 
                            <button onClick={handleResponsiveItemViewChange} className="responsive-double-item-view">
                                <div id="double-item-symbol-container" className="double-item-symbol-container">
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                </div>
                            </button>
                        </div>
                        <button onClick={ isLoading ? null : handleResponsiveFilterClick} className="responsive-filter-btn"><i class="fa-solid fa-sliders"></i> <p>{windowWidth < 500 ? 'FILTER' : 'FILTER & SORT' }</p>{activeFilterTotal ? <div className="responsive-filter-bubble">{activeFilterTotal}</div> : <></>}</button>
                        {priceFilter ? <div onClick={handlePriceFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{priceFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sortByFilter ? <div onClick={handleSortByFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{sortByFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {collectionFilter ? <div onClick={handleCollectionFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{collectionFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sizeFilter ? <div onClick={handleSizeFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{sizeFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {colorFilter ? <div onClick={handleColorFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{colorFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                    </div>
                </div>
                <div className="component-container">
                    <div className="filter-container">
                        <div className='scroll-wrapper'> 
                        <section className="shopping-dropdown-container">
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">CATEGORY
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">STYLE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            {product === 'tops' ? topsProductTypeBtns.map((btn, i) => {

                                return btn;
                            }) : bottomsProductTypeBtns.map((btn, i) => {

                                return btn;
                            })}
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">PRICE
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'low to high' ? true : false} type="radio" name="price-filter" id="low-to-high" value="low to high" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Low to High</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'high to low' ? true : false} type="radio" name="price-filter" id="high-to-low" value="high to low" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">High to Low</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">SORT BY
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'new' ? true : false} type="radio" name="sort-by" id="new" value="new" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">New</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'sale' ? true : false} type="radio" name="sort-by" id="sale" value="sale" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Sale</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">SIZE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">COLLECTION
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleCollectionFilterChange} id="DSGN Studio">DSGN Studio</button>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">COLOR<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div id="last-content" className="color-shopping-content">
                            <div  className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'black'} className="black-color-btn"></div>
                                <p>Black</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'blue'} className="blue-color-btn"></div>
                                <p>Blue</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'red'} className="red-color-btn"></div>
                                <p>Red</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'gray'} className="gray-color-btn"></div>
                                <p>Gray</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'green'} className="green-color-btn"></div>
                                <p>Green</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'orange'} className="orange-color-btn"></div>
                                <p>Orange</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'pink'} className="pink-color-btn"></div>
                                <p>Pink</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'purple'} className="purple-color-btn"></div>
                                <p>Purple</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'brown'} className="brown-color-btn"></div>
                                <p>Brown</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'white'} className="white-color-btn"></div>
                                <p>White</p>
                            </div> 
                        </div>
                    </section>
                    </div>
                    </div>
                    <main className="products-container">
                        <div id="womens-products-hero" className="products-hero-container">
                            <div className="products-hero-text-container">
                                <h1>FITNESS + FASHION = CONFIDENCE</h1>
                                <h2>CONFIDENCE LOOKS GOOD ON YOU.</h2>
                            </div>
                        </div>
                        <div id='product-feed' className="product-feed-container">
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
                    </main>
                </div>
            </section>
            <div id="responsive-filter-overlay" className="responsive-filter-fixed-container">
                <div onScroll={() => {
                    const container = document.getElementById('responsive-filter-container');
                    const header = document.getElementById('responsive-filter-head');

                    if (container.scrollTop > 0) {
                        header.style.boxShadow = 'rgba(33, 35, 38, 0.2) 0px 10px 10px -10px';
                    } else {
                        header.style.boxShadow = 'none';
                    }
                    
                    // console.log(header);
                }} id="responsive-filter-container" className="responsive-filter-container">
                    <div id="responsive-filter-head" className="responsive-filter-header-container">
                        <h3>FILTER & SORT</h3>
                        <i onClick={handleResponsiveFilterClose} className="fa-solid fa-x"></i>
                        <p onClick={handleClearAllFilters} className="responsive-filter-clear">Clear All</p>
                    </div>
                    <div className="responsive-dropdown-wrapper">
                    <section className="shopping-dropdown-container">
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                CATEGORY
                                <p>{product.toUpperCase()}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">
                            <div className="responsive-filter-label-container">
                                STYLE
                                <p>{productType ? productType.toUpperCase() : 'ALL'}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            {product === 'tops' ? topsProductTypeBtns.map((btn, i) => btn) : bottomsProductTypeBtns.map((btn, i) => btn)}
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                PRICE
                                <p>{priceFilter ? priceFilter.toUpperCase() : <></>}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form className="filter-form" action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'low to high' ? true : false} type="radio" name="price-filter" id="low-to-high" value="low to high" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Low to High</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'high to low' ? true : false} type="radio" name="price-filter" id="high-to-low" value="high to low" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">High to Low</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                SORT BY
                                <p>{sortByFilter ? sortByFilter.toUpperCase() : <></>}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'new' ? true : false} type="radio" name="sort-by" id="new" value="new" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">New</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'sale' ? true : false} type="radio" name="sort-by" id="sale" value="sale" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Sale</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">
                            <div className="responsive-filter-label-container">
                                SIZE
                                <p>{sizeFilter ? sizeFilter.toUpperCase() : <></>}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                COLLECTION
                                <p>{collectionFilter ? collectionFilter.toUpperCase() : <></>}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleCollectionFilterChange} id="DSGN Studio">DSGN Studio</button>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">
                            <div className="responsive-filter-label-container">
                                COLOR
                                <p>{colorFilter ? colorFilter.toUpperCase() : <></>}</p>
                            </div>
                        
                        <div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div id="last-content" className="color-shopping-content">
                            <div  className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'black'} className="black-color-btn"></div>
                                <p>Black</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'blue'} className="blue-color-btn"></div>
                                <p>Blue</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'red'} className="red-color-btn"></div>
                                <p>Red</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'gray'} className="gray-color-btn"></div>
                                <p>Gray</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'green'} className="green-color-btn"></div>
                                <p>Green</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'orange'} className="orange-color-btn"></div>
                                <p>Orange</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'pink'} className="pink-color-btn"></div>
                                <p>Pink</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'purple'} className="purple-color-btn"></div>
                                <p>Purple</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'brown'} className="brown-color-btn"></div>
                                <p>Brown</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'white'} className="white-color-btn"></div>
                                <p>White</p>
                            </div>
                        </div>
                    </section>
                    </div>
                    <div id="responsive-filter-footer" className="responsive-filter-footer-container">
                        {totalItems > 0 ? <button onClick={handleSeeProducts}>
                            SEE PRODUCTS ({totalItems})
                        </button> : <button disabled onClick={handleSeeProducts}>
                            SEE PRODUCTS ({totalItems})
                        </button>}
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
            <section className="shopping-section-container">
                <RevolvingHeader></RevolvingHeader>
                <div id="filter-head" className="filter-header-container">
                    <div className="product-heading-container">
                        <h2 className="font-semibold text-sm">WOMEN</h2>
                        <div className="product-heading-bottom">
                            <h3>{product.toUpperCase()}{productType === '' ? <></> : ` & ${productType.toUpperCase()}`}</h3>
                            {products ? <p>({totalItems} products)</p> : <></>}
                            
                        </div>
                    </div>
                    <div className="active-filter-container">
                        <div className="responsive-item-display-btn">
                            <div id="active-responsive-item-display" className="active-responsive-item-display"></div> 
                            <button onClick={handleResponsiveItemViewChange} className="responsive-single-item-view"><div id="single-item-symbol" className="single-item-symbol"></div></button> 
                            <button onClick={handleResponsiveItemViewChange} className="responsive-double-item-view">
                                <div id="double-item-symbol-container" className="double-item-symbol-container">
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                    <div className="double-item-symbol"></div>
                                </div>
                            </button>
                        </div>
                        <button onClick={handleResponsiveFilterClick} className="responsive-filter-btn"><i class="fa-solid fa-sliders"></i> <p>{windowWidth < 500 ? 'FILTER' : 'FILTER & SORT' }</p>{activeFilterTotal ? <div className="responsive-filter-bubble">{activeFilterTotal}</div> : <></>}</button>
                        {priceFilter ? <div onClick={handlePriceFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{priceFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sortByFilter ? <div onClick={handleSortByFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{sortByFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {collectionFilter ? <div onClick={handleCollectionFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{collectionFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sizeFilter ? <div onClick={handleSizeFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{sizeFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {colorFilter ? <div onClick={handleColorFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{colorFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                    </div>
                </div>
                <div className="component-container">
                    <div className="filter-container">
                        <div className='scroll-wrapper'> 
                        <section className="shopping-dropdown-container">
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">CATEGORY
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">STYLE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            {product === 'tops' ? topsProductTypeBtns.map((btn, i) => {

                                return btn;
                            }) : bottomsProductTypeBtns.map((btn, i) => {

                                return btn;
                            })}
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">PRICE
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'low to high' ? true : false} type="radio" name="price-filter" id="low-to-high" value="low to high" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Low to High</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'high to low' ? true : false} type="radio" name="price-filter" id="high-to-low" value="high to low" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">High to Low</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">SORT BY
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'new' ? true : false} type="radio" name="sort-by" id="new" value="new" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">New</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'sale' ? true : false} type="radio" name="sort-by" id="sale" value="sale" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Sale</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">SIZE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">COLLECTION
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleCollectionFilterChange} id="DSGN Studio">DSGN Studio</button>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">COLOR<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div id="last-content" className="color-shopping-content">
                            <div  className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'black'} className="black-color-btn"></div>
                                <p>Black</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'blue'} className="blue-color-btn"></div>
                                <p>Blue</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'red'} className="red-color-btn"></div>
                                <p>Red</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'gray'} className="gray-color-btn"></div>
                                <p>Gray</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'green'} className="green-color-btn"></div>
                                <p>Green</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'orange'} className="orange-color-btn"></div>
                                <p>Orange</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'pink'} className="pink-color-btn"></div>
                                <p>Pink</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'purple'} className="purple-color-btn"></div>
                                <p>Purple</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'brown'} className="brown-color-btn"></div>
                                <p>Brown</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'white'} className="white-color-btn"></div>
                                <p>White</p>
                            </div> 
                        </div>
                    </section>
                    </div>
                    </div>
                    <main className="products-container">
                        <div id="womens-products-hero" className="products-hero-container">
                            <div className="products-hero-text-container">
                                <h1>FITNESS + FASHION = CONFIDENCE</h1>
                                <h2>CONFIDENCE LOOKS GOOD ON YOU.</h2>
                            </div>
                        </div>
                        <div id='product-feed' className="product-feed-container">
                            {
                                collectionFilter ? 
                                sortByFilter ? 
                                colorFilter ? products.filter(collectionFilterFunc).filter(sortByFunc).filter((productObj) => productObj.color === colorFilter).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} products={products} product={product} sizeFilter={sizeFilter} />
                                }) : products.filter(collectionFilterFunc).filter(sortByFunc).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} sizeFilter={sizeFilter} />
                                })
                                :
                                colorFilter ? products.filter(collectionFilterFunc).filter((productObj) => productObj.color === colorFilter).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} products={products} product={product} sizeFilter={sizeFilter} />
                                }) : products.filter(collectionFilterFunc).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} sizeFilter={sizeFilter} />
                                })
                                // make break
                                :
                                sortByFilter ? 
                                colorFilter ? products.filter(sortByFunc).filter((productObj) => productObj.color === colorFilter).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} products={products} product={product} sizeFilter={sizeFilter} />
                                }) : products.filter(sortByFunc).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} sizeFilter={sizeFilter} />
                                })
                                :
                                colorFilter ? products.filter((productObj) => productObj.color === colorFilter).map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} products={products} product={product} sizeFilter={sizeFilter} />
                                }) : products.map((product, i) => {
                                    return <ProductCard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} setWishlistPopup={setWishlistPopup} setWishlistBubble={setWishlistBubble} setWishList={setWishList} cart={cart} setCart={setCart} product={product} sizeFilter={sizeFilter} />
                                })
                            }
                        </div>
                            {
                                totalItems === 0 ? 
                                isLoading ? <></> : <p>No products found under those filters but keep checking, they're coming soon!</p> 
                                : 
                                <></>
                            }
                    </main>
                </div>
            </section>
            <div id="responsive-filter-overlay" className="responsive-filter-fixed-container">
                <div onScroll={() => {
                    const container = document.getElementById('responsive-filter-container');
                    const header = document.getElementById('responsive-filter-head');

                    if (container.scrollTop > 0) {
                        header.style.boxShadow = 'rgba(33, 35, 38, 0.2) 0px 10px 10px -10px';
                    } else {
                        header.style.boxShadow = 'none';
                    }
                    
                    // console.log(header);
                }} id="responsive-filter-container" className="responsive-filter-container">
                    <div id="responsive-filter-head" className="responsive-filter-header-container">
                        <h3>FILTER & SORT</h3>
                        <i onClick={handleResponsiveFilterClose} className="fa-solid fa-x"></i>
                        <p onClick={handleClearAllFilters} className="responsive-filter-clear">Clear All</p>
                    </div>
                    <div className="responsive-dropdown-wrapper">
                    <section className="shopping-dropdown-container">
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                CATEGORY
                                <p>{product.toUpperCase()}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">
                            <div className="responsive-filter-label-container">
                                STYLE
                                <p>{productType ? productType.toUpperCase() : 'ALL'}</p>
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            {product === 'tops' ? topsProductTypeBtns.map((btn, i) => btn) : bottomsProductTypeBtns.map((btn, i) => btn)}
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                PRICE
                                {priceFilter ? <div onClick={handlePriceFilterRemove} className="responsive-filter-heading-contatiner"><p className="filter-heading"><span>{priceFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : <></>}
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form className="filter-form" action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'low to high' ? true : false} type="radio" name="price-filter" id="low-to-high" value="low to high" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Low to High</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handlePriceFilterChange} checked={priceFilter === 'high to low' ? true : false} type="radio" name="price-filter" id="high-to-low" value="high to low" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">High to Low</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                SORT BY
                                {sortByFilter ? <div onClick={handleSortByFilterRemove} className="responsive-filter-heading-contatiner"><p className="filter-heading"><span>{sortByFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : <></>}
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div class="radio-input-wrapper">
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'new' ? true : false} type="radio" name="sort-by" id="new" value="new" class="radio-input"></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">New</div>
                                    </label>
                                    <label class="label">
                                        <input onChange={handleSortByFilterChange} checked={sortByFilter === 'sale' ? true : false} type="radio" name="sort-by" id="sale" value="sale" class="radio-input" ></input>
                                        <div class="radio-design"></div>
                                        <div class="label-text">Sale</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">
                            <div className="responsive-filter-label-container">
                                SIZE
                                {sizeFilter ? <div onClick={handleSizeFilterRemove} className="responsive-filter-heading-contatiner"><p className="filter-heading"><span>{sizeFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : <></>}
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">
                            <div className="responsive-filter-label-container">
                                COLLECTION
                                {collectionFilter ? <div onClick={handleCollectionFilterRemove} className="responsive-filter-heading-contatiner"><p className="filter-heading"><span>{collectionFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : <></>}
                            </div>
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleCollectionFilterChange} id="DSGN Studio">DSGN Studio</button>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">
                            <div className="responsive-filter-label-container">
                                COLOR
                                {colorFilter ? <div onClick={handleColorFilterRemove} className="responsive-filter-heading-contatiner"><p className="filter-heading"><span>{colorFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : <></>}
                            </div>
                        
                        <div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div id="last-content" className="color-shopping-content">
                            <div  className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'black'} className="black-color-btn"></div>
                                <p>Black</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'blue'} className="blue-color-btn"></div>
                                <p>Blue</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'red'} className="red-color-btn"></div>
                                <p>Red</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'gray'} className="gray-color-btn"></div>
                                <p>Gray</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'green'} className="green-color-btn"></div>
                                <p>Green</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'orange'} className="orange-color-btn"></div>
                                <p>Orange</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'pink'} className="pink-color-btn"></div>
                                <p>Pink</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'purple'} className="purple-color-btn"></div>
                                <p>Purple</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'brown'} className="brown-color-btn"></div>
                                <p>Brown</p>
                            </div>
                            <div className="color-bubble-container">
                                <div onClick={handleColorFilterChange} id={'white'} className="white-color-btn"></div>
                                <p>White</p>
                            </div>
                        </div>
                    </section>
                    </div>
                    <div id="responsive-filter-footer" className="responsive-filter-footer-container">
                        {totalItems > 0 ? <button onClick={handleSeeProducts}>
                            SEE PRODUCTS ({totalItems})
                        </button> : <button disabled onClick={handleSeeProducts}>
                            SEE PRODUCTS ({totalItems})
                        </button>}
                    </div>
                </div>
            </div>
            </>
        )
    }
}