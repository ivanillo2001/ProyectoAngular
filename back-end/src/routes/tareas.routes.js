"use strict"
import { Router } from "express";
import {mostrarTareas, eliminarTarea, getUsuarios, mostrarTareasFiltradas, crearTarea,mostrarTareasUsuario} from "../controllers/tareas.controllers.js";

const router = Router();

router.get("/tareas",mostrarTareas);//mostrar todas las tareas
router.get("/usuarios",getUsuarios);
router.get('/tareasUsuario/:nombre',mostrarTareasUsuario);//mostrar tareas de un alumno
router.get('/tareasEstado/:estado',mostrarTareasFiltradas);
router.post('/crearTarea',crearTarea);//crear una nueva tarea (formulario)
// router.put('/editarTarea/:idTarea',editarTarea);//editar tarea (redirige a formulario)
router.delete('/eliminarTarea/:_id',eliminarTarea);//eliminar tarea

export default router;//lo exportamos.