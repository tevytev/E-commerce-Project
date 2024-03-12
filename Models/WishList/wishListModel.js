const { Sequelize } = require("sequelize");
// wishliat model
const WishListModel = (sequelize, DataTypes) => {
    const WishList = sequelize.define( "wishlist", {})

    return WishList
};

module.exports = {
    WishListModel
}

