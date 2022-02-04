"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const scalars = (0, tslib_1.__importStar)(require("./scalars"));
const querys_1 = require("./querys");
const mutations_1 = require("./mutations");
const avocado_model_1 = require("./avocado.model");
exports.default = {
    ...scalars,
    BaseModel: {
        __resolveType: (parent) => {
            if (parent.name) {
                return 'Avocado';
            }
            return null; // No more implementations
        },
    },
    Query: {
        getAvos: querys_1.querys.find,
        getAvo: querys_1.querys.findOne,
    },
    Mutation: {
        createAvo: mutations_1.mutations.createAvo,
    },
    Avocado: avocado_model_1.resolver
};
//# sourceMappingURL=index.js.map