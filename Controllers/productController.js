// importing modules
const { db } = require('../Models');
const { Op } = require("sequelize");

// assigning users to the variable Products
const Product = db.products;
const DSGN = db.dsgn;

const getAllProducts = async (req, res, next) => {

    const { category } = req.query;
    const { gender } = req.query;
    const { priceFilter } = req.query;
    const { collectionFilter } = req.query;

    if (collectionFilter) {

        if (category) {
                // if pricing query is included in request, filter out all products that do not match category parameter

            if (priceFilter) {

                if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                category: category,
                                gender: gender
                            },
                            order: [
                                ['price', 'DESC'],
                            ],
                            include: [{
                                model: DSGN
                            }]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                category: category,
                                gender: gender
                            },
                            order: [
                                ['price', 'ASC'],
                            ],
                            include: [{
                                model: DSGN
                            }]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            try {
                // Find all products in specific category
                const products = await Product.findAll({
                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                    where: {
                        category: category,
                        gender: gender
                    },
                    include: [{
                        model: DSGN
                    }]
                });
        
                if (products) {
                    return res.status(200).send(products);
                } else {
                    res.status(404).send("Could not fetch products");
                }
            } catch (error) {
                console.log(error);
            }


        } else {

            if (priceFilter) {
                
                if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                gender: gender
                            },
                            order: [
                                ['price', 'DESC'],
                            ],
                            include: [{
                                model: DSGN
                            }]
                        });
            
                        if (products) {
                            res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                gender: gender
                            },
                            order: [
                                ['price', 'ASC'],
                            ],
                            include: [{
                                model: DSGN
                            }]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else {

                try {
                    // Find all products
                    const products = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                        where: {
                            gender: gender
                        },
                        include: [{
                            model: DSGN
                        }]
                    });

                    if (products) {
                        res.status(200).send(products);
                    } else {
                        res.status(404).send("Could not fetch products");
                    }
                } catch (error) {
                    console.log(error);
                }

            }

        };

    } else {
        
        if (category) {
            // if pricing query is included in request, filter out all products that do not match category parameter

            if (priceFilter) {

                if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                category: category,
                                gender: gender
                            },
                            order: [
                                ['price', 'DESC'],
                            ]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                category: category,
                                gender: gender
                            },
                            order: [
                                ['price', 'ASC'],
                            ]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }

            try {
                // Find all products in specific category
                const products = await Product.findAll({
                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                    where: {
                        category: category,
                        gender: gender
                    }
                });
        
                if (products) {
                    return res.status(200).send(products);
                } else {
                    res.status(404).send("Could not fetch products");
                }
            } catch (error) {
                console.log(error);
            }


        } else {

            if (priceFilter) {
                
                if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                gender: gender
                            },
                            order: [
                                ['price', 'DESC'],
                            ]
                        });
            
                        if (products) {
                            res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else if (priceFilter === 'high to low') {
                    try {
                        const products = await Product.findAll({
                            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                            where: {
                                gender: gender
                            },
                            order: [
                                ['price', 'ASC'],
                            ]
                        });

                        if (products) {
                            return res.status(200).send(products);
                        } else {
                            res.status(404).send("Could not fetch products");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

            } else {

                try {
                    // Find all products
                    const products = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                        where: {
                            gender: gender
                        }
                    });

                    if (products) {
                        res.status(200).send(products);
                    } else {
                        res.status(404).send("Could not fetch products");
                    }
                } catch (error) {
                    console.log(error);
                }

            }

            

        };
    }

    
};

const getAllProductsByGender = async (req, res) => {
    const { gender } = req.params;

    try {
        // Find products with specific fit
        const product = await Product.findAll({
            attributes: ['name', 'price', 'category', 'fit'], 
            where: {
                gender: gender
            }
        });

    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send('product not found');
    }
    } catch (error) {
        console.log(error);
    }

};

