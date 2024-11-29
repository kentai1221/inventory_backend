/**
 * category service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category',
    ({ strapi }) => ({
        async count(ctx) {
            const { ...otherQueryParams } = ctx.request.query;

            const filters = {
                ...otherQueryParams
            }

            const category = await strapi.documents('api::category.category').findMany({
                status: 'published',
                filters: filters
            });

            const res = {
                count: category.length
            }

            return res;
        },

        async search(ctx) {
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                  $or: [
                    { name: { $contains: query } },
                    { category_status: { $contains: query } },
                  ],
                })
              };

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::category.category').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                });
            }else{
                res = await strapi.documents('api::category.category').count({
                    filters: filters,
                });
            }
            return res;
        }
    })
);
