import type { Request, RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { TextEncoder } from 'util'
import { SignJWT, jwtVerify } from 'jose'

declare global {
    namespace Express {
        interface User {
            id: number
        }
        interface Request {
            user?: Express.User
        }
    }
}

interface UserJWTPayload {
    id: number // user id
    iat: number // issued at time
    exp: number // expiration time
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? 'secret'

const orm = new PrismaClient()

export const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await orm.user.findUnique({
            where: {
                username: username,
            },
        })

        if(!user) {
            throw new Error()
        }
        const isValid =  await compare(password, user.password)
        if(!isValid) {
            throw new Error()
        }
            
        const token = await new SignJWT({id: user.id})
                    .setProtectedHeader({alg: 'HS256'})
                    .setIssuedAt()
                    .setExpirationTime('2h')
                    .sign(new TextEncoder().encode(JWT_SECRET_KEY))
        res.json({
            token,
            username: user.username,
            id: user.id,
        })
    } catch (err) {
        res.sendStatus(401)
    }
}

const verifyToken = async (req: Request) => {
    const { authorization } = req.headers
    const token = (authorization || '').replace('Bearer ', '')
    
    try {
      const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY))

        return verified.payload as unknown as UserJWTPayload
    } catch (e) {
        throw new Error('Invalid token')
    }
}

const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
      const payload = await verifyToken(req)
      req.user = { id: payload.id }
    } catch (e) {
      // ignore
    } finally {
      next()
    }
  }
  
  export default authMiddleware
  
  export const currentUser: RequestHandler = async (req, res) => {
    try {
      const userDetails = await orm.user.findUnique({
        where: { id: req.user?.id },
      })
  
      if (!userDetails) {
        throw new Error()
      }
  
      res.json({
        id: userDetails.id,
        username: userDetails.username,
      })
    } catch (e) {
      res.sendStatus(401)
    }
  }