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
        // extraSmall: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // small: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // medium: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // large: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // extraLarge: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // }
    })
    return ProductStock
};

module.exports = {
    ProductStockeModel
}