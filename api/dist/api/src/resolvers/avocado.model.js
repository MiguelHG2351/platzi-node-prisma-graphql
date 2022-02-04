"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolver = void 0;
exports.resolver = {
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
};
//# sourceMappingURL=avocado.model.js.map