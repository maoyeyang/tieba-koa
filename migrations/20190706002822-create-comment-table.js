module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'comment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),
  down: queryInterface => queryInterface.dropTable('comment')
}