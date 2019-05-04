import { strictEqual } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Context from '../context'

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const encoding = {
  context: Context,
  'when no Accept-Encoding': {
    'returns identity'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Encoding').encoding(), 'identity')
    },
  },
  'when Accept-Encoding: *': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Encoding').encoding(), '*')
    },
  },
  'when Accept-Encoding: *, gzip': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, gzip', 'Encoding').encoding(), '*')
    },
  },
  'when Accept-Encoding: *, gzip;q=0': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, gzip;q=0', 'Encoding').encoding(), '*')
    },
  },
  'when Accept-Encoding: *;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0', 'Encoding').encoding(), undefined)
    },
  },
  'when Accept-Encoding: *;q=0, identity;q=1': {
    'returns identity'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encoding(), 'identity')
    },
  },
  'when Accept-Encoding: identity': {
    'returns identity'({ getNegotiator }) {
      strictEqual(getNegotiator('identity', 'Encoding').encoding(), 'identity')
    },
  },
  'when Accept-Encoding: identity;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('identity;q=0', 'Encoding').encoding(), undefined)
    },
  },
  'when Accept-Encoding: gzip': {
    'returns gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip', 'Encoding').encoding(), 'gzip')
    },
  },
  'when Accept-Encoding: gzip, compress;q=0': {
    'returns gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encoding(), 'gzip')
    },
  },
  'when Accept-Encoding: gzip, deflate': {
    'returns gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip, deflate', 'Encoding').encoding(), 'gzip')
    },
  },
  'when Accept-Encoding: gzip;q=0.8, deflate': {
    'returns deflate'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encoding(), 'deflate')
    },
  },
  'when Accept-Encoding: gzip;q=0.8, identity;q=0.5, *;q=0.3': {
    'returns gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encoding(), 'gzip')
    },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const encodingArray = {
  context: Context,
  'when no Accept-Encoding': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Encoding').encoding([]), undefined)
    },
    'only matches identity'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator(undefined, 'Encoding').encoding(['gzip']), undefined)
    },
  },
  'when Accept-Encoding: *': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Encoding').encoding([]), undefined)
    },
    'returns first item in list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator('*', 'Encoding').encoding(['gzip']), 'gzip')
      strictEqual(getNegotiator('*', 'Encoding').encoding(['gzip', 'identity']), 'gzip')
    },
  },
  'when Accept-Encoding: *, gzip': {
    'prefers gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('*, gzip', 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator('*, gzip', 'Encoding').encoding(['gzip']), 'gzip')
      strictEqual(getNegotiator('*, gzip', 'Encoding').encoding(['compress', 'gzip']), 'gzip')
    },
  },
  'when Accept-Encoding: *, gzip;q=0': {
    'excludes gzip'({ getNegotiator }) {
      strictEqual(getNegotiator('*, gzip;q=0', 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator('*, gzip;q=0', 'Encoding').encoding(['gzip']), undefined)
      strictEqual(getNegotiator('*, gzip;q=0', 'Encoding').encoding(['gzip', 'compress']), 'compress')
    },
  },
  'when Accept-Encoding: *;q=0': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0', 'Encoding').encoding([]), undefined)
    },
    'matches nothing'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0', 'Encoding').encoding(['identity']), undefined)
      strictEqual(getNegotiator('*;q=0', 'Encoding').encoding(['gzip']), undefined)
    },
  },
  'when Accept-Encoding: *;q=0, identity;q=1': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encoding([]), undefined)
    },
    'still matches identity'({ getNegotiator }) {
      strictEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encoding(['gzip']), undefined)
    },
  },
  'when Accept-Encoding: identity': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('identity', 'Encoding').encoding([]), undefined)
    },
    'only matches identity'({ getNegotiator }) {
      strictEqual(getNegotiator('identity', 'Encoding').encoding(['identity']), 'identity')
      strictEqual(getNegotiator('identity', 'Encoding').encoding(['gzip']), undefined)
    },
  },
  'when Accept-Encoding: identity;q=0': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('identity;q=0', 'Encoding').encoding([]), undefined)
    },
    'matches nothing'({ getNegotiator }) {
      strictEqual(getNegotiator('identity;q=0', 'Encoding').encoding(['identity']), undefined)
      strictEqual(getNegotiator('identity;q=0', 'Encoding').encoding(['gzip']), undefined)
    },
  },
  'when Accept-Encoding: gzip': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip', 'Encoding').encoding([]), undefined)
    },
    'returns client-preferred encodings'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip', 'Encoding').encoding(['gzip']), 'gzip')
      strictEqual(getNegotiator('gzip', 'Encoding').encoding(['identity', 'gzip']), 'gzip')
      strictEqual(getNegotiator('gzip', 'Encoding').encoding(['identity']), 'identity')
    },
  },
  'when Accept-Encoding: gzip, compress;q=0': {
    'does not return compress'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encoding(['compress']), undefined)
      strictEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encoding(['deflate', 'compress']), undefined)
      strictEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encoding(['gzip', 'compress']), 'gzip')
    },
  },
  'when Accept-Encoding: gzip, deflate': {
    'returns first client-preferred encoding'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip, deflate', 'Encoding').encoding(['deflate', 'compress']), 'deflate')
    },
  },
  'when Accept-Encoding: gzip;q=0.8, deflate': {
    'returns most client-preferred encoding'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encoding(['gzip']), 'gzip')
      strictEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encoding(['deflate']), 'deflate')
      strictEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encoding(['deflate', 'gzip']), 'deflate')
    },
  },
  'when Accept-Encoding: gzip;q=0.8, identity;q=0.5, *;q=0.3': {
    'returns most client-preferred encoding'({ getNegotiator }) {
      strictEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encoding(['gzip']), 'gzip')
      strictEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encoding(['compress', 'identity']), 'identity')
    },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const encodings = {
  context: Context,
  'when no Accept-Encoding': {
    'returns identity'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Encoding').encodings(), ['identity'])
    },
  },
  'when Accept-Encoding: *': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Encoding').encodings(), ['*'])
    },
  },
  'when Accept-Encoding: *, gzip': {
    'prefers gzip'({ getNegotiator }) {
      deepEqual(getNegotiator('*, gzip', 'Encoding').encodings(), ['*', 'gzip'])
    },
  },
  'when Accept-Encoding: *, gzip;q=0': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator('*, gzip;q=0', 'Encoding').encodings(), ['*'])
    },
  },
  'when Accept-Encoding: *;q=0': {
    'returns an empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0', 'Encoding').encodings(), [])
    },
  },
  'when Accept-Encoding: *;q=0, identity;q=1': {
    'returns identity'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encodings(), ['identity'])
    },
  },
  'when Accept-Encoding: identity': {
    'returns identity'({ getNegotiator }) {
      deepEqual(getNegotiator('identity', 'Encoding').encodings(), ['identity'])
    },
  },
  'when Accept-Encoding: identity;q=0': {
    'returns an empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('identity;q=0', 'Encoding').encodings(), [])
    },
  },
  'when Accept-Encoding: gzip': {
    'returns gzip, identity'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(), ['gzip', 'identity'])
    },
  },
  'when Accept-Encoding: gzip, compress;q=0': {
    'does not return compress'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encodings(), ['gzip', 'identity'])
    },
  },
  'when Accept-Encoding: gzip, deflate': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip, deflate', 'Encoding').encodings(), ['gzip', 'deflate', 'identity'])
    },
  },
  'when Accept-Encoding: gzip;q=0.8, deflate': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encodings(), ['deflate', 'gzip', 'identity'])
    },
  },
  'when Accept-Encoding: gzip;foo=bar;q=1, deflate;q=1': {
    'returns client-preferred encodings'({ getNegotiator }) {
      const res = getNegotiator('gzip;foo=bar;q=1, deflate;q=1', 'Encoding').encodings()
      deepEqual(res, ['gzip', 'deflate', 'identity'])
    },
  },
  'when Accept-Encoding: gzip;q=0.8, identity;q=0.5, *;q=0.3': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encodings(), ['gzip', 'identity', '*'])
    },
  },
}
/** @type {Object<string, Object.<string, (c:Context)>>} */
export const encodingsArray = {
  context: Context,
  'when no Accept-Encoding': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Encoding').encodings([]), [])
    },
    'only matches identity'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator(undefined, 'Encoding').encodings(['gzip']), [])
    },
  },
  'when Accept-Encoding: *': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Encoding').encodings([]), [])
    },
    'returns original list'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator('*', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('*', 'Encoding').encodings(['gzip', 'identity']), ['gzip', 'identity'])
    },
  },
  'when Accept-Encoding: *, gzip': {
    'prefers gzip'({ getNegotiator }) {
      deepEqual(getNegotiator('*, gzip', 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator('*, gzip', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('*, gzip', 'Encoding').encodings(['compress', 'gzip']), ['gzip', 'compress'])
    },
  },
  'when Accept-Encoding: *, gzip;q=0': {
    'excludes gzip'({ getNegotiator }) {
      deepEqual(getNegotiator('*, gzip;q=0', 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator('*, gzip;q=0', 'Encoding').encodings(['gzip']), [])
      deepEqual(getNegotiator('*, gzip;q=0', 'Encoding').encodings(['gzip', 'compress']), ['compress'])
    },
  },
  'when Accept-Encoding: *;q=0': {
    'always returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0', 'Encoding').encodings([]), [])
      deepEqual(getNegotiator('*;q=0', 'Encoding').encodings(['identity']), [])
      deepEqual(getNegotiator('*;q=0', 'Encoding').encodings(['gzip']), [])
    },
  },
  'when Accept-Encoding: *;q=0, identity;q=1': {
    'matches identity'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encodings([]), [])
      deepEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator('*;q=0, identity;q=1', 'Encoding').encodings(['gzip']), [])
    },
  },
  'when Accept-Encoding: identity': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('identity', 'Encoding').encodings([]), [])
    },
    'only matches identity'({ getNegotiator }) {
      deepEqual(getNegotiator('identity', 'Encoding').encodings(['identity']), ['identity'])
      deepEqual(getNegotiator('identity', 'Encoding').encodings(['gzip']), [])
    },
  },
  'when Accept-Encoding: identity;q=0': {
    'always returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('identity;q=0', 'Encoding').encodings([]), [])
      deepEqual(getNegotiator('identity;q=0', 'Encoding').encodings(['identity']), [])
      deepEqual(getNegotiator('identity;q=0', 'Encoding').encodings(['gzip']), [])
    },
  },
  'when Accept-Encoding: gzip': {
    'returns empty list for empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip', 'Encoding').encodings([]), [])
    },
    'is case insensitive, returning provided casing'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['GZIP']), ['GZIP'])
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['gzip', 'GZIP']), ['gzip', 'GZIP'])
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['GZIP', 'gzip']), ['GZIP', 'gzip'])
    },
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['gzip', 'identity']), ['gzip', 'identity'])
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['identity', 'gzip']), ['gzip', 'identity'])
      deepEqual(getNegotiator('gzip', 'Encoding').encodings(['identity']), ['identity'])
    },
  },
  'when Accept-Encoding: gzip, compress;q=0': {
    'does not return compress'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip, compress;q=0', 'Encoding').encodings(['gzip', 'compress']), ['gzip'])
    },
  },
  'when Accept-Encoding: gzip, deflate': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip, deflate', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('gzip, deflate', 'Encoding').encodings(['gzip', 'identity']), ['gzip', 'identity'])
      deepEqual(getNegotiator('gzip, deflate', 'Encoding').encodings(['deflate', 'gzip']), ['gzip', 'deflate'])
      deepEqual(getNegotiator('gzip, deflate', 'Encoding').encodings(['identity']), ['identity'])
    },
  },
  'when Accept-Encoding: gzip;q=0.8, deflate': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encodings(['deflate']), ['deflate'])
      deepEqual(getNegotiator('gzip;q=0.8, deflate', 'Encoding').encodings(['deflate', 'gzip']), ['deflate', 'gzip'])
    },
  },
  'when Accept-Encoding: gzip;q=0.8, identity;q=0.5, *;q=0.3': {
    'returns client-preferred encodings'({ getNegotiator }) {
      deepEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encodings(['gzip']), ['gzip'])
      deepEqual(getNegotiator('gzip;q=0.8, identity;q=0.5, *;q=0.3', 'Encoding').encodings(['identity', 'gzip', 'compress']), ['gzip', 'identity', 'compress'])
    },
  },
}