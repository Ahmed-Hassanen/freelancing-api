class HttpError extends Error {
  // extends the built in error class
  constructor(message, errorCode) {
    super(message); //pass a message property to parent class
    this.code = errorCode; //add a property code which takes given error code
  }
}
module.exports = HttpError;
