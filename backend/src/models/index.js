const { DataTypes } = require('sequelize');

const sequelize = require('../config/db.js');

const Product = require('../models/product.js')(sequelize, DataTypes);
const Category = require('../models/category.js')(sequelize, DataTypes);

Product.associate({ Category });
Category.associate({ Product });

module.exports = {
    Product,
    Category
}
