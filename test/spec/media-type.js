import { strictEqual } from 'assert'
import { deepEqual } from '@zoroaster/assert'
import Context from '../context'

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const mediaType = {
  context: Context,
  'when no Accept': {
    'returns */*'({ getNegotiator }) {
      strictEqual(getNegotiator().mediaType(), '*/*')
    },
  },
  'when Accept: */*': {
    'returns */*'({ getNegotiator }) {
      strictEqual(getNegotiator('*/*').mediaType(), '*/*')
    },
  },
  'when Accept: application/json': {
    'returns application/json'({ getNegotiator }) {
      const res = getNegotiator('application/json').mediaType()
      deepEqual(res, 'application/json')
    },
  },
  'when Accept: application/json;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('application/json;q=0').mediaType(), undefined)
    },
  },
  'when Accept: application/json;q=0.2, text/html': {
    'returns text/html'({ getNegotiator }) {
      deepEqual(getNegotiator('application/json;q=0.2, text/html').mediaType(), 'text/html')
    },
  },
  'when Accept: text/*': {
    'returns text/*'({ getNegotiator }) {
      strictEqual(getNegotiator('text/*').mediaType(), 'text/*')
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, */*;q=0.1': {
    'returns text/plain'({ getNegotiator }) {
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1').mediaType(), 'text/plain')
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1': {
    'returns text/plain'({ getNegotiator }) {
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1').mediaType(), 'text/plain')
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const mediaTypeArray = {
  context: Context,
  'when no Accept': {
    'returns first item in list'({ getNegotiator }) {
      strictEqual(getNegotiator().mediaType(['text/html']), 'text/html')
      strictEqual(getNegotiator().mediaType(['text/html', 'application/json']), 'text/html')
      strictEqual(getNegotiator().mediaType(['application/json', 'text/html']), 'application/json')
    },
  },
  'when Accept: */*': {
    'returns first item in list'({ getNegotiator }) {
      strictEqual(getNegotiator('*/*').mediaType(['text/html']), 'text/html')
      strictEqual(getNegotiator('*/*').mediaType(['text/html', 'application/json']), 'text/html')
      strictEqual(getNegotiator('*/*').mediaType(['application/json', 'text/html']), 'application/json')
    },
  },
  'when Accept: application/json': {
    'is case insensitive'({ getNegotiator }) {
      strictEqual(getNegotiator('application/json').mediaType(['application/JSON']), 'application/JSON')
    },
    'only returns application/json'({ getNegotiator }) {
      strictEqual(getNegotiator('application/json').mediaType(['text/html']), undefined)
      strictEqual(getNegotiator('application/json').mediaType(['text/html', 'application/json']), 'application/json')
    },
  },
  'when Accept: application/json;q=0': {
    'returns undefined'({ getNegotiator }) {
      strictEqual(getNegotiator('application/json;q=0').mediaType(), undefined)
    },
  },
  'when Accept: application/json;q=0.2, text/html': {
    'prefers text/html over application/json'({ getNegotiator }) {
      strictEqual(getNegotiator('application/json;q=0.2, text/html').mediaType(['application/json']), 'application/json')
      strictEqual(getNegotiator('application/json;q=0.2, text/html').mediaType(['application/json', 'text/html']), 'text/html')
      strictEqual(getNegotiator('application/json;q=0.2, text/html').mediaType(['text/html', 'application/json']), 'text/html')
    },
  },
  'when Accept: text/*': {
    'prefers text media types'({ getNegotiator }) {
      strictEqual(getNegotiator('text/*').mediaType(['application/json']), undefined)
      strictEqual(getNegotiator('text/*').mediaType(['application/json', 'text/html']), 'text/html')
      strictEqual(getNegotiator('text/*').mediaType(['text/html', 'application/json']), 'text/html')
    },
  },
  'when Accept: text/*, text/plain;q=0': {
    'prefers text media types'({ getNegotiator }) {
      strictEqual(getNegotiator('text/*, text/plain;q=0').mediaType(['application/json']), undefined)
      strictEqual(getNegotiator('text/*, text/plain;q=0').mediaType(['application/json', 'text/html']), 'text/html')
      strictEqual(getNegotiator('text/*, text/plain;q=0').mediaType(['text/html', 'application/json']), 'text/html')
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, */*;q=0.1': {
    'returns in preferred order'({ getNegotiator }) {
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1').mediaType(['application/json', 'text/plain', 'text/html']), 'text/plain')
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1').mediaType(['image/jpeg', 'text/html']), 'text/html')
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1').mediaType(['image/jpeg', 'image/gif']), 'image/jpeg')
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1': {
    'returns the client-preferred order'({ getNegotiator }) {
      strictEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1').mediaType(['text/plain', 'text/html', 'text/xml', 'text/yaml', 'text/javascript', 'text/csv', 'text/css', 'text/rtf', 'text/markdown', 'application/json', 'application/octet-stream']),
        'text/plain')
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const mediaTypes = {
  context: Context,
  'when no Accept': {
    'returns */*'({ getNegotiator }) {
      deepEqual(getNegotiator().mediaTypes(), ['*/*'])
    },
  },
  'when Accept: */*': {
    'returns */*'({ getNegotiator }) {
      deepEqual(getNegotiator().mediaTypes(), ['*/*'])
    },
  },
  'when Accept: application/json': {
    'returns application/json'({ getNegotiator }) {
      deepEqual(getNegotiator('application/json').mediaTypes(), ['application/json'])
    },
  },
  'when Accept: application/json;q=0': {
    'returns empty list'({ getNegotiator }) {
      deepEqual(getNegotiator('application/json;q=0').mediaTypes(), [])
    },
  },
  'when Accept: application/json;q=0.2, text/html': {
    'returns text/html, application/json'({ getNegotiator }) {
      deepEqual(getNegotiator('application/json;q=0.2, text/html').mediaTypes(), ['text/html', 'application/json'])
    },
  },
  'when Accept: text/*': {
    'returns text/*'({ getNegotiator }) {
      deepEqual(getNegotiator('text/*').mediaTypes(), ['text/*'])
    },
  },
  'when Accept: text/*, text/plain;q=0': {
    'returns text/*'({ getNegotiator }) {
      deepEqual(getNegotiator('text/*, text/plain;q=0').mediaTypes(), ['text/*'])
    },
  },
  'when Accept: text/html;LEVEL=1': {
    'returns text/html;LEVEL=1'({ getNegotiator }) {
      deepEqual(getNegotiator('text/html;LEVEL=1').mediaTypes(), ['text/html'])
    },
  },
  'when Accept: text/html;foo="bar,text/css;";fizz="buzz,5", text/plain': {
    'returns text/html, text/plain'({ getNegotiator }) {
      deepEqual(getNegotiator('text/html;foo="bar,text/css;";fizz="buzz,5", text/plain').mediaTypes(), ['text/html', 'text/plain'])
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, */*;q=0.1': {
    'returns text/plain, text/html, application/json, */*'({ getNegotiator }) {
      deepEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1').mediaTypes(), ['text/plain', 'text/html', 'application/json', '*/*'])
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1': {
    'returns the client-preferred order'({ getNegotiator }) {
      deepEqual(getNegotiator('text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1').mediaTypes(), ['text/plain', 'text/html', 'text/xml', 'text/yaml', 'text/javascript', 'text/csv', 'text/css', 'text/rtf', 'text/markdown', 'application/json', 'application/octet-stream', '*/*'])
    },
  },
}

