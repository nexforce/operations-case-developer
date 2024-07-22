const AbstractRepository = require("./AbstractRepository.js");

const { Product } = require('../models/index.js');

class ProductRepository extends AbstractRepository {
    constructor() {
        super(Product);
    }
}

module.exports = ProductRepository;
