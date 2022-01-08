import { Avocado } from "./base/avocado.model"

export const querys = {
    find(root: unknown, args: unknown, context: {avos: Avocado[]}): Avocado[] {
        return context.avos;
    },
    
    findOne(root: unknown, args: {id: number}, context: {avos: Avocado[]}): Avocado {
        return context.avos[args.id];
    }
}
