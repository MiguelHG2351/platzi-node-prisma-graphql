import path from 'path';
import { readFileSync } from 'fs';
import { PrismaClient, Avocado, User  } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { DeepMockProxy } from 'jest-mock-extended';
import gql from 'graphql-tag';
import EasyGraphQLTester from 'easygraphql-tester';

import { ResolverContext } from '../../src/resolvers/avocado.model';
import resolvers from '../../src/resolvers'

const schema = readFileSync(path.join(__dirname, '../../src/models/schema.graphql'), 'utf8');

const tester = new EasyGraphQLTester(schema, resolvers);

export type MockResolverContext = {
    orm: DeepMockProxy<PrismaClient>
    user: DeepMockProxy<User | undefined>
}

export const createMockContext = (): MockResolverContext => {
	return {
		orm: mockDeep<PrismaClient>(),
		user: undefined
	}
}

let mockContext: MockResolverContext;
let context: ResolverContext;

beforeEach(() => {
    mockContext = createMockContext()
	context = mockContext as unknown as ResolverContext;
});

const mockAvocadoDB: Avocado[] = [
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
]

test('should return a list of avos', async () => {
	mockContext.orm.avocado.findMany.mockResolvedValue(mockAvocadoDB)

	const query = gql`
		query {
			getAvos {
				id
				name
				sku
			}
		}
	`;

	const result = await tester.graphql(query, undefined, context);
	console.log(result)
	expect(result.data).toEqual({
		getAvos:[
			{
				id: "1",
				name: 'Reed Avocado',
				sku: 'ZDIRg='
			}
		]
	});
})
