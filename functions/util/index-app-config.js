exports.appConfig = (app, cors, expressJson, expressUrlEncoded) => {
  app.use(expressJson);
  app.use(expressUrlEncoded);
  app.use(cors);
  app.options("*", cors);
};
