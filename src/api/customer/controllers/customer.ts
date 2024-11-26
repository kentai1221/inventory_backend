/**
 * customer controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::customer.customer',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::customer.customer").count(ctx);
      },
  }));
