module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    'comment', {
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      tableName: 'comment'
    }
  )

  comment.associate = function (models) {
    comment.belongsTo(models.tie, {
      foreignKey: 'tie_id'
    });
    comment.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
    comment.belongsTo(models.comment, {
      foreignKey: "father_id"
    });
    comment.hasMany(models.comment, {
      foreignKey: "father_id"
    });
  }
  return comment
}