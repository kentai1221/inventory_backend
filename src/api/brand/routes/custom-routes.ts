export default {
    routes: [
      {
        method: 'GET',
        path: '/brand/count',
        handler: 'brand.count',
      },
      {
        method: 'GET',
        path: '/brand/search',
        handler: 'brand.search',
      },
    ]
  }