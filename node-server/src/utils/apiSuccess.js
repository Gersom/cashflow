const { serv } = require("@config/env")

const responseSuccess = (message = 'success', data=null) => {
  let response = { message, success: true };

  if (serv.nodeEnv === 'development') {
    if (data) response.data = data
    return response;
  }
  else return response;
};

const dataSuccess = (message = 'success', data=null) => {
  return { message, data, success: true };
};

module.exports = {
  responseSuccess,
  dataSuccess
};