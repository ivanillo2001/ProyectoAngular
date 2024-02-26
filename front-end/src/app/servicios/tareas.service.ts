import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Tarea } from '../modelos/tarea';
import { Usuario } from '../modelos/Usuario'

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

  mostrarTareasCompletadas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/tareasCompletadas`).pipe(
      catchError(error => {
        console.log(`Error al obtener las tareas ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }
  
  mostrarTareasPendientes(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/tareasPendientes`).pipe(
      catchError(error => {
        console.log(`Error al obtener las tareas ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  mostrarTareasProgreso(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.url}/tareasProgreso`).pipe(
      catchError(error => {
        console.log(`Error al obtener las tareas ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }

  mostrarUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/usuarios`).pipe(
      catchError(error => {
        console.log(`Error al obtener los usuarios ${error}`);
        return of([])//en el caso de que haya error devuelve un error vacío
      })
    );
  }
  
  mostrarTarea(id:number):Observable<Tarea>{
    return this.http.get<Tarea>(`${this.url}/tarea/${id}`).pipe(
      map(res=>{
        return res
      }),
      catchError(error=>{
        console.log(`Error al obtener el cliente ${error}`);
        return of({} as Tarea)//en el caso de que haya error devuelve un error vacío
      })
    );//con esto hacemos el get de los clientes
  }
  //funcion eliminar tarea
  eliminarTarea(id: number): Observable<boolean> {
    return this.http.delete(`${this.url}/eliminarTarea/${id}`).pipe(
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
    );//con esto hacemos el get de los clientes
  }


  
}

