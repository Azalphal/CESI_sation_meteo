'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Users.init({
        username: DataTypes.VARCHAR(255),
        email: DataTypes.VARCHAR(255),
        password: DataTypes.VARCHAR(255)
    }, {
        sequelize,
        modelName: 'Users',
    });

    return Users;
};