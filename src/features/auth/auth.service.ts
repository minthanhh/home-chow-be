import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO, SignUpDto } from './dtos'
import { PrismaService } from 'src/shareds'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {}

    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.usersService.findOne(username)
    //     if (user && user.password === pass) {
    //         const { password, ...result } = user
    //         return result
    //     }
    //     return null
    // }

    async register(signUpDto: SignUpDto) {
        const { email, username, password } = signUpDto

        const exists = await this.prismaService.user.findUnique({
            where: {
                email: email,
                username: username,
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

        const accessToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                username: username,
                email: user,
            },
            { expiresIn: '10m' },
        )

        const refreshToken = await this.jwtService.signAsync(
            {
                sub: user.id,
                username: username,
                email: user,
            },
            { expiresIn: '7days' },
        )

        const userUpdated = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            },
        })

        return userUpdated
    }

    async login(loginDTO: LoginDTO) {
        const { email, password } = loginDTO

        const user = await this.prismaService.user.findUnique({
            where: { email: email },
        })

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isPasswordMatching = await bcrypt.compare(password, user.hashedPassword)
        if (!isPasswordMatching) throw new UnauthorizedException('Invalid credentials')

        return user
    }

    forgotPassword() {}

    resetPassword() {}

    signInWithGoogle() {}

    getUser() {}
}
