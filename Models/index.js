// importing modules
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { UserModel } = require('./User/userModel.js');
const { ProductModel } = require('./Product/productModel.js');
const { ProductStockeModel } = require('./Product/productStockModel.js');
const { CartModel } = require('./Cart/cartModel.js');
const { OrderModel } = require('./Order/orderModel.js');
const { OAuth2Model } = require('./User/oAuthModel.js');
const { WishListModel } = require('./WishList/wishListModel.js');
const { DsgnModel } = require('./DSGN/DsgnModel.js');
const { SessionModel } = require('./Session/SessionModel.js');

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5432
//database name is newecom

const sequelize = new Sequelize(process.env.DB_CONNECTION, { dialect: "postgres" });

// checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to newecom`);
}).catch((err) => {
    console.log(err);
});

const db = {};

// connecting to model
db.users = UserModel(sequelize, DataTypes);
db.products = ProductModel(sequelize, DataTypes);
db.carts = CartModel(sequelize, DataTypes);
db.orders = OrderModel(sequelize, DataTypes);
db.oAuthUsers = OAuth2Model(sequelize, DataTypes);
db.stock = ProductStockeModel(sequelize, DataTypes);
db.wishlist = WishListModel(sequelize, DataTypes);
db.dsgn = DsgnModel(sequelize, DataTypes);
db.session = SessionModel(sequelize, DataTypes);

// Users and Carts one-to-one association
db.users.hasOne(db.carts);
db.carts.belongsTo(db.users);

// Users and Wishlist one-to-one association
db.users.hasOne(db.wishlist);
db.wishlist.belongsTo(db.users);

// Products and Dsgn one-to-one association
db.products.hasOne(db.dsgn);
db.dsgn.belongsTo(db.products);

// Users and Orders one-to-many association
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// Products and Stock one-to-many association
db.products.hasMany(db.stock);
db.stock.belongsTo(db.products);


// Google users and Carts one-to-one association
db.oAuthUsers.hasOne(db.carts);
db.carts.belongsTo(db.oAuthUsers);

// Google users and Orders one-to-many association
db.oAuthUsers.hasMany(db.orders);
db.orders.belongsTo(db.oAuthUsers);


// Carts and Products many-to-many association
// Creating through table for cart and products
const CartStocks = sequelize.define( "cart_stocks", {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    salePrice: {
        type: DataTypes.REAL,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    stockId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    new: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    }

}, { timestamps: false });

db.carts.belongsToMany(db.stock, { through: CartStocks, unique: false });
db.stock.belongsToMany(db.carts, { through: CartStocks, unique: false });

// Orders and Products many-to-many association

