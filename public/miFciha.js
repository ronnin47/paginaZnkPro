const socket = io(); 
let arrayDominiosTecnicas=[];

let pjDominios = {
    idPersonaje: 0,
    dominio: [],
    tecnicas: {}
};


//VERIFICA ESTADO DE SESION Y PERMISO PARA HABILITAR LA NAVEGACION EN LAS PAGINAS
function verificacionEstadoSesion(){
    let sesionIniciada = localStorage.getItem(`sesionIniciada`);
    let permiso = localStorage.getItem(`permisoUsuario`);
    let paginaCrearPj = document.getElementById('paginaCrearPj');
    let paginaMisPersonajes = document.getElementById('paginaMisPersonajes');
    let paginaNarrador = document.getElementById('paginaNarrador');
    let paginaMaster = document.getElementById('paginaMaster');
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    let nombreSesion = document.getElementById('offcanvasDarkNavbarLabel');
    let nombreUsuarioLocalStorage = localStorage.getItem('nombreusuario') || '';
    nombreSesion.textContent=`ZNK-${nombreUsuarioLocalStorage}`;

    if (sesionIniciada === "true") {
        paginaCrearPj.classList.remove('d-none');
        paginaMisPersonajes.classList.remove('d-none');

        paginaNarrador.classList.add('d-none');
        paginaMaster.classList.add('d-none');
        
        if (permiso === "1") {
            paginaNarrador.classList.remove('d-none');
        }
        if (permiso === "2") {
            paginaNarrador.classList.remove('d-none');
            paginaMaster.classList.remove('d-none');
        }

    } else {
        cerrarSesion.classList.add('d-none');
        paginaCrearPj.classList.add('d-none');
        paginaMisPersonajes.classList.add('d-none');
        paginaNarrador.classList.add('d-none');
        paginaMaster.classList.add('d-none');
    }
}

verificacionEstadoSesion();

let sesionIniciada=localStorage.getItem("sesionIniciada");

//necesitamos consumir todos los personajes de la base
const consumirPersonajesBd = async () => {
    try {   
        //let idusuario = localStorage.getItem("idusuario");
        const resp = await fetch(`/basePersonajes`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }); // La ruta debe coincidir con la que has definido en tu servidor para obtener productos
        
        
        
        if (!resp.ok) {
            throw new Error(`Error en la solicitud: ${resp.status}`);
        }

        const data = await resp.json();

        data.forEach((pj) => {
            // Instancia objetos dandoles la clase Pj con los datos obtenidos de la base de datos znk
            let pjNuevo = new Pj(
                pj.idpersonaje,
                pj.nombre,
                pj.raza,
                pj.naturaleza,
                pj.dominio,
                pj.fuerza,
                pj.fortaleza,
                pj.ki,
                pj.kiActual,
                pj.faseSalud,
                pj.vidaTotal,
                pj.damageActual,
                pj.ken,
                pj.kenActual,
                pj.imagen,
                pj.destreza,
                pj.agilidad,
                pj.sabiduria,
                pj.sentidos,
                pj.presencia,
                pj.principio,
                pj.academisismo,
                pj.artesMarciales,
                pj.atletismo,  
                pj.conBakemono,
                pj.conDemonio,
                pj.conEsferas,
                pj.conEspiritual,
                pj.forja,
                pj.medicina,
                pj.montar,
                pj.sigilo,
                pj.pilotear,
                pj.manejoArma,
                pj.conObjMagicos,
                pj.conLeyendas,
                pj.resCorte,
                pj.resEnergia,
                pj.resRayo,
                pj.resFuego,
                pj.resFrio,
                pj.resVeneno,
                pj.manejoSombras,
                pj.tratoBakemono,
                pj.conHechiceria,
                pj.meditacionEspiritual, 
                pj.meditacionVital,
                pj.idusuario_fk,
                pj.cantFases,
                pj.fasesPos,
                pj.fasesNeg,
                pj.nombreArma,
                pj.consumicionKi,
                pj.imagenFile,
                pj.historia || "",
                pj.nivelDestino,
                pj.puntosDestino
            );
            coleccionPj.push(pjNuevo);
            //console.log(coleccionPj)
        });
        // Guarda la lista en el localStorage
        localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));  
        arrayDominiosTecnicas=await consumirDominiosTecnicas()
        //console.log(arrayDominiosTecnicas)
        // Muestra la lista de personajes
        mostrarFichas(coleccionPj);
        console.log("el array tiene dentro: ",coleccionPj);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
    }
};