const getProductsByClothingType = async (req, res) => {

    const { clothingType } = req.params;
    const { gender } = req.query;
    const { priceFilter } = req.query;
    const { collectionFilter } = req.query;
    
    if (collectionFilter) {

        if (priceFilter) {

            if (priceFilter === 'high to low') {
    
                try {
                    // Find products with specific fit
                    const product = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'], 
                        where: {
                            clothingType: clothingType,
                            gender: gender
                        },
                        order: [
                            ['price', 'DESC'],
                        ],
                        include: [{
                            model: DSGN
                        }]
                    });
            
                    if (product) {
                        res.status(200).send(product);
                    } else {
                        res.status(404).send('product not found');
                    }
    
                } catch (error) {
                    console.log(error);
                }
    
            } else {
                try {
                    const products = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                        where: {
                            clothingType: clothingType,
                            gender: gender
                        },
                        order: [
                            ['price', 'ASC'],
                        ],
                        include: [{
                            model: DSGN
                        }]
                    });
    
                    if (products) {
                        return res.status(200).send(products);
                    } else {
                        res.status(404).send("Could not fetch products");
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            try {
                // Find products with specific fit
                const product = await Product.findAll({
                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'], 
                    where: {
                        clothingType: clothingType,
                        gender: gender
                    },
                    include: [{
                        model: DSGN
                    }]
                });
    
                if (product) {
                    res.status(200).send(product);
                } else {
                    res.status(404).send('product not found');
                }
            } catch (error) {
                console.log(error);
            }
        }
    } else {

        if (priceFilter) {

            if (priceFilter === 'high to low') {

                try {
                    // Find products with specific fit
                    const product = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'], 
                        where: {
                            clothingType: clothingType,
                            gender: gender
                        },
                        order: [
                            ['price', 'DESC'],
                        ]
                    });
            
                    if (product) {
                        res.status(200).send(product);
                    } else {
                        res.status(404).send('product not found');
                    }

                } catch (error) {
                    console.log(error);
                }

            } else {
                try {
                    const products = await Product.findAll({
                        attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
                        where: {
                            clothingType: clothingType,
                            gender: gender
                        },
                        order: [
                            ['price', 'ASC'],
                        ]
                    });

                    if (products) {
                        return res.status(200).send(products);
                    } else {
                        res.status(404).send("Could not fetch products");
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            try {
                // Find products with specific fit
                const product = await Product.findAll({
                    attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'], 
                    where: {
                        clothingType: clothingType,
                        gender: gender
                    }
                });

                if (product) {
                    res.status(200).send(product);
                } else {
                    res.status(404).send('product not found');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    

    
}

const getProductById = async (req, res) => {

    const { productId } = req.params;

        try {
            // Find product with specific id
            const product = await Product.findOne({
                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'], 
                where: {
                    id: productId
                }
            });
    
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send('product not found');
        }
        } catch (error) {
            console.log(error);
        }
};

const getNewProducts = async (req, res) => {
    
    try {

        const products = await Product.findAll({
            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
            where: {
                new: { [Op.eq]: true },
                gender: 'men'
            }
        });

        if (products) {

            res.status(200).send(products);

        } else {

            res.status(404).send('products not found');

        }
        
    } catch (error) {

        console.log(error);

    }

} 

const getSaleProducts = async (req, res) => {
    
    try {

        const products = await Product.findAll({
            attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new'],
            where: {
                gender: 'women',
                salePrice: { [Op.not]: null }
            }
        });

        if (products) {

            res.status(200).send(products);

        } else {

            res.status(404).send('products not found');

        }
        
    } catch (error) {

        console.log(error);

    }
};

const getDsgnStudioProducts = async (req, res) => {

    try {

        const DsgnProducts = await DSGN.findAll({
            include: [{
                model: Product,
                attributes: ['name', 'price', 'category', 'salePrice', 'id', 'gender', 'color', 'new']
            }]
        })

        if (DsgnProducts) {

            res.status(200).send(DsgnProducts);
            
        }
        
    } catch (error) {

        console.log(error);

    }
};

const searchForProduct = async (req, res) => {

    const { searchTerm } = req.query;

    try {
        const searchProducts = await Product.findAll({
            where: {
                name: { [Op.iLike]: `%${searchTerm}%`}
            }
        });

        if (searchProducts) {
            res.status(200).send(searchProducts);
        }
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getAllProductsByGender,
    getProductsByClothingType,
    getNewProducts,
    getSaleProducts,
    getDsgnStudioProducts,
    searchForProduct
}