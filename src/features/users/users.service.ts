import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService, TokenService } from 'src/shareds'
import { CreateUserDto } from './dtos'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        private tokenService: TokenService,
        private prismaService: PrismaService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const { email, username, password } = createUserDto
        const exists = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        })

        if (exists) throw new ConflictException('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prismaService.user.create({
            data: {
                email,
                username,
                hashedPassword,
            },
        })

        return user
    }

    async login(user) {
        const payload = { sub: user.id, username: user.username }
        return {
            accessToken: await this.tokenService.generateToken(payload),
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prismaService.user.findUnique({ where: { email } })

        if (user && bcrypt.compare(password, user.hashedPassword)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { hashedPassword, ...result } = user
            return result
        }

        return null
    }
}
