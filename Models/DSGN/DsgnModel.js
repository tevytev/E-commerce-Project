const { Sequelize } = require("sequelize");
// cart model
const DsgnModel = (sequelize, DataTypes) => {
    const Dsgn = sequelize.define( "dsgn", {})

    return Dsgn
};

module.exports = {
    DsgnModel
}

