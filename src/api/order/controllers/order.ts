/**
 * order controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::order.order").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::order.order").search(ctx);
    },
}));