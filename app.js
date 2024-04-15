//import
const util = require('util');
const express= require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const nodemailer= require('nodemailer');
const morgan= require('morgan');
const path = require('path');
// Importa el módulo de socket.io
const http = require('http');
const socketIo = require('socket.io');
const { Socket } = require('dgram');

const app=express();

const server = http.createServer(app);
const io = socketIo(server); // Configura socket.io con tu servidor
const PORT = process.env.PORT || 3000; // Utiliza el puerto proporcionado por el hosting o el 3000 si no se proporciona ninguno

server.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
  console.log(`Servidor es http://localhost:${PORT}`);
});

io.on("connection",(socket)=>{
  console.log("el usuario se conecta usando socket")
  socket.on("disconnect",()=>{
    console.log("un usuario se desconecto")
  })
  socket.on("chat message",(msg)=>{
   io.emit("chat message",msg)
  })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"))

// Establece la carpeta 'public' como el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura la carpeta 'views' como la ubicación de las vistas
app.set('views', path.join(__dirname, 'views'));

// Establece el motor de vistas como EJS
app.set('view engine', 'ejs');

// Ruta de inicio que renderiza el archivo index.ejs
app.get('/', (req, res) => {
    res.render('index'); // Renderiza el archivo index.ejs
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* CONEXION PARA PRODUCCION EN EL SERVIDOR TOWEB
let connection = mysql.createConnection({
    //a la conexión mysql le pasamos algunas propiedades como objeto:
    host: "localhost",
    database: "tempestt_znk",
    user:"tempestt_root",
    password:"hikonometaiseno"
})
*/

let connection = mysql.createConnection({
    //a la conexión mysql le pasamos algunas propiedades como objeto:
    host: "localhost",
    database: "znk",
    user:"root",
    password:""
})

// Conectar a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conectados a la BD');
    }
});

//Manejo de Desconexión
process.on('SIGINT', () => {
    connection.end(() => {
      console.log('Conexión cerrada al salir');
      process.exit();
    });
});

// Ruta para verificar el estado de la conexión
app.get('/status', (req, res) => {
  res.json({ connected: connection.state === 'authenticated' });
});

//CONFIGURACION PARA LOS MAILS
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "tempesttempest66@gmail.com",
      pass: "xghj wmvg pkmr hgzs",
    },
});
    
transporter.verify().then(()=>{
console.log("Ready for send e-mail")
})



//*************PETICIONES DEL CLIENTE
//nuevo resgitro ok!!
app.post('/nuevoRegistro', async (req, res) => {
    try {
          const {
            nombreusuario,
            contrasenia
          } = req.body;
  
      console.log('Body del POST del cliente:', req.body);

      const queryString=`INSERT INTO usuarios (nombreusuario, contrasenia, estado, permiso)
      SELECT * FROM (SELECT '${nombreusuario}' AS nombreusuario, '${contrasenia}' AS contrasenia, '0' AS estado, '0' AS permiso) AS tmp
      WHERE NOT EXISTS (
          SELECT nombreusuario
          FROM usuarios
          WHERE nombreusuario = '${nombreusuario}'
      ) LIMIT 1;`

      await connection.query(queryString, (err, result) => {
        if (err) {
          console.error('Error al ejecutar la consulta:', err);
          console.log("ya existe el mail ",nombreusuario);
          return res.status(500).json({ error: 'Error interno del servidor (entro en el A)' });
        }else {
          if (result.affectedRows > 0) {
                  
           try{

                //MANDAMOS EL MAIL AL NUEVO USUARIO QUE SE REGISTRO EXITOSAMENTE
                const info = transporter.sendMail({
                from: '"Admim-ZNK" <tempesttempest66@gmail.com>', // sender address
                to: `${nombreusuario}`, // list of receivers
                subject: "Nuevo registro znk", // Subject line
                text: "Su registro en la pagina znk fue exitoso.Se procesara su peticion para su inicio de sesion", // plain text body
                });

                const mailAviso = transporter.sendMail({
                from: '"Admim-ZNK" <tempesttempest66@gmail.com>', // sender address
                to: `tempesttempest66@gmail.com`, // list of receivers
                subject: "Nuevo registro ZNK-validar", // Subject line
                text: `Se registro una peticion de habilitacion del usuario: ${nombreusuario} `, // plain text body                
                });
      
           }catch(error){
      
             emailStatus=error
             return res.status(400).json({message:`algo salio mal`})
           }
           console.log('Insert de usuario y contraseña exitoso');
           res.status(200).json("Nuevo usuario registrado correctamente");
          }else if(result.affectedRows == 0){
           console.log("afecto 0 rows");
           return res.status(400).json({ message: `El mail ${nombreusuario} ya esta registrado` });
          }
         }
      });
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ error: 'Error interno del servidor (ENTRO EN EL B)' });
    }
});

