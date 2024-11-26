export default {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/customer/count',
        handler: 'customer.count',
      },
    //   { // Path defined with a regular expression
    //     method: 'GET',
    //     path: '/restaurants/:region(\\d{2}|\\d{3})/:id', // Only match when the first parameter contains 2 or 3 digits.
    //     handler: 'Restaurant.findOneByRegion',
    //   }
    ]
  }