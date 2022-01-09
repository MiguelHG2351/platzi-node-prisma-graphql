import type { Avocado, Attributes } from '@prisma/client'


export const resolver: Record<keyof (Avocado & { attributes: Attributes }), (parent: Avocado & { attributes: Attributes }) => unknown> = {
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    deletedAt: (parent) => parent.deletedAt,
    id: (parent) => parent.id,
    sku: (parent) => parent.sku,
    name: (parent) => parent.name,
    price: (parent) => parent.price,
    image: (parent) => parent.image,
    attributes: (parent) => ({
      description: parent.attributes.description,
      shape: parent.attributes.shape,
      hardiness: parent.attributes.hardiness,
      taste: parent.attributes.taste,
    }),
}