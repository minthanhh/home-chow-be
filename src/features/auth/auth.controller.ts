import { Controller, Post, Body, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO, SignUpDto } from './dtos'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() signUpDto: SignUpDto) {
        return this.authService.register(signUpDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDTO) {
        return this.authService.login(loginDto)
    }

    @Post('forgot-password')
    forgotPassword() {
        return this.authService.forgotPassword()
    }

    @Post('reset-password')
    resetPassword() {
        return this.authService.resetPassword()
    }

    @Post('login-with-google')
    signInWithGoogle() {
        return this.authService.signInWithGoogle()
    }

    @Get('me')
    getUser() {}
}
