import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './features/users'
import { CuisinesModule } from './features/cuisines'

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }), UsersModule, CuisinesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
