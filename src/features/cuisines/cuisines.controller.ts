import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CreateCuisineDto, UpdateCuisineDto } from './dtos'
import { CuisinesService } from './cuisines.service'

@Controller('cuisines')
export class CuisinesController {
    constructor(private readonly cuisinesService: CuisinesService) {}

    @Post('create-cuisine')
    async createCuisine(@Body() createCuisineDto: CreateCuisineDto) {
        return await this.cuisinesService.createCuisine(createCuisineDto)
    }

    @Put('update-cuisine')
    async updateCuisine(
        @Param('id') cuisineId: string,
        @Body() updateCuisineDto: UpdateCuisineDto,
    ) {
        return await this.cuisinesService.updateCuisine(cuisineId, updateCuisineDto)
    }

    @Get('get-cuisine')
    async getCuisine(@Param('id') cuisineId: string) {
        return await this.cuisinesService.getCuisine(cuisineId)
    }

    @Get('get-cuisines')
    async getCuisines() {
        return await this.cuisinesService.getCuisines()
    }
}
