// importing modules
const { db, CartStocks } = require('../Models');
const Op = require('sequelize').Op;
const User = db.users;
const Product = db.products;
const Cart = db.carts;
const Order = db.orders;
const Stock = db.stock;

const getCart = async (req, res) => {

    const oAuthProvidedId = req.session.passport.user.providedId;

    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    if (userId) {
        const cart = await Cart.findOne({
        where: { userId: userId },
        include: Stock
    });

        if (cart) {
            return res.status(200).send(cart);
        } else {
            return res.status(404).send('user cart not found')
        }

    } else if (oAuthProvidedId) {

        const cart = await Cart.findOne({
            where: { OAuth2UserProvidedId: oAuthProvidedId },
            include: Stock
        });
    
        if (cart) {
            return res.status(200).send(cart);
        } else {
            return res.status(404).send('user cart not found')
        }
    }
    
};

const insertIntoCartStocks = async (req, res) => {

    const oAuthProvidedId = req.session.passport.user.providedId;

    let userId = req.session.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.params.productId;
    const productQuantity = req.body.quantity;
    const productSize = req.body.size;
    
    if (userId) {
        try {
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        const product = await Product.findOne({
            where: {
                id: productId
            }
        });

        const productStock = await Stock.findOne({
            where: {
                productId: productId,
                productSize: productSize
            }
        });

        if (cart && product) {


            // check if user is adding a repeat product to cart, incrementing the quantity
            const repeatProductCheck = await cart.hasStock(productStock);
            if (repeatProductCheck) {

                const repeatedItemWithSize = await CartStocks.findOne({
                    where: {
                        stockId: productStock.id,
                        size: productSize
                    }
                });

                if (repeatedItemWithSize) {
                    await repeatedItemWithSize.update({
                        quantity: Number(repeatedItemWithSize.quantity) + Number(productQuantity),
                        price: Number(repeatedItemWithSize.price) + Number((product.price * productQuantity))
                    });

                    const newCart = await Cart.findOne({
                        where: {
                            userId: userId
                        },
                        include: Stock
                    });
    
                    return res.status(201).send(newCart);

                } else {
                    await CartStocks.create({
                        productName: product.name,
                        price: product.price,
                        salePrice: product.salePrice ? product.salePrice : null,
                        quantity: productQuantity,
                        size: productSize,
                        gender: product.gender,
                        cartId: cart.id,
                        stockId: productStock.id,
                        new: product.new
                    });
                    // await cart.addProduct(product, { quantity: productQuantity, size: productSize });
                    const newCart = await Cart.findOne({
                        where: {
                            userId: userId
                        },
                        include: Stock
                    });
    
                    return res.status(201).send(newCart);

                }
            // if user is adding a new product to cart then only add item with quantity of one
            } else {
                await cart.addStock(productStock, { through: { 
                    productName: product.name, 
                    price: (product.price * productQuantity), 
                    salePrice: product.salePrice !== null ? (product.salePrice * productQuantity) : null,
                    quantity: productQuantity, 
                    size: productSize, 
                    gender: product.gender,
                    new: product.new
                } });
                
                const newCart = await Cart.findOne({
                    where: {
                        userId: userId
                    },
                    include: Stock
                });

                return res.status(201).send(newCart);
            }
        } else {
            res.status(400);
        }

    } catch (error) {
        console.log(error);
    }
    } else if (oAuthProvidedId) {
        try {
            const cart = await Cart.findOne({
                where: {
                    OAuth2UserProvidedId: oAuthProvidedId
                }
            });
    
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
    
            const productStock = await Stock.findOne({
                where: {
                    productId: productId,
                    productSize: productSize
                }
            });
    
            if (cart && product) {
    
    
                // check if user is adding a repeat product to cart, incrementing the quantity
                const repeatProductCheck = await cart.hasStock(productStock);
                if (repeatProductCheck) {
    
                    const repeatedItemWithSize = await CartStocks.findOne({
                        where: {
                            stockId: productStock.id,
                            size: productSize
                        }
                    });
    
                    if (repeatedItemWithSize) {
                        await repeatedItemWithSize.update({
                            quantity: Number(repeatedItemWithSize.quantity) + Number(productQuantity),
                            price: Number(repeatedItemWithSize.price) + Number((product.price * productQuantity))
                        });
    
                        const newCart = await Cart.findOne({
                            where: {
                                OAuth2UserProvidedId: oAuthProvidedId
                            },
                            include: Stock
                        });
        
                        return res.status(201).send(newCart);
    
                    } else {
                        await CartStocks.create({
                            productName: product.name,
                            price: product.price,
                            salePrice: product.salePrice ? product.salePrice : null,
                            quantity: productQuantity,
                            size: productSize,
                            gender: product.gender,
                            cartId: cart.id,
                            stockId: productStock.id,
                            new: product.new
                        });
                        // await cart.addProduct(product, { quantity: productQuantity, size: productSize });
                        const newCart = await Cart.findOne({
                            where: {
                                OAuth2UserProvidedId: oAuthProvidedId
                            },
                            include: Stock
                        });
        
                        return res.status(201).send(newCart);
    
                    }
                // if user is adding a new product to cart then only add item with quantity of one
                } else {
                    await cart.addStock(productStock, { through: { 
                        productName: product.name, 
                        price: (product.price * productQuantity), 
                        salePrice: product.salePrice !== null ? (product.salePrice * productQuantity) : null,
                        quantity: productQuantity, 
                        size: productSize, 
                        gender: product.gender,
                        new: product.new
                    } });
                    
                    const newCart = await Cart.findOne({
                        where: {
                            OAuth2UserProvidedId: oAuthProvidedId
                        },
                        include: Stock
                    });
    
                    return res.status(201).send(newCart);
                }
            } else {
                res.status(400);
            }
    
        } catch (error) {
            console.log(error);
        }
    }
    

};

