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
        if (this.idTarea) {
          this.cargarTarea();
        }
      }
    )
    this.mostrarUsuarios()
  }

  mostrarUsuarios(): void {
    this.serv_tarea.mostrarUsuario().subscribe(
      (usuarios: Usuario[]) => {
        console.log(usuarios);
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
      const tareaConUsuario = {
        ...this.frm.value,//carga de todo el formulario
        idUsuario: idUsuarioSeleccionado,
        fechaCreacion: this.crearFecha()//función para crear fecha
      };
      // Llamar a la función crearTarea con el objeto modificado
      this.crearTarea(tareaConUsuario);
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
    this.serv_tarea.mostrarTarea(this.idTarea).subscribe(
      res=>{
        if (res) {
          this.frm.controls['titulo'].setValue(res.titulo);
          this.frm.controls['descripcion'].setValue(res.descripcion);
          this.frm.controls['fechaCreacion'].setValue(res.fechaCreacion);
          this.frm.controls['estado'].setValue(res.estado);
          this.frm.controls['importancia'].setValue(res.importancia);
          this.frm.controls['idUsuario'].setValue(res.idUsuario);
        }
      }
    )
  }

  actualizarTarea():void{
    this.serv_tarea.editarTarea(this.frm.value, this._idTarea).subscribe(
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
