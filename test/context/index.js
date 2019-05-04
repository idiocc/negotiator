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
  getNegotiator(acceptCharset) {
    return new Negotiator(createRequest({ 'Accept-Charset': acceptCharset }))
  },
}

export default Context