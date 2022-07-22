"use strict";

const parser = require("cron-parser");
const moment = require("moment");

module.exports = ({ strapi }) => ({
  getCronList() {
    const tasks = strapi.config["cron-tasks"];
    const localMoment = moment();
    localMoment.locale("ru");

    const data = Object.entries(tasks).map(([cron, fn], id) => {
      return {
        id,
        cron,
        nextRun: parser.parseExpression(cron).next(),
        fn,
      };
    });

    console.log(data);

    return data;
  },
  async runTask(id) {
    const tasks = strapi.config["cron-tasks"];
    const [cron, fn] = Object.entries(tasks)[id];

    try {
      await fn({ strapi });
      return { status: "ok" };
    } catch (e) {
      console.error(e);
      return {
        status: "error",
        message: e.message,
      };
    }
  },
});