if(sesionIniciada=="true"){   
    consumirPersonajesBd();
}


function mostrarFichas(coleccionPj) {
    // Obtiene el ID del personaje desde los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idpersonaje = parseInt(urlParams.get('id'));
  
    //console.log("ID del personaje:", idpersonaje);
    //console.log("Tipo de ID:", typeof idpersonaje);
  
    //console.log("Estado de la colección antes de buscar:", coleccionPj);
  
    // ENCONTRAR EL ÍNDICE DEL PERSONAJE EN LA COLECCIÓN
    // Utiliza findIndex para encontrar el índice del personaje con el ID dado
    const pjFichaEncontrado = coleccionPj.findIndex(pj => pj.idpersonaje === idpersonaje);
  
    //console.log("Índice encontrado:", pjFichaEncontrado);
  
    // Verifica si se encontró el personaje
    if (pjFichaEncontrado !== -1) {
      // Llama al método mostrarFicha en el personaje encontrado
      coleccionPj[pjFichaEncontrado].mostrarFicha();






      //LLAMAMOS PARA VER COMO FUNCIONA
    //consumirDominiosTecnicas();

    } else {
      console.log("Personaje no encontrado en la colección.");
      // Puedes manejar la lógica cuando el personaje no se encuentra, por ejemplo, mostrar un mensaje de error.
    }
}

