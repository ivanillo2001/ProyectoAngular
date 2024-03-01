import { Component, OnInit, inject } from '@angular/core';
import { Tarea } from '../../modelos/tarea';
import { TareasService } from '../../servicios/tareas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { ReplaceDashPipe } from '../../pipes/replace-dash.pipe';
/**
 * Esta pipe de replaceDash la he creado porque creé unos datos ficticios con chatgpt para tener datos para mostrar desde el inicio, y me los creó con guión (-) en vez de con barra (/)
 */
import { MayusculaPipe } from '../../pipes/mayuscula.pipe';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [NgStyle, ReplaceDashPipe, CommonModule, NgClass, MayusculaPipe, CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent implements OnInit{
  //creamos el array que va a guardar todas nuestras tareas
  public aTareas!:Tarea[]
  private serv_tarea = inject(TareasService);
  public router = inject(Router)
  public nombreUsuario?:string
  ngOnInit(): void {
    this.mostrarTareas();
  }

  mostrarTareas():void{
    this.serv_tarea.mostrarTareas().subscribe(
      res=>{
        this.aTareas= res;
        console.log(this.aTareas);
      }
    )
  }
  //esta función la utilizamos para saber la importancia que tiene una tarea y nos devuelve un array para saber
  //cuantas estrellas debemos poner con el tamaño según la importancia.
  getImportancia(length: number): any[] {
    return new Array(length);
  }

  

  //eliminar tarea
  eliminarTarea(tarea:Tarea):void{
    Swal.fire({
      title:`Desea eliminar la tarea ${tarea.titulo}?`,
      showCancelButton:true,
      confirmButtonText:'Eliminar',
      cancelButtonText:'No eliminar',
      showConfirmButton:true,
      focusConfirm:false
    }).then(result=>{
      if (result.isConfirmed) {
        //borrar Cliente
        this.serv_tarea.eliminarTarea(String(tarea._id)).subscribe(
          res=>{
            alert("Tarea eliminada")
            this.mostrarTareas();
          }
        )
      }
    })
  }

  editarTarea(_id:string):void{
    this.router.navigate([`/formTareas/${_id}`])
  }
}
