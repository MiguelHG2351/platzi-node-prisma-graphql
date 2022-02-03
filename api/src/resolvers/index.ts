import * as scalars from './scalars'
import { querys } from './querys'
import { mutations } from './mutations'
import { resolver } from './avocado.model'
import { Avocado } from '@prisma/client'

export default {
  ...scalars,
  BaseModel: {
    __resolveType: (parent: Avocado) => {
      if (parent.name) {
        return 'Avocado'
      }
      return null // No more implementations
    },
  },
  Query: {
    getAvos: querys.find,
    getAvo: querys.findOne,
  },
  Mutation: {
    createAvo: mutations.createAvo,
  },
  Avocado: resolver
}
