const AbstractRepository = require("./AbstractRepository.js");

const { Category } = require('../models/index.js');

class CategoryRepository extends AbstractRepository {
    constructor() {
        super(Category);
    }
}

module.exports = CategoryRepository;
