import type { Avocado, Attributes } from '@prisma/client'
import type { context } from './types'

export const mutations = {
    async createAvo(
        parent: unknown,
        {
          data
        }: { data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'> & Attributes},
        context: context,
      ): Promise<Avocado> {
          console.log(data.description)
        return await context.orm.avocado.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                sku: data.sku,
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