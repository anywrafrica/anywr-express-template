import {IsString, IsNotEmpty} from 'class-validator';

export class LocalizedDto {
    @IsString({message: 'validation.isString'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    en: string;

    @IsString({message: 'validation.isString'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    fr: string;
}