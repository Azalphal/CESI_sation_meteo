'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data.init({
    humidity: DataTypes.INTEGER,
    temperature: DataTypes.INTEGER,
    pressure: DataTypes.INTEGER,
    position: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};