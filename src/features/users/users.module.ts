import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { PrismaService, TokenService } from 'src/shareds'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService, PrismaService, TokenService, LocalStrategy],
})
export class UsersModule {}
