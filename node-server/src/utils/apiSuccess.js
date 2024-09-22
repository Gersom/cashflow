const { serv } = require('@config/env')

const responseSuccess = (message = 'success', data = null) => {
  const response = { message, success: true }

  if (serv.nodeEnv === 'development') {
    if (data) response.data = data
    return response
  } else return response
}

const dataSuccess = (message = 'success', data = null) => {
  const response = { message, data, success: true }

  if (data instanceof Array) response.count = data.length

  return response
}

module.exports = {
  responseSuccess,
  dataSuccess
}