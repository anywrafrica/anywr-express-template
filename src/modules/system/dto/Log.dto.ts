import {IsString, IsNotEmpty, IsOptional, IsMongoId, IsObject, IsEnum} from 'class-validator';
import {Type} from 'class-transformer';
import {DefaultLogStatus, LogAction, Metadata} from "@utils/types";

export class CreateLogDto {
    @IsMongoId({message: 'validation.isMongoId'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    user: string;

    @IsMongoId({message: 'validation.isMongoId'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    targetUser: string;

    @IsEnum({message: 'validation.isEnum'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    action: LogAction;

    @IsEnum({message: 'validation.isEnum'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    status: DefaultLogStatus;

    @IsObject({message: 'validation.isObject'})
    @IsNotEmpty({message: 'validation.isNotEmpty'})
    metadata: Metadata;
}

export class UpdateLogDto {
    @IsOptional()
    @IsMongoId({message: 'validation.isMongoId'})
    user?: string;

    @IsOptional()
    @IsMongoId({message: 'validation.isMongoId'})
    targetUser?: string;

    @IsOptional()
    @IsEnum({message: 'validation.isEnum'})
    action?: LogAction;

    @IsOptional()
    @IsEnum({message: 'validation.isEnum'})
    status?: DefaultLogStatus;

    @IsOptional()
    @IsObject({message: 'validation.isObject'})
    metadata?: Metadata;
}

export class LogResponseDto {
    @IsMongoId()
    _id: string;

    @IsMongoId()
    user: string;

    @IsMongoId()
    targetUser: string;

    @IsString()
    action: LogAction;

    @IsString()
    status: DefaultLogStatus;

    @IsObject()
    metadata: Metadata;

    @Type(() => Date)
    createdAt: Date;

    @Type(() => Date)
    updatedAt: Date;
}