const AppError = require('../models/AppError');
const ResponseCode = require('../models/ResponseCode');

module.exports = class ErrorUtil {
  static generateValidationError(errors) {
    errors.code = ResponseCode.VALIDATION_ERROR;
    errors.msg = ResponseCode.VALIDATION_ERROR_MSG;
    console.log(`FAILED - Validation error occured ${JSON.stringify(errors)}`);

    return new AppError(400, ResponseCode.FAILED, errors);
  }
};
