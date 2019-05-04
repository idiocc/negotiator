import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import negotiator from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await negotiator({
      text: this.input,
    })
    return res
  },
  context: Context,
})