// import { Avocado } from "./base/avocado.model"
import type { Avocado, Prisma } from '@prisma/client'
import type { context } from './types'

export const querys = {
    async find(root: unknown, args: {skip?: number, take?:number, where: Prisma.AvocadoWhereInput}, context: context): Promise<Avocado[]> {
        return await context.orm.avocado.findMany({
            include: {
                attributes: true
            },
            skip: args.skip,
            take: args.take,
            where: args.where
        });
    },
    async findOne(root: unknown, args: { id: number }, context: context): Promise<Avocado | null> {
        return  await context.orm.avocado.findUnique({
            where: {
                id: args.id,
            },
            include: {
                attributes: true
            }
        });   
    }
}
