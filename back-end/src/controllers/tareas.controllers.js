import { ObjectId } from "mongodb";
import conexionBD from "../../mongodb_conector.js";

export const mostrarTareas = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    //no hace falta obtener parametros
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({}).toArray()
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const getUsuarios = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    //no hace falta obtener parametros
    const database = await conexionBD();
    const collection = database.collection('Usuario');//obtenemos la coleccion de tareas
    const result = await collection.find({}).toArray()
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};


export const mostrarTareasUsuario = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const{nombre}=req.params
    const database = await conexionBD();
    const tareas = database.collection('Tarea');//obtenemos la coleccion de tareas
    const usuarios = database.collection('Usuario');//obtenemos la coleccion de tareas
    const usuario = await usuarios.findOne({nomape:nombre})
    console.log(usuario._id);
    if (usuario) {
      const result = await tareas.find({idUsuario:usuario._id.toString()}).toArray() //debemos poner el toString porque devolvia un objectId
      console.log(result);
      res.status(200).json(result); //se manda el valor
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const eliminarTarea = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos inserción. Primero debemos obtener los datos obtenidos del formulario
    const {_id} = req.params
    console.log(_id);
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.deleteOne({ _id : new ObjectId(_id) })
    res.status(200).json(result); //se manda el valor
    
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const mostrarTareasFiltradas= async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const {estado}=req.params
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({estado:estado}).toArray()
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const crearTarea= async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    const {titulo, descripcion, estado, importancia, idUsuario, fechaCreacion} = req.body
    const datosAInsertar={
      titulo:titulo,
      descripcion:descripcion,
      fechaCreacion:fechaCreacion,
      estado:estado,
      idUsuario:idUsuario,
      importancia:importancia
    }
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.insertOne(datosAInsertar)
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

