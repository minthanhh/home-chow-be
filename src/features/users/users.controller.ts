import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dtos'
import { UsersService } from './users.service'
import { LocalAuthGuard } from './guards'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('create-user')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return this.userService.login(req.user)
    }
}