//INICIO OK DEVUELVE EL ID DE USUARIO 
app.post('/iniciarSesion', async (req, res) => {
  try {
    const { nombreusuario, contrasenia } = req.body;

    const queryString = 'SELECT * FROM usuarios WHERE nombreusuario = ? AND contrasenia= ?;';

    // Ejecutar la consulta
    connection.query(queryString, [nombreusuario, contrasenia],(error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        return;
      }
    
      // Procesar los resultados aquí
      console.log('Resultados de la consulta:', results);
      if (results.length > 0) {
           
           return res.status(200).json({ ok: true, mensaje: 'La sesión es válida', dataUsuario: results[0] });

      } else {
        // Si no hay resultados, las credenciales son inválidas
        res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
      }


    });

    

    
    
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//RECUPERAR PASS
app.get('/recuperarPass', async (req, res) => {
  try {
         const nombreusuario = req.query.nombreusuario;
         console.log('EN EL PARAMS del cliente:', nombreusuario);
         const queryAsync = util.promisify(connection.query).bind(connection);
            
        const resultado = await queryAsync(`
        SELECT nombreusuario, contrasenia
        FROM usuarios
        WHERE nombreusuario = '${nombreusuario}'; 
        `);

        if (Array.isArray(resultado)) 
          {
                let contrasenia=resultado[0].contrasenia;
                console.log("la contraseña recuperada es: ",contrasenia);
                      try{     
                          const info = await transporter.sendMail({
                            from: '"Admim-ZNK" <tempesttempest66@gmail.com>', 
                            to: `${nombreusuario}`, 
                            subject: "Recuperacion de contraseña znk", 
                            text: `Su contraseña de la sesion en la pagina ZNK es: ${contrasenia}`,
                          });
                          console.log("Message sent: %s", info.messageId);
                          res.json(resultado);              
                      }catch(error){               
                          emailStatus=error
                          return res.status(400).json({message:`algo salio mal`})              
                      }     
              
          } else {
              console.error('Error en la estructura del resultado de la consulta:', resultado);
              res.status(500).send('Error en la consulta de estados de usuario');
          } 
            
            
            
             
    
  }catch(error){
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//ESTE GET BUSCA TRAER LOS ESTADOS DE LOS USUARIOS
app.get('/peticionEstado', async (req, res) => {
  try {

     // Obtener el idusuario de la cadena de consulta
     //const idusuario = req.query.idusuario;
     // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
      const queryAsync = util.promisify(connection.query).bind(connection);
      
     

      // Realizamos la consulta utilizando el método promisificado
      const resultado = await queryAsync(`
      SELECT idusuario, nombreusuario, estado, permiso
      FROM usuarios; 
    `);

      if (Array.isArray(resultado)) {
          res.json(resultado);
          
      } else {
          console.error('Error en la estructura del resultado de la consulta:', resultado);
          res.status(500).send('Error en la consulta de estados de usuario');
      }       

  } catch (error) {
      console.error('Error en la consulta de estados de usuario:', error);
      res.status(500).send('Error en la consulta de estados de usuario');
  }
});

//UPDATE DE PERMISO
app.put('/cambioPermiso', (req, res) => {
  const { idusuario, nombreusuario, permiso } = req.body;

  // Asegúrate de que idusuario y estado están presentes en la solicitud
  if (!idusuario || !permiso) {
      return res.status(400).json({ error: 'Se requieren idusuario y permiso en la solicitud.' });
  }

  // Ahora puedes ejecutar la consulta SQL para actualizar el permiso
  const sql = 'UPDATE usuarios SET permiso = ? WHERE idusuario = ?';

  // Asumiendo que estás usando un paquete como 'mysql' para interactuar con MySQL
  connection.query(sql, [permiso, idusuario], (error, results) => {
      if (error) {
          console.error('Error al actualizar el permiso del usuario:', error);
          return res.status(500).json({ error: 'Error interno del servidor.' });
      }

      // Verifica si se actualizó correctamente
      if (results.affectedRows === 1) {

        try{

          if(permiso==="1"){
                //MANDAMOS EL MAIL AL NUEVO USUARIO QUE SE REGISTRO EXITOSAMENTE
          const info = transporter.sendMail({
            from: '"Admim-ZNK" <tempesttempest66@gmail.com>', // sender address
            to: `${nombreusuario}`, // list of receivers
            subject: "Permiso de narrador ZNK", // Subject line
            text: `Hola ${nombreusuario}!!. Ya puedes inciar sesion como narrador en la pagina de ZNK.`, // plain text body
          });
         

          }else if(permiso==="0"){
                  //MANDAMOS EL MAIL AL NUEVO USUARIO QUE SE REGISTRO EXITOSAMENTE
          const info = transporter.sendMail({
            from: '"Admim-ZNK" <tempesttempest66@gmail.com>', // sender address
            to: `${nombreusuario}`, // list of receivers
            subject: "Permiso de narrador ZNK deshabilitado", // Subject line
            text: `Hola ${nombreusuario}. Tu sesion en la pagina de ZNK ahora solo tiene permisos de jugador.`, // plain text body
          });

          }

      
        
         
        
        }catch(error){
        
        emailStatus=error
        return res.status(400).json({message:`algo salio mal`})
          
        }
  
        return res.status(200).json({ message: 'Permiso del usuario actualizado correctamente.' });
      
        } else {
          return res.status(404).json({ error: 'Usuario no encontrado o ningún cambio realizado.' });
      }
  });
});

//UPDATE DE ESTADO
app.put('/cambioEstado', (req, res) => {
  const { idusuario, nombreusuario, estado } = req.body;
  if (!idusuario || !estado) {
      return res.status(400).json({ error: 'Se requieren idusuario y estado en la solicitud.' });
  }

  // Ahora puedes ejecutar la consulta SQL para actualizar el estado
  const sql = 'UPDATE usuarios SET estado = ? WHERE idusuario = ?';

  // Asumiendo que estás usando un paquete como 'mysql' para interactuar con MySQL
  connection.query(sql, [estado, idusuario], (error, results) => {
      if (error) {
          console.error('Error al actualizar el estado del usuario:', error);
          return res.status(500).json({ error: 'Error interno del servidor.' });
      }

      // Verifica si se actualizó correctamente
      if (results.affectedRows === 1) {

        try{

          if(estado==="1"){
          const info = transporter.sendMail({
            from: '"Admim-ZNK" <tempesttempest66@gmail.com>', 
            to: `${nombreusuario}`, 
            subject: "Inicio de sesion znk habilitado!!",
            text: `Hola ${nombreusuario}!!. Ya puedes inciar sesion en la pagina de ZNK`, 
          });
          //console.log("Message sent: ", info.nombreusuario);

          }else if(estado==="0"){
          const info = transporter.sendMail({
            from: '"Admim-ZNK" <tempesttempest66@gmail.com>', 
            to: `${nombreusuario}`, 
            subject: "Sesion ZNK deshabilitada", 
            text: `Hola ${nombreusuario}. Tu sesion en la pagina de ZNK fue deshabilitada`, 
          });
        }        
        }catch(error){
        
        emailStatus=error
        return res.status(400).json({message:`algo salio mal`})
          
        }
  
        return res.status(200).json({ message: 'Estado del usuario actualizado correctamente.' });
      
        } else {
          return res.status(404).json({ error: 'Usuario no encontrado o ningún cambio realizado.' });
      }
  });
});

//El GET este QUE CONSUME Los personajes ESTA OK!!
app.get('/misPersonajes', async (req, res) => {
  try {

     // Obtener el idusuario de la cadena de consulta
     //const idusuario = req.query.idusuario;
      // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
      const queryAsync = util.promisify(connection.query).bind(connection);
      
     

      // Realizamos la consulta utilizando el método promisificado
      const resultado = await queryAsync(`
      SELECT personajes.*
      FROM personajes; 
    `);

      if (Array.isArray(resultado)) {
        console.log("TRAE DE LA BASE DE DATOS:",resultado)
          res.json(resultado);
          
      } else {
          console.error('Error en la estructura del resultado de la consulta:', resultado);
          res.status(500).send('Error en la consulta de personajes');
      }       

  } catch (error) {
      console.error('Error en la consulta de personajes:', error);
      res.status(500).send('Error en la consulta de personajes');
  }
});

// este es el ultimo socket con el que trabajamos
io.on("connection",(socket)=>{
  socket.on("actualizarPj", async(pj,dataidusuario)=>{
    console.log(pj);
    idusuario_fk=dataidusuario;
    console.log(idusuario_fk)

    try {
         const {
          idpersonaje,
          nombre,
          raza,
          naturaleza,
          dominio,
          fuerza,
          fortaleza,
          ki,
          kiActual,
          faseSalud,
          vidaTotal,
          damageActual,
          ken,
          kenActual,
          imagen,
          destreza,
          agilidad,
          sabiduria,
          sentidos,
          presencia,
          principio,
          academisismo,
          artesMarciales,
          atletismo,
          conBakemono,
          conDemonio,
          conEsferas,
          conEspiritual,
          forja,
          medicina,
          montar,
          sigilo,
          pilotear,
          manejoArma,
          conObjMagicos,
          conLeyendas,
          resCorte,
          resEnergia,
          resRayo,
          resFuego,
          resFrio,
          resVeneno,
          manejoSombras,
          tratoBakemono,
          conHechiceria,
          meditacionEspiritual,
          meditacionVital,
          idusuario_fk,
          cantFases,
          fasesPos,
          fasesNeg,
          nombreArma,
          consumicionKi
          
      } = pj;
           
      const queryString = `
          UPDATE personajes
          SET nombre=?, raza=?, naturaleza=?, dominio=?, fuerza=?, fortaleza=?, ki=?, kiActual=?, faseSalud=?, vidaTotal=?, damageActual=?, ken=?, kenActual=?, imagen=?, destreza=?, agilidad=?, sabiduria=?, sentidos=?, presencia=?, principio=?, academisismo=?, artesMarciales=?, atletismo=?, conBakemono=?, conDemonio=? , conEsferas=?, conEspiritual=?, forja=?, medicina=?, montar=?, sigilo=?, pilotear=?, manejoArma=?, conObjMagicos=?, conLeyendas=?, resCorte=?, resEnergia=?, resRayo=?, resFuego=?, resFrio=?, resVeneno=?, manejoSombras=?, tratoBakemono=?, conHechiceria=?, meditacionEspiritual=?, meditacionVital=?, idusuario_fk=?, cantFases=?, fasesPos=?, fasesNeg=?, nombreArma=?,consumicionKi=?
          WHERE idpersonaje=?;
      `;

console.log("esto es lo que tiene el array",[nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases, fasesPos, fasesNeg,nombreArma, consumicionKi,idpersonaje])
       
//dejo el idpersonaje como ultimo parametro
      connection.query(queryString, [nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases,fasesPos,fasesNeg,nombreArma,consumicionKi,idpersonaje], (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta:', err);
            
          }else{
             
              console.log("UPDATE EXITOSO"); 
          }});
      // Necesitas hacer la consulta a la base de datos
       const queryAsync = util.promisify(connection.query).bind(connection);

       const resultado = await queryAsync(`
       SELECT personajes.*
       FROM personajes; 
     `);

       if (resultado.length > 0) {
         const pjActualizado = resultado;
         console.log("ESTO ES LO QUE EMITE AL CLIENTE",pjActualizado);
         io.emit('pjActualizado', pjActualizado);
       } else {
         const infoActualizada = resultado;
         console.log(infoActualizada);
         console.error('Error en la estructura del resultado de la consulta:', resultado);
         io.emit('error_en_actualizacion', 'Error al actualizar en el servidor');
       }

  } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).send('Error interno del servidor');
  }
  })

})


//El GET este QUE CONSUME todos los personajes de la base de datos
app.get('/basePersonajes', async (req, res) => {
try {    
    // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
    const queryAsync = util.promisify(connection.query).bind(connection);
    

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT personajes.*
    FROM personajes; 
  `);

    if (Array.isArray(resultado)) {
        console.log("CA ESTA LO QUE TRAE DE LA BASE: ",resultado)
        res.json(resultado);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta:', resultado);
        res.status(500).send('Error en la consulta de personajes');
    }       

} catch (error) {
    console.error('Error en la consulta de personajes:', error);
    res.status(500).send('Error en la consulta de personajes');
}
});


app.get('/peticionEstadoUsuario/:idusuario', async (req, res) => {
try {

   // Obtener el idusuario de la cadena de consulta
   //const idusuario = req.query.idusuario;
   // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
   const idusuario = req.params.idusuario;  
   const queryAsync = util.promisify(connection.query).bind(connection);
    
   console.log("me viene del req el id de usuario: ",idusuario)

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT idusuario, nombreusuario, estado, permiso
    FROM usuarios
    WHERE idusuario = ?; 
  `,[idusuario]);

    if (Array.isArray(resultado)) {


      const usuario = resultado[0];

      // Enviar la respuesta como un objeto JSON con estado y permiso
      res.json({
        idusuario: usuario.idusuario,
        nombreusuario: usuario.nombreusuario,
        estado: usuario.estado,
        permiso: usuario.permiso,
      });

      console.log("Estado del usuario: ", usuario.estado);
      console.log("Permiso del usuario: ", usuario.permiso);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta:', resultado);
        res.status(500).send('Error en la consulta de estados de usuario');
    }       

} catch (error) {
    console.error('Error en la consulta de estados de usuario:', error);
    res.status(500).send('Error en la consulta de estados de usuario');
}
});

// INSERT para cargar un nuevo personaje esta OK!!
app.post('/insert', async (req, res) => {
  try {
    const {
      
      nombre,
      raza,
      naturaleza,
      dominio,
      fuerza,
      fortaleza,
      ki,
      kiActual,
      faseSalud,
      vidaTotal,
      damageActual,
      ken,
      kenActual,
      imagen,
      destreza,
      agilidad,
      sabiduria,
      sentidos,
      presencia,
      principio,
      academisismo,
      artesMarciales,
      atletismo,
      conBakemono,
      conDemonio,
      conEsferas,
      conEspiritual,
      forja,
      medicina,
      montar,
      sigilo,
      pilotear,
      manejoArma,
      conObjMagicos,
      conLeyendas,
      resCorte,
      resEnergia,
      resRayo,
      resFuego,
      resFrio,
      resVeneno,
      manejoSombras,
      tratoBakemono,
      conHechiceria,
      meditacionEspiritual,
      meditacionVital,
      idusuario_fk,
      cantFases,
      fasesPos,
      fasesNeg,
      nombreArma,
      consumicionKi,
      imagenFile
    } = req.body;

    console.log('Body del POST del cliente:', req.body);
//aca va ir en el primer campo idpersonaje_fk
    const queryString = `
      INSERT INTO personajes (nombre, raza, naturaleza, dominio, fuerza, fortaleza, ki, kiActual, faseSalud, vidaTotal, damageActual, ken, kenActual, imagen, destreza, agilidad, sabiduria, sentidos, presencia, principio, academisismo, artesMarciales, atletismo,conBakemono, conDemonio, conEsferas, conEspiritual, forja, medicina, montar, sigilo, pilotear, manejoArma, conObjMagicos, conLeyendas, resCorte, resEnergia, resRayo, resFuego, resFrio, resVeneno, manejoSombras, tratoBakemono, conHechiceria, meditacionEspiritual, meditacionVital, idusuario_fk, cantFases, fasesPos, fasesNeg, nombreArma, consumicionKi,imagenFile)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?);
    `;

    await connection.query(queryString, [nombre, raza, naturaleza, dominio, fuerza, fortaleza, ki, kiActual, faseSalud, vidaTotal, damageActual, ken, kenActual, imagen, destreza, agilidad, sabiduria, sentidos, presencia, principio, academisismo, artesMarciales, atletismo, conBakemono, conDemonio, conEsferas, conEspiritual, forja, medicina, montar, sigilo, pilotear, manejoArma, conObjMagicos, conLeyendas, resCorte, resEnergia, resRayo, resFuego, resFrio, resVeneno, manejoSombras, tratoBakemono, conHechiceria, meditacionEspiritual,meditacionVital, idusuario_fk,cantFases, fasesPos, fasesNeg, nombreArma,consumicionKi,imagenFile], (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }else {
      
          // Recuperar el ID del producto insertado
          const idNuevoPersonaje = result.insertId;

          console.log('Insert exitoso, ID del nuevo personaje:', idNuevoPersonaje);

          // Enviar la respuesta al cliente incluyendo el ID del nuevo producto
          res.status(200).json({ idpersonaje: idNuevoPersonaje });
       }
    });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// INSERT para cargar un nuevo personaje esta OK!!
app.post('/insertarDominiosTecnicas', async (req, res) => {
try {
  const {

    pjDominios
    
  } = req.body;

  console.log('Body del POST del cliente:', req.body);

  const { idPersonaje, dominio, tecnicas } = pjDominios;


  dominio.forEach(idDominio => {
    tecnicas[idDominio].forEach(idTecnica => {
      const query = `
        INSERT INTO personajes_dominios_tecnicas (idPersonaje_fk, idDominio_fk, idTecnica_fk) 
        VALUES (${idPersonaje}, ${idDominio}, ${idTecnica});
      `;


      
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error al insertar datos en dominios y tecncias:', error);
        } else {
          console.log('Inserción exitosa:', results);
        }
      });
    });
  })


  
 
} catch (error) {
  console.error('Error en el servidor para insertar Dominios y Tecnicas:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
});


//UPDATE PARA MODIFICAR LA FICHA DE UN PERSONAJE ESTA OK!!
app.put('/update/:idpersonaje', (req, res) => {
  try {
      const idPersonaje = req.params.idpersonaje;
      const {
          idpersonaje,    
          nombre,
          raza,
          naturaleza,
          dominio,
          fuerza,
          fortaleza,
          ki,
          kiActual,
          faseSalud,
          vidaTotal,
          damageActual,
          ken,
          kenActual,
          imagen,
          destreza,
          agilidad,
          sabiduria,
          sentidos,
          presencia,
          principio,
          academisismo,
          artesMarciales,
          atletismo,
          conBakemono,
          conDemonio,
          conEsferas,
          conEspiritual,
          forja,
          medicina,
          montar,
          sigilo,
          pilotear,
          manejoArma,
          conObjMagicos,
          conLeyendas,
          resCorte,
          resEnergia,
          resRayo,
          resFuego,
          resFrio,
          resVeneno,
          manejoSombras,
          tratoBakemono,
          conHechiceria,
          meditacionEspiritual,
          meditacionVital,
          idusuario_fk,
          cantFases,
          fasesPos,
          fasesNeg,
          nombreArma,
          historia
         
      } = req.body;
      console.log("es cuerpo de la solicitud es: ",req.body)

      
     
      const queryString = `
          UPDATE personajes
          SET nombre=?, raza=?, naturaleza=?, dominio=?, fuerza=?, fortaleza=?, ki=?, kiActual=?, faseSalud=?, vidaTotal=?, damageActual=?, ken=?, kenActual=?, imagen=?, destreza=?, agilidad=?, sabiduria=?, sentidos=?, presencia=?, principio=?, academisismo=?, artesMarciales=?, atletismo=?, conBakemono=?, conDemonio=? , conEsferas=?, conEspiritual=?, forja=?, medicina=?, montar=?, sigilo=?, pilotear=?, manejoArma=?, conObjMagicos=?, conLeyendas=?, resCorte=?, resEnergia=?, resRayo=?, resFuego=?, resFrio=?, resVeneno=?, manejoSombras=?, tratoBakemono=?, conHechiceria=?, meditacionEspiritual=?, meditacionVital=? , idusuario_fk=? , cantFases=?, fasesPos=?, fasesNeg=?, nombreArma=?, historia=?
          WHERE idpersonaje=?;
      `;


       //dejo el idpersonaje como ultimo parametro
      connection.query(queryString, [nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases,fasesPos, fasesNeg, nombreArma,historia, idpersonaje], (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta:', err);
              res.status(500).send('Error interno del servidor');
          } else {
              console.log('Update exitoso');
              res.status(200).send('Update exitoso');
          }
      });
  } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).send('Error interno del servidor');
  }
});

