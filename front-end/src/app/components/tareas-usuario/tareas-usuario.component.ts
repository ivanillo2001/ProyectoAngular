import { Component, ViewChild, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TareasService } from '../../servicios/tareas.service';
import { Tarea } from '../../modelos/tarea';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule, NgStyle } from '@angular/common';
import { MayusculaPipe } from '../../pipes/mayuscula.pipe';
import { ReplaceDashPipe } from '../../pipes/replace-dash.pipe';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-tareas-usuario',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule,NgStyle,CommonModule,MayusculaPipe,ReplaceDashPipe],
  templateUrl: './tareas-usuario.component.html',
  styleUrl: './tareas-usuario.component.css'
})
export class TareasUsuarioComponent {
  public frm!: FormGroup; // declarar el formulario
  private serv_tarea= inject(TareasService)
  public nombreUsuario?:string //guarda el nombre del usuario
  public tareas: Tarea[] = []; //array de tareas vacio
  private _snackBar= inject(MatSnackBar)
  public dataSource = new MatTableDataSource<Tarea>//tabla de tareas
  public displayedColumns:string[]=['id','titulo','descripcion','fechaCreacion','estado','idUsuario','importancia','acciones']// nombre de columnas

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //Creamos el constructor del formulario:
  constructor(private fb: FormBuilder) {  // Inyectamos FormBuilder en el constructor
    this.frm = this.fb.group({
      nombre: ['']  // Inicializamos el campo 'nombre' del formulario
    });
  }

  cargarDatos(){
    try {
      //obtenemos el nombre del usuario
      this.nombreUsuario = this.frm.get('nombre')?.value
      // Utilizamos subscribe para manejar el resultado del Observable
      if (this.nombreUsuario) {
        // Llamada al servicio para obtener tareas
        this.serv_tarea.mostrarTareasUsuario(this.nombreUsuario)
          .subscribe(
            (res: Tarea[]) => {
              // Asignamos los datos al dataSource
              this.dataSource.data = res;

              // Configuramos paginación y ordenamiento
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            error => {
              console.log(error);
            }
          );
      }
    } catch (error) {
      console.log(error);
    }
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
            this.cargarDatos();
          }
        )
      }
    })
  }

}
