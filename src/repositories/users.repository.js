import { prisma } from '../utils/prisma/index.js'

export class AuthRepository {

    findEmail = async (email) => {
        const existedUser = await prisma.users.findUnique({
            where: { email }
        });

        return existedUser;
    };
    createUser = async (email, hashedPassword, name) => {
        const newUser = await prisma.users.create({
            data: {
                email,
                hashedPassword,
                name,
            }
        })

        return newUser;
    }
}