const OrderProducts = sequelize.define( "order_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

db.orders.belongsToMany(db.products, { through: OrderProducts });
db.products.belongsToMany(db.orders, { through: OrderProducts });


// Wishlist and Products many-to-many association

const WishListProducts = sequelize.define('wishlist_products', {}, { timestamps: false });

db.wishlist.belongsToMany(db.products, { through: WishListProducts });
db.products.belongsToMany(db.wishlist, { through: WishListProducts });


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// synchronizing the database and forcing it to false so we dont lose data

const Products = db.products;
const Users = db.users;
const Carts = db.carts;
const Stock = db.stock;
const DSGN = db.dsgn;


(async () => {
    await db.sequelize.sync().then(() => {

        console.log("db has been re sync");

        // creating instances of products
        
        // MEN TOPS

        // t-shirts
        Products.create({ id: 1, name: "Maroon Active Muscle Fit Fast Dry Raglan T-shirt", price: 30, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'red', new: true });
        Products.create({ id: 2, name: "Charcoal Active Muscle Fit Fast Dry Raglan T-shirt", price: 30, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 3, name: "Stone Active Muscle Fit Fast Dry Raglan T-shirt", price: 30, salePrice: 25, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'white', new: false });
        Products.create({ id: 4, name: "Khaki Active Muscle Fit Fast Dry Raglan T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'green', new: true });
        Products.create({ id: 37, name: "Cobalt Active Training Dept Boxy Performance T-shirt", price: 25, salePrice: 20, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'blue', new: false });
        Products.create({ id: 38, name: "Taupe Active Training Dept Boxy Performance T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'brown', new: false });
        Products.create({ id: 42, name: "Black Active Colour Block Fast Dry T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'black', new: false });
        Products.create({ id: 43, name: "Black Active Boxy Athletic Back Print T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'black', new: false });
        Products.create({ id: 44, name: "Black Active Gym Basic Oversized T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'black', new: false });
        Products.create({ id: 45, name: "Blue Active Logo Performance T-shirt-2", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'blue', new: false });
        Products.create({ id: 46, name: "Dark Orange Active Gym Raglan T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'orange', new: false });
        Products.create({ id: 47, name: "Orange Active Gym Raglan T-shirt-3", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'orange', new: false });
        Products.create({ id: 48, name: "Pink Active Logo Performance T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'pink', new: false });
        Products.create({ id: 49, name: "Teal Man Active Performance T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'green', new: false });
        Products.create({ id: 50, name: "White Active Gym Oversized Rep T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'white', new: false });
        Products.create({ id: 51, name: "Sand Active Oversized One More Rep T-shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'men', color: 'yellow', new: false });
        

        // long sleeves
        Products.create({ id: 5, name: "Khaki Active Raglan Muscle Fit Compression Top", price: 30, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'green', new: false });
        Products.create({ id: 6, name: "Charcoal Active Muscle Fit Space Dye Long Top", price: 30, salePrice: 22, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 7, name: "Berry Active Matte High Neck Compression Baselayer", price: 35, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'purple', new: false });
        Products.create({ id: 41, name: "Black Active Gym Tech Long Sleeve Top", price: 35, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'black', new: true });
        Products.create({ id: 52, name: "White Active Seamless Camo Long Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'white', new: false });
        Products.create({ id: 53, name: "Cobalt Active Muscle Fit Long Sleeved Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'blue', new: false });
        Products.create({ id: 54, name: "Green Active Seamless Long Sleeve Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'men', color: 'green', new: false });


        // Hoodies
        Products.create({ id: 101, name: "Black Active Super Flex Zip Through Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 102, name: "Green Active Training Dept Boxy Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'green', new: false });
        Products.create({ id: 103, name: "White Active Training Dept Boxy Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'white', new: false });
        Products.create({ id: 104, name: "Khaki Man Active Washed Zip Up Rest Day Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'green', new: false });
        Products.create({ id: 105, name: "Chocolate Man Active Training Dept Boxy Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'brown', new: false });
        Products.create({ id: 106, name: "Light Gray Man Active Windbreaker", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 107, name: "Blue Man Active Washed Zip Up Rest Day Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'men', color: 'blue', new: false });


        // MEN BOTTOMS

        // pants
        Products.create({ id: 8, name: "Maroon Active Skinny Stretch Sweatpants", price: 20, salePrice: null, clothingType: 'bottoms', category: "pants", gender: 'men', color: 'red', new: true });
        Products.create({ id: 9, name: "Black Active Gym Tapered Fit Sweatpants", price: 25, salePrice: null, clothingType: 'bottoms', category: "pants", gender: 'men', color: 'black', new: true });
        Products.create({ id: 10, name: "Gray Man Active Lightweight Plain Track Pants", price: 30, salePrice: 25, clothingType: 'bottoms', category: "pants", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 11, name: "Steel Man Active Gym Techincal Cargo Jogger", price: 30, salePrice: 25, clothingType: 'bottoms', category: "pants", gender: 'men', color: 'blue', new: false });
        Products.create({ id: 12, name: "Beige Man Active Gym Technical Cargo Jogger", price: 35, salePrice: null, clothingType: 'bottoms', category: "pants", gender: 'men', color: 'brown', new: false });

        // shorts
        Products.create({ id: 13, name: "White Active 5 Inch Fast Dry Shorts", price: 20, salePrice: 15, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'white', new: false });
        Products.create({ id: 14, name: "Black Active Matte Stretch Woven Side Split Short", price: 30, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'black', new: true });
        Products.create({ id: 36, name: "Black Active Lightweight Cargo Shorts", price: 35, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'black', new: false });
        Products.create({ id: 39, name: "Cobalt Man Active Performance Training Dept Shorts", price: 25, salePrice: 20, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'blue', new: false });
        Products.create({ id: 40, name: "Taupe Man Active Performance Training Dept Shorts", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'brown', new: false });
        Products.create({ id: 55, name: "Maroon Man Active Camo Print 2-in-1 Short", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'red', new: false });
        Products.create({ id: 56, name: "Gray Man Active Extreme Split 3inch 2-in-1 Short", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'gray', new: false });
        Products.create({ id: 57, name: "Khaki Man Active Performance 5inch 2-in-1 Shorts", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'green', new: false });
        Products.create({ id: 113, name: "Charcoal Man Active Mesh Panelled 2-in-1 Shorts", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'men', color: 'black', new: false });

        // sweatpants
        Products.create({ id: 108, name: "Gray Marl Man Active Oversized Body Building Sweatpants", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'men', color: 'gray', new: true });
        Products.create({ id: 109, name: "Black Man Active Oversized Bronx Gym Sweatpants", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'men', color: 'black', new: true });
        Products.create({ id: 110, name: "Khaki Man Active Oversized Training Dept Sweatpants", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'men', color: 'green', new: true });
        Products.create({ id: 111, name: "Blue Man Active Washed Rest Day Jogger", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'men', color: 'blue', new: true });
        Products.create({ id: 112, name: "Khaki Man Active Washed Rest Day Jogger", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'men', color: 'green', new: true });



        // WOMEN TOPS

        // sports bras
        Products.create({ id: 15, name: "Stone beige DSGN Studio Supersoft Peached Sculpt Padded Sports Bra", price: 25, salePrice: null, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'brown', new: true })
        Products.create({ id: 16, name: "Khaki DSGN Studio Supersoft Peached Sculpt Padded Sports Bra", price: 25, salePrice: null, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'green', new: true });
        Products.create({ id: 17, name: "Gray DSGN Studio Supersoft Peached Sculpt Padded Sports Bra", price: 30, salePrice: null, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 18, name: "Navy DSGN Studio Supersoft Peached Sculpt Padded Sports Bra", price: 35, salePrice: null, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'blue', new: false });
        Products.create({ id: 66, name: "Black Premium Sculpt Piping Detail Padded Sports Bra", price: 35, salePrice: null, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'black', new: false });
        Products.create({ id: 67, name: "Black Premium Sculpt Reform Padded Sports Bra", price: 35, salePrice: 30, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'black', new: false });
        Products.create({ id: 68, name: "Black Seamless Rib Longline Sports Bra", price: 35, salePrice: 30, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'black', new: false });
        Products.create({ id: 69, name: "Pink Premium Sculpt Reform Padded Sports Bra", price: 35, salePrice: 30, clothingType: 'tops', category: "sports bras", gender: 'women', color: 'pink', new: false });

        // t-shirts
        Products.create({ id: 19, name: "White Ath Dept Slogan Oversized T-Shirt", price: 25, salePrice: 20, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'white', new: true });
        Products.create({ id: 20, name: "Beige DSGN Studio Supersoft Peached Sculpt Top", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'brown', new: false });

        Products.create({ id: 21, name: "Ocean DSGN Studio Supersoft Peached Sculpt Top", price: 30, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'blue', new: false });
        Products.create({ id: 22, name: "Black DSGN Studio Sports Oversized Gym T-Shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'black', new: false });
        Products.create({ id: 58, name: "Black DSGN Studio Supersoft Peached Sculpt Top", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'black', new: false });
        Products.create({ id: 59, name: "Pink Sports Club Slogan Oversized T-Shirt", price: 25, salePrice: 20, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'pink', new: false });
        Products.create({ id: 60, name: "Green Seamless Rib Short Sleeve Top", price: 25, salePrice: 20, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'green', new: false });
        Products.create({ id: 61, name: "Gray DSGN Studio Supersoft Peached Sculpt Top", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 62, name: "Gray DSGN Studio Sports Slogan Oversized T-Shirt", price: 25, salePrice: null, clothingType: 'tops', category: "t-shirts", gender: 'women', color: 'gray', new: false });

        // long sleeves
        Products.create({ id: 23, name: "Black Long Sleeve Woven Tab Gym Top", price: 30, salePrice: 25, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'black', new: true });
        Products.create({ id: 24, name: "Stone beige Seamless Contour Ribbed Round Neck Top", price: 25, salePrice: 20, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 25, name: "Ribbed Seamless Long Sleeve Gym Top", price: 25, salePrice: 20, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'gray', new: true });
        Products.create({ id: 63, name: "Gray DSGN Woven Label Long Sleeve Active Gym Crop Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'gray', new: true });
        Products.create({ id: 64, name: "Blue DSGN Woven Label Long Sleeve Active Gym Crop Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'blue', new: true });
        Products.create({ id: 65, name: "Black DSGN Woven Label Long Sleeve Active Gym Crop Top", price: 25, salePrice: null, clothingType: 'tops', category: "long sleeves", gender: 'women', color: 'black', new: true });

        // hoodiess
        Products.create({ id: 83, name: "Black Reflective DSGN Studio Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'black', new: false });
        Products.create({ id: 84, name: "Green DSGN Sports Puff Print Slogan Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'green', new: false });
        Products.create({ id: 85, name: "Pink Petite DSGN Studio Text Print Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'pink', new: false });
        Products.create({ id: 86, name: "Beige Text Print Slogan Print Oversized Hoodie", price: 25, salePrice: 20, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 87, name: "Blue DSGN Studio Oversized Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'blue', new: false });
        Products.create({ id: 88, name: "Dark Gray DSGN Studio Oversized Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'gray', new: false });
        
        Products.create({ id: 89, name: "Green Wardrobe Essentials Printed Hoodie", price: 25, salePrice: 20, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'green', new: false });
        Products.create({ id: 90, name: "White Recycled Hoodie", price: 25, salePrice: 20, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'white', new: false });
        Products.create({ id: 91, name: "Brown Recycled Premium Oversized Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 92, name: "Gray Zip Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 93, name: "Black Zip Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'black', new: false });
        Products.create({ id: 94, name: "Gray Reflective DSGN Studio Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 95, name: "Gray Petite DSGN Studio Acid Wash Hoodie", price: 25, salePrice: null, clothingType: 'tops', category: "hoodies", gender: 'women', color: 'gray', new: false });

        // WOMEN BOTTOMS

        // leggings
        Products.create({ id: 26, name: "Black DSGN STUDIO Piping Detail Peached Active Legging", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'black', new: true });
        Products.create({ id: 27, name: "Beige Structured Seamless Contour Ribbed Sculpt Leggings", price: 25, salePrice: 20, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 28, name: "Red Honeycomb Workout Leggings", price: 30, salePrice: 25, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'red', new: true });
        Products.create({ id: 29, name: "Teal Woven Label Detail Active Leggings", price: 20, salePrice: 15, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'green', new: false });
        Products.create({ id: 30, name: "Charcoal Woven Label Detail Active Leggings", price: 30, salePrice: 25, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 31, name: "Black DSGN Studio Sports Workout Leggings With Pocket", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'black', new: false });
        Products.create({ id: 75, name: "Black Plus Basic Leggings", price: 25, salePrice: 20, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'black', new: false });
        Products.create({ id: 76, name: "Brown Rib Seam Detail Flared Legging", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 77, name: "Green Petite Seamless Rib High Waist Leggings", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'green', new: false });
        Products.create({ id: 78, name: "Black Premium Sculpt Reform Capri Leggings", price: 25, salePrice: 20, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'black', new: false });
        Products.create({ id: 79, name: "Purple Tall Honeycomb Leggings", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'purple', new: false });
        Products.create({ id: 80, name: "Brown Premium Sculpt Reform Capri Leggings", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'brown', new: false });
        Products.create({ id: 81, name: "Black Premium Sculpt Piping Detail High Waist Flared Yoga Leggings", price: 25, salePrice: null, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'black', new: false });
        Products.create({ id: 82, name: "Green Tall Ribbed Mid Rise Basic Leggings", price: 25, salePrice: 20, clothingType: 'bottoms', category: "leggings", gender: 'women', color: 'green', new: false });

        // shorts
        Products.create({ id: 32, name: "Peached Active Piping Detail Biker Shorts", price: 25, salePrice: 20, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'black', new: false });
        Products.create({ id: 33, name: "Charcoal Seamless Contour Ribbed Biker Shorts", price: 30, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'gray', new: false });
        Products.create({ id: 34, name: "Sage Blue Overdyed Ribbed Booty Shorts", price: 25, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'blue', new: false });
        Products.create({ id: 35, name: "Ocean Wrap Waist Band Active Gym Biker Shorts", price: 20, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'blue', new: true });
        Products.create({ id: 70, name: "Pink Sweat Short With Reel Cotton", price: 20, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'pink', new: true });
        Products.create({ id: 71, name: "Purple Deep Waistband Oversized Sweat Shorts", price: 20, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'purple', new: true });
        Products.create({ id: 72, name: "Red Running Shorts", price: 20, salePrice: 15, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'red', new: true });
        Products.create({ id: 73, name: "Black Running Shorts", price: 20, salePrice: 15, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'black', new: true });
        Products.create({ id: 74, name: "Black DSGN Studio Color Block Slogan Sweat Sweat Shorts", price: 20, salePrice: null, clothingType: 'bottoms', category: "shorts", gender: 'women', color: 'black', new: true });

        // sweatpants
        Products.create({ id: 96, name: "White Cargo Pocket Pintuck Oversized Joggers", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'women', color: 'white', new: true });
        Products.create({ id: 97, name: "Blue Washed Oversized Joggers", price: 25, salePrice: 20, clothingType: 'bottoms', category: "sweatpants", gender: 'women', color: 'blue', new: true });
        Products.create({ id: 98, name: "Brown Washed Oversized Joggers", price: 25, salePrice: 20, clothingType: 'bottoms', category: "sweatpants", gender: 'women', color: 'brown', new: true });
        Products.create({ id: 99, name: "Red DSGN Studio Applique Oversized Cuffed Joggers", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'women', color: 'red', new: true });
        Products.create({ id: 100, name: "Black Washed Oversized Joggers", price: 20, salePrice: null, clothingType: 'bottoms', category: "sweatpants", gender: 'women', color: 'black', new: true });

        DSGN.create({ productId: 15});
        DSGN.create({ productId: 16});
        DSGN.create({ productId: 17});
        DSGN.create({ productId: 18});
        DSGN.create({ productId: 20});
        DSGN.create({ productId: 21});
        DSGN.create({ productId: 22});
        DSGN.create({ productId: 58});
        DSGN.create({ productId: 61});
        DSGN.create({ productId: 63});
        DSGN.create({ productId: 64});
        DSGN.create({ productId: 65});
        DSGN.create({ productId: 83});
        DSGN.create({ productId: 84});
        DSGN.create({ productId: 85});
        DSGN.create({ productId: 87});
        DSGN.create({ productId: 88});
        DSGN.create({ productId: 94});
        DSGN.create({ productId: 95});
        DSGN.create({ productId: 26});
        DSGN.create({ productId: 31});
        DSGN.create({ productId: 74});
        DSGN.create({ productId: 99});

        for (let i = 1; i <= 113; i++) {

            Stock.create({
                productSize: "extraSmall",
                stock: 100,
                productId: i
            });
    
            Stock.create({
                productSize: "small",
                stock: 150,
                productId: i
            });

            Stock.create({
                productSize: "medium",
                stock: 150,
                productId: i
            });
    
            Stock.create({
                productSize: "large",
                stock: 150,
                productId: i
            });

            Stock.create({
                productSize: "extraLarge",
                stock: 100,
                productId: i
            });
        }
    });

  })();

// exporting the module
module.exports = {
    db,
    CartStocks,
    OrderProducts,
    WishListProducts
};