app.post('/eliminarTecnicaYDominio', async (req, res) => {
  try {
    const { idpersonaje, dominio, tecnica } = req.body;
    console.log("*********************Lo que viene del cliente",req.body)
  
    const queryAsync = util.promisify(connection.query).bind(connection);
  
    // Consulta SQL parametrizada para evitar SQL injection
    const resultado = await queryAsync(
      `DELETE FROM personajes_dominios_tecnicas
       WHERE idPersonaje_fk = ? AND idDominio_fk = ? AND idTecnica_fk = ?`,
      [idpersonaje, dominio, tecnica]
    );
  
    // Verificar si la cantidad de filas afectadas es mayor que cero
    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: 'Técnica y dominio eliminados exitosamente' });
    } else {
      console.error('No se encontró ninguna fila para eliminar');
      res.status(404).send('No se encontró ninguna fila para eliminar');
    }
  } catch (error) {
    console.error('Error en la consulta de eliminar dominios y tecnicas del personaje:', error);
    res.status(500).send('Error en la consulta de eliminar dominios y tecnicas del personaje');
  }
  });

  
// ESTE GET ES PARA CONSUMIR DOMINIOS Y TECNICAS DE UN PERSONAJE
app.get(`/consumirDominiosTecnicas/:idpersonaje`, async (req, res) => {
try {
    let idpersonaje = req.params.idpersonaje;

  //recivir el id de personaje
    // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
    const queryAsync = util.promisify(connection.query).bind(connection);

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT p.idPersonaje, d.*, t.*
    FROM personajes_dominios_tecnicas pdt
    JOIN personajes p ON pdt.idPersonaje_fk = p.idPersonaje
    JOIN dominios d ON pdt.idDominio_fk = d.idDominio
    JOIN tecnicas t ON pdt.idTecnica_fk = t.idTecnica
    WHERE p.idPersonaje = ${idpersonaje};
  `);

    if (Array.isArray(resultado)) {
        res.json(resultado);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta del personaje:', resultado);
        res.status(500).send('Error en la consulta de dominios y tecnicas del personaje');
    }       

} catch (error) {
    console.error('Error en la consulta de dominios y tecncias del personaje:', error);
    res.status(500).send('Error en la consulta de dominios y tecnicas del personaje');
}
});


//PETICIONES PARA TECNICAS ESPECIALES
app.get(`/consumirTecnicasEspeciales/:idpersonaje`, async (req, res) => {
try {
    let idpersonaje = req.params.idpersonaje;

  //recivir el id de personaje
    // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
    const queryAsync = util.promisify(connection.query).bind(connection);

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT *
    FROM tecnicasEspeciales
    WHERE idpersonaje_fk = ${idpersonaje};
  `);

    if (Array.isArray(resultado)) {
        res.json(resultado);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta de tecncias especiales:', resultado);
        res.status(500).send('Error en la consulta de tecncias especiales del personaje');
    }       

} catch (error) {
    console.error('Error en la consulta de tecncias especiales del personaje:', error);
    res.status(500).send('Error en la consulta tecncias especiales del personaje');
}
});


