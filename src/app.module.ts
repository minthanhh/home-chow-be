import { Module } from '@nestjs/common'
import { AuthModule } from './features/auth'
import { UsersModule } from './features/users'

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
