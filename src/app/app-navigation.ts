export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Movie',
    icon: 'folder',
    items: [
      {
        text: '내 정보',
        path: '/profile'
      },
      {
        text: '영화 목록',
        path: '/movie'
      },
      {
        text: '예매 목록',
        path: '/reservation'
      }
    ]
  }
];
