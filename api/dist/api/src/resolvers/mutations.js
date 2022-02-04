"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const crypto_1 = require("crypto");
exports.mutations = {
    createAvo(parent, { data }, context) {
        console.log(data.description);
        return context.orm.avocado.create({
            data: {
                name: data.name,
                price: data.price,
                image: data.image,
                sku: (0, crypto_1.randomBytes)(8).toString('hex'),
                attributes: {
                    create: {
                        description: data.description,
                        shape: data.shape,
                        hardiness: data.hardiness,
                        taste: data.taste,
                    }
                }
            }
        });
    }
};
//# sourceMappingURL=mutations.js.map