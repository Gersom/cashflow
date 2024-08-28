const responseSuccess = (message = 'success', data=null) => {
  let response = { message, success: true };
  if (data) {
    response.data = data;
  }
  return response;
};

module.exports = { responseSuccess };