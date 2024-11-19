const { Sequelize } = require("sequelize");

// product model
const SessionModel = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "session",
    {
      sid: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      sess: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      expire: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Session;
};

module.exports = {
  SessionModel,
};
