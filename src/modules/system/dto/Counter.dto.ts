import {IsString, IsNotEmpty, IsNumber, Min, IsMongoId, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateCounterDto {
    @IsString({message: 'validation.isString'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    modelName: string;

    @IsNumber({}, {message: 'validation.isNumber'})
    @Min(0, {message: 'validation.min'})
    sequenceValue: number;
}

export class UpdateCounterDto {
    @IsOptional()
    @IsNumber({}, {message: 'validation.isNumber'})
    @Min(0, {message: 'validation.min'})
    sequenceValue?: number;
}

export class CounterResponseDto {
    @IsMongoId()
    _id: string;

    @IsString()
    modelName: string;

    @IsNumber()
    sequenceValue: number;

    @Type(() => Date)
    createdAt: Date;

    @Type(() => Date)
    updatedAt: Date;
}