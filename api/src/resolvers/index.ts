import * as scalars from './base/scalars.model'
import { querys } from './querys'
import { mutations } from './mutations'
import { resolver } from './base/avocado.model'

export default {
  ...scalars,
  Query: {
    getAvos: querys.find,
    getAvo: querys.findOne,
  },
  Mutation: {
    createAvo: mutations.createAvo,
  },
  Avocado: resolver
}
