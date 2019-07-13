module.exports = (sequelize, DataTypes) => {
  const like_collect = sequelize.define(
    'like_collect', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      collect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      tableName: 'like_collect'
    }
  )

  like_collect.associate = function (models) {
    like_collect.belongsTo(models.tie, {
      foreignKey: 'tie_id'
    });
    like_collect.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
  }
  return like_collect
}