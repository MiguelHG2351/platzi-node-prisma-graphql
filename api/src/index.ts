import { ApolloServer } from 'apollo-server'

const typeDefs = `

type AvocadoAttributes {
    description: String!
    shape: String!
    hardiness: Float!
    taste: String!
}

type Avocado {
    name: String!
    id: ID!
    sku: String!
    price: Float!
    image: String!
    attributes: AvocadoAttributes!
}

type Cart {
    id: ID!
    avocadoId: ID!
}

type Query {
    getAvocados: [Avocado]
    info: String!
}

type Mutation {
    createAvocado(name: String!, hardiness: Float!, description: String!, shape: String!, taste: String!, sku: String!, image: String!, price: Float!): Avocado
    deleteAvocado(id: ID!): Avocado
}
`

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        getAvocados: () => Avocado.find()
    },
    Mutation: {
        createAvocado: (parent, args) => {
            const avocado = new Avocado({
                name: args.name,
                hardiness: args.hardiness,
                description: args.description,
                shape: args.shape,
                taste: args.taste,
                sku: args.sku,
                image: args.image,
                price: args.price
            })
            return avocado.save()
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
