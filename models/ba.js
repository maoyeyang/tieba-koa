module.exports = (sequelize, DataTypes) => {
  const ba = sequelize.define(
    'ba', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ba_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fans_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tie_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      theme_url: DataTypes.STRING
    }, {
      tableName: 'ba'
    }
  )

  ba.associate = function (models) {
    ba.hasMany(models.tie, {
      foreignKey: 'ba_id'
    });
    ba.hasMany(models.focus_ba, {
      foreignKey: 'ba_id'
    });
  }
  return ba
}