const obtenerEstadoUsuario = async () => {
    try {   
       
        const resp = await fetch(`/estadoUsuario`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resp.ok) {
            throw new Error(`Error en la solicitud: ${resp.status}`);
        }

        const data = await resp.json();

        console.log("informacion de usuarios recuperados: ", data);


    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//async function de INSERT NUEVO PRODUCTO
async function realizarUpdateBbdd(idpersonaje,nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases,fasesPos,fasesNeg,nombreArma,historia,nivelDestino,puntosDestino) {
    try {
        const response = await fetch(`/update/${idpersonaje}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            idpersonaje:`${idpersonaje}`,
            nombre:`${nombre}`,
            raza:`${raza}`,
            naturaleza:`${naturaleza}`,
            dominio:`${dominio}`,
            fuerza:`${fuerza}`,
            fortaleza:`${fortaleza}`,
            ki:`${ki}`,
            kiActual:`${kiActual}`,
            faseSalud:`${faseSalud}`,
            vidaTotal:`${vidaTotal}`,
            damageActual:`${damageActual}`,
            ken:`${ken}`,
            kenActual:`${kenActual}`,
            imagen:`${imagen}`,
            destreza:`${destreza}`,
            agilidad:`${agilidad}`,
            sabiduria:`${sabiduria}`,
            sentidos:`${sentidos}`,
            presencia:`${presencia}`,
            principio:`${principio}`,
            academisismo:`${academisismo}`,
            artesMarciales:`${artesMarciales}`,
            atletismo:`${atletismo}`,  
            conBakemono:`${conBakemono}`,
            conDemonio:`${conDemonio}`,
            conEsferas:`${conEsferas}`,
            conEspiritual:`${conEspiritual}`,
            forja:`${forja}`,
            medicina:`${medicina}`,
            montar:`${montar}`,
            sigilo:`${sigilo}`,
            pilotear:`${pilotear}`,
            manejoArma:`${manejoArma}`,
            conObjMagicos:`${conObjMagicos}`,
            conLeyendas:`${conLeyendas}`,
            resCorte:`${resCorte}`,
            resEnergia:`${resEnergia}`,
            resRayo:`${resRayo}`,
            resFuego:`${resFuego}`,
            resFrio:`${resFrio}`,
            resVeneno:`${resVeneno}`,
            manejoSombras:`${manejoSombras}`,
            tratoBakemono:`${tratoBakemono}`,
            conHechiceria:`${conHechiceria}`,
            meditacionEspiritual:`${meditacionEspiritual}`, 
            meditacionVital:`${meditacionVital}`,
            idusuario_fk:`${idusuario_fk}`,
            cantFases:`${cantFases}`,
            fasesPos:`${fasesPos}`,
            fasesNeg:`${fasesNeg}`,
            nombreArma:`${nombreArma}`,
            historia:`${historia}`,
            nivelDestino:`${nivelDestino}`,
            puntosDestino:`${puntosDestino}`
            
            })
        });

        if (response.ok) {
            console.log("Update exitoso!!");
            //aca pondre el sweet alert

            Swal.fire({
                icon: "success",
                title: `Los cambios fueron guardados!`,
                showConfirmButton: false,
                timer: 1500
            });


        } else {
            console.error('Error en la solicitud:', response.status);
        }

    } catch (error) {
        console.log('Error en la solicitud:', error.message);
    }
}

/*
window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        Window.location.href = '/home';
    }
});
*/
window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        window.close();
    }
});


//ACA TOMAMOS LOS DOMINIOS Y TECNICAS DE LA BASE DE datos
const consumirDominiosTecnicas = async () => {
    try {   

        const urlParams = new URLSearchParams(window.location.search);
        const idpersonaje = parseInt(urlParams.get('id'));
        //let idusuario = localStorage.getItem("idusuario");

        const resp = await fetch(`/consumirDominiosTecnicas/${idpersonaje}`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
            

        }); // La ruta debe coincidir con la que has definido en tu servidor para obtener productos
        
        
        
        if (!resp.ok) {
            throw new Error(`Error en la solicitud: ${resp.status}`);
        }

        const data = await resp.json();
        //console.log("INFORMACION: ",data)
        /*

        data.forEach(objeto => {
            // Accede a la propiedad 'idDominio' de cada objeto
            
            const idPersonaje = objeto.idPersonaje;
            const idDominio = objeto.idDominio;
           const nombreTecnica = objeto.nombre;
           const descripcionTecnica = objeto.descripcion;
           const idTecnica = objeto.idTecnica;
           const sistemaTecnica = objeto.sistema;
            const costeKi = objeto.costeKi;
           const tiempoInvo = objeto.tiempoInvo;
            
            console.log(`
            idPersonaje:${idPersonaje}
            idDominio:${idDominio}
            idTecnica:${idTecnica}
            nombre tecnica:${nombreTecnica}
            coste Ki:${costeKi}
            tiempo invocacion:${tiempoInvo}
            `);
        });
       */
      // Objeto para almacenar las técnicas agrupadas por dominio
                const tecnicasPorDominio = {};

                // Itera sobre cada objeto en el array 'data'
                data.forEach(objeto => {
                    const idDominio = objeto.idDominio;
                    
                    // Verifica si ya hay un array de técnicas para este dominio
                    if (!tecnicasPorDominio.hasOwnProperty(idDominio)) {
                        // Si no hay un array para este dominio, crea uno
                        tecnicasPorDominio[idDominio] = [];
                    }

                    // Agrega la técnica al array correspondiente al dominio
                    tecnicasPorDominio[idDominio].push(objeto);
                });

                // Array final ordenado por dominio
                const tecnicasOrdenadasPorDominio = [];

                // Itera sobre las claves del objeto (IDs de dominio) y agrega las técnicas al array final
                for (const idDominio in tecnicasPorDominio) {
                    if (tecnicasPorDominio.hasOwnProperty(idDominio)) {
                        tecnicasOrdenadasPorDominio.push({
                            idDominio: idDominio,
                            tecnicas: tecnicasPorDominio[idDominio]
                        });
                    }
                }

                // Ordena el array por ID de dominio (opcional)
                tecnicasOrdenadasPorDominio.sort((a, b) => a.idDominio - b.idDominio);

                // Ahora tienes un array donde las técnicas están agrupadas y ordenadas por dominio
               // console.log(tecnicasOrdenadasPorDominio);
        
        return tecnicasOrdenadasPorDominio;

       
    } catch (error) {
        console.error('Error al obtener dominios y tecnicas del personaje:', error);
    }
};


//TECNICAS ESPECIALES
const consumirTecnicasEspeciales = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idpersonaje = parseInt(urlParams.get('id'));

        const resp = await fetch(`/consumirTecnicasEspeciales/${idpersonaje}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resp.ok) {
            throw new Error(`Error en la solicitud consumir Tecncias especiales: ${resp.status}`);
        }

        const data = await resp.json();
        //console.log("********INFORMACION de TECNCIAS ESPECIALES********: ", data);
        
        return data;

    } catch (error) {
        console.error('Error al obtener tecncias especiales del personaje:', error);
    }
};

//inventario
const consumirInventario = async (inventario) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idpersonaje = parseInt(urlParams.get('id'));

        const resp = await fetch(`/consumirInventario/${idpersonaje}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resp.ok) {
            throw new Error(`Error en la solicitud consumir ventajas: ${resp.status}`);
        }

        const data = await resp.json();
       // console.log("********INFORMACION DEL INVENTARIO********: ", data);
        inventario=data
        return inventario;

    } catch (error) {
        console.error('Error al obtener ventajas del personaje:', error);
    }
};

//CONSUMIR VENTAJAS DE LA BASE DE DATOS
const consumirVentajas = async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idpersonaje = parseInt(urlParams.get('id'));

        const resp = await fetch(`/consumirVentajas/${idpersonaje}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!resp.ok) {
            throw new Error(`Error en la solicitud consumir ventajas: ${resp.status}`);
        }

        const data = await resp.json();
        //console.log("********INFORMACION de VENTAJAS********: ", data);
        ventajas=data
        return ventajas;

    } catch (error) {
        console.error('Error al obtener ventajas del personaje:', error);
    }
};

