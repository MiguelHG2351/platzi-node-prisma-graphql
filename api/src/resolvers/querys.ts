// import { Avocado } from "./base/avocado.model"
import type { Avocado } from '@prisma/client'
import type { context } from './types'

export const querys = {
    async find(root: unknown, args: unknown, context: context): Promise<Avocado[]> {
        return await context.orm.avocado.findMany();
    },
    async findOne(root: unknown, args: { id: number }, context: context): Promise<Avocado | null> {
        return  await context.orm.avocado.findUnique({
            where: {
                id: args.id
            }
        });   
    }
}
