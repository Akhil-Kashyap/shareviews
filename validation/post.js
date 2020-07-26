const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.keyword = !isEmpty(data.keyword) ? data.keyword : "";

  if (validator.isEmpty(data.keyword)) {
    errors.keyword = "Keyword is required";
  }

  if (validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  if (data.latitude < -90 || data.latitude > 90) {
    errors.latitude = "Invalid Latitude";
  }

  if (data.longitude < -180 || data.longitude > 180) {
    errors.longitude = "Invalid Longitude";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
