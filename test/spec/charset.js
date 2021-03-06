import { strictEqual } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Context from '../context'

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const charset = {
  context: Context,
  'when no Accept-Charset': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Charset').charset(), '*')
    },
  },
  'when Accept-Charset: *': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Charset').charset(), '*')
    },
  },
  'when Accept-Charset: *, UTF-8': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, UTF-8', 'Charset').charset(), '*')
    },
  },
  'when Accept-Charset: *, UTF-8;q=0': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charset(), '*')
    },
  },
  'when Accept-Charset: ISO-8859-1': {
    'returns ISO-8859-1'({ getNegotiator }) {
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(), 'ISO-8859-1')
    },
  },
  'when Accept-Charset: UTF-8;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0', 'Charset').charset(), undefined)
    },
  },
  'when Accept-Charset: UTF-8, ISO-8859-1': {
    'returns UTF-8'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charset(), 'UTF-8')
    },
  },
  'when Accept-Charset: UTF-8;q=0.8, ISO-8859-1': {
    'returns ISO-8859-1'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charset(), 'ISO-8859-1')
    },
  },
  'when Accept-Charset: UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7': {
    'returns UTF-8'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charset(), 'UTF-8')
    },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const charsetArray = {
  context: Context,
  'when no Accept-Charset': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Charset').charset([]), undefined)
    },
    'returns first type in list'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Charset').charset(['UTF-8']), 'UTF-8')
      strictEqual(getNegotiator(undefined, 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'UTF-8')
    },
  },
  'when Accept-Charset: *': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Charset').charset([]), undefined)
    },
    'returns first type in list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Charset').charset(['UTF-8']), 'UTF-8')
      strictEqual(getNegotiator('*', 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'UTF-8')
    },
  },
  'when Accept-Charset: *, UTF-8': {
    'returns first type in list'({ getNegotiator }) {
      strictEqual(getNegotiator('*, UTF-8', 'Charset').charset(['UTF-8']), 'UTF-8')
      strictEqual(getNegotiator('*, UTF-8', 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'UTF-8')
    },
  },
  'when Accept-Charset: *, UTF-8;q=0': {
    'returns most client-preferred charset'({ getNegotiator }) {
      strictEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'ISO-8859-1')
    },
    'excludes UTF-8'({ getNegotiator }) {
      strictEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charset(['UTF-8']), undefined)
    },
  },
  'when Accept-Charset: ISO-8859-1': {
    'returns matching charset'({ getNegotiator }) {
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['ISO-8859-1']), 'ISO-8859-1')
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'ISO-8859-1')
    },
    'is case insensitive, returning provided casing'({ getNegotiator }) {
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['iso-8859-1']), 'iso-8859-1')
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['iso-8859-1', 'ISO-8859-1']), 'iso-8859-1')
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['ISO-8859-1', 'iso-8859-1']), 'ISO-8859-1')
    },
    'returns undefined when no matching charsets'({ getNegotiator }) {
      strictEqual(getNegotiator('ISO-8859-1', 'Charset').charset(['utf-8']), undefined)
    },
  },
  'when Accept-Charset: UTF-8;q=0': {
    'always returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0', 'Charset').charset(['ISO-8859-1']), undefined)
      strictEqual(getNegotiator('UTF-8;q=0', 'Charset').charset(['UTF-8', 'KOI8-R', 'ISO-8859-1']), undefined)
      strictEqual(getNegotiator('UTF-8;q=0', 'Charset').charset(['KOI8-R']), undefined)
    },
  },
  'when Accept-Charset: UTF-8, ISO-8859-1': {
    'returns first matching charset'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charset(['ISO-8859-1']), 'ISO-8859-1')
      strictEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charset(['UTF-8', 'KOI8-R', 'ISO-8859-1']), 'UTF-8')
    },
    'returns undefined when no matching charsets'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charset(['KOI8-R']), undefined)
    },
  },
  'when Accept-Charset: UTF-8;q=0.8, ISO-8859-1': {
    'returns most client-preferred charset'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charset(['ISO-8859-1']), 'ISO-8859-1')
      strictEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charset(['UTF-8', 'KOI8-R', 'ISO-8859-1']), 'ISO-8859-1')
      strictEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charset(['UTF-8', 'KOI8-R']), 'UTF-8')
    },
  },
  'when Accept-Charset: UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7': {
    'uses highest perferred order on duplicate'({ getNegotiator }) {
      strictEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charset(['ISO-8859-1']), 'ISO-8859-1')
      strictEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charset(['UTF-8', 'ISO-8859-1']), 'UTF-8')
      strictEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charset(['ISO-8859-1', 'UTF-8']), 'UTF-8')
    },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const charsets = {
  context: Context,
  'when no Accept-Charset': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Charset').charsets(), ['*'])
    },
  },
  'when Accept-Charset: *': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Charset').charsets(), ['*'])
    },
  },
  'when Accept-Charset: *, UTF-8': {
    'returns client-preferred charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('*, UTF-8', 'Charset').charsets(), ['*', 'UTF-8'])
    },
  },
  'when Accept-Charset: *, UTF-8;q=0': {
    'excludes UTF-8'({ getNegotiator }) {
      deepEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charsets(), ['*'])
    },
  },
  'when Accept-Charset: UTF-8;q=0': {
    'returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0', 'Charset').charsets(), [])
    },
  },
  'when Accept-Charset: ISO-8859-1': {
    'returns client-preferred charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(), ['ISO-8859-1'])
    },
  },
  'when Accept-Charset: UTF-8, ISO-8859-1': {
    'returns client-preferred charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charsets(), ['UTF-8', 'ISO-8859-1'])
    },
  },
  'when Accept-Charset: UTF-8;q=0.8, ISO-8859-1': {
    'returns client-preferred charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charsets(), ['ISO-8859-1', 'UTF-8'])
    },
  },
  'when Accept-Charset: UTF-8;foo=bar;q=1, ISO-8859-1;q=1': {
    'returns client-preferred charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;foo=bar;q=1, ISO-8859-1;q=1', 'Charset').charsets(), ['UTF-8', 'ISO-8859-1'])
    },
  },
  'when Accept-Charset: UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7': {
    // 'uses highest perferred order on duplicate'({ getNegotiator }) {
    //   deepEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charsets(), ['UTF-8', 'ISO-8859-1'])
    // },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const charsetsArray = {
  context: Context,
  'when no Accept-Charset': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Charset').charsets([]), [])
    },
    'returns original list'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Charset').charsets(['UTF-8']), ['UTF-8'])
      deepEqual(getNegotiator(undefined, 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['UTF-8', 'ISO-8859-1'])
    },
  },
  'when Accept-Charset: *': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Charset').charsets([]), [])
    },
    'returns original list'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Charset').charsets(['UTF-8']), ['UTF-8'])
      deepEqual(getNegotiator('*', 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['UTF-8', 'ISO-8859-1'])
    },
  },
  'when Accept-Charset: *, UTF-8': {
    'returns matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('*, UTF-8', 'Charset').charsets(['UTF-8']), ['UTF-8'])
      deepEqual(getNegotiator('*, UTF-8', 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['UTF-8', 'ISO-8859-1'])
    },
  },
  'when Accept-Charset: *, UTF-8;q=0': {
    'excludes UTF-8'({ getNegotiator }) {
      deepEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charsets(['UTF-8']), [])
      deepEqual(getNegotiator('*, UTF-8;q=0', 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['ISO-8859-1'])
    },
  },
  'when Accept-Charset: UTF-8;q=0': {
    'always returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0', 'Charset').charsets(['ISO-8859-1']), [])
      deepEqual(getNegotiator('UTF-8;q=0', 'Charset').charsets(['UTF-8', 'KOI8-R', 'ISO-8859-1']), [])
      deepEqual(getNegotiator('UTF-8;q=0', 'Charset').charsets(['KOI8-R']), [])
    },
  },
  'when Accept-Charset: ISO-8859-1': {
    'returns matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['ISO-8859-1']), ['ISO-8859-1'])
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['ISO-8859-1'])
    },
    'is case insensitive, returning provided casing'({ getNegotiator }) {
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['iso-8859-1']), ['iso-8859-1'])
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['iso-8859-1', 'ISO-8859-1']), ['iso-8859-1', 'ISO-8859-1'])
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['ISO-8859-1', 'iso-8859-1']), ['ISO-8859-1', 'iso-8859-1'])
    },
    'returns empty list when no matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('ISO-8859-1', 'Charset').charsets(['utf-8']), [])
    },
  },
  'when Accept-Charset: UTF-8, ISO-8859-1': {
    'returns matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charsets(['ISO-8859-1']), ['ISO-8859-1'])
      deepEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charsets(['UTF-8', 'KOI8-R', 'ISO-8859-1']), ['UTF-8', 'ISO-8859-1'])
    },
    'returns empty list when no matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8, ISO-8859-1', 'Charset').charsets(['KOI8-R']), [])
    },
  },
  'when Accept-Charset: UTF-8;q=0.8, ISO-8859-1': {
    'returns matching charsets in client-preferred order'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charsets(['ISO-8859-1']), ['ISO-8859-1'])
      deepEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charsets(['UTF-8', 'KOI8-R', 'ISO-8859-1']), ['ISO-8859-1', 'UTF-8'])
    },
    'returns empty list when no matching charsets'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0.8, ISO-8859-1', 'Charset').charsets(['KOI8-R']), [])
    },
  },
  'when Accept-Charset: UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7': {
    'uses highest perferred order on duplicate'({ getNegotiator }) {
      deepEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charsets(['ISO-8859-1']), ['ISO-8859-1'])
      deepEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charsets(['UTF-8', 'ISO-8859-1']), ['UTF-8', 'ISO-8859-1'])
      deepEqual(getNegotiator('UTF-8;q=0.9, ISO-8859-1;q=0.8, UTF-8;q=0.7', 'Charset').charsets(['ISO-8859-1', 'UTF-8']), ['UTF-8', 'ISO-8859-1'])
    },
  },
}