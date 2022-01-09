import { randomBytes } from 'crypto'
import type { Avocado, Attributes } from '@prisma/client'
import type { context } from './types'

export const mutations = {
    createAvo(
        parent: unknown,
        {
          data
        }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Attributes},
        context: context,
      ): Promise<Avocado> {
          console.log(data.description)
        return context.orm.avocado.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                sku: randomBytes(8).toString('hex'),
                attributes: {
                    create: {
                        description: data.description,
                        shape: data.shape,
                        hardiness: data.hardiness,
                        taste: data.taste,
                    }
                }
            }
        })
      }
}