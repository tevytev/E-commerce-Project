import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QuickCartItem.css'
import { memImageObj } from '../../../assets/menProductImagesObj';
import { womenImageObj } from '../../../assets/womenProductImagesObj';
import axios from '../../../api/axios';
const CART_URL = '/api/cart/';
const WISHLIST_URL = '/api/wishlist/';

export default function QuickCartItem(props) {

    const { 
        itemObj, 
        setDiscount, 
        setSubtotal, 
        subtotal, 
        quickCartItems, 
        setTotal, 
        setQuickCartItems, 
        cart, 
        setCart, 
        setWishlistBubble,
        setWishList,
        handleCartClose
    } = props;

    const [itemQuantity, setItemQuantity] = useState(itemObj.quantity);
    const [prevItemQuantity, setPrevItemQuantity] = useState(null);
    const [itemPrice, setItemPrice] = useState(itemObj.price / itemObj.quantity);
    const [totalPrice, setTotalPrice] = useState(itemPrice * itemQuantity);
    const [salePrice, setSalePrice] = useState(itemObj.salePrice ? itemObj.salePrice / itemObj.quantity : null);
    const [totalDiscount, setTotalDiscount] = useState(salePrice * itemQuantity);
    const [itemSize, setItemSize] = useState(itemObj.size);
    const [productId, setProductId] = useState(itemObj.productId);
    const [stockId, setStockId] = useState(itemObj.stockId);
    const [newProduct, setNewProduct] = useState(false);
    const [saleProduct, setSaleProduct] = useState(false);
    const [sizeToDisplay, setSizeToDisplay] = useState('');
    const [wishedFor, setWishedFor] = useState(null);

    useEffect(() => {
        switch (itemSize) {
            case 'extraSmall':
                setSizeToDisplay('Extra Small');
                break;
            case 'small':
                setSizeToDisplay('Small');
                break;
            case 'medium':
                setSizeToDisplay('Medium');
                break;
            case 'large':
                setSizeToDisplay('Large');
                break;
            case 'extraLarge':
                setSizeToDisplay('Extra Large');
                break;
        }
    }, [itemSize]);
    
    useEffect(() => {

        setItemQuantity(itemObj.quantity);
        setPrevItemQuantity(null);
        setStockId(itemObj.stockId);
        setItemSize(itemObj.size);
        setProductId(itemObj.productId);
        setSalePrice(itemObj.salePrice ? itemObj.salePrice / itemObj.quantity : null);
        setItemPrice(itemObj.price / itemObj.quantity);
        if (itemObj.salePrice) {
            setSaleProduct(true);
        } else {
            setSaleProduct(false);
        }
        if (itemObj.new === true) {
            setNewProduct(true);
        } else {
            setNewProduct(false);
        }

        

        return () => {

        }
    }, [quickCartItems, itemObj, productId, stockId]);

    useEffect(() => {

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
    }, [productId])

    useEffect(() => {

        if (prevItemQuantity) {
            if (salePrice) {
                const subtotalDifference = itemPrice * prevItemQuantity;
                const discountDifference = (itemPrice * prevItemQuantity) - (salePrice * prevItemQuantity);
                const totalDifference = salePrice * prevItemQuantity;
                const discountToAdd = (totalPrice - totalDiscount);

                setSubtotal(prev => prev - subtotalDifference);
                setSubtotal(prev => prev + itemPrice * itemQuantity);

                setDiscount(prev => prev - discountDifference);
                setDiscount(prev => prev + discountToAdd);

                setTotal(prev => prev - totalDifference);
                setTotal(prev => prev + salePrice * itemQuantity);

                // setDiscount(totalPrice - totalDiscount);
                // setDiscount(prev => prev + (totalPrice - totalDiscount));
                console.log(`totalPrice: ${totalPrice}`);
                console.log(`totalDiscount: ${totalDiscount}`);
                console.log(`itemPrice: ${itemPrice}`);
                console.log(`salePrice: ${salePrice}`);
            } else {
                const difference = itemPrice * prevItemQuantity;
                
                setSubtotal(prev => prev - difference);
                setSubtotal(prev => prev + itemPrice * itemQuantity);

                setTotal(prev => prev - difference);
                setTotal(prev => prev + itemPrice * itemQuantity);
            }

        }
        
  
        return () => {
          
        }
    }, [itemQuantity]);    
    
    const handleUpdateQuantity = async (e) => {

        setPrevItemQuantity(itemQuantity);
            setItemQuantity((prev) => {
                setTotalPrice(e.target.value * itemPrice);
                setTotalDiscount(e.target.value * salePrice);
                return e.target.value;
            });
        
        if (itemQuantity) {
            
            const requestBody = {
                productId: productId,
                quantity: e.target.value,
                size: itemSize
            }
    
                try {
                    const response = await axios.post(`api/cart/update/quantity`,
                        JSON.stringify(requestBody),
                        {
                          headers: { 
                              "Content-Type": "application/json" 
                          },
                          withCredentials: true
                      });
        
                      if (response.status === 200) {
                        console.log(response.data);
                      }
    
                } catch (error) {
                    if (error?.response?.status === 401) alert('please sign in')
                    console.log(error)
                }
        }

    }

    const handleItemTrash = async () => {

        const cartItem = document.getElementById(stockId);

        const animate = () => {
            cartItem.style.transform = 'translateX(200px)';
            cartItem.style.opacity = 0;
            setTimeout(() => {
                cartItem.style.display = 'none';
            }, 800);
        };

        try {
            const response = await axios.delete(`api/cart/${productId}?size=${itemSize}`,
                {
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    withCredentials: true
                });

                if (response.status === 200) {
                console.log(response.data);
                animate();
                // setSubtotal(prev => prev - totalPrice);
                }

                setTimeout(() => {
                    (async () => {
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
                            }
                        } catch (error) {
                            console.log(error);
                        }

                        setQuickCartItems((prev) => {
                            return prev.filter((obj) => {
                            obj.size !== itemSize  && obj.productId !== productId;
                        });
                    });
                    })();
                    }, 1000);

        } catch (error) {
            // if (error?.response?.status === 401) alert('please sign in');
            console.log(error);
        }
    }

    const handleAddToWishList = async (e) => {

        e.stopPropagation();
        
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
                console.log(response);
              }
        } catch (error) {
            console.log(error)
        }
    };

    const handleRemoveFromWishlist = async (e) => {

        e.stopPropagation();
        
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
            console.log(error)
        }
    };
    
    useEffect(() => {

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

    }, [cart]);



    if (salePrice) {
        return (
            <>
            <div id={stockId} className="item-container ">
                <Link onClick={handleCartClose} to={`/${itemObj.gender}/products/${productId}`}><div className="cart-item-img-container"> <img src={itemObj.gender === 'men' ? memImageObj[itemObj.productId][0] : womenImageObj[itemObj.productId][0]} alt="" /></div></Link>
                <div className="cart-item-info-container">
                    <div className="item-info-top">
                        <div className="highlight-info font-bold">SALE <i class="fa-solid fa-fire text-red-500"></i></div>
                        <Link onClick={handleCartClose} to={`/${itemObj.gender}/products/${productId}`}><p>{itemObj.productName.toUpperCase()}</p></Link>
                        <p>Size: {sizeToDisplay}</p>
                        <div className='flex gap-2'><p className="font-bold text-black">${salePrice}</p><p className="text-red-600 line-through">${itemPrice}</p></div>
                    </div>
                    <div className="item-info-bottom">
                        <div className="btn-section">
                            {
                            wishedFor ? <button onClick={handleRemoveFromWishlist} >{wishedFor ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button> 
                            : <button onClick={handleAddToWishList}>{wishedFor ? <i className="fa-regular fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button>
                            }
                        <button onClick={handleItemTrash}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div className="quantity-section">
                        <label className="font-bold" htmlFor={`${stockId}-quantity`}>QTY:</label>
                        <select onChange={handleUpdateQuantity} value={itemQuantity} name="quantity" id={`${stockId}-quantity`}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div id={stockId} className="item-container">
                <Link onClick={handleCartClose} to={`/${itemObj.gender}/products/${productId}`}><div className="cart-item-img-container"> <img src={itemObj.gender === 'men' ? memImageObj[itemObj.productId][0] : womenImageObj[itemObj.productId][0] } alt="" /></div></Link>
                <div className="cart-item-info-container">
                    <div className="item-info-top">
                        {newProduct ? <div className="highlight-info font-bold">NEW</div> : <></>}
                        <Link onClick={handleCartClose} to={`/${itemObj.gender}/products/${productId}`}><p>{itemObj.productName.toUpperCase()}</p></Link>
                        <p>Size: {sizeToDisplay}</p>
                        <p className="font-bold">${itemPrice}</p>
                    </div>
                    <div className="item-info-bottom">
                        <div className="btn-section">
                            {
                            wishedFor ? <button onClick={handleRemoveFromWishlist} >{wishedFor ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button> 
                            : <button onClick={handleAddToWishList} >{wishedFor ? <i className="fa-regular fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button>
                            }
                        <button onClick={handleItemTrash}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                        <div className="quantity-section">
                        <label className="font-bold" htmlFor={`${stockId}-quantity`}>QTY:</label>
                        <select onChange={handleUpdateQuantity} value={itemQuantity} name="quantity" id={`${stockId}-quantity`}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

}