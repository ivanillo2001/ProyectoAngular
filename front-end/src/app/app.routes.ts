import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path:'home',
    loadComponent:()=>import('./components/home/home.component').then(c=>c.HomeComponent)
   },
   {
    path:'tareas',
    loadComponent:()=>import('./components/lista-tareas/lista-tareas.component').then(c=>c.ListaTareasComponent)
   },
   {
    path:'tareasCompletadas',
    loadComponent:()=>import('./components/tareas-completadas/tareas-completadas.component').then(c=>c.TareasCompletadasComponent)
   },
   {
    path:'tareasProgreso',
    loadComponent:()=>import('./components/tareas-progreso/tareas-progreso.component').then(c=>c.TareasProgresoComponent)
   },
   {
    path:'tareasPendientes',
    loadComponent:()=>import('./components/tareas-pendientes/tareas-pendientes.component').then(c=>c.TareasPendientesComponent)
   },
   {
    path:'formTareas',
    loadComponent:()=>import('./components/formulario/formulario.component').then(c=>c.FormularioComponent)
   },
    {//localhost:4200
        path:'',
        redirectTo:'/home',
        pathMatch:'full',//carga el path completo
    },
    {//path erroneo
        path:'**',
        loadComponent:()=>import('./components/pagina404/pagina404.component').then(c=>c.Pagina404Component)
    }
];
