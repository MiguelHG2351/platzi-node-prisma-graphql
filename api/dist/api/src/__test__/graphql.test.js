"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockContext = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_1 = require("fs");
const jest_mock_extended_1 = require("jest-mock-extended");
const graphql_tag_1 = (0, tslib_1.__importDefault)(require("graphql-tag"));
const easygraphql_tester_1 = (0, tslib_1.__importDefault)(require("easygraphql-tester"));
const resolvers_1 = (0, tslib_1.__importDefault)(require("../../src/resolvers"));
const schema = (0, fs_1.readFileSync)(path_1.default.join(__dirname, '../../src/models/schema.graphql'), 'utf8');
const tester = new easygraphql_tester_1.default(schema, resolvers_1.default);
const createMockContext = () => {
    return {
        orm: (0, jest_mock_extended_1.mockDeep)(),
        user: undefined
    };
};
exports.createMockContext = createMockContext;
let mockContext;
let context;
beforeEach(() => {
    mockContext = (0, exports.createMockContext)();
    context = mockContext;
});
const mockAvocadoDB = [
    {
        id: 1,
        image: '/images/reed.jpg',
        name: 'Reed Avocado',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        sku: 'ZDIRg=',
        price: 1.18,
    },
];
test('should return a list of avos', async () => {
    mockContext.orm.avocado.findMany.mockResolvedValue(mockAvocadoDB);
    const query = (0, graphql_tag_1.default) `
		query {
			getAvos {
				id
				name
				sku
			}
		}
	`;
    const result = await tester.graphql(query, undefined, context);
    expect(mockContext.orm.avocado.findMany).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual({
        getAvos: [
            {
                id: "1",
                name: 'Reed Avocado',
                sku: 'ZDIRg='
            }
        ]
    });
    expect(mockContext.orm.avocado.findMany).toHaveBeenCalledWith({
        include: {
            attributes: true
        },
        where: undefined,
        skip: undefined,
        take: undefined
    });
});
test('should filter a list of avos', async () => {
    mockContext.orm.avocado.findMany.mockResolvedValue([]);
    const query = (0, graphql_tag_1.default) `
		query {
			getAvos(where: { name: { contains: "Hass" } }, skip: 1) {
				id
				name
			}
		}
	`;
    const results = await tester.graphql(query, undefined, context);
    console.log('data is ', results);
    expect(results.data).toEqual({
        getAvos: []
    });
    expect(mockContext.orm.avocado.findMany).toHaveBeenCalledTimes(1);
    expect(mockContext.orm.avocado.findMany).toHaveBeenCalledWith({
        include: { attributes: true },
        where: { name: { contains: 'Hass' } },
        take: undefined,
        skip: 1,
    });
});
//# sourceMappingURL=graphql.test.js.map