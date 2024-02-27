import { Component, ViewChild, inject } from '@angular/core';
import { TareasService } from '../../servicios/tareas.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, NgStyle } from '@angular/common';
import { ReplaceDashPipe } from '../../pipes/replace-dash.pipe';
import { MayusculaPipe } from '../../pipes/mayuscula.pipe';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-filtro-tareas',
  standalone: true,
  imports: [MaterialModule,NgStyle, ReplaceDashPipe, MayusculaPipe,CommonModule],
  templateUrl: './filtro-tareas.component.html',
  styleUrl: './filtro-tareas.component.css'
})
export class FiltroTareasComponent {
  public aTareas!:Tarea[]
  private serv_tarea = inject(TareasService);
  public dataSource = new MatTableDataSource<Tarea>
  public router = inject(Router)
  public displayedColumns:string[]=['id','titulo','descripcion','fechaCreacion','estado','idUsuario','importancia','acciones']// nombre de columnas
  public _snackBar= inject(MatSnackBar)
  private _activedRouter = inject(ActivatedRoute)//extraer los parametros de la url
  public estado!:string
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this._activedRouter.params.subscribe(
      params=>{
        this.estado=params['estado']
        if (this.estado) {
          this.mostrarTareasFiltradas(this.estado)
        }
      }
    )
  }

  mostrarTareasFiltradas(estado:string):void{

    this.serv_tarea.mostrarTareasFiltradas(estado).subscribe(
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
        this.serv_tarea.eliminarTarea(String(tarea._id)).subscribe(
          res=>{
            this._snackBar.open("Tarea eliminada",'Cerrar',{
              duration:1500,
              verticalPosition:'top',
              panelClass:['style_snackbar']
            });
            this.mostrarTareasFiltradas(this.estado);
          }
        )
      }
    })
  }
}
