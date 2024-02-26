import { Component } from '@angular/core';
import { FechaFormateadaPipe } from '../../pipes/fecha-formateada.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FechaFormateadaPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  titulo:string = 'GESTION DE TAREAS'
  fecha = new Date()
}
