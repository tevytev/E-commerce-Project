// importing modules
const { db, WishListProducts } = require('../Models');
const Wishlist = db.wishlist;
const Product = db.products;

const getWishlist = async (req, res) => {

    const oAuthProvidedId = req?.session?.passport ? req.session.passport.user.providedId : null
    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    const { category } = req.query;
    const { gender } = req.query;
    const { priceFilter } = req.query;

    if (userId) {
        try {

            if (category) {
    
                if (priceFilter) {
        
                    if (gender) {
                        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
    
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
        
                    } else {
        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
                    }
        
                } else {
        
                    if (gender) {
        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    category: category,
                                    gender: gender
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    } else {
                        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    category: category
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                    
                }
        
            } else {
        
                if (priceFilter) {
        
                    if (gender) {
                        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
        
                    } else {
        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { userId: userId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
                    }
        
                } else {
        
                    if (gender) {
        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        };
        
                    } else {
                        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include:  [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new']
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                    
                }
            };
    
        } catch (error) {
            console.log(error);
        }
    } else if (oAuthProvidedId) {

        try {

            if (category) {
    
                if (priceFilter) {
        
                    if (gender) {
                        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
    
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
        
                    } else {
        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        category: category
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
                    }
        
                } else {
        
                    if (gender) {
        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    category: category,
                                    gender: gender
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    } else {
                        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    category: category
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                    
                }
        
            } else {
        
                if (priceFilter) {
        
                    if (gender) {
                        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    where: {
                                        gender: gender,
                                    },
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
        
                    } else {
        
                        if (priceFilter === 'high to low') {
        
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    order: [
                                        [ { model: Product }, 'price', 'DESC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                            
                        } else if (priceFilter === 'low to high') {
            
                            const wishList = await Wishlist.findOne({
                                where: { OAuth2UserProvidedId: oAuthProvidedId },
                                include: [{
                                    model: Product,
                                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                    order: [
                                        [ { model: Product }, 'price', 'ASC']
                                    ]
                                }]
                            });
    
                            if (wishList) {
                                return res.status(200).send(wishList);
                            } else {
                                return res.status(404).send(wishList);
                            }
                        }
                    }
        
                } else {
        
                    if (gender) {
        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender
                                }
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        };
        
                    } else {
                        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include:  [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new']
                            }]
                        });
    
                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                    
                }
            };
    
        } catch (error) {
            console.log(error);
        }
    }

};

const getWishlistByClothingType = async (req, res) => {
    
    const oAuthProvidedId = req?.session?.passport ? req.session.passport.user.providedId : null
    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    const { clothingType } = req.params;
    const { gender } = req.query;
    const { priceFilter } = req.query;

    if (userId) {
        try {

            if (priceFilter) {
    
                if (gender) {
                    
                    if (priceFilter === 'high to low') {
    
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender,
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'DESC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }

                    } else if (priceFilter === 'low to high') {
        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender,
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'ASC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
    
                } else {
    
                    if (priceFilter === 'high to low') {
    
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'DESC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                        
                    } else if (priceFilter === 'low to high') {
        
                        const wishList = await Wishlist.findOne({
                            where: { userId: userId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'ASC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                }
    
            } else {
    
                if (gender) {
    
                    const wishList = await Wishlist.findOne({
                        where: { userId: userId },
                        include: [{
                            model: Product,
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                clothingType: clothingType,
                                gender: gender
                            }
                        }]
                    });

                    if (wishList) {
                        return res.status(200).send(wishList);
                    } else {
                        return res.status(404).send(wishList);
                    }
                } else {
                    
                    const wishList = await Wishlist.findOne({
                        where: { userId: userId },
                        include: [{
                            model: Product,
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                clothingType: clothingType
                            }
                        }]
                    });

                    if (wishList) {
                        return res.status(200).send(wishList);
                    } else {
                        return res.status(404).send(wishList);
                    }
                }
                
            }


    } catch (error) {
        console.log(error);
    }
    } else if (oAuthProvidedId) {
        try {

            if (priceFilter) {
    
                if (gender) {
                    
                    if (priceFilter === 'high to low') {
    
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender,
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'DESC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }

                    } else if (priceFilter === 'low to high') {
        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    gender: gender,
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'ASC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
    
                } else {
    
                    if (priceFilter === 'high to low') {
    
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'DESC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                        
                    } else if (priceFilter === 'low to high') {
        
                        const wishList = await Wishlist.findOne({
                            where: { OAuth2UserProvidedId: oAuthProvidedId },
                            include: [{
                                model: Product,
                                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                                where: {
                                    clothingType: clothingType
                                },
                                order: [
                                    [ { model: Product }, 'price', 'ASC']
                                ]
                            }]
                        });

                        if (wishList) {
                            return res.status(200).send(wishList);
                        } else {
                            return res.status(404).send(wishList);
                        }
                    }
                }
    
            } else {
    
                if (gender) {
    
                    const wishList = await Wishlist.findOne({
                        where: { OAuth2UserProvidedId: oAuthProvidedId },
                        include: [{
                            model: Product,
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                clothingType: clothingType,
                                gender: gender
                            }
                        }]
                    });

                    if (wishList) {
                        return res.status(200).send(wishList);
                    } else {
                        return res.status(404).send(wishList);
                    }
                } else {
                    
                    const wishList = await Wishlist.findOne({
                        where: { OAuth2UserProvidedId: oAuthProvidedId },
                        include: [{
                            model: Product,
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                clothingType: clothingType
                            }
                        }]
                    });

                    if (wishList) {
                        return res.status(200).send(wishList);
                    } else {
                        return res.status(404).send(wishList);
                    }
                }
                
            }


    } catch (error) {
        console.log(error);
    }
    }
}

const insertIntoWishlistProducts = async (req, res) => {
    
    const oAuthProvidedId = req?.session?.passport ? req.session.passport.user.providedId : null
    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.body.productId;

    if (userId) {
        try {

            const wishList = await Wishlist.findOne({
                where: { userId: userId },
            });
    
            const product = await Product.findOne({
                where: { id: productId }
            });
    
            if (wishList && product) {
    
                const repeatedProductCheck = await wishList.hasProduct(product);
    
                if (repeatedProductCheck) {
    
                    return res.status(200).send('item already in wishlist');
    
                } else {
    
                    await wishList.addProduct(product);
    
                    const newWishList = await Wishlist.findOne({
                        where: { userId: userId },
                        include: Product
                    });
    
                    return res.status(201).send(newWishList);
                }
            }
    
        } catch (error) {
            console.log(error);
        }
    } else if (oAuthProvidedId) {
        try {

            const wishList = await Wishlist.findOne({
                where: { OAuth2UserProvidedId: oAuthProvidedId },
            });
    
            const product = await Product.findOne({
                where: { id: productId }
            });
    
            if (wishList && product) {
    
                const repeatedProductCheck = await wishList.hasProduct(product);
    
                if (repeatedProductCheck) {
    
                    return res.status(200).send('item already in wishlist');
    
                } else {
    
                    await wishList.addProduct(product);
    
                    const newWishList = await Wishlist.findOne({
                        where: { OAuth2UserProvidedId: oAuthProvidedId },
                        include: Product
                    });
    
                    return res.status(201).send(newWishList);
                }
            }
    
        } catch (error) {
            console.log(error);
        }
    }
};

const removeWishlistProduct = async (req, res) => {

    const oAuthProvidedId = req?.session?.passport ? req.session.passport.user.providedId : null
    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.params.productId;

    if (userId) {
        try {

            const wishList = await Wishlist.findOne({
                where: { userId: userId },
            });
    
            if (wishList) {
                const wishlistProduct = await WishListProducts.destroy({
                    where: {
                        productId: productId,
                        wishlistId: wishList.id
                    }
                });
    
                if (wishlistProduct) {
                    const newWishList = await Wishlist.findOne({
                    where: { userId: userId },
                    include: Product
                });
    
                res.status(200).send(newWishList);
                } else {
                    res.sendStatus(400);
                }
    
                
            }
            
        } catch (error) {
            console.log(error);
        }
    } else if (oAuthProvidedId) {
        try {

            const wishList = await Wishlist.findOne({
                where: { OAuth2UserProvidedId: oAuthProvidedId },
            });
    
            if (wishList) {
                const wishlistProduct = await WishListProducts.destroy({
                    where: {
                        productId: productId,
                        wishlistId: wishList.id
                    }
                });
    
                if (wishlistProduct) {
                    const newWishList = await Wishlist.findOne({
                    where: { OAuth2UserProvidedId: oAuthProvidedId },
                    include: Product
                });
    
                res.status(200).send(newWishList);
                } else {
                    res.sendStatus(400);
                }
    
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }
};

const lookUpProduct = async (req, res) => {

    const oAuthProvidedId = req?.session?.passport ? req.session.passport.user.providedId : null
    const userId = req?.session?.passport ? req.session.passport.user.id : req.session.user.id;

    const productId = req.params.productId;

    if (userId) {
        try {

            const wishList = await Wishlist.findOne({
                where: { userId: userId },
            });
    
            const product = await Product.findOne({
                where: { id: productId }
            });
    
            if (product && wishList) {
                const wishList_Products = await WishListProducts.findOne({
                    where: {
                        wishlistId: wishList.id,
                        productId: product.id
                    }
                });
    
                if (wishList_Products) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    } else if (oAuthProvidedId) {

        try {

            const wishList = await Wishlist.findOne({
                where: { OAuth2UserProvidedId: oAuthProvidedId },
            });
    
            const product = await Product.findOne({
                where: { id: productId }
            });
    
            if (product && wishList) {
                const wishList_Products = await WishListProducts.findOne({
                    where: {
                        wishlistId: wishList.id,
                        productId: product.id
                    }
                });
    
                if (wishList_Products) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    }
};



module.exports = {
    getWishlist,
    insertIntoWishlistProducts,
    removeWishlistProduct,
    getWishlistByClothingType,
    lookUpProduct
}