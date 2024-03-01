// En formulario.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Tarea } from '../../modelos/tarea';
import { TareasService } from '../../servicios/tareas.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  public frm!: FormGroup; // declaras el formulario
  public tarea!: Tarea;
  constructor(private fb:FormBuilder){}
  private serv_tarea = inject(TareasService);
  private _snackBar = inject(MatSnackBar);
  private _router = inject(Router);
  private _activedRouter = inject(ActivatedRoute);
  public idTarea!: string;
  public usuarios?: Usuario[] = [];
  public formEnviado: boolean = false;
  public _idTarea!:string //para editar la tarea necesitamos saber el id
  
  ngOnInit(): void {
      this.frm = this.fb.group({
        titulo: ['', [Validators.required]],
        importancia: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        descripcion: ['', [Validators.required]]
      });
    this._activedRouter.params.subscribe(
      params=>{
        this._idTarea=params['_id'];
        console.log(this._idTarea);
        if (this._idTarea) {
          this.cargarTarea();
        }
      }
    )
    this.mostrarUsuarios()
  }

  mostrarUsuarios(): void {
    this.serv_tarea.mostrarUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  grabarDatos() {
    this.formEnviado = true; // Marcar el formulario como enviado
    if (this.frm.valid) {
      // Implementa la lógica para guardar los datos del formulario
      // Obtener el ID del usuario seleccionado
      const idUsuarioSeleccionado = this.frm.get('usuario')?.value;

      // Asignar el ID del usuario al objeto antes de enviarlo al servicio
      const tarea = {
        ...this.frm.value,//carga de todo el formulario
        idUsuario: idUsuarioSeleccionado,
        fechaCreacion: this.crearFecha(),//función para crear fecha
        importancia: +this.frm.get('importancia')?.value // Convertir a número
      };
      // Llamar a la función crearTarea con el objeto modificado
      this.crearTarea(tarea);
    }
  }

  crearFecha() {
    const fecha = new Date();
    const year = fecha.getFullYear()
    const month = fecha.getMonth() + 1
    const day = fecha.getDate()

    const fechaFormateada = `${day}/${month}/${year}`
    return fechaFormateada
  }
  crearTarea(tarea: Tarea): void {
    this.serv_tarea.crearTarea(tarea).subscribe(
      res => {
        if (res) {
          console.log(res);
          this.mensaje("Tarea grabada");
          this.frm.reset();//limpiar el formulario
          //redirigimos a tareas
          this._router.navigate(['/tareas']);//cargar el componente tareas
        } else {
          this.mensaje("Cliente no grabado");
        }
      }
    )
  }
  mensaje(texto: string): void {
    this._snackBar.open(texto, "Cerrar"), {
      duration: 1500,
      verticalPosition: 'top',

    }
  }

  //!Funciones para la edición de la tarea

  //función para mostrar la tarea
  cargarTarea():void{
    this.serv_tarea.mostrarTarea(this._idTarea).subscribe(
      res=>{
        if (res) {
          console.log(res);
          this.frm.get('titulo')?.setValue(res.titulo);
          this.frm.get('descripcion')?.setValue(res.descripcion);
          this.frm.get('estado')?.setValue(res.estado);
          this.frm.get('importancia')?.setValue(res.importancia);
          ;
        }
      }
    )
  }

  actualizarTarea():void{
    const idUsuarioSeleccionado = this.frm.get('usuario')?.value;
    const formularioActualizado={
      ...this.frm.value,//carga de todo el formulario
        idUsuario: idUsuarioSeleccionado,
        fechaCreacion: this.crearFecha(),//función para crear fecha
        importancia: +this.frm.get('importancia')?.value // Convertir a número
    }
    this.serv_tarea.editarTarea(formularioActualizado, this._idTarea).subscribe(
      res=>{
        if (res) {
          this.mensaje("Cliente actualizado")
          this.frm.reset();
          this._router.navigate(['/tareas'])
        }else{
          this.mensaje("Cliente no actualizado")
        }
        
      }
    )
  }
}
