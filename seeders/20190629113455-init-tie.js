const timestamps = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'tie',
    [{
      id: 1,
      user_id: 1,
      ba_id: 4,
      title: "这游戏真坑",
      content: '先充的钱是纸,后充的钱才是钱',
      type: 0,
      likes: 0,
      images: '["./images/tie_images/tie_2_1.jpeg"]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 2,
      user_id: 1,
      ba_id: 1,
      title: "前端学习",
      content: '学习目录 js css html jQ vue react',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 3,
      user_id: 2,
      ba_id: 6,
      title: "诚招美工",
      content: '要求有独立完成的两个以上的优秀作品',
      type: 0,
      likes: 0,
      images: '[]',
      ...timestamps,
      comments_count: 0,
    }, {
      id: 4,
      user_id: 2,
      ba_id: 8,
      title: "初学java",
      content: '找个师傅带带',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 5,
      user_id: 3,
      ba_id: 3,
      title: "江财好不好进啊",
      content: '我弟弟今年刚高考完 不知道能不能进',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 6,
      user_id: 3,
      ba_id: 2,
      title: "软件工程的前景如何",
      content: '如题,职业发展规划一般是如何的',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 7,
      user_id: 4,
      ba_id: 7,
      title: "机器学习的原理是怎样的",
      content: '江湖救急啊',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }, {
      id: 8,
      user_id: 4,
      ba_id: 12,
      title: "护士该怎么玩啊",
      content: '我想当屠皇',
      type: 0,
      likes: 0,
      images: '[]',
      comments_count: 0,
      ...timestamps,
    }], {},
  ),

  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('tie', {
      id: {
        [Op.between]: [1, 8]
      }
    }, {});
  },
}