/** @type {Object<string, Object.<string, (c:Context)>>} */
export const mediaTypesArray = {
  context: Context,
  'when no Accept': {
    'returns return original list'({ getNegotiator }) {
      deepEqual(getNegotiator().mediaTypes(['application/json', 'text/plain']),
        ['application/json', 'text/plain'])
    },
  },
  'when Accept: */*': {
    'returns return original list'({ getNegotiator }) {
      deepEqual(getNegotiator('*/*').mediaTypes(['application/json', 'text/plain']),
        ['application/json', 'text/plain']
      )
    },
  },
  'when Accept: */*;q=0.8, text/*, image/*': {
    'returns return stable-sorted list'({ getNegotiator }) {
      deepEqual(getNegotiator('*/*;q=0.8, text/*, image/*').mediaTypes(['application/json', 'text/html', 'text/plain', 'text/xml', 'application/xml', 'image/gif', 'image/jpeg', 'image/png', 'audio/mp3', 'application/javascript', 'text/javascript']),
        ['text/html', 'text/plain', 'text/xml', 'text/javascript', 'image/gif', 'image/jpeg', 'image/png', 'application/json', 'application/xml', 'audio/mp3', 'application/javascript']
      )
    },
  },
  'when Accept: application/json': {
    'accepts application/json'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json').mediaTypes(['application/json']),
        ['application/json']
      )
    },
    'is case insensitive'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json').mediaTypes(['application/JSON']),
        ['application/JSON']
      )
    },
    'only returns application/json'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json').mediaTypes(['text/html', 'application/json']),
        ['application/json']
      )
    },
    'ignores invalid types'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json').mediaTypes(['boom', 'application/json']),
        ['application/json']
      )
    },
  },
  'when Accept: application/json;q=0': {
    'does not accept application/json'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json;q=0').mediaTypes(['application/json']),
        []
      )
    },
    'does not accept other media types'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json;q=0')
          .mediaTypes(['application/json', 'text/html', 'image/jpeg']),
        []
      )
    },
  },
  'when Accept: application/json;q=0.2, text/html': {
    'prefers text/html over application/json'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json;q=0.2, text/html')
          .mediaTypes(['application/json', 'text/html']),
        ['text/html', 'application/json']
      )
    },
  },
  'when Accept: application/json;q=0.9, text/html;q=0.8, application/json;q=0.7': {
    'prefers application/json over text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json;q=0.9, text/html;q=0.8, application/json;q=0.7')
          .mediaTypes(['text/html', 'application/json']),
        ['application/json', 'text/html']
      )
    },
  },
  'when Accept: application/json, */*;q=0.1': {
    'prefers application/json over text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/json, */*;q=0.1')
          .mediaTypes(['text/html', 'application/json']),
        ['application/json', 'text/html']
      )
    },
  },
  'when Accept: application/xhtml+xml;profile="http://www.wapforum.org/xhtml"': {
    'accepts application/xhtml+xml;profile="http://www.wapforum.org/xhtml"'({ getNegotiator }) {
      deepEqual(
        getNegotiator('application/xhtml+xml;profile="http://www.wapforum.org/xhtml"')
          .mediaTypes(['application/xhtml+xml;profile="http://www.wapforum.org/xhtml"']),
        ['application/xhtml+xml;profile="http://www.wapforum.org/xhtml"']
      )
    },
  },
  'when Accept: text/*': {
    'prefers text media types'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/*')
          .mediaTypes(['text/html', 'application/json', 'text/plain']),
        ['text/html', 'text/plain']
      )
    },
  },
  'when Accept: text/*, text/html;level': {
    'accepts text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/*, text/html;level').mediaTypes(['text/html']),
        ['text/html']
      )
    },
  },
  'when Accept: text/*, text/plain;q=0': {
    'prefers text media types except text/plain'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/*, text/plain;q=0')
          .mediaTypes(['text/html', 'text/plain']),
        ['text/html']
      )
    },
  },
  'when Accept: text/*, text/plain;q=0.5': {
    'prefers text/plain below other text types'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/*, text/plain;q=0.5')
          .mediaTypes(['text/html', 'text/plain', 'text/xml']),
        ['text/html', 'text/xml', 'text/plain']
      )
    },
  },
  'when Accept: text/html;level=1': {
    'accepts text/html;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1').mediaTypes(['text/html;level=1']),
        ['text/html;level=1']
      )
    },
    'accepts text/html;Level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1').mediaTypes(['text/html;Level=1']),
        ['text/html;Level=1']
      )
    },
    'does not accept text/html;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1').mediaTypes(['text/html;level=2']),
        []
      )
    },
    'does not accept text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1').mediaTypes(['text/html']),
        []
      )
    },
    'accepts text/html;level=1;foo=bar'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1')
          .mediaTypes(['text/html;level=1;foo=bar']),
        ['text/html;level=1;foo=bar']
      )
    },
  },
  'when Accept: text/html;level=1;foo=bar': {
    'does not accept text/html;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;foo=bar').mediaTypes(['text/html;level=1']),
        []
      )
    },
    'accepts text/html;level=1;foo=bar'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;foo=bar')
          .mediaTypes(['text/html;level=1;foo=bar']),
        ['text/html;level=1;foo=bar']
      )
    },
    'accepts text/html;foo=bar;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;foo=bar')
          .mediaTypes(['text/html;foo=bar;level=1']),
        ['text/html;foo=bar;level=1']
      )
    },
  },
  'when Accept: text/html;level=1;foo="bar"': {
    'accepts text/html;level=1;foo=bar'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;foo="bar"')
          .mediaTypes(['text/html;level=1;foo=bar']),
        ['text/html;level=1;foo=bar']
      )
    },
    'accepts text/html;level=1;foo="bar"'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;foo=bar')
          .mediaTypes(['text/html;level=1;foo="bar"']),
        ['text/html;level=1;foo="bar"']
      )
    },
  },
  'when Accept: text/html;foo=";level=2;"': {
    'does not accept text/html;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;foo=";level=2;"')
          .mediaTypes(['text/html;level=2']),
        []
      )
    },
    'accepts text/html;foo=";level=2;"'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;foo=";level=2;"')
          .mediaTypes(['text/html;foo=";level=2;"']),
        ['text/html;foo=";level=2;"']
      )
    },
  },
  'when Accept: text/html;LEVEL=1': {
    'accepts text/html;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;LEVEL=1').mediaTypes(['text/html;level=1']),
        ['text/html;level=1']
      )
    },
    'accepts text/html;Level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;Level=1').mediaTypes(['text/html;Level=1']),
        ['text/html;Level=1']
      )
    },
  },
  'when Accept: text/html;LEVEL=1;level=2': {
    'accepts text/html;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;LEVEL=1;level=2').mediaTypes(['text/html;level=2']),
        ['text/html;level=2']
      )
    },
    'does not accept text/html;level=1;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=1;level=2').mediaTypes(['text/html;level=1']),
        []
      )
    },
  },
  'when Accept: text/html;level=2': {
    'does not accept text/html;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=2').mediaTypes(['text/html;level=1']),
        []
      )
    },
  },
  'when Accept: text/html;level=2, text/html': {
    'prefers text/html;level=2 over text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=2, text/html')
          .mediaTypes(['text/html', 'text/html;level=2']),
        ['text/html;level=2', 'text/html']
      )
    },
  },
  'when Accept: text/html;level=2;q=0.1, text/html': {
    'prefers text/html over text/html;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=2;q=0.1, text/html')
          .mediaTypes(['text/html;level=2', 'text/html']),
        ['text/html', 'text/html;level=2']
      )
    },
  },
  'when Accept: text/html;level=2;q=0.1;level=1': {
    'does not accept text/html;level=1'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=2;q=0.1;level=1')
          .mediaTypes(['text/html;level=1']),
        []
      )
    },
  },
  'when Accept: text/html;level=2;q=0.1, text/html;level=1, text/html;q=0.5': {
    'prefers text/html;level=1, text/html, text/html;level=2'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/html;level=2;q=0.1, text/html;level=1, text/html;q=0.5')
          .mediaTypes(['text/html;level=1', 'text/html;level=2', 'text/html']),
        ['text/html;level=1', 'text/html', 'text/html;level=2']
      )
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, */*;q=0.1': {
    'prefers text/plain over text/html'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1')
          .mediaTypes(['text/html', 'text/plain']),
        ['text/plain', 'text/html']
      )
    },
    'prefers application/json after text'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1')
          .mediaTypes(['application/json', 'text/html', 'text/plain']),
        ['text/plain', 'text/html', 'application/json']
      )
    },
    'prefers image/jpeg after text'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/plain, application/json;q=0.5, text/html, */*;q=0.1')
          .mediaTypes(['image/jpeg', 'text/html', 'text/plain']),
        ['text/plain', 'text/html', 'image/jpeg']
      )
    },
  },
  'when Accept: text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1': {
    'returns the client-preferred order'({ getNegotiator }) {
      deepEqual(
        getNegotiator('text/plain, application/json;q=0.5, text/html, text/xml, text/yaml, text/javascript, text/csv, text/css, text/rtf, text/markdown, application/octet-stream;q=0.2, */*;q=0.1')
          .mediaTypes(['text/plain', 'text/html', 'text/xml', 'text/yaml', 'text/javascript', 'text/csv', 'text/css', 'text/rtf', 'text/markdown', 'application/json', 'application/octet-stream']),
        ['text/plain', 'text/html', 'text/xml', 'text/yaml', 'text/javascript', 'text/csv', 'text/css', 'text/rtf', 'text/markdown', 'application/json', 'application/octet-stream']
      )
    },
  },
}