import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCuisineDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    icon: string
}
