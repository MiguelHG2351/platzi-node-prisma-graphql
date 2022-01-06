import { ApolloServer } from 'apollo-server'
import path from 'path'
import { readFileSync } from 'fs'

const typeDefs = readFileSync(
    path.join(__dirname, 'models', 'schema.graphql'),
    {
        encoding: 'utf-8'
    }
)

const resolvers = {
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
