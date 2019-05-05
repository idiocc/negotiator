const _Negotiator = require('./depack')

class Negotiator extends _Negotiator {
  /**
   * Create a negotiator for the given request.
   * @param {!http.IncomingMessage} request
   */
  constructor(request) {
    super(request)
  }
  /**
   * Returns the most preferred charset from the client.
   * @param {!Array<string>} [available]
   * @return {string}
   */
  charset(available) {
    return super.charset(available)
  }
  /**
   * Returns an array of preferred charsets ordered by the client preference.
   * @param {!Array<string>} [available]
   * @returns {!Array<string>}
   */
  charsets(available) {
    return super.charsets(available)
  }
  /**
   * Returns the most preferred encoding from the client.
   * @param {!Array<string>} [available]
   * @return {string}
   */
  encoding(available) {
    return super.encoding(available)
  }
  /**
   * Returns an array of preferred encodings ordered by the client preference.
   * @param {!Array<string>} [available]
   * @return {!Array<string>}
   */
  encodings(available) {
    return super.encodings(available)
  }
  /**
   * Returns the most preferred language from the client.
   * @param {!Array<string>} [available]
   * @return {string}
   */
  language(available) {
    return super.language(available)
  }
  /**
   * Returns an array of preferred languages ordered by priority from a list of available languages.
   * @param {!Array<string>} [available]
   * @return {!Array<string>}
   */
  languages(available) {
    return super.languages(available)
  }
  /**
   * Returns the most preferred media type from the client.
   * @param {!Array<string>} [available]
   * @return {string}
   */
  mediaType(available) {
    return super.mediaType(available)
  }
  /**
   * Returns an array of preferred media types ordered by priority from a list of available media types.
   * @param {!Array<string>} [available]
   * @return {!Array<string>}
   */
  mediaTypes(available) {
    return super.mediaTypes(available)
  }
}

module.exports = Negotiator

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Negotiator} Negotiator
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */