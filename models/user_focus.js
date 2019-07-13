module.exports = (sequelize, DataTypes) => {
  const user_focus = sequelize.define(
    'user_focus', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      focus_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'user_focus'
    }
  )

  user_focus.associate = function (models) {
    user_focus.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
    user_focus.belongsTo(models.user, {
      foreignKey: 'focus_id'
    });
  }
  return user_focus
}