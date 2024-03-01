import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Tarea } from '../modelos/tarea';
import { Usuario } from '../modelos/usuario';


@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private url = "http://localhost:3000"
  //inyectamos httpClient
  private http = inject(HttpClient)

  //funcion de mostrarTareas
  mostrarTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/tareas`).pipe(
      catchError(error => {
        console.log(`Error al obtener las tareas ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }



  mostrarTareasFiltradas(estado:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.url}/tareasEstado/${estado}`).pipe(
      catchError(error => {
        console.log(`Error al obtener las tareas ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }
  

  mostrarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`).pipe(
      catchError(error => {
        console.log(`Error al obtener los usuarios ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }
  
  mostrarTarea(_id:string):Observable<Tarea>{
    return this.http.get<any>(`${this.url}/tareas/${_id}`).pipe(
      map(res=>{
        return res[0]
      }),
      catchError(error=>{
        console.log(`Error al obtener la tarea ${error}`);
        return of({} as Tarea)//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  mostrarUsuario(_id:string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/usuarios/${_id}`).pipe(
      map(res=>{
        return res
      }),
      catchError(error=>{
        console.log(`Error al obtener la tarea ${error}`);
        return of({} as Usuario)//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  //funcion eliminar tarea
  eliminarTarea(_id: string): Observable<boolean> {
    return this.http.delete(`${this.url}/eliminarTarea/${_id}`).pipe(
      map(() => true),
      catchError(error => {
        console.log(`Error al eliminar la tarea ${error}`);
        return of(false)//en el caso de que haya error devuelve un error vacío
      })
    )
  }

  crearTarea(tarea:Tarea):Observable<boolean>{
    return this.http.post<Tarea>(`${this.url}/crearTarea`,tarea).pipe(
      map(res=>{
        return true
      }),
      catchError(error=>{
        console.log(`Error al insertar el cliente ${error}`);
        return of (false)//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  mostrarTareasUsuario(nombre:string):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.url}/tareasUsuario/${nombre}`).pipe(
      map(res=>{
        return res
      }),
      catchError(error=>{
        console.log(`Error al obtener el cliente ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  editarTarea(tarea:Tarea, _id:string):Observable<boolean>{
    return this.http.put<Tarea>(`${this.url}/editarTarea/${_id}`,tarea).pipe(
      map(res=>{
        return true
      }),
      catchError(error=>{
        console.log(`Error al actualizar la tarea ${error}`);
        return of (false)//en el caso de que haya error devuelve un error vacío
      })
    );
  }
  
}

