/**
 * invoice service
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::invoice.invoice',
    ({ strapi }) => ({
        async count(ctx) {
            const { customerName, ...otherQueryParams } = ctx.request.query;

            // Build the query object dynamically based on the customerName parameter
            //http://localhost:1337/api/invoice/count?customerName=Amy%20Burns
            
            // const whereQuery = {
            //     ...otherQueryParams,
            //     ...(customerName && {
            //         customer: {
            //             name: customerName
            //         }
            //     })
            // };

            // Execute the query with the where condition and customer population
            // const res = await strapi.db.query('api::invoice.invoice').count({
            //     where: whereQuery,
            //     populate: ['customer'],
            // });

            const filters = {
                ...otherQueryParams,
                ...(customerName && {
                    customer: {
                        // name:{
                        //     $startsWith: customerName
                        // }
                        name: customerName
                    }
                })
            }

            // const res = await strapi.documents('api::invoice.invoice').count({
            //     status: 'published',
            //     filters: filters
            // });

            const inv = await strapi.documents('api::invoice.invoice').findMany({
                status: 'published',
                filters: filters
            });

            let totalAmount = 0;

            inv.forEach((invoice) => totalAmount = totalAmount + invoice.amount);

            const res = {
                totalAmount: totalAmount,
                count: inv.length
            }

            return res;
        },

        async search(ctx) {
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                    $or: [
                    {
                        customer: {
                            name_en:{
                                $contains: query
                            },
                        },
                    },{
                        invoice_status:{
                            $contains:query
                        }
                    },{
                        address:{
                            $contains:query
                        }
                    }],
                })
            }

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::invoice.invoice').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                    populate: ['customer'],
                    sort: "date:desc",
                });
            }else{
                res = await strapi.documents('api::invoice.invoice').count({
                    filters: filters,
                    populate: ['customer'],
                });
            }

            return res;
        }
    })
);
