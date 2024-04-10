const { csvUpload, csvValidator } = require("./upload.middleware");

module.exports = function (app) {
  app.post(
    "/uploadCsv",
    csvUpload.single("csv"),
    csvValidator,
    (req, res) => {
      res.send(req.file);
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );
};
