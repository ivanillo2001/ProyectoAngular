import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { TareasService } from '../../servicios/tareas.service';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule, MatOptionModule, MatIconModule, MatSelectModule, MatOptionModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  public frm!:FormGroup; //declaramos el formulario
  public tarea!:Tarea
  constructor(private fb:FormBuilder){}
  private serv_tarea=inject(TareasService) //!Inyectamos servicio del cliente
  private _snackBar=inject(MatSnackBar)
  private _router = inject(Router)
  private _activedRouter = inject(ActivatedRoute)//extraer los parametros de la url
  public idTarea!:number
  
  grabarDatos(){}
  //obtenemos los usuarios
  mostrarUsuarios(){
    this.serv_tarea.mostrarUsuario()
  }
}
