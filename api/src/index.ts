import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
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
);

(async function app() {
    const app = express()
    const httpServer = http.createServer(app)
    
    app.use('/static', express.static(path.join(__dirname, '../public')))
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        context: {
            orm: prisma
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer})
        ]
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/graphql'
    })

    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
})()

