module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'tie', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      images: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comments_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),
  down: queryInterface => queryInterface.dropTable('tie')
}