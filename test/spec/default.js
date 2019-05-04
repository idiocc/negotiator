import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import negotiator from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof negotiator, 'function')
  },
  async 'calls package without error'() {
    await negotiator()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await negotiator({
      text,
    })
    ok(res, text)
  },
}

export default T