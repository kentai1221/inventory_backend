export default {
    routes: [
      {
        method: 'GET',
        path: '/trainee/count',
        handler: 'trainee.count',
      },
      {
        method: 'GET',
        path: '/trainee/search',
        handler: 'trainee.search',
      },
    //   { // Path defined with a regular expression
    //     method: 'GET',
    //     path: '/restaurants/:region(\\d{2}|\\d{3})/:id', // Only match when the first parameter contains 2 or 3 digits.
    //     handler: 'Restaurant.findOneByRegion',
    //   }
    ]
  }