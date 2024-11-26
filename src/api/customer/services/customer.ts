/**
 * customer service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::customer.customer',
({ strapi }) => ({
    async count(ctx) {
        const { ...otherQueryParams } = ctx.request.query;

        const filters = {
            ...otherQueryParams,
        }

        const res = await strapi.documents('api::customer.customer').count({
            status: 'published',
            filters: filters
        });


        return res;
    }
})
);
