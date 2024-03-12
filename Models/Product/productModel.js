// product model
const ProductModel = (sequelize, DataTypes) => {
    const Product = sequelize.define( "product", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.REAL,
            unique: false,
            allowNull: false
        },
        salePrice: {
            type: DataTypes.REAL,
            unique: false,
            allowNull: true
        },
        clothingType: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        new: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Product
};

module.exports = {
    ProductModel
}