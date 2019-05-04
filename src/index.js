import preferredCharsets from './lib/charset'
import preferredEncodings from './lib/encoding'
import preferredLanguages from './lib/language'
import preferredMediaTypes from './lib/mediaType'

export default class Negotiator {
  /** @param {!http.IncomingMessage} request */
  constructor(request) {
    this.request = request
  }
  /** @param {!Array<string>} available */
  charset(available) {
    const set = this.charsets(available)
    return set && set[0]
  }
  /** @param {!Array<string>} available */
  charsets(available) {
    return preferredCharsets(this.request.headers['accept-charset'], available)
  }
  /** @param {!Array<string>} available */
  encoding(available) {
    var set = this.encodings(available)
    return set && set[0]
  }
  /** @param {!Array<string>} available */
  encodings(available) {
    return preferredEncodings(this.request.headers['accept-encoding'], available)
  }
  /** @param {!Array<string>} available */
  language(available) {
    var set = this.languages(available)
    return set && set[0]
  }
  /** @param {!Array<string>} available */
  languages(available) {
    return preferredLanguages(this.request.headers['accept-language'], available)
  }
  /** @param {!Array<string>} available */
  mediaType(available) {
    var set = this.mediaTypes(available)
    return set && set[0]
  }
  /** @param {!Array<string>} available */
  mediaTypes(available) {
    return preferredMediaTypes(this.request.headers['accept'], available)
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */

/**
 * @license MIT
 * Copyright(c) 2012 Federico Romero
 * Copyright(c) 2012-2014 Isaac Z. Schlueter
 * Copyright(c) 2015 Douglas Christopher Wilson
 * https://www.npmjs.com/package/negotiator
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */