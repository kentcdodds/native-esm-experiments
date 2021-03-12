import {fn as cjsFn} from './cjs/index.js'
import {fn as exportsFn} from './exports/subtract'
import * as exportStar from './export-star/index.js'

console.log('index.js')
console.log(cjsFn(1, 2))
console.log(exportsFn(2, 1))
console.log(exportStar)
