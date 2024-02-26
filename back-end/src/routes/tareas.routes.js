"use strict"
import { Router } from "express";
import {mostrarTareas,mostrarTarea, eliminarTarea, getUsuarios, mostrarTareasCompletadas,mostrarTareasPendientes, mostrarTareasProgreso} from "../controllers/tareas.controllers.js";

const router = Router();

router.get("/tareas",mostrarTareas);//mostrar todas las tareas
router.get("/tareas/:id",mostrarTarea);//mostrar todas las tareas
router.get("/usuarios",getUsuarios);
// router.get('/tareas/:idUsuario',mostrarTarasAlumno);//mostrar tareas de un alumno
router.get('/tareasPendientes',mostrarTareasPendientes);//mostrar las tareas pendientes
router.get('/tareasCompletadas',mostrarTareasCompletadas);//mostrar tareas completadas
router.get('/tareasProgreso',mostrarTareasProgreso);//mostrar tareas en progreso
// router.post('/crearTarea',crearTarea);//crear una nueva tarea (formulario)
// router.put('/editarTarea/:idTarea',editarTarea);//editar tarea (redirige a formulario)
router.delete('/eliminarTarea/:id',eliminarTarea);//eliminar tarea

export default router;//lo exportamos.