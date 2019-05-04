/* alanode example/ */
import negotiator from '../src'

(async () => {
  const res = await negotiator({
    text: 'example',
  })
  console.log(res)
})()