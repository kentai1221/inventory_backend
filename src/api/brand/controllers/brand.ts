/**
 * brand controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::brand.brand',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::brand.brand").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::brand.brand").search(ctx);
    },
  }));
