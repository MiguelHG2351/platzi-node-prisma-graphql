"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querys = void 0;
exports.querys = {
    async find(root, args, context) {
        return await context.orm.avocado.findMany({
            include: {
                attributes: true
            },
            skip: args.skip,
            take: args.take,
            where: args.where
        });
    },
    async findOne(root, args, context) {
        return await context.orm.avocado.findUnique({
            where: {
                id: args.id,
            },
            include: {
                attributes: true
            }
        });
    }
};
//# sourceMappingURL=querys.js.map