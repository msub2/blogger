'use strict';

// Get the unique error field name
const uniqueMessage = error => {
  let output;

  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf('.$') + 2,
      error.message.lastIndexOf('_1')
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      ' already exists';
  } catch (err) {
    output = 'Unique field already exists';
  }

  return output;
};

// Get error message from error object
const errorHandler = error => {
  let message = '';

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    message = error.message;
  }

  return message;
};

export { errorHandler };