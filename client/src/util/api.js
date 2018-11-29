// Defines requestHeaders object
const REQUEST_HEADERS = {
  'Content-Type': 'application/json'
}

// Generic function for getting a specific cookie by name from the browser
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
function buildRequest (options) {
  // Defines request headers
  let requestHeaders = { ...REQUEST_HEADERS }

  // Adds `Authorization` header to request if token parameter is defined
  if (options.token) requestHeaders['Authorization'] = `Bearer ${options.token}`

  // Returns request object
  let csrftoken = getCookie('csrftoken');
  let headers = new Headers(requestHeaders);
  headers.append('X-CSRFToken', csrftoken);

  let req = { method: "POST", headers: headers, credentials: 'include' }

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

export const $REQUEST = function (url, options = {}) {
  return fetch(url, buildRequest(options))
  .then(handleErrors)
  .then((response) => { return response.json() })
}
