module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'like_collect', {
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
      like: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      collect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),
  down: queryInterface => queryInterface.dropTable('like_collect')
}