import { IsString, IsNotEmpty, isNumber, Min, Max, IsOptional, Matches, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, {
        message: 'name cannot empty',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, {
        message: 'code cannot be blank',
    })
    code: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/\S/, {
        message: 'instructor cannot be empty '
    })
    instructor: string

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(6)
    credits: number;

    @IsString()
    @IsOptional()
    description?: string;
}