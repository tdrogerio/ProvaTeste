import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find',
  standalone: true
})
export class FindPipe implements PipeTransform {
  transform(array: any[] | null, value: any, key: string = 'id', returnKey: string = 'nome'): any {
    if (!array) return '';
    const item = array.find(item => item[key] === value);
    return item ? item[returnKey] : '';
  }
} 