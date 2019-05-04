const simpleCharsetRegExp = /^\s*([^\s;]+)\s*(?:;(.*))?$/

/**
 * Parse the Accept-Charset header.
 * @param {string} accept
 * @private
 */
function parseAcceptCharset(accept) {
  const accepts = accept.split(',')

  const res = accepts.map((a, i) => {
    const charset = parseCharset(a.trim(), i)
    if (charset) return charset
  }).filter(Boolean)

  return res
}

/**
 * Parse a charset from the Accept-Charset header.
 * @param {string} str
 * @param {number} i
 * @private
 */
function parseCharset(str, i) {
  const match = simpleCharsetRegExp.exec(str)
  if (!match) return null

  const charset = match[1]
  let q = 1
  if (match[2]) {
    const params = match[2].split(';')
    for (let j = 0; j < params.length; j++) {
      const p = params[j].trim().split('=')
      if (p[0] == 'q') {
        q = parseFloat(p[1])
        break
      }
    }
  }

  return { charset, q, i }
}

/**
 * Get the priority of a charset.
 * @param {string} charset
 * @param {!Array<{ i: number, q: number, charset: string }>} accepted
 * @param {number} index
 */
function getCharsetPriority(charset, accepted, index) {
  let priority = { o: -1, q: 0, s: 0 }

  for (let i = 0; i < accepted.length; i++) {
    const spec = specify(charset, accepted[i], index)

    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
      priority = spec
    }
  }

  return priority
}

/**
 * Get the specificity of the charset.
 * @param {string} charset
 * @param {{ i: number, q: number, charset: string }} spec
 * @private
 */
function specify(charset, spec, i) {
  let s = 0
  if(spec.charset.toLowerCase() === charset.toLowerCase()){
    s |= 1
  } else if (spec.charset != '*' ) return null

  return {
    i,
    s,
    o: spec.i,
    q: spec.q,
  }
}

/**
 * Get the preferred charsets from an Accept-Charset header.
 * @param {string} [accept]
 * @param {!Array<string>} [provided]
 */
export default function preferredCharsets(accept, provided) {
  // RFC 2616 sec 14.2: no header = *
  const accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '')

  if (!provided) {
    // sorted list of all charsets
    return accepts
      .filter(isQuality)
      .sort(compareSpecs)
      .map(getFullCharset)
  }

  const priorities = provided.map((type, i) => {
    return getCharsetPriority(type, accepts, i)
  })

  // sorted list of accepted charsets
  return priorities.filter(isQuality).sort(compareSpecs).map((priority) => {
    return provided[priorities.indexOf(priority)]
  })
}

/**
 * Compare two specs.
 * @param {{ i: number, q: number, charset: string, o: number }} a
 * @param @param {{ i: number, q: number, charset: string, o: number }} b
 * @private
 */
function compareSpecs(a, b) {
  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0
}

/**
 * Get full charset string.
 * @param {{ charset: string }} spec
 * @private
 */
function getFullCharset(spec) {
  return spec.charset
}

/**
 * Check if a spec has any quality.
 * @param {{ q: number }} spec
 * @private
 */
function isQuality(spec) {
  return spec.q > 0
}
