/**
 * brand service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::brand.brand',
    ({ strapi }) => ({
        async count(ctx) {
            const { ...otherQueryParams } = ctx.request.query;

            const filters = {
                ...otherQueryParams
            }

            const brand = await strapi.documents('api::brand.brand').findMany({
                status: 'published',
                filters: filters
            });

            const res = {
                count: brand.length
            }

            return res;
        },

        async search(ctx) {
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                  $or: [
                    { name: { $contains: query } },
                    { brand_status: { $contains: query } },
                  ],
                })
              };

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::brand.brand').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                });
            }else{
                res = await strapi.documents('api::brand.brand').count({
                    filters: filters,
                });
            }
            return res;
        }
    })
);
