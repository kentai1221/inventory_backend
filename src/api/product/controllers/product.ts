/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::product.product").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::product.product").search(ctx);
    },
}));