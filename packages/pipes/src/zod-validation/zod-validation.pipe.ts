import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodSchema) {}

    transform(value) {
        try {
            return this.schema.parse(value);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'Validation failed',
                    errors: error.errors
                });
            }
            throw error;
        }
    }
}
