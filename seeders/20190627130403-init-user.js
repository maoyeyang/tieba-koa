const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'user',
    [{
      id: 1,
      username: 'myy123',
      password: '$2b$10$RGOs3DDp.L3TM/v8HE0QmuVsCP8BlHK9wAaahAT5PGzs.Nf9MUVkC',
      nickname: '阿毛',
      sex: true,
      avatar_url: './images/user_images/avatar_1.jpeg',
      member: true,
      introduction: '流下没有技术的泪水',
      ...timestamps,
    }, {
      id: 2,
      username: 'xmc123',
      password: '$2b$10$RGOs3DDp.L3TM/v8HE0QmuVsCP8BlHK9wAaahAT5PGzs.Nf9MUVkC',
      nickname: '谢石杰',
      sex: true,
      avatar_url: './images/user_images/avatar_2.jpeg',
      member: true,
      introduction: '做出这道题,你就可以去大厂',
      ...timestamps,
    }, {
      id: 3,
      username: 'lyz123',
      password: '$2b$10$RGOs3DDp.L3TM/v8HE0QmuVsCP8BlHK9wAaahAT5PGzs.Nf9MUVkC',
      nickname: '老爷子',
      sex: true,
      avatar_url: './images/user_images/avatar_3.jpeg',
      member: true,
      introduction: '各位好不好,好不好各位',
      ...timestamps,
    }, {
      id: 4,
      username: 'zxb123',
      password: '$2b$10$RGOs3DDp.L3TM/v8HE0QmuVsCP8BlHK9wAaahAT5PGzs.Nf9MUVkC',
      nickname: '博哥',
      sex: true,
      avatar_url: './images/user_images/avatar_4.jpeg',
      member: true,
      introduction: '我叫占学博,赌博的博',
      ...timestamps,
    }], {},
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('user', {
      id: {
        [Op.between]: [1, 4]
      }
    }, {});
  },
}