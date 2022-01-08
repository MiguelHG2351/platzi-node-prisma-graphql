export type BaseModel = {
    id: string
    createdAt: Date
    updatedAt: Date | undefined
    deletedAt: Date | undefined
}

// el objeto tiene las claves de base model, y los valores son funciones que reciben el objeto padre
// y devuelven el valor de la propiedad
export const baseModelResolver: Record<
  keyof BaseModel,
  (parent: BaseModel) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
}
