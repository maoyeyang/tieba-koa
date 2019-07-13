module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      member: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      introduction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar_url: DataTypes.STRING
    }, {
      tableName: 'user'
    }
  )

  user.associate = function (models) {
    user.hasMany(models.tie, {
      foreignKey: "user_id"
    });
    user.hasMany(models.focus_ba, {
      foreignKey: "user_id"
    });
    user.hasMany(models.user_focus, {
      foreignKey: "user_id"
    });
    user.hasMany(models.user_focus, {
      foreignKey: "focus_id"
    });
    user.hasOne(models.like_collect, {
      foreignKey: "user_id"
    });
    user.hasOne(models.comment, {
      foreignKey: "user_id"
    });
  }
  return user
}