const updateCartQuantity = async (req, res) => {

    const oAuthProvidedId = req.session.passport.user.providedId;

    const userId = req.session.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.body.productId;
    const newProductQuantity = req.body.quantity;
    const productSize = req.body.size;

    if (userId) {
        try {
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        const product = await Product.findOne({
            where: {
                id: productId
            }
        });

        const productStock = await Stock.findOne({
            where: {
                productId: productId,
                productSize: productSize
            }
        });

        if (productStock) {

            const cartStock = await CartStocks.findOne({
                where: {
                    stockId: productStock.id,
                    size: productSize
                }
            });

            await cartStock.update({
                quantity: newProductQuantity,
                price: Number(product.price) * Number(newProductQuantity),
                salePrice: product.salePrice === null ? null : Number(product.salePrice) * Number(newProductQuantity)
            });

            return res.status(200).send(cartStock);
        }

        
    } catch (error) {
        console.log(error);
    }
    } else if (oAuthProvidedId) {
        try {
            const cart = await Cart.findOne({
                where: {
                    OAuth2UserProvidedId: oAuthProvidedId
                }
            });
    
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
    
            const productStock = await Stock.findOne({
                where: {
                    productId: productId,
                    productSize: productSize
                }
            });
    
            if (productStock) {
    
                const cartStock = await CartStocks.findOne({
                    where: {
                        stockId: productStock.id,
                        size: productSize
                    }
                });
    
                await cartStock.update({
                    quantity: newProductQuantity,
                    price: Number(product.price) * Number(newProductQuantity),
                    salePrice: product.salePrice === null ? null : Number(product.salePrice) * Number(newProductQuantity)
                });
    
                return res.status(200).send(cartStock);
            }
    
            
        } catch (error) {
            console.log(error);
        }
    }
    
}

const deleteCartStocks = async (req, res) => {

    const oAuthProvidedId = req.session.passport.user.providedId;

    const userId = req.session.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.params.productId;
    const productSize = req.query.size;

    if (userId) {
        try {
            const cart = await Cart.findOne({
                where: {
                    userId: userId
                }
            });
    
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
    
            const productStock = await Stock.findOne({
                where: {
                    productId: productId,
                    productSize: productSize
                }
            });
    
            if (productStock) {
    
                const cartStock = await CartStocks.destroy({
                    where: {
                        stockId: productStock.id,
                        size: productSize
                    }
                });
    
                const newCart = await Cart.findOne({
                    where: {
                        userId: userId
                    },
                    include: Stock
                });
    
                return res.status(200).send(newCart);
            }
            
        } catch (error) {
            console.log(error);
        }    
    } else if (oAuthProvidedId) {
        try {
            const cart = await Cart.findOne({
                where: {
                    OAuth2UserProvidedId: oAuthProvidedId
                }
            });
    
            const product = await Product.findOne({
                where: {
                    id: productId
                }
            });
    
            const productStock = await Stock.findOne({
                where: {
                    productId: productId,
                    productSize: productSize
                }
            });
    
            if (productStock) {
    
                const cartStock = await CartStocks.destroy({
                    where: {
                        stockId: productStock.id,
                        size: productSize
                    }
                });
    
                const newCart = await Cart.findOne({
                    where: {
                        OAuth2UserProvidedId: oAuthProvidedId
                    },
                    include: Stock
                });
    
                return res.status(200).send(newCart);
            }
            
        } catch (error) {
            console.log(error);
        }    
    }
};

const checkoutCart = async (req, res) => {

    const cartId = req.cartId;
    const userId = req.userId;

    try {
        const cart = await Cart.findOne({
            where: { id: cartId },
            include: Product
          });

          const user = await User.findOne({
            where: { id: userId }
          });
    
        const order = await Order.create();
        await user.addOrder(order);
    
        if (order) {
            for (const obj of cart.products) {
                const productId = obj.id;
                const product = await Product.findOne({
                    where: { id: productId }
                });

                const CartProduct = await CartStocks.findOne({
                    where: {
                        cartId: cartId,
                        productId: productId
                    }
                });
        
                await order.addProduct(product, { through: { quantity: CartProduct.quantity }});
                await cart.removeProduct(product, { through: 'cart_products' });
            }

            const newOrder = await Order.findOne({
                where: { id: order.id },
                include: Product
              });

            res.status(201).send(newOrder);

        } else {
            res.staus(400).send('could not finalize order, try again.')
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCart,
    insertIntoCartStocks,
    deleteCartStocks,
    checkoutCart,
    updateCartQuantity
}