/* alanode example/ */
import aqt from '@rqt/aqt'
import { createServer } from 'http'
import Negotiator from '../src'

const s = createServer((message, response) => {
  const n = new Negotiator(message)

  const availableEncodings = ['identity', 'gzip']
  console.log('encodings', n.encodings())
  console.log('available encodings', n.encodings(availableEncodings))
  console.log('encoding', n.encoding(availableEncodings), '\n')

  const availableLanguages = ['en', 'es', 'fr']
  console.log('languages', n.languages())
  console.log('available languages', n.languages(availableLanguages))
  console.log('language', n.language(availableLanguages), '\n')

  const availableCharsets = ['utf-8', 'iso-8859-1', 'iso-8859-5']
  console.log('charsets', n.charsets())
  console.log('available charsets', n.charsets(availableCharsets))
  console.log('charset', n.charset(availableCharsets), '\n')

  const availableMediaTypes = ['text/html', 'text/plain', 'application/json']
  console.log('media types', n.mediaTypes())
  console.log('available media types', n.mediaTypes(availableMediaTypes))
  console.log('media type', n.mediaType(availableMediaTypes))

  response.end()
})

s.listen(0, async () => {
  const url = `http://localhost:${s.address().port}`
  await aqt(url, {
    headers: {
      'accept-encoding': 'gzip, compress;q=0.2, identity;q=0.5',
      'accept-charset': 'utf-8, iso-8859-1;q=0.8, utf-7;q=0.2',
      'accept-language': 'en;q=0.8, es, pt',
      accept: 'text/html, application/*;q=0.2, image/jpeg;q=0.8',
    },
  })
  s.close()
})