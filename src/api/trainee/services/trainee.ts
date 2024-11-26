/**
 * Trainee service
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::trainee.trainee',
    ({ strapi }) => ({
        async count(ctx) {
            const { ...otherQueryParams } = ctx.request.query;

            const filters = {
                ...otherQueryParams
            }

            const trainee = await strapi.documents('api::trainee.trainee').findMany({
                status: 'published',
                filters: filters
            });

            const res = {
                count: trainee.length
            }

            return res;
        },

        async search(ctx) {
            const userId = ctx.state.user.id;
            const userBranches = await strapi.db.query('plugin::users-permissions.user').findOne({
                where: { id: userId },
                populate: {
                  branches: true,
                },
                select: [],
              });
            const branchIds = userBranches?.branches.map(branch => branch.id) || [];
            
            const { query, start, limit } = ctx.request.query;
            const filters = {
                ...(query && {
                  $or: [
                    { name_tc: { $contains: query } },
                    { name_en: { $contains: query } },
                    { address: { $contains: query } },
                    { email: { $contains: query } },
                    { phone: { $contains: query } },
                    { trainee_no: { $contains: query } },
                  ],
                }),
                branch: {
                  id: { $in: branchIds },
                },
              };

            let res = null;

            if(typeof start!== 'undefined' && typeof limit!== 'undefined'){
                res = await strapi.documents('api::trainee.trainee').findMany({
                    status: 'published',
                    filters: filters,
                    limit: limit,
                    start: start,
                    //populate: ['customer'],
                    populate: {
                      branch: true,
                      image: true,
                    },
                    sort: "join_date:desc",
                });
            }else{
                res = await strapi.documents('api::trainee.trainee').count({
                    filters: filters,
                    populate: {
                      branch: true,
                    },
                });
            }

            console.log(res);
            return res;
        }
    })
);
