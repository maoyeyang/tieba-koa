const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'focus_ba',
    [{
      id: 1,
      user_id: 1,
      ba_id: 7,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 2,
      user_id: 1,
      ba_id: 8,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 3,
      user_id: 1,
      ba_id: 10,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 4,
      user_id: 1,
      ba_id: 9,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 5,
      user_id: 1,
      ba_id: 2,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 6,
      user_id: 1,
      ba_id: 4,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 7,
      user_id: 2,
      ba_id: 1,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 8,
      user_id: 2,
      ba_id: 3,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 9,
      user_id: 2,
      ba_id: 8,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 10,
      user_id: 2,
      ba_id: 10,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 11,
      user_id: 1,
      ba_id: 1,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 12,
      user_id: 2,
      ba_id: 6,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 13,
      user_id: 3,
      ba_id: 3,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 14,
      user_id: 4,
      ba_id: 1,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 15,
      user_id: 4,
      ba_id: 6,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 16,
      user_id: 4,
      ba_id: 7,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 17,
      user_id: 4,
      ba_id: 12,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 18,
      user_id: 4,
      ba_id: 11,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 19,
      user_id: 3,
      ba_id: 2,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 20,
      user_id: 3,
      ba_id: 5,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 21,
      user_id: 3,
      ba_id: 4,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 22,
      user_id: 3,
      ba_id: 12,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 23,
      user_id: 3,
      ba_id: 13,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 24,
      user_id: 3,
      ba_id: 18,
      exp: 0,
      state: 1,
      ...timestamps,
    }, {
      id: 25,
      user_id: 3,
      ba_id: 17,
      exp: 0,
      state: 1,
      ...timestamps,
    }], {},
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('focus_ba', {
      id: {
        [Op.between]: [1, 25]
      }
    }, {});
  },
}