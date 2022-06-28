import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { throwError } from 'rxjs';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const transformedValue = parseInt(value, 10);
    if (isNaN(transformedValue))
      throw new BadRequestException(`Validation failed, ${value} is not a number`);
    else
      return transformedValue;
  }
}
