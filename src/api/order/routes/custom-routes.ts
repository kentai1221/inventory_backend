export default {
    routes: [
      {
        method: 'GET',
        path: '/order/count',
        handler: 'order.count',
      },
      {
        method: 'GET',
        path: '/order/search',
        handler: 'order.search',
      },
      {
        method: 'GET',
        path: '/order/reports',
        handler: 'order.reports',
      },
    ]
  }