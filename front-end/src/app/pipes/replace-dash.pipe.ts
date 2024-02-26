import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDash',
  standalone: true
})
export class ReplaceDashPipe implements PipeTransform {

  transform(value: string,): string {
    return value.replaceAll('-','/');
  }

}
