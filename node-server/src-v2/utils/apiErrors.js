class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

class AuthorizationError extends Error {
  constructor(message){
    super(message);
    this.name = 'AuthorizationError';
    this.status = 401;
  }
}

class EmailSendError extends Error {
  constructor(message) {
    super(message || 'Error sending email');
    this.name = 'EmailSendError';
    this.status = 500;
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  AuthorizationError,
  EmailSendError 
};
