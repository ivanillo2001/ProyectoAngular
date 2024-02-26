import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormateada',
  standalone: true
})
export class FechaFormateadaPipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) return '';
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    // Formatea la fecha utilizando el objeto de fecha y las opciones especificadas
    return new Intl.DateTimeFormat('es-ES', options).format(value);
  }
  }
