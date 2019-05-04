import Negotiator from '../../src'

function createRequest(headers) {
  const request = {
    headers: {},
  }

  if (headers) {
    Object.keys(headers).forEach(function (key) {
      request.headers[key.toLowerCase()] = headers[key]
    })
  }

  return request
}

const Context = {
  getNegotiator(accept, name = 'Charset') {
    return new Negotiator(createRequest({ [`Accept-${name}`]: accept }))
  },
}

export default Context