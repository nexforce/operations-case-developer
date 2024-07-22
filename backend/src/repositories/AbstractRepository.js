class AbstractRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll(opt) {
        try {
            return await this.model.findAll(opt);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id, opt) {
        try {
            return await this.model.findByPk(id, opt);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const updatedRows = await this.model.update(data, {
                where: { id: id },
                fields: Object.keys(data)
            });
            return updatedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedRows = await this.model.destroy({
                where: { id: id }
            });
            return deletedRows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = AbstractRepository;
