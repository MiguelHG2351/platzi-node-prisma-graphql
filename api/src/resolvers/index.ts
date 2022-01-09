import * as scalars from './scalars'
import { querys } from './querys'
import { mutations } from './mutations'
import { resolver } from './avocado.model'

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
