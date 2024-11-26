/**
 * trainee controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::trainee.trainee',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::trainee.trainee").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::trainee.trainee").search(ctx);
    },
  }));
