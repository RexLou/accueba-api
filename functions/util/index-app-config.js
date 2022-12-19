exports.appConfig = (app, cors, expressJson) => {
  app.use(expressJson);

  app.use(cors);
  app.options("*", cors);
};
