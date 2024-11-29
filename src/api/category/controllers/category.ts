/**
 * category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::category.category',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::category.category").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::category.category").search(ctx);
    },
}));