const { Sequelize } = require("sequelize");
// oAuth model
const OAuth2Model = (sequelize, DataTypes) => {
    const OAuth2 = sequelize.define( "OAuth2_user", {
        providedId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        loginType: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )

    return OAuth2
};

module.exports = {
    OAuth2Model
}