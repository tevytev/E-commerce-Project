import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import ProductCard from "../../../components/ProductCard/ProductCard";
import RevolvingHeader from "../../../components/RevolvingHeader/RevolvingHeader";
import "../ShoppingStyles/shoppingStyles.css";
import './wishlist.css';

export default function WishList(props) {

    const { wishList, setWishList, setCart, setWishlistBubble } = props;

    const [product, setProduct] = useState('all');
    const [productType, setProductType] = useState(null);
    const [products, setProducts] = useState([]);
    const [priceFilter, setPriceFilter] = useState(null);
    const [colorFilter, setColorFilter] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);
    const [totalItems, setTotalItems] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(null);

    const [userScrollY, setUserScrollY] = useState(window.scrollY);

    const handleSizeFilterChange = (e) => {
        setSizeFilter(e.target.id);
    };

    const handleSizeFilterRemove = () => {
        setSizeFilter(null);
    }

    const handleChangeGenderFilter = (e) => {
        setGenderFilter(e.target.id);
    };

    const handleGenderFilterRemove = () => {
        setGenderFilter(null);
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

    const changeProductType = (e) => {
        if (e.target.id === 'all') {
            return setProductType(null);
        }
        setProductType(e.target.id);
    };

    const handlePriceFilterRemove = () => {
        setPriceFilter(null);
        document.getElementById('low-to-high').checked = false;
        document.getElementById('high-to-low').checked = false;
    };
    
    const changeProduct = async (e) => {
        setProductType(null);
        if (product === e.target.id) {
            if (product === 'all') {
                if (genderFilter) {
                    if (priceFilter) {
        
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                    } else {
                        (async () => {
                        try {
                            const response = await axios.get(`api/wishlist/?gender=${genderFilter}`,
                                {
                                    headers: { 
                                        "Content-Type": "application/json" 
                                    },
                                    withCredentials: true
                                });
            
                                if (response.status === 200) {
                                window.scrollTo(0, 0);
                                return setProducts(response.data.products);
                                }
                        } catch (error) {
                            if (error?.response?.status === 404) {
                                return setProducts([]);
                            }
                            console.log(error)
                        }
            
                    })();
                    }
                } else {
                    if (priceFilter) {
        
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/?priceFilter=${priceFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                    } else {
                        (async () => {
                        try {
                            const response = await axios.get(`api/wishlist/`,
                                {
                                    headers: { 
                                        "Content-Type": "application/json" 
                                    },
                                    withCredentials: true
                                });
            
                                if (response.status === 200) {
                                window.scrollTo(0, 0);
                                return setProducts(response.data.products);
                                }
                        } catch (error) {
                            if (error?.response?.status === 404) {
                                return setProducts([]);
                            }
                            console.log(error)
                        }
            
                    })();
                    }
                }
            }

            if (genderFilter) {
                if (priceFilter) {
                    try {
                        const response = await axios.get(`api/wishlist/clothingType/${product}?gender=${genderFilter}&priceFilter=${priceFilter}`,
                            {
                              headers: { 
                                  "Content-Type": "application/json"
                              },
                              withCredentials: true
                          });
        
                          if (response) {
                            window.scrollTo(0, 0);
                            return setProducts(response.data.products);
                          }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                    const response = await axios.get(`api/wishlist/clothingType/${product}?gender=${genderFilter}`,
                        {
                          headers: { 
                              "Content-Type": "application/json" 
                          },
                          withCredentials: true
                      });
    
                      if (response) {
                        window.scrollTo(0, 0);
                        return setProducts(response.data.products);
                      }
                } catch (error) {
                    console.log(error)
                }
                }
            } else {
                if (priceFilter) {
                    try {
                        const response = await axios.get(`api/wishlist/clothingType/${product}?priceFilter=${priceFilter}`,
                            {
                              headers: { 
                                  "Content-Type": "application/json"
                              },
                              withCredentials: true
                          });
        
                          if (response.status === 200) {
                            window.scrollTo(0, 0);
                            return setProducts(response.data.products);
                          }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    try {
                    const response = await axios.get(`api/wishlist/clothingType/${product}`,
                        {
                          headers: { 
                              "Content-Type": "application/json" 
                          },
                          withCredentials: true
                      });
    
                      if (response.status === 200) {
                        window.scrollTo(0, 0);
                        return setProducts(response.data.products);
                      }
                } catch (error) {
                    console.log(error)
                }
                }
            }
        } else {
            setProduct(e.target.id);
        }
    };

    // Men tops product types buttons
    const menTopsProductTypeBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="t-shirts">T-shirts</button>, <button onClick={changeProductType} id="long sleeves">Long Sleeve</button>, <button onClick={changeProductType} id="hoodies">Hoodies</button>];
    // Men bottoms product types buttons
    const menBottomsProductTypeBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="shorts">Shorts</button>, <button onClick={changeProductType} id="pants">Pants</button>, <button onClick={changeProductType} id="sweatpants">Sweatpants</button>];

    // Women tops product types buttons
    const womenTopsProductTypeBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="sports bras">Sports bras</button>, <button onClick={changeProductType} id="t-shirts">T-shirts</button>, <button onClick={changeProductType} id="long sleeves">Long sleeves</button>, <button onClick={changeProductType} id="hoodies">Hoodies</button>];
    // Women bottoms product types buttons
    const womenBottomsProductTypeBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="leggings">Leggings</button>, <button onClick={changeProductType} id="shorts">Shorts</button>, <button onClick={changeProductType} id="sweatpants">Sweatpants</button>];
    
    // All gender tops product types buttons
    const allTopsProductTypesBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="t-shirts">T-shirts</button>, <button onClick={changeProductType} id="long sleeves">Long Sleeve</button>, <button onClick={changeProductType} id="sports bras">Sports bras</button>, <button onClick={changeProductType} id="hoodies">Hoodies</button>];
    // All gender bottoms product types buttons
    const allBottomsProductTypesBtns = [<button onClick={changeProductType} id="all">All</button>, <button onClick={changeProductType} id="leggings">Leggings</button>, <button onClick={changeProductType} id="shorts">Shorts</button>, <button onClick={changeProductType} id="pants">Pants</button>, <button onClick={changeProductType} id="sweatpants">Sweatpants</button>];

    const allTopsAndBottomsProductTypeBtns = [
    <button onClick={changeProductType} id="all">All</button>, 
    <button onClick={changeProductType} id="t-shirts">T-shirts</button>, 
    <button onClick={changeProductType} id="long sleeves">Long Sleeve</button>, 
    <button onClick={changeProductType} id="sports bras">Sports bras</button>, 
    <button onClick={changeProductType} id="hoodies">Hoodies</button>,
    <button onClick={changeProductType} id="leggings">Leggings</button>, 
    <button onClick={changeProductType} id="shorts">Shorts</button>, 
    <button onClick={changeProductType} id="pants">Pants</button>, 
    <button onClick={changeProductType} id="sweatpants">Sweatpants</button>
]

    const allWomenTopsAndBottomsProductTypeBtns = [
    <button onClick={changeProductType} id="all">All</button>, 
    <button onClick={changeProductType} id="t-shirts">T-shirts</button>, 
    <button onClick={changeProductType} id="long sleeves">Long Sleeve</button>, 
    <button onClick={changeProductType} id="sports bras">Sports bras</button>, 
    <button onClick={changeProductType} id="hoodies">Hoodies</button>,
    <button onClick={changeProductType} id="leggings">Leggings</button>, 
    <button onClick={changeProductType} id="shorts">Shorts</button>, 
    <button onClick={changeProductType} id="sweatpants">Sweatpants</button>
]

    const allMenTopsAndBottomsProductTypeBtns = [
    <button onClick={changeProductType} id="all">All</button>, 
    <button onClick={changeProductType} id="t-shirts">T-shirts</button>, 
    <button onClick={changeProductType} id="long sleeves">Long Sleeve</button>, 
    <button onClick={changeProductType} id="hoodies">Hoodies</button>,
    <button onClick={changeProductType} id="shorts">Shorts</button>, 
    <button onClick={changeProductType} id="pants">Pants</button>, 
    <button onClick={changeProductType} id="sweatpants">Sweatpants</button>
]


    const onCollapseClick = (e) => {
        const lastContent = document.getElementById('last-content');
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        const arrow = e.target.children[0].firstChild

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

    window.addEventListener("scroll", (e) => {
        setUserScrollY(window.scrollY);
    });

    useEffect(() => {
        setWishlistBubble(false);
    }, [])

    useEffect(() => {
        const filterHead = document.getElementById('filter-head');

        if (userScrollY > 50) {
            filterHead.style.boxShadow =  "rgba(33, 35, 38, 0.1) 0px 12px 12px -10px";
        } else {
            filterHead.style.boxShadow =  "none";
        }
    }, [userScrollY]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (productType) {
                return;
            } else {
                if (genderFilter === null) {
                   if (product === 'all') {

                        if (priceFilter) {
        
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/?priceFilter=${priceFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        } else {
                            (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/`,
                                    {
                                        headers: { 
                                            "Content-Type": "application/json" 
                                        },
                                        withCredentials: true
                                    });
                
                                    if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                    }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                        }
                   } else if (product === 'tops') {
                        if (priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops?priceFilter=${priceFilter}`,
                                        {
                                          headers: {
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error);
                                }
                    
                            })();
                        } else if (!priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        }
        
                    } else if (product === 'bottoms') {
                        if (priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/bottoms?priceFilter=${priceFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error);
                                }
                    
                            })();
                        } else if (!priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/bottoms`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        }
                    }
                } else {
                    if (product === 'all') {

                        if (priceFilter) {
        
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        } else {
                            (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/?gender=${genderFilter}`,
                                    {
                                        headers: { 
                                            "Content-Type": "application/json" 
                                        },
                                        withCredentials: true
                                    });
                
                                    if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                    }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                        }
                   } else if (product === 'tops') {
                        if (priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                        {
                                          headers: {
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error);
                                }
                    
                            })();
                        } else if (!priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops?gender=${genderFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        }
        
                    } else if (product === 'bottoms') {
                        if (priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error);
                                }
                    
                            })();
                        } else if (!priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        }
                    } 
                }
            }
            }

        return () => {
            mounted = false
        }
    }, [product, priceFilter, colorFilter, genderFilter, productType]);


    useEffect(() => {
        let mounted = true;
        if (!productType || productType === 'all') {
            return;
        } else {

            if (productType === 'sports bras') {
                if (genderFilter === 'men') {
                    setProductType(null);
                        if (priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                        {
                                          headers: {
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error);
                                }
                    
                            })();
                        } else if (!priceFilter) {
                            (async () => {
                                try {
                                    const response = await axios.get(`api/wishlist/clothingType/tops?gender=${genderFilter}`,
                                        {
                                          headers: { 
                                              "Content-Type": "application/json" 
                                          },
                                          withCredentials: true
                                      });
                    
                                      if (response.status === 200) {
                                        window.scrollTo(0, 0);
                                        return setProducts(response.data.products);
                                      }
                                } catch (error) {
                                    if (error?.response?.status === 404) {
                                        return setProducts([]);
                                    }
                                    console.log(error)
                                }
                    
                            })();
                        }
                }
            }

            if (productType === 'leggings') {
                if (genderFilter === 'men') {
                    setProductType(null);
                    if (priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                    }
                }
            }

            if (productType === 'pants') {
                if (genderFilter === 'women') {
                    setProductType(null);
                    if (priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}&priceFilter=${priceFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error);
                            }
                
                        })();
                    } else if (!priceFilter) {
                        (async () => {
                            try {
                                const response = await axios.get(`api/wishlist/clothingType/bottoms?gender=${genderFilter}`,
                                    {
                                      headers: { 
                                          "Content-Type": "application/json" 
                                      },
                                      withCredentials: true
                                  });
                
                                  if (response.status === 200) {
                                    window.scrollTo(0, 0);
                                    return setProducts(response.data.products);
                                  }
                            } catch (error) {
                                if (error?.response?.status === 404) {
                                    return setProducts([]);
                                }
                                console.log(error)
                            }
                
                        })();
                    }
                }
            }

            if (mounted) {

            if (genderFilter === null) {

                if (priceFilter) {

                    (async () => {
                        try {
                            const response = await axios.get(`api/wishlist/?&category=${productType}&priceFilter=${priceFilter}`,
                                {
                                  headers: { 
                                      "Content-Type": "application/json" 
                                  },
                                  withCredentials: true
                              });
            
                              if (response.status === 200) {
                                window.scrollTo(0, 0);
                                return setProducts(response.data.products);
                              }
                        } catch (error) {
                            if (error?.response?.status === 404) {
                                return setProducts([]);
                            }
                            console.log(error)
                        }
            
                    })();
                } else {
                    (async () => {
                    try {
                        const response = await axios.get(`api/wishlist/?category=${productType}`,
                            {
                                headers: { 
                                    "Content-Type": "application/json" 
                                },
                                withCredentials: true
                            });
        
                            if (response.status === 200) {
                            window.scrollTo(0, 0);
                            return setProducts(response.data.products);
                            }
                    } catch (error) {
                        if (error?.response?.status === 404) {
                            return setProducts([]);
                        }
                        console.log(error)
                    }
        
                })();
                }
            } else {
                if (priceFilter) {

                    (async () => {
                        try {
                            const response = await axios.get(`api/wishlist/?gender=${genderFilter}&category=${productType}&priceFilter=${priceFilter}`,
                                {
                                  headers: { 
                                      "Content-Type": "application/json" 
                                  },
                                  withCredentials: true
                              });
            
                              if (response.status === 200) {
                                window.scrollTo(0, 0);
                                return setProducts(response.data.products);
                              }
                        } catch (error) {
                            if (error?.response?.status === 404) {
                                return setProducts([]);
                            }
                            console.log(error)
                        }
            
                    })();
                } else {
                    (async () => {
                    try {
                        const response = await axios.get(`api/wishlist/?gender=${genderFilter}&category=${productType}`,
                            {
                                headers: { 
                                    "Content-Type": "application/json" 
                                },
                                withCredentials: true
                            });
        
                            if (response.status === 200) {
                            window.scrollTo(0, 0);
                            return setProducts(response.data.products);
                            }
                    } catch (error) {
                        if (error?.response?.status === 404) {
                            return setProducts([]);
                        }
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
    }, [productType, priceFilter, colorFilter, genderFilter]);

    useEffect(() => {
        setTotalItems(document.getElementById('product-feed').children.length);
    }, [productType, priceFilter, colorFilter, products]);
    
    if (products.length === 0) {

        return (
            <section className="shopping-section-container">
                <RevolvingHeader />
                <div id="filter-head" className="filter-header-container">
                    <div className="product-heading-container">
                        <h2 className="font-semibold text-sm">YOUR WISHLIST</h2>
                        <div className="product-heading-bottom">
                            <h3>{product.toUpperCase()}{productType === null ? <></> : product === 'all' ? ` ${productType.toUpperCase()}` : ` & ${productType.toUpperCase()}`}</h3>
                            {products ? <p>({totalItems} products)</p> : <></>}
                            
                        </div>
                    </div>
                    <div className="active-filter-container">
                        {priceFilter ? <div onClick={handlePriceFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{priceFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sizeFilter ? <div onClick={handleSizeFilterChange} className="filter-heading-contatiner"><p className="filter-heading"><span>{sizeFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {colorFilter ? <div onClick={handleColorFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{colorFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {genderFilter ? <div onClick={handleGenderFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{genderFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
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
                            <button onClick={changeProduct} id="all">All</button>
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">STYLE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">

                            {
                            genderFilter === null ? 
                                product === 'all' ? allTopsAndBottomsProductTypeBtns.map(btn => btn) 
                                    : product === 'tops' ? allTopsProductTypesBtns.map(btn => btn) 
                                        : allBottomsProductTypesBtns.map(btn => btn)
                                : genderFilter === 'men' ? product === 'all' ? allMenTopsAndBottomsProductTypeBtns.map(btn => btn) : product === 'tops' ? menTopsProductTypeBtns.map(btn => btn) : menBottomsProductTypeBtns.map(btn => btn)
                                    : product === 'all' ? allWomenTopsAndBottomsProductTypeBtns.map(btn => btn) : product === 'tops' ? womenTopsProductTypeBtns.map(btn => btn) : womenBottomsProductTypeBtns.map(btn => btn)
                            }

                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">GENDER<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleChangeGenderFilter} id="men">Men</button>
                            <button onClick={handleChangeGenderFilter} id="women">Women</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">PRICE
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="low-to-high" value="low to high" />
                                    <label for="low-to-high">Low to High</label>
                                </div>
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="high-to-low" value="high to low" />
                                    <label for="high-to-low">High to Low</label>
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
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="low-to-high" value="low to high" />
                                    <label for="low-to-high">New</label>
                                </div>
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="high-to-low" value="high to low" />
                                    <label for="high-to-low">On sale</label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">SIZE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div></button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">COLOR<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div></button>
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
                        <div id='product-feed' className="product-feed-container">
                            
                        </div>
                        <div className="product-feed-container-empty">
                            <div className="wishlist-empty-container">
                                <h3>No products to show..<br />✨ time to make  more wishes! ✨</h3>
                                <Link to={'/men/products'} className="empty-wishlist-btn">SHOP MEN</Link>
                                <Link to={'/women/products'} className="empty-wishlist-btn">SHOP WOMEN</Link>
                            </div>
                            
                        </div>
                    </main>
                </div>
            </section>
        )

    }

    return (
        <>
        <section className="shopping-section-container">
            <RevolvingHeader />
                <div id="filter-head" className="filter-header-container">
                    <div className="product-heading-container">
                        <h2 className="font-semibold text-sm">YOUR WISHLIST</h2>
                        <div className="product-heading-bottom">
                            <h3>{product.toUpperCase()}{productType === null ? <></> : product === 'all' ? ` ${productType.toUpperCase()}` : ` & ${productType.toUpperCase()}`}</h3>
                            {products ? <p>({totalItems} products)</p> : <></>}
                            
                        </div>
                    </div>
                    <div className="active-filter-container">
                        {priceFilter ? <div onClick={handlePriceFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{priceFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {sizeFilter ? <div onClick={handleSizeFilterChange} className="filter-heading-contatiner"><p className="filter-heading"><span>{sizeFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {colorFilter ? <div onClick={handleColorFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{colorFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
                        {genderFilter ? <div onClick={handleGenderFilterRemove} className="filter-heading-contatiner"><p className="filter-heading"><span>{genderFilter.toUpperCase()}</span></p><i className="fa-solid fa-x"></i></div> : null}
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
                            <button onClick={changeProduct} id="all">All</button>
                            <button onClick={changeProduct} id="tops">Tops</button>
                            <button onClick={changeProduct} id="bottoms">Bottoms</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">STYLE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">

                            {
                            genderFilter === null ? 
                                product === 'all' ? allTopsAndBottomsProductTypeBtns.map(btn => btn) 
                                    : product === 'tops' ? allTopsProductTypesBtns.map(btn => btn) 
                                        : allBottomsProductTypesBtns.map(btn => btn)
                                : genderFilter === 'men' ? product === 'all' ? allMenTopsAndBottomsProductTypeBtns.map(btn => btn) : product === 'tops' ? menTopsProductTypeBtns.map(btn => btn) : menBottomsProductTypeBtns.map(btn => btn)
                                    : product === 'all' ? allWomenTopsAndBottomsProductTypeBtns.map(btn => btn) : product === 'tops' ? womenTopsProductTypeBtns.map(btn => btn) : womenBottomsProductTypeBtns.map(btn => btn)
                            }

                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">GENDER<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div>
                        </button>
                        <div className="shopping-content">
                            <button onClick={handleChangeGenderFilter} id="men">Men</button>
                            <button onClick={handleChangeGenderFilter} id="women">Women</button>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible first-coll font-bold">PRICE
                            <div className="plus-minus-container">
                                <div className="thick-arrow-down"></div>
                            </div>
                        </button>
                        <div className="shopping-content">
                            <form action="">
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="low-to-high" value="low to high" />
                                    <label for="low-to-high">Low to High</label>
                                </div>
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="high-to-low" value="high to low" />
                                    <label for="high-to-low">High to Low</label>
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
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="low-to-high" value="low to high" />
                                    <label for="low-to-high">New</label>
                                </div>
                                <div className="price-radio-wrapper">
                                    <input onChange={handlePriceFilterChange} type="radio" name="price-filter" id="high-to-low" value="high to low" />
                                    <label for="high-to-low">On sale</label>
                                </div>
                            </form>
                        </div>
                        <button onClick={onCollapseClick} className="shopping-collapsible font-bold">SIZE<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div></button>
                        <div className="shopping-content">
                            <div className="filter-size-container">
                                <button onClick={handleSizeFilterChange} id="extra small">XS</button>
                                <button onClick={handleSizeFilterChange} id="small">S</button>
                                <button onClick={handleSizeFilterChange} id="medium">M</button>
                                <button onClick={handleSizeFilterChange} id="large">L</button>
                                <button onClick={handleSizeFilterChange} id="extra large">XL</button>
                            </div>
                        </div>
                        <button id="last-coll" onClick={onCollapseClick} className="shopping-collapsible last-coll font-bold">COLOR<div className="plus-minus-container">
                            <div className="thick-arrow-down"></div>
                        </div></button>
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
                        <div id='product-feed' className="product-feed-container">
                            {colorFilter ? products.filter((productArr) => productArr.color === colorFilter).map((product, i) => {
                                return <ProductCard setCart={setCart} wishList={wishList} setWishList={setWishList} key={i} product={product} />
                            }) : products.map((product, i) => {
                                return <ProductCard setWishlistBubble={setWishlistBubble} setCart={setCart} wishList={wishList} setWishList={setWishList} key={i} product={product} />
                            })}
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}