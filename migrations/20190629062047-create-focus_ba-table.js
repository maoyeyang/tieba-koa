module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'focus_ba', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ba_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      exp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),
  down: queryInterface => queryInterface.dropTable('focus_ba')
}