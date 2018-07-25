import bunyan from 'bunyan'
import bformat from 'bunyan-format'
const formatOut = bformat({ outputMode: 'short' })

const log = bunyan.createLogger({
  name: 'BLANKO',
  stream: formatOut
})

export default log
