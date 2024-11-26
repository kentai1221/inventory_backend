export default {
    routes: [
      {
        method: 'GET',
        path: '/invoice/count',
        handler: 'invoice.count',
      },
      {
        method: 'GET',
        path: '/invoice/search',
        handler: 'invoice.search',
      },
    //   { // Path defined with a regular expression
    //     method: 'GET',
    //     path: '/restaurants/:region(\\d{2}|\\d{3})/:id', // Only match when the first parameter contains 2 or 3 digits.
    //     handler: 'Restaurant.findOneByRegion',
    //   }
    ]
  }