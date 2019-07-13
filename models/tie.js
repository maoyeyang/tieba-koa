module.exports = (sequelize, DataTypes) => {
  const tie = sequelize.define(
    'tie', {
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'tie'
    }
  )
  tie.associate = function (models) {
    tie.belongsTo(models.ba, {
      foreignKey: 'ba_id'
    });
    tie.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
    tie.hasOne(models.like_collect, {
      foreignKey: "tie_id"
    });
    tie.hasOne(models.comment, {
      foreignKey: "tie_id"
    });
  }
  return tie
}