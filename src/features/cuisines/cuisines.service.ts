import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCuisineDto, UpdateCuisineDto } from './dtos'
import { PrismaService } from 'src/shareds'

@Injectable()
export class CuisinesService {
    constructor(private readonly prismaService: PrismaService) {}

    async createCuisine(createCuisineDto: CreateCuisineDto) {
        const { name, icon } = createCuisineDto

        const exists = await this.prismaService.cuisine.findUnique({ where: { name: name } })

        if (exists) throw new ConflictException('Cuisine name already exists')

        const cuisine = await this.prismaService.cuisine.create({
            data: {
                name,
                icon,
            },
        })

        return cuisine
    }

    async updateCuisine(cuisineId: string, updateCuisineDto: UpdateCuisineDto) {
        const cuisine = await this.getCuisine(cuisineId)
        if (!cuisine) throw new NotFoundException('Cuisine not found')

        return await this.prismaService.cuisine.update({
            where: { id: cuisineId },
            data: updateCuisineDto,
        })
    }

    async getCuisine(cuisineId: string) {
        return await this.prismaService.cuisine.findUnique({ where: { id: cuisineId } })
    }

    async getCuisines() {
        return await this.prismaService.cuisine.findMany()
    }
}
