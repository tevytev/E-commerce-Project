const { Sequelize } = require("sequelize");

// product model
const ProductStockeModel = (sequelize, DataTypes) => {
    const ProductStock = sequelize.define( "stock", {
        productSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return ProductStock
};

module.exports = {
    ProductStockeModel
}