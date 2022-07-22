module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/run/:id",
    handler: "myController.run",
    config: {
      policies: [],
    },
  },
];
