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

export const mostrarTarea = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const{id}=req.params
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({ id: parseInt(id) }).toArray()
    console.log(result);
    res.status(200).json(result); //se manda el valor
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
    const {id}= req.params
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.deleteOne({ id: parseInt(id) })
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const crearTarea = async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos inserción. Primero debemos obtener los datos obtenidos del formulario
    const {id, titulo, idUsuario, estado, importancia, descripcion, fechaCreacion}= req.body
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.insertOne({id, titulo,descripcion,fechaCreacion, estado, idUsuario, importancia})
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

export const mostrarTareasCompletadas= async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({estado:'completada'}).toArray()
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
export const mostrarTareasPendientes= async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({estado:'pendiente'}).toArray()
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
export const mostrarTareasProgreso= async (req, res) => {
  //argumentos de peticion y respuesta
  try {
    //hacemos la consulta con mongoDB
    const database = await conexionBD();
    const collection = database.collection('Tarea');//obtenemos la coleccion de tareas
    const result = await collection.find({estado:'en progreso'}).toArray()
    console.log(result);
    res.status(200).json(result); //se manda el valor
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
};