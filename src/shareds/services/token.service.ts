import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async generateToken(payload: { sub: string; username: string }) {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            privateKey: this.configService.get<string>('JWT_PRIVATE_KEY'),
        })
    }

    async verifyToken(token: string) {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get<string>('JWT_SECRET'),
            algorithms: ['ES512'],
        })
    }
}
