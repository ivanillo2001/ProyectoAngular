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
    path:'tareasEstado/:estado',
    loadComponent:()=>import('./components/filtro-tareas/filtro-tareas.component').then(c=>c.FiltroTareasComponent)
   },
   {
    path:'formTareas',
    loadComponent:()=>import('./components/formulario/formulario.component').then(c=>c.FormularioComponent)
   },
   
   {
    path:'tareasUsuario',
    loadComponent:()=>import('./components/tareas-usuario/tareas-usuario.component').then(c=>c.TareasUsuarioComponent)
   },
   {
    path:'tareasUsuario/_id',
    loadComponent:()=>import('./components/tareas-usuario/tareas-usuario.component').then(c=>c.TareasUsuarioComponent)
   },
   {
    path:'formTareas/:_id',
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
