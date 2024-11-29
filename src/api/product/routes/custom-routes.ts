export default {
    routes: [
      {
        method: 'GET',
        path: '/product/count',
        handler: 'product.count',
      },
      {
        method: 'GET',
        path: '/product/search',
        handler: 'product.search',
      },
    ]
  }