//consumir inventario
app.get(`/consumirInventario/:idpersonaje`, async (req, res) => {
try {
    let idpersonaje = req.params.idpersonaje;

  //recivir el id de personaje
    // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
    const queryAsync = util.promisify(connection.query).bind(connection);

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT *
    FROM Inventarios
    WHERE idpersonaje_fk = ${idpersonaje};
  `);

    if (Array.isArray(resultado)) {
        res.json(resultado);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta de INVENTARIO:', resultado);
        res.status(500).send('Error en la consulta de INVENTARIO del personaje');
    }       

} catch (error) {
    console.error('Error en la consulta de INVENTARIO del personaje:', error);
    res.status(500).send('Error en la consulta iNVENTARIO del personaje');
}
});

//INSERTAR ITEM
app.post('/insertarNuevoItem/:idPersonaje', async (req, res) => {
try {
    const {item} = req.body;
    console.log("Nuevo item recibido del cliente:", item);
    //console.log("Nuevo item recibidas del cliente:", idpersonaje);
    const { idPersonaje } = req.params;
    console.log("id persdonaje del cliente",idPersonaje)

    const queryAsync = util.promisify(connection.query).bind(connection);

    
      // La técnica especial es nueva, así que la insertamos
      await queryAsync('INSERT INTO inventarios (idpersonaje_fk, item) VALUES (?, ?);', [idPersonaje, item]);
      


    res.status(200).json({ message: 'Inserción de item exitosa' });
} catch (error) {
    console.error('Error al insertar item:', error);
    res.status(500).json({ error: 'Error al insertar  en la base de datos' });
}
});

//ELIMINAR ITEM
app.delete('/eliminarItem/:idPersonaje', async (req, res) => {
try {
    const { idPersonaje } = req.params;
    const { item } = req.body;

    console.log("ID del personaje:", idPersonaje);
    console.log("Item a eliminar:", item);

    // Aquí realizas la lógica para eliminar el item del inventario del personaje con el ID proporcionado
    // Por ejemplo, puedes ejecutar una consulta SQL para eliminar el item de la base de datos

    // Ejemplo de consulta SQL para eliminar el item del inventario del personaje
    await connection.query('DELETE FROM inventarios WHERE idpersonaje_fk = ? AND item = ?', [idPersonaje, item]);

    res.status(200).json({ message: 'Item eliminado correctamente' });
} catch (error) {
    console.error('Error al eliminar el item:', error);
    res.status(500).json({ error: 'Error al eliminar el item de la base de datos' });
}
});


//*****************CONSUMIR VENTAJAS DE LA BASE DE DATPOS*******************
app.get(`/consumirVentajas/:idpersonaje`, async (req, res) => {
try {
    let idpersonaje = req.params.idpersonaje;

  //recivir el id de personaje
    // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
    const queryAsync = util.promisify(connection.query).bind(connection);

    // Realizamos la consulta utilizando el método promisificado
    const resultado = await queryAsync(`
    SELECT *
    FROM ventajas
    WHERE idpersonaje_fk = ${idpersonaje};
  `);

    if (Array.isArray(resultado)) {
        res.json(resultado);
        
    } else {
        console.error('Error en la estructura del resultado de la consulta de ventajas:', resultado);
        res.status(500).send('Error en la consulta de ventajas del personaje');
    }       

} catch (error) {
    console.error('Error en la consulta de ventajas del personaje:', error);
    res.status(500).send('Error en la consulta ventajas del personaje');
}
});

app.post('/insertarNuevaVentaja/:idPersonaje', async (req, res) => {
try {
    const {nombre} = req.body;
    console.log("Nuevo nombre de ventaja recibido del cliente:", nombre);
    //console.log("Nuevo coste de ventaja recibido del cliente:", coste);
    //console.log("Nuevo item recibidas del cliente:", idpersonaje);
    const { idPersonaje } = req.params;
    console.log("id persdonaje del cliente",idPersonaje)

    const queryAsync = util.promisify(connection.query).bind(connection);

    
      // La técnica especial es nueva, así que la insertamos
      await queryAsync('INSERT INTO ventajas (idpersonaje_fk, nombre) VALUES (?, ?);', [idPersonaje, nombre]);
      


    res.status(200).json({ message: 'Inserción de ventaja exitosa' });
} catch (error) {
    console.error('Error al insertar ventaja:', error);
    res.status(500).json({ error: 'Error al insertar ventaja en la base de datos' });
}
});

app.delete('/eliminarVentaja/:idPersonaje', async (req, res) => {
try {
    const { idPersonaje } = req.params;
    const { idVentaja } = req.body;

    console.log("ID del personaje:", idPersonaje);
    console.log("Ventaja a eliminar:", idVentaja);

    // Aquí realizas la lógica para eliminar el item del inventario del personaje con el ID proporcionado
    // Por ejemplo, puedes ejecutar una consulta SQL para eliminar el item de la base de datos

    // Ejemplo de consulta SQL para eliminar el item del inventario del personaje
    await connection.query('DELETE FROM ventajas WHERE idpersonaje_fk = ? AND idVentaja = ?', [idPersonaje, idVentaja]);

    res.status(200).json({ message: 'Ventaja eliminada correctamente' });
} catch (error) {
    console.error('Error al eliminar el ventaja:', error);
    res.status(500).json({ error: 'Error al eliminar ventaja de la base de datos' });
}
});

app.delete('/eliminarVentajaNombre/:idPersonaje', async (req, res) => {
try {
    const { idPersonaje } = req.params;
    const { nombre } = req.body;

    console.log("ID del personaje:", idPersonaje);
    console.log("Nombre ventaja a eliminar:", nombre);

    // Aquí realizas la lógica para eliminar el item del inventario del personaje con el ID proporcionado
    // Por ejemplo, puedes ejecutar una consulta SQL para eliminar el item de la base de datos

    // Ejemplo de consulta SQL para eliminar el item del inventario del personaje
    await connection.query('DELETE FROM ventajas WHERE idpersonaje_fk = ? AND nombre = ?', [idPersonaje, nombre]);

    res.status(200).json({ message: 'Ventaja eliminada correctamente' });
} catch (error) {
    console.error('Error al eliminar el ventaja:', error);
    res.status(500).json({ error: 'Error al eliminar ventaja de la base de datos' });
}
});

app.post('/insertarVentajas', async (req, res) => {
try {
  const { idpersonaje, ventajas } = req.body;
  console.log("Lo que viene del cliente", req.body);

  const queryAsync = util.promisify(connection.query).bind(connection);

  // Verificar si ventajas es un array o un objeto iterable
  if (Array.isArray(ventajas) || (typeof ventajas === 'object' && ventajas !== null)) {
    // Consulta SQL parametrizada para evitar SQL injection
    const insertQuery = 'INSERT INTO ventajas (idpersonaje_fk, nombre) VALUES (?, ?)';

    // Iterar sobre cada ventaja recibida del cliente y ejecutar la consulta de inserción para cada una
    for (const ventaja of ventajas) {
      const { nombre} = ventaja;
      await queryAsync(insertQuery, [idpersonaje, nombre]);
    }

    // Envía una respuesta de éxito al cliente
    res.status(200).json({ message: 'Ventajas insertadas exitosamente' });
  } else {
    console.error('Error: ventajas no es un array o un objeto iterable');
    res.status(400).json({ error: 'Error: ventajas no es un array o un objeto iterable' });
  }
} catch (error) {
  console.error('Error al insertar ventajas:', error);
  res.status(500).json({ error: 'Error al insertar ventajas en la base de datos' });
}
});

app.put('/updateItem/:idPersonaje/:idInventario/:item', (req, res) => {
try {
    const { idPersonaje, idInventario, item} = req.params;

    const query = `UPDATE inventarios SET item = ? WHERE idpersonaje_fk = ? AND idInventario = ?`;

    // Ejecutar el query con los parámetros
    connection.query(query, [item, idPersonaje, idInventario], (error, results) => {
      if (error) {
        console.error('Error al actualizar el ítem:', error);
        throw error;
      }
      console.log('Ítem actualizado correctamente');
    });
    // Aquí va la lógica para actualizar el ítem en la base de datos

    // Si la actualización se realiza correctamente, enviamos una respuesta de éxito
    res.json({ message: `Ítem actualizado para el personaje ${idPersonaje} con el ID de inventario ${idInventario}` });
} catch (error) {
    // En caso de error, enviamos una respuesta de error al cliente
    console.error('Error al actualizar el ítem:', error);
    res.status(500).json({ error: 'Error al actualizar el ítem' });
}
});

app.put('/updateVentaja/:idPersonaje/:idVentaja/:nombre', (req, res) => {
try {
    const { idPersonaje, idVentaja, nombre} = req.params;

    const query = `UPDATE Ventajas SET nombre = ? WHERE idpersonaje_fk = ? AND idVentaja = ?`;

    // Ejecutar el query con los parámetros
    connection.query(query, [nombre, idPersonaje, idVentaja], (error, results) => {
      if (error) {
        console.error('Error al actualizar Ventaja:', error);
        throw error;
      }
      console.log('Ventaja actualizado correctamente');
    });
    // Aquí va la lógica para actualizar el ítem en la base de datos

    // Si la actualización se realiza correctamente, enviamos una respuesta de éxito
    res.json({ message: `Ventaja actualizado para el personaje ${idPersonaje} con el ID de inventario ${idVentaja}` });
} catch (error) {
    // En caso de error, enviamos una respuesta de error al cliente
    console.error('Error al actualizar la ventaja:', error);
    res.status(500).json({ error: 'Error al actualizar la ventaja' });
}
});

app.put('/updateTecnicaEspecial/:idPersonaje/:idTecnicaEspecial', (req, res) => {
try {
    const idPersonaje = req.params.idPersonaje;
    const idTecnicaEspecial = req.params.idTecnicaEspecial;
    const { nombre, descripcion, sistema, coste, tiempoInvo } = req.body;
    console.log("idPersonaje del cliente: ",idPersonaje);
    console.log("idTecnciaEspecial del cliente: ",idTecnicaEspecial)
    console.log("req del cliente del cliente: ",req.body)

    const query = `UPDATE tecnicasEspeciales SET nombre = ?, descripcion= ?, sistema= ?, coste=? , tiempoInvo=? WHERE idpersonaje_fk = ? AND idTecnicaEspecial = ?`;

    // Ejecutar el query con los parámetros
    connection.query(query, [nombre, descripcion, sistema, coste, tiempoInvo, idPersonaje, idTecnicaEspecial], (error, results) => {
      if (error) {
        console.error('Error al actualizar Tecncia Especial:', error);
        throw error;
      }
      console.log('Tecncia especial actualizado correctamente');
    });

    // Aquí puedes realizar la lógica para actualizar la técnica especial en tu base de datos
    // Ejemplo:
    // actualizarTecnicaEspecialEnBaseDeDatos(idPersonaje, idTecnicaEspecial, nombre, descripcion, sistema, coste, tiempoInvo);

    // Respuesta de éxito
    res.status(200).json({ message: 'Técnica especial actualizada correctamente' });
} catch (error) {
    // Manejo de errores
    console.error('Error al actualizar la técnica especial en la base de datos:', error);
    res.status(500).json({ error: 'Error al actualizar la técnica especial en la base de datos' });
}
});

app.post('/eliminarTecnicaEspecial', async (req, res) => {
try {
  const { idpersonaje, idTecnicaEspecial } = req.body; // Ajusta el nombre del campo para el ID de la ventaja
  console.log("*********************Lo que viene del cliente", req.body)

  const queryAsync = util.promisify(connection.query).bind(connection);

  // Consulta SQL para eliminar la ventaja específica
  const resultado = await queryAsync(
    `DELETE FROM tecnicasEspeciales
     WHERE idpersonaje_fk = ? AND idTecnicaEspecial = ?`, // Ajusta el nombre de la tabla y los campos según tu estructura
    [idpersonaje, idTecnicaEspecial]
  );

  // Verificar si la cantidad de filas afectadas es mayor que cero
  if (resultado.affectedRows > 0) {
    res.status(200).json({ message: 'Tecnica especial eliminada exitosamente' });
  } else {
    console.error('No se encontró ninguna fila para eliminar');
    res.status(404).send('No se encontró ninguna fila para eliminar');
  }
} catch (error) {
  console.error('Error en la consulta de eliminar tecncia especial:', error);
  res.status(500).send('Error en la consulta de eliminar tecncia especial');
}
});

app.post('/insertarTecnicasEspeciales', async (req, res) => {
try {
    const { idpersonaje, nombre, descripcion,sistema,coste,tiempoInvo } = req.body;
    console.log("Técnicas especiales recibidas del cliente:", req.body);

    const queryAsync = util.promisify(connection.query).bind(connection);

      
            // La técnica especial es nueva, así que la insertamos
    await queryAsync('INSERT INTO tecnicasEspeciales (idpersonaje_fk, nombre, descripcion, sistema, coste, tiempoInvo) VALUES (?, ?, ?, ?, ?, ?)', [idpersonaje, nombre, descripcion, sistema, coste, tiempoInvo]);
    console.log(`Nueva técnica especial "${nombre}" insertada para el personaje con ID ${idpersonaje}`);
        
    
    res.status(200).json({ message: 'Inserción de técnicas especiales exitosa' });
} catch (error) {
    console.error('Error al insertar técnicas especiales:', error);
    res.status(500).json({ error: 'Error al insertar técnicas especiales en la base de datos' });
}
});


app.post('/insertSaga', async (req, res) => {
  try {
      const { nombre, idpersonajes } = req.body;

      console.log('Body del POST del cliente:', req.body);

      // Insertar la saga en la base de datos
      const insertSagaQuery = `
          INSERT INTO sagas (nombre)
          VALUES (?);
      `;

      await connection.query(insertSagaQuery, [nombre], async (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta de inserción de saga:', err);
              return res.status(500).json({ error: 'Error interno del servidor al insertar la saga' });
          }

          const idSaga = result.insertId; // Obtener el ID de la saga recién insertada

          // Insertar los personajes asociados a la saga en la tabla personajes_sagas
          const insertPersonajesSagaQuery = `
              INSERT INTO personajes_sagas (idSaga_fk, idpersonaje_fk)
              VALUES (?, ?);
          `;

          for (const idPersonaje of idpersonajes) {
              await connection.query(insertPersonajesSagaQuery, [idSaga, idPersonaje], (err, result) => {
                  if (err) {
                      console.error('Error al ejecutar la consulta de inserción de personaje en saga:', err);
                      return res.status(500).json({ error: 'Error interno del servidor al insertar personajes en la saga' });
                  }
              });
          }

          res.status(200).json({ message: 'Inserciones exitosas' });
      });
  } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/misPjsSagas', async (req, res) => {
  try {    
      // Utilizamos el método promisify para convertir la función de callback en una función basada en promesas
      const queryAsync = util.promisify(connection.query).bind(connection);
      
      // Realizamos la consulta utilizando el método promisificado
      const resultado = await queryAsync(`
          SELECT sagas.nombre AS nombreSaga, sagas.idSaga, GROUP_CONCAT(personajes_sagas.idpersonaje_fk) AS idPersonajes
          FROM sagas
          INNER JOIN personajes_sagas ON sagas.idSaga = personajes_sagas.idSaga_fk
          GROUP BY sagas.idSaga;
      `);

      if (Array.isArray(resultado)) {
          
          const resultadoFormateado = resultado.map(row => ({
            idSaga: row.idSaga,
            nombreSaga: row.nombreSaga,
            idPersonajes: row.idPersonajes.split(',').map(id => parseInt(id))
        }));
        console.log(resultadoFormateado)
        res.json(resultadoFormateado);
         
      } else {
          console.error('Error en la estructura del resultado de la consulta:', resultado);
          res.status(500).send('Error en la consulta de sagas');
      }       

  } catch (error) {
      console.error('Error en la consulta de sagas:', error);
      res.status(500).send('Error en la consulta de sagas');
  }
});



app.post('/insertPjSaga', async (req, res) => {
  try {
      const { idSaga, idpersonaje } = req.body;

      console.log('Body del POST del cliente:', req.body);

      // Insertar la saga en la base de datos
      const insertPersonajesSagaQuery = `
      INSERT INTO personajes_sagas (idSaga_fk, idpersonaje_fk)
      VALUES (?, ?);
      `;  
        await connection.query(insertPersonajesSagaQuery, [idSaga, idpersonaje], (err, result) => {
            if (err) {
                console.error('Error al ejecutar la consulta de inserción de personaje en saga:', err);
                return res.status(500).json({ error: 'Error interno del servidor al insertar personajes en la saga' });
            }
        });

          res.status(200).json({ message: 'Inserciones exitosas' });
 
  } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/deletePjSaga', async (req, res) => {
  try {
      const { idSaga, idpersonaje } = req.body;

      console.log('Body de la solicitud DELETE del cliente:', req.body);

      // Consulta para eliminar el personaje de la saga en la base de datos
      const deletePersonajeSagaQuery = `
          DELETE FROM personajes_sagas
          WHERE idSaga_fk = ? AND idpersonaje_fk = ?;
      `;

      await connection.query(deletePersonajeSagaQuery, [idSaga, idpersonaje], (err, result) => {
          if (err) {
              console.error('Error al ejecutar la consulta de eliminación de personaje en saga:', err);
              return res.status(500).json({ error: 'Error interno del servidor al eliminar personaje de la saga' });
          }

          // Verifica si alguna fila fue afectada
          if (result.affectedRows > 0) {
              res.status(200).json({ message: 'Eliminación exitosa' });
          } else {
              res.status(404).json({ error: 'No se encontró el personaje en la saga' });
          }
      });

  } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});