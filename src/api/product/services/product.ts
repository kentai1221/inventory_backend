/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product',
    ({ strapi }) => ({
        async count(ctx) {
            const { ...otherQueryParams } = ctx.request.query;

            const filters = {
                ...otherQueryParams
            }

            const product = await strapi.documents('api::product.product').findMany({
                status: 'published',
                filters: filters
            });

            const res = {
                count: product.length
            }

            return res;
        },

        async search(ctx) {
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                  $or: [
                    { name: { $contains: query } },
                    { product_status: { $contains: query } },
                  ],
                })
              };

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::product.product').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                    populate: {
                        brand: true,
                        category: true,
                        image: true
                    },
                });
            }else{
                res = await strapi.documents('api::product.product').count({
                    filters: filters,
                    populate: {
                        brand: true,
                        category: true
                    },
                });
            }
            return res;
        }
    })
);
