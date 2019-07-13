const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'user_focus',
    [{
        id: 1,
        user_id: 2,
        focus_id: 1,
        ...timestamps,
      },
      {
        id: 2,
        user_id: 1,
        focus_id: 2,
        ...timestamps,
      },
      {
        id: 3,
        user_id: 3,
        focus_id: 1,
        ...timestamps,
      }, {
        id: 4,
        user_id: 4,
        focus_id: 3,
        ...timestamps,
      }, {
        id: 5,
        user_id: 4,
        focus_id: 1,
        ...timestamps,
      }, {
        id: 6,
        user_id: 1,
        focus_id: 3,
        ...timestamps,
      }
    ], {},
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('user_focus', {
      id: {
        [Op.between]: [1, 6]
      }
    }, {});
  },
}