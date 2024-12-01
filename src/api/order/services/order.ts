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
        },


        async reports() {
            const orders = await strapi.documents('api::order.order').findMany();
            const products = await strapi.documents('api::product.product').findMany();
            const monthlyTotals = new Array(12).fill(0);
            const monthlyOrders = new Array(12).fill(0);
            const monthlyCash = new Array(12).fill(0);
            const monthlyCard = new Array(12).fill(0);

            orders.forEach(order => {
                const orderDate = new Date(order.order_date);
                const month = orderDate.getUTCMonth();
                monthlyTotals[month] += order.amount;
                monthlyOrders[month]++;
                if(order.payment_type=='cash'){
                    monthlyCash[month]++;
                }else if(order.payment_type=='card'){
                    monthlyCard[month]++;
                }
            });

            const monthlyPayment = monthlyCash.map((cash, index) => ({
                cash,
                card: monthlyCard[index],
            }));

            const inventory = {
                labels: products.map(product => product.name),
                series: products.map(product => product.quantity)
            };

            return { monthlyTotals, monthlyOrders, monthlyPayment, inventory };
        }
    })
);
