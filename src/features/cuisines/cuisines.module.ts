import { Module } from '@nestjs/common'
import { CuisinesService } from './cuisines.service'
import { CuisinesController } from './cuisines.controller'
import { PrismaService } from 'src/shareds'

@Module({
    providers: [CuisinesService, PrismaService],
    controllers: [CuisinesController],
    exports: [CuisinesService],
})
export class CuisinesModule {}
