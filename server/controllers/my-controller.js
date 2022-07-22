"use strict";

const pluginId = require("../../admin/src/pluginId");

module.exports = {
    index(ctx) {
        ctx.body = strapi.plugin(pluginId).service("myService").getCronList();
    },
    run(ctx) {
        const id = ctx.request.url.split("/")[3];
        ctx.body = strapi.plugin(pluginId).service("myService").runTask(id);
    },
};
