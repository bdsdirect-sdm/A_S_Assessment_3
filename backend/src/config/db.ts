import { Sequelize } from 'sequelize';

// Create a new Sequelize instance with the required configuration
const sequelize = new Sequelize('assessment_3', 'root', 'Password123#@!', {
    host: "localhost",
    dialect: "mysql"
});

// Export the sequelize instance
export default sequelize;
