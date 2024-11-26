/**
 * invoice controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::invoice.invoice',({ strapi }) => ({
    async count(ctx) {
        return await strapi.service("api::invoice.invoice").count(ctx);
    },
    async search(ctx) {
        return await strapi.service("api::invoice.invoice").search(ctx);
    },
  }));
