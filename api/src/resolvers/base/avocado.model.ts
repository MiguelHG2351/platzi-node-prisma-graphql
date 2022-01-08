import { BaseModel, baseModelResolver } from "./base.model"

export type Attributes = {
    description: string | null
    shape: string | null
    hardiness: string | null
    taste: string | null
}
 
// Union de tipos
export type Avocado = BaseModel & {
    id: string
    name: string
    sku: string
    price: number
    image: string
    attributes: Attributes
}


// las claves del tipo avocado, los valores son funciones
export const resolver: Record<keyof Avocado, (parent: Avocado) => unknown> = {
    ...baseModelResolver,
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