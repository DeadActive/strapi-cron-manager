"use strict";

module.exports = {
    index(ctx) {
        ctx.body = strapi
            .plugin("cron-manager")
            .service("myService")
            .getCronList();
    },
    run(ctx) {
        const id = ctx.request.url.split("/")[3];
        ctx.body = strapi
            .plugin("cron-manager")
            .service("myService")
            .runTask(id);
    },
};
