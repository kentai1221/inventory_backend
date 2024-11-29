export default {
    routes: [
      {
        method: 'GET',
        path: '/category/count',
        handler: 'category.count',
      },
      {
        method: 'GET',
        path: '/category/search',
        handler: 'category.search',
      },
    ]
  }