socket.on('pjActualizado', (infoActualizada) => {
    console.log('Datos actualizados recibidos:', infoActualizada);
    
    //coleccionPj=infoActualizada;
    //console.log(infoActualizada);
    coleccionPj=[];

    infoActualizada.forEach((pj) => {
        // Instancia objetos dandoles la clase Pj con los datos obtenidos de la base de datos znk
        let pjNuevo = new Pj(
            pj.idpersonaje,
            pj.nombre,
            pj.raza,
            pj.naturaleza,
            pj.dominio,
            pj.fuerza,
            pj.fortaleza,
            pj.ki,
            pj.kiActual,
            pj.faseSalud,
            pj.vidaTotal,
            pj.damageActual,
            pj.ken,
            pj.kenActual,
            pj.imagen,
            pj.destreza,
            pj.agilidad,
            pj.sabiduria,
            pj.sentidos,
            pj.presencia,
            pj.principio,

            pj.academisismo,
            pj.artesMarciales,
            pj.atletismo,  
            pj.conBakemono,
            pj.conDemonio,
            pj.conEsferas,
            pj.conEspiritual,
            pj.forja,
            pj.medicina,
            pj.montar,
            pj.sigilo,
            pj.pilotear,
            pj.manejoArma,
            pj.conObjMagicos,
            pj.conLeyendas,
            pj.resCorte,
            pj.resEnergia,
            pj.resRayo,
            pj.resFuego,
            pj.resFrio,
            pj.resVeneno,
            pj.manejoSombras,
            pj.tratoBakemono,
            pj.conHechiceria,
            pj.meditacionEspiritual, 
            pj.meditacionVital,
            pj.idusuario_fk,
            pj.cantFases,
            pj.fasesPos,
            pj.fasesNeg,
            pj.nombreArma,
            pj.consumicionKi,
            pj.imagenFile,
            pj.historia
        );
        coleccionPj.push(pjNuevo);
    })

    console.log("paso por el socket recibiendo  historia: ",coleccionPj)
    mostrarFichas(coleccionPj)
    
    //invocamos esto para que consuma la base de datos y muestre los resultados en el dom
    
    //consumirPersonajesBd()
});





window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        window.close();
    }
});

/*
window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        window.location.href = '/home'; // Redirige al usuario a la página de inicio
    }
});

window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        location.reload();
    }
});
*/
