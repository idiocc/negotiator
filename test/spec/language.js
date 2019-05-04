import { strictEqual } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Context from '../context'

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const language = {
  context: Context,
  'when no Accept-Charset': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Language').language(), '*')
    },
  },
  'when Accept-Charset: *': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Language').language(), '*')
    },
  },
  'when Accept-Charset: *, en': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en', 'Language').language(), '*')
    },
  },
  'when Accept-Charset: *, en;q=0': {
    'returns *'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en;q=0', 'Language').language(), '*')
    },
  },
  'when Accept-Charset: *;q=0.8, en, es': {
    'returns en'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0.8, en, es', 'Language').language(), 'en')
    },
  },
  'when Accept-Charset: en': {
    'returns en'({ getNegotiator }) {
      strictEqual(getNegotiator('en', 'Language').language(), 'en')
    },
  },
  'when Accept-Charset: en;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0', 'Language').language(), undefined)
    },
  },
  'when Accept-Charset: en;q=0.8, es': {
    'returns es'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0.8, es', 'Language').language(), 'es')
    },
  },
  'when Accept-Charset: en;q=0.9, es;q=0.8, en;q=0.7': {
    'returns en'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').language(), 'en')
    },
  },
  'when Accept-Charset: en-US, en;q=0.8': {
    'returns en-US'({ getNegotiator }) {
      strictEqual(getNegotiator('en-US, en;q=0.8', 'Language').language(), 'en-US')
    },
  },
  'when Accept-Charset: en-US, en-GB': {
    'returns en-US'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en-GB', 'Language').language(), 'en-US')
    },
  },
  'when Accept-Charset: en-US;q=0.8, es': {
    'returns es'({ getNegotiator }) {
      strictEqual(getNegotiator('en-US;q=0.8, es', 'Language').language(), 'es')
    },
  },
  'when Accept-Charset: nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro': {
    'returns fr'({ getNegotiator }) {
      strictEqual(getNegotiator('nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro', 'Language').language(), 'fr')
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const languageArray = {
  context: Context,
  'when no Accept-Charset': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Language').language([]), undefined)
    },
    'returns first language in list'({ getNegotiator }) {
      strictEqual(getNegotiator(undefined, 'Language').language(['en']), 'en')
      strictEqual(getNegotiator(undefined, 'Language').language(['es', 'en']), 'es')
    },
  },
  'when Accept-Charset: *': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Language').language([]), undefined)
    },
    'returns first language in list'({ getNegotiator }) {
      strictEqual(getNegotiator('*', 'Language').language(['en']), 'en')
      strictEqual(getNegotiator('*', 'Language').language(['es', 'en']), 'es')
    },
  },
  'when Accept-Charset: *, en': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en', 'Language').language([]), undefined)
    },
    'returns most preferred language'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en', 'Language').language(['en']), 'en')
      strictEqual(getNegotiator('*, en', 'Language').language(['es', 'en']), 'en')
    },
  },
  'when Accept-Charset: *, en;q=0': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en;q=0', 'Language').language([]), undefined)
    },
    'excludes en'({ getNegotiator }) {
      strictEqual(getNegotiator('*, en;q=0', 'Language').language(['en']), undefined)
      strictEqual(getNegotiator('*, en;q=0', 'Language').language(['es', 'en']), 'es')
    },
  },
  'when Accept-Charset: *;q=0.8, en, es': {
    'prefers en and es over everything'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0.8, en, es', 'Language').language(['en', 'nl']), 'en')
      deepEqual(getNegotiator('*;q=0.8, en, es', 'Language').language(['ro', 'nl']), 'ro')
    },
  },
  'when Accept-Charset: en': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('en', 'Language').language([]), undefined)
    },
    'returns preferred language'({ getNegotiator }) {
      strictEqual(getNegotiator('en', 'Language').language(['en']), 'en')
      strictEqual(getNegotiator('en', 'Language').language(['es', 'en']), 'en')
    },
    'accepts en-US, preferring en over en-US'({ getNegotiator }) {
      strictEqual(getNegotiator('en', 'Language').language(['en-US']), 'en-US')
      strictEqual(getNegotiator('en', 'Language').language(['en-US', 'en']), 'en')
      strictEqual(getNegotiator('en', 'Language').language(['en', 'en-US']), 'en')
    },
  },
  'when Accept-Charset: en;q=0': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0', 'Language').language([]), undefined)
    },
    'returns preferred language'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0', 'Language').language(['es', 'en']), undefined)
    },
  },
  'when Accept-Charset: en;q=0.8, es': {
    'returns undefined for empty list'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0.8, es', 'Language').language([]), undefined)
    },
    'returns preferred language'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0.8, es', 'Language').language(['en']), 'en')
      strictEqual(getNegotiator('en;q=0.8, es', 'Language').language(['en', 'es']), 'es')
    },
  },
  'when Accept-Charset: en;q=0.9, es;q=0.8, en;q=0.7': {
    'uses highest preferred order on duplicate'({ getNegotiator }) {
      strictEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').language(['es']), 'es')
      strictEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').language(['en', 'es']), 'en')
      strictEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').language(['es', 'en']), 'en')
    },
  },
  'when Accept-Charset: en-US, en;q=0.8': {
    'uses prefer en-US over en'({ getNegotiator }) {
      strictEqual(getNegotiator('en-US, en;q=0.8', 'Language').language(['en', 'en-US']), 'en-US')
      strictEqual(getNegotiator('en-US, en;q=0.8', 'Language').language(['en-GB', 'en-US']), 'en-US')
      strictEqual(getNegotiator('en-US, en;q=0.8', 'Language').language(['en-GB', 'es']), 'en-GB')
    },
  },
  'when Accept-Charset: en-US, en-GB': {
    'prefers en-US'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en-GB', 'Language').language(['en-US', 'en-GB']), 'en-US')
      deepEqual(getNegotiator('en-US, en-GB', 'Language').language(['en-GB', 'en-US']), 'en-US')
    },
  },
  'when Accept-Charset: en-US;q=0.8, es': {
    'prefers es over en-US'({ getNegotiator }) {
      strictEqual(getNegotiator('en-US;q=0.8, es', 'Language').language(['es', 'en-US']), 'es')
      strictEqual(getNegotiator('en-US;q=0.8, es', 'Language').language(['en-US', 'es']), 'es')
      strictEqual(getNegotiator('en-US;q=0.8, es', 'Language').language(['en-US', 'en']), 'en-US')
    },
  },
  'when Accept-Charset: nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro': {
    'uses prefer fr over nl'({ getNegotiator }) {
      strictEqual(getNegotiator('nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro', 'Language').language(['nl', 'fr']), 'fr')
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const languages = {
  context: Context,
  'when no Accept-Charset': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Language').languages(), ['*'])
    },
  },
  'when Accept-Charset: *': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Language').languages(), ['*'])
    },
  },
  'when Accept-Charset: *, en': {
    'returns *, en'({ getNegotiator }) {
      deepEqual(getNegotiator('*, en', 'Language').languages(), ['*', 'en'])
    },
  },
  'when Accept-Charset: *, en;q=0': {
    'returns *'({ getNegotiator }) {
      deepEqual(getNegotiator('*, en;q=0', 'Language').languages(), ['*'])
    },
  },
  'when Accept-Charset: *;q=0.8, en, es': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0.8, en, es', 'Language').languages(), ['en', 'es', '*'])
    },
  },
  'when Accept-Charset: en': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('en', 'Language').languages(), ['en'])
    },
  },
  'when Accept-Charset: en;q=0': {
    'returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('en;q=0', 'Language').languages(), [])
    },
  },
  'when Accept-Charset: en;q=0.8, es': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('en;q=0.8, es', 'Language').languages(), ['es', 'en'])
    },
  },
  'when Accept-Charset: en;q=0.9, es;q=0.8, en;q=0.7': {
    // 'uses highest preferred order on duplicate'({ getNegotiator }) {
    //   deepEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').languages(), ['en', 'es'])
    // },
  },
  'when Accept-Charset: en-US, en;q=0.8': {
    'returns en-US, en'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en;q=0.8', 'Language').languages(), ['en-US', 'en'])
    },
  },
  'when Accept-Charset: en-US, en-GB': {
    'returns en-US, en-GB'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en-GB', 'Language').languages(), ['en-US', 'en-GB'])
    },
  },
  'when Accept-Charset: en-US;q=0.8, es': {
    'returns es, en-US'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US;q=0.8, es', 'Language').languages(), ['es', 'en-US'])
    },
  },
  'when Accept-Charset: en-US;foo=bar;q=1, en-GB;q=1': {
    'returns en-US, en-GB'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US;foo=bar;q=1, en-GB;q=1', 'Language').languages(), ['en-US', 'en-GB'])
    },
  },
  'when Accept-Charset: nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro': {
    'uses prefer fr over nl'({ getNegotiator }) {
      deepEqual(getNegotiator('nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro', 'Language').languages(), ['fr', 'de', 'en', 'it', 'es', 'pt', 'no', 'se', 'fi', 'ro', 'nl'])
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const languagesArray = {
  context: Context,
  'when no Accept-Charset': {
    'returns original list'({ getNegotiator }) {
      deepEqual(getNegotiator(undefined, 'Language').languages(['en']), ['en'])
      deepEqual(getNegotiator(undefined, 'Language').languages(['es', 'en']), ['es', 'en'])
    },
  },
  'when Accept-Charset: *': {
    'returns original list'({ getNegotiator }) {
      deepEqual(getNegotiator('*', 'Language').languages(['en']), ['en'])
      deepEqual(getNegotiator('*', 'Language').languages(['es', 'en']), ['es', 'en'])
    },
  },
  'when Accept-Charset: *, en': {
    'returns list in client-preferred order'({ getNegotiator }) {
      deepEqual(getNegotiator('*, en', 'Language').languages(['en']), ['en'])
      deepEqual(getNegotiator('*, en', 'Language').languages(['es', 'en']), ['en', 'es'])
    },
  },
  'when Accept-Charset: *, en;q=0': {
    'excludes en'({ getNegotiator }) {
      deepEqual(getNegotiator('*, en;q=0', 'Language').languages(['en']), [])
      deepEqual(getNegotiator('*, en;q=0', 'Language').languages(['es', 'en']), ['es'])
    },
  },
  'when Accept-Charset: *;q=0.8, en, es': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('*;q=0.8, en, es', 'Language').languages(['fr', 'de', 'en', 'it', 'es', 'pt', 'no', 'se', 'fi', 'ro', 'nl']),
        ['en', 'es', 'fr', 'de', 'it', 'pt', 'no', 'se', 'fi', 'ro', 'nl'])
    },
  },
  'when Accept-Charset: en': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('en', 'Language').languages(['en']), ['en'])
      deepEqual(getNegotiator('en', 'Language').languages(['en', 'es']), ['en'])
      deepEqual(getNegotiator('en', 'Language').languages(['es', 'en']), ['en'])
    },
    'accepts en-US, preferring en over en-US'({ getNegotiator }) {
      deepEqual(getNegotiator('en', 'Language').languages(['en-US']), ['en-US'])
      deepEqual(getNegotiator('en', 'Language').languages(['en-US', 'en']), ['en', 'en-US'])
      deepEqual(getNegotiator('en', 'Language').languages(['en', 'en-US']), ['en', 'en-US'])
    },
  },
  'when Accept-Charset: en;q=0': {
    'returns nothing'({ getNegotiator }) {
      deepEqual(getNegotiator('en;q=0', 'Language').languages(['en']), [])
      deepEqual(getNegotiator('en;q=0', 'Language').languages(['en', 'es']), [])
    },
  },
  'when Accept-Charset: en;q=0.8, es': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('en;q=0.8, es', 'Language').languages(['en']), ['en'])
      deepEqual(getNegotiator('en;q=0.8, es', 'Language').languages(['en', 'es']), ['es', 'en'])
      deepEqual(getNegotiator('en;q=0.8, es', 'Language').languages(['es', 'en']), ['es', 'en'])
    },
  },
  'when Accept-Charset: en;q=0.9, es;q=0.8, en;q=0.7': {
    // 'returns preferred languages'({ getNegotiator }) {
    //   deepEqual(getNegotiator('en;q=0.9, es;q=0.8, en;q=0.7', 'Language').languages(['en']), ['en'])
    //   deepEqual(getNegotiator('WHAT', 'Language').languages(['en', 'es']), ['es', 'en'])
    //   deepEqual(getNegotiator('WHAT', 'Language').languages(['es', 'en']), ['es', 'en'])
    // },
  },
  'when Accept-Charset: en-US, en;q=0.8': {
    'is case insensitive'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en;q=0.8', 'Language').languages(['en-us', 'EN']), ['en-us', 'EN'])
    },
    'prefers en-US over en'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en;q=0.8', 'Language').languages(['en-US', 'en']), ['en-US', 'en'])
      deepEqual(getNegotiator('en-US, en;q=0.8', 'Language').languages(['en-GB', 'en-US', 'en']), ['en-US', 'en', 'en-GB'])
    },
  },
  'when Accept-Charset: en-US, en-GB': {
    'prefers en-US over en-GB'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US, en-GB', 'Language').languages(['en-US', 'en-GB']), ['en-US', 'en-GB'])
      deepEqual(getNegotiator('en-US, en-GB', 'Language').languages(['en-GB', 'en-US']), ['en-US', 'en-GB'])
    },
  },
  'when Accept-Charset: en-US;q=0.8, es': {
    'prefers es over en-US'({ getNegotiator }) {
      deepEqual(getNegotiator('en-US;q=0.8, es', 'Language').languages(['en', 'es']), ['es', 'en'])
      deepEqual(getNegotiator('en-US;q=0.8, es', 'Language').languages(['en', 'es', 'en-US']), ['es', 'en-US', 'en'])
    },
  },
  'when Accept-Charset: nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro': {
    'returns preferred languages'({ getNegotiator }) {
      deepEqual(getNegotiator('nl;q=0.5, fr, de, en, it, es, pt, no, se, fi, ro', 'Language').languages(['fr', 'de', 'en', 'it', 'es', 'pt', 'no', 'se', 'fi', 'ro', 'nl']),
        ['fr', 'de', 'en', 'it', 'es', 'pt', 'no', 'se', 'fi', 'ro', 'nl'])
    },
  },
}