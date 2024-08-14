import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
// import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { UsersModule } from '../users'
// import { JwtStrategy, LocalStrategy } from './strategies'
import { PrismaService } from 'src/shareds'
import { AuthController } from './auth.controller'

@Module({
    imports: [
        UsersModule,
        // PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    exports: [AuthService],
})
export class AuthModule {}
