export default function ApiException(response, body) {
  this.name = 'ApiException';
  this.stack = (new Error()).stack;

  if (response) {
    if (response.status < 500) {
      const error = body.data[0];
      const details = JSON.stringify(error.attributes.details);
      this.message = `${response.status} ${error.id} (details: ${details})`;
    } else {
      this.message = `${response.status} ${response.statusText}`;
    }

    this.body = body;
    this.headers = response.headers;
    this.statusCode = response.status;
    this.statusText = response.statusText;
  } else {
    this.message = 'Misconfigured exception';
  }
}

ApiException.prototype = Object.create(Error.prototype);
ApiException.prototype.constructor = ApiException;
