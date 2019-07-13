module.exports = (sequelize, DataTypes) => {
  const focus_ba = sequelize.define(
    'focus_ba', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ba_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    }, {
      tableName: 'focus_ba'
    }
  )

  focus_ba.associate = function (models) {
    focus_ba.belongsTo(models.ba, {
      foreignKey: 'ba_id'
    });
    focus_ba.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
  }
  return focus_ba
}