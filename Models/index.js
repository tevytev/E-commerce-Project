// importing modules
const { Sequelize, DataTypes } = require('sequelize');
const { UserModel } = require('./User/userModel.js');
const { ProductModel } = require('./Product/productModel.js');
const { CartModel } = require('./Cart/cartModel.js');
const { OrderModel } = require('./Order/orderModel.js');
// const dotenv = require('dotenv').config();

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

// Users and Carts one-to-one association
db.users.hasOne(db.carts);
db.carts.belongsTo(db.users);

// Users and Orders one-to-many association
db.users.hasMany(db.orders);
db.orders.belongsTo(db.users);

// Carts and Products many-to-many association

// Creating through table for cart and products
const CartProducts = sequelize.define( "cart_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

db.carts.belongsToMany(db.products, { through: CartProducts });
db.products.belongsToMany(db.carts, { through: CartProducts });

// Orders and Products many-to-many association

const OrderProducts = sequelize.define( "order_products", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

db.orders.belongsToMany(db.products, {through: OrderProducts});
db.products.belongsToMany(db.orders, {through: OrderProducts});


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// synchronizing the database and forcing it to false so we dont lose data

const Products = db.products;
const Users = db.users;
const Carts = db.carts;

(async () => {
    await db.sequelize.sync({ force: true }).then(() => {

        console.log("db has been re sync");

        // creating instances of products
        Products.create({ name: "Men Grey Classic Fit T-shirt", price: 10, category: "shirts" });
        Products.create({ name: "Men Black Classic Fit T-shirt",price: 12,category: "shirts" });
        Products.create({ name: "Women Grey T-shirt", price: 13, category: "shirts" });
        Products.create({ name: "NY Knicks Graphic Tee", price: 13, category: "shirts" });
        Products.create({ name: "LA Lakers Graphic Tee", price: 18, category: "shirts" });

        Products.create({ name: "Men Grey Classic Fit Pants", price: 12, category: "pants" });
        Products.create({ name: "Men Black Classic Fit Pants",price: 15,category: "pants" });
        Products.create({ name: "Women Grey Leggings", price: 18, category: "pants" });
        Products.create({ name: "Women Black Leggings", price: 22, category: "pants" });
        Products.create({ name: "Women Red Leggings", price: 24, category: "pants" });

        Products.create({ name: "Spider-man Sneakers", price: 19, category: "sneakers" });
        Products.create({ name: "Bat-man Sneakers",price: 21,category: "sneakers" });
        Products.create({ name: "Super-man Sneakers", price: 22, category: "sneakers" });
        Products.create({ name: "NY Knicks Sneakers", price: 26, category: "sneakers" });
        Products.create({ name: "LA Lakers Sneakers", price: 28, category: "sneakers" });
        

    });
  })();

// exporting the module
module.exports = {
    db,
    CartProducts,
    OrderProducts
};