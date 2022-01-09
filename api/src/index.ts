import { ApolloServer } from 'apollo-server'
import path from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const typeDefs = readFileSync(
    path.join(__dirname, 'models', 'schema.graphql'),
    {
        encoding: 'utf-8'
    }
)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: {
        orm: prisma
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
