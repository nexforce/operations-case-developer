const { sequelize } = require('./src/config/database');

beforeEach(async () => {
  await sequelize.sync({ force: true }); 
});

afterEach(async () => {
  await sequelize.close(); 
});
