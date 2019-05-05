# @goa/negotiator

[![npm version](https://badge.fury.io/js/%40goa%2Fnegotiator.svg)](https://npmjs.org/package/@goa/negotiator)

`@goa/negotiator` is a [fork](https://github.com/jshttp/negotiator) of HTTP Content Negotiation In ES6 And Optimised With A JavaScript Compiler For The Best Performance.

The original module has been updated to be used in [`@goa/koa`](https://artdecocode.com/goa/): _Koa_ web server compiled with _Google Closure Compiler_ using [**Depack**](https://artdecocode.com/depack/) into a single file library (0 dependencies).

```sh
yarn add @goa/negotiator
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [class Negotiator](#class-negotiator)
- [`constructor(request: IncomingMessage): Negotiator`](#constructorrequest-incomingmessage-negotiator)
  * [`_goa.Negotiator`](#type-_goanegotiator)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import Negotiator from '@goa/negotiator'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## class Negotiator

Instances of this class will allow to negotiate languages, charsets, media types and encodings.

## `constructor(`<br/>&nbsp;&nbsp;`request: IncomingMessage,`<br/>`): Negotiator`

Creates a new instance based on the request from the client.

```js
/* alanode example/ */
import aqt from '@rqt/aqt'
import { createServer } from 'http'
import Negotiator from '@goa/negotiator'

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
```
```
encodings [ 'gzip', 'deflate', 'identity' ]
available encodings [ 'gzip', 'identity' ]
encoding gzip 

languages [ 'es', 'pt', 'en' ]
available languages [ 'es', 'en' ]
language es 

charsets [ 'utf-8', 'iso-8859-1', 'utf-7' ]
available charsets [ 'utf-8', 'iso-8859-1' ]
charset utf-8 

media types [ 'text/html', 'image/jpeg', 'application/*' ]
available media types [ 'text/html', 'application/json' ]
media type text/html
```

__<a name="type-_goanegotiator">`_goa.Negotiator`</a>__: HTTP Content Negotiation In ES6.

|      Name       |                              Type                              |                                             Description                                             |
| --------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| __charset*__    | <em>function(!Array&lt;string&gt;=): string</em>               | Returns the most preferred charset from the client.                                                 |
| __charsets*__   | <em>function(!Array&lt;string&gt;=): !Array&lt;string&gt;</em> | Returns an array of preferred charsets ordered by the client preference.                            |
| __encoding*__   | <em>function(!Array&lt;string&gt;=): string</em>               | Returns the most preferred encoding from the client.                                                |
| __encodings*__  | <em>function(!Array&lt;string&gt;=): !Array&lt;string&gt;</em> | Returns an array of preferred encodings ordered by the client preference.                           |
| __language*__   | <em>function(!Array&lt;string&gt;=): string</em>               | Returns the most preferred language from the client.                                                |
| __languages*__  | <em>function(!Array&lt;string&gt;=): !Array&lt;string&gt;</em> | Returns an array of preferred languages ordered by priority from a list of available languages.     |
| __mediaType*__  | <em>function(!Array&lt;string&gt;=): string</em>               | Returns the most preferred media type from the client.                                              |
| __mediaTypes*__ | <em>function(!Array&lt;string&gt;=): !Array&lt;string&gt;</em> | Returns an array of preferred media types ordered by priority from a list of available media types. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

The original programming work, documentation and NPM package by [Federico Romero, Isaac Z. Schlueter, Douglas Christopher Wilson](https://github.com/jshttp/negotiator).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>