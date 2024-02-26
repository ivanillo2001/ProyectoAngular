import { Component, ViewChild, inject } from '@angular/core';
import { TareasService } from '../../servicios/tareas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { ReplaceDashPipe } from '../../pipes/replace-dash.pipe';
import { MayusculaPipe } from '../../pipes/mayuscula.pipe';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tareas-pendientes',
  standalone: true,
  imports: [MaterialModule,NgStyle, ReplaceDashPipe, MayusculaPipe,CommonModule],
  templateUrl: './tareas-pendientes.component.html',
  styleUrl: './tareas-pendientes.component.css'
})
export class TareasPendientesComponent {
  public aTareas!:Tarea[]
  private serv_tarea = inject(TareasService);
  public dataSource = new MatTableDataSource<Tarea>
  public router = inject(Router)
  public displayedColumns:string[]=['id','titulo','descripcion','fechaCreacion','estado','idUsuario','importancia','acciones']// nombre de columnas
  public _snackBar= inject(MatSnackBar)
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.mostrarTareasPendientes();
  }

  mostrarTareasPendientes():void{
    this.serv_tarea.mostrarTareasPendientes().subscribe(
      res=>{
        console.log(res);
        this.dataSource=new MatTableDataSource(res)
        //configuramos paginacion
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  getImportancia(length: number): any[] {
    return new Array(length);
  }

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
            this.mostrarTareasPendientes();
          }
        )
      }
    })
  }
}
