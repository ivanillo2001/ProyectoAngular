import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayuscula',
  standalone: true
})
export class MayusculaPipe implements PipeTransform {

  transform(value: string): string {
    /**
     * Creamos una Pipe personalizada que recibe un string, en ese caso sería tanto la descripción como el título de la tarea y pone en mayúscula la primera letra de cada palabra.
     */
    const aPalabras = value.split(" ");
    let fraseCompleta = '';

    for (let index = 0; index < aPalabras.length; index++) {
      fraseCompleta += aPalabras[index].charAt(0).toUpperCase() + aPalabras[index].slice(1) + " ";
    }

    return fraseCompleta.trim();
  }

}
