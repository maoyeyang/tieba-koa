module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      member: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      introduction: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_url: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    },
  ),

  down: queryInterface => queryInterface.dropTable('user'),
};