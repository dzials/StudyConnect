
// REST verbs
const GET = 'get'
const PUT = 'put'
const POST = 'post'
const DELETE = 'delete'

// Defines requestHeaders object
const REQUEST_HEADERS = {
  'Content-Type': 'application/json'
}

function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

// Defines request
function buildRequest (verb, options) {
  // Defines request headers
  let requestHeaders = { ...REQUEST_HEADERS }

  // Adds `Authorization` header to request if token parameter is defined
  if (options.token) requestHeaders['Authorization'] = `Bearer ${options.token}`

  // Returns request object
  let csrftoken = getCookie('csrftoken');
  let headers = new Headers(requestHeaders);
  headers.append('X-CSRFToken', csrftoken);

  let req = { method: verb, headers: headers, credentials: 'include' }

  // Appends body to request if it's defined
  if (options.body) req.body = JSON.stringify(options.body)

  // Returns the request
  return req
}

// TODO - this function should return the server-provided error messages
function handleErrors (response) {
  if (!response.ok) {
    throw Error(response)
  }
  return response
}

// // // //

// $POST helper function
export const $POST = function (url, options = {}) {
  return fetch(url, buildRequest(POST, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $GET Helper function
export const $GET = function (url, options = {}) {
  return fetch(url, buildRequest(GET, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $PUT helper function
export const $PUT = function (url, options = {}) {
  return fetch(url, buildRequest(PUT, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}

// // // //

// $DEL helper function
export const $DEL = function (url, options = {}) {
  return fetch(url, buildRequest(DELETE, options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}
