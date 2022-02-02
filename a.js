const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt');

const prisma = new PrismaClient()
console.log('asdsadsadsasd')
async function test() {
    
    // const createUser = await prisma.user.findUnique({
    //     where: {
    //         username: 'Alice',
    //     }
    // })
    const createUser = await prisma.user.findMany()
    // const password = await hash('asdasdasdasd', 10)
    // const createUser = await prisma.user.create({
    //     data: {
    //         username: 'Alice',
    //         password: `${password}`,
    //     }
    // })

    console.log(createUser)
}

test()
