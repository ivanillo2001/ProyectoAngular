import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Tarea } from '../../modelos/tarea';
import { TareasService } from '../../servicios/tareas.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField } from '@angular/material/form-field';
import { MaterialModule } from '../../material/material.module';
import { ReplaceDashPipe } from '../../pipes/replace-dash.pipe';
/**
 * Esta pipe de replaceDash la he creado porque creé unos datos ficticios con chatgpt para tener datos para mostrar desde el inicio, y me los creó con guión (-) en vez de con barra (/)
 */
import { MayusculaPipe } from '../../pipes/mayuscula.pipe';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [MatButtonModule,NgStyle, MatFormField, MaterialModule, ReplaceDashPipe, CommonModule, NgClass, MayusculaPipe],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css'
})
export class ListaTareasComponent implements OnInit{
  //creamos el array que va a guardar todas nuestras tareas
  public aTareas!:Tarea[]
  private serv_tarea = inject(TareasService);
  public dataSource = new MatTableDataSource<Tarea>
  public router = inject(Router)
  public displayedColumns:string[]=['id','titulo','descripcion','fechaCreacion','estado','idUsuario','importancia','acciones']// nombre de columnas
  public _snackBar= inject(MatSnackBar)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.mostrarTareas();
  }

  mostrarTareas():void{
    this.serv_tarea.mostrarTareas().subscribe(
      res=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res)
        //configuramos paginacion
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
        this.serv_tarea.eliminarTarea(Number(tarea.id)).subscribe(
          res=>{
            this._snackBar.open("Tarea eliminada",'Cerrar',{
              duration:1500,
              verticalPosition:'top',
              panelClass:['style_snackbar']
            });
            this.mostrarTareas();
          }
        )
      }
    })
  }
}
