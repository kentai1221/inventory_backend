/**
 * order service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::order.order',
    ({ strapi }) => ({
        async count(ctx) {
            const { ...otherQueryParams } = ctx.request.query;

            const filters = {
                ...otherQueryParams
            }

            const order = await strapi.documents('api::order.order').findMany({
                status: 'published',
                filters: filters
            });

            const res = {
                count: order.length
            }

            return res;
        },

        async search(ctx) {
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                  $or: [
                    { name: { $contains: query } },
                    { order_status: { $contains: query } },
                  ],
                })
              };

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::order.order').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                });
            }else{
                res = await strapi.documents('api::order.order').count({
                    filters: filters,
                });
            }
            return res;
        }
    })
);
