const { imageUpload } = require("./upload.middleware");

module.exports = function (app) {
  app.post(
    "/uploadImage",
    imageUpload.single("image"),
    (req, res) => {
      res.send(req.file);
    },
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  );
};
