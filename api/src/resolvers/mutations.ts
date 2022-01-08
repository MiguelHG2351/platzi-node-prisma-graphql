import { Avocado } from "./base/avocado.model"
import { createHash } from 'crypto'

export const mutations = {
    createAvo(
        parent: unknown,
        {
          data
        }: { data: Pick<Avocado, 'name' | 'price' | 'image'> & Avocado['attributes']},
        context: { avos: Avocado[] },
      ): Avocado {
        const currentLength = context.avos.length
        const newAvo: Avocado = {
          id: String(currentLength + 1),
          sku: createHash('sha256')
            .update(data.name, 'utf8')
            .digest('base64')
            .slice(-6),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: undefined,
          name: data.name,
          price: data.price,
          image: data.image,
          attributes: {
            description: data.description,
            shape: data.shape,
            hardiness: data.hardiness,
            taste: data.taste,
          },
        }
      
        context.avos.push(newAvo)
        return newAvo
      }
}