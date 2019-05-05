import Negotiator from '../../src'

function createRequest(headers) {
  const request = {
    headers: {},
  }

  if (headers) {
    Object.keys(headers).forEach((key) => {
      request.headers[key.toLowerCase()] = headers[key]
    })
  }

  return request
}

const Context = {
  getNegotiator(accept, name = '') {
    if (name) name = `-${name}`
    return new Negotiator(createRequest({ [`Accept${name}`]: accept }))
  },
}

export default Context