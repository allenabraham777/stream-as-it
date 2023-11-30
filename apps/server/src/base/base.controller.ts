import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
export class BaseController {
  serializeData<T>(
    data: T | T[],
    serializer: new (data: Partial<T>) => T,
  ): T | T[] {
    if (Array.isArray(data)) {
      return data.map((item) => new serializer(item));
    }

    return new serializer(data);
  }
}
