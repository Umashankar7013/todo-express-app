const multer = require("multer");
const path = require("path");
const csvtojson = require("csvtojson");
const Joi = require("joi");

exports.imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

exports.csvStorage = multer.diskStorage({
  // Destination to store image
  destination: "csvFiles",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});

exports.csvUpload = multer({
  storage: this.csvStorage,
  limits: {
    fileSize: 3000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a csv file"));
    }
    cb(undefined, true);
  },
});

exports.imageUpload = multer({
  storage: this.imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

exports.csvValidator = (req, res, next) => {
  //file path
  let file = req.file.path;

  csvtojson()
    .fromFile(file)
    .then((rows) => {
      let errors = [];
      rows.forEach((obj) => {
        let value = "email" in obj;
        if (!value) {
          errors.push("Error");
          return;
        }
      });

      if (errors.length > 0) {
        console.log("validation error from the CSV file");
        return res
          .status(400)
          .json({ status: 400, message: "Please upload valid CSV" });
      } else {
        req.rows = rows;
        console.log("CSV validated successfully..");
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ status: -1, message: err.message });
    });
};
