module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'ba', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ba_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      fans_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tie_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      theme_url: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),
  down: queryInterface => queryInterface.dropTable('ba')
}