const socket = io();


/*
let lista=document.getElementById("fichasCard");
Sortable.create(lista, {
    store: {
        set: (sortable) => {
            const orden = sortable.toArray();
            console.log('Orden de IDs:', orden);
        
            document.querySelectorAll('.card').forEach((card, index) => {
                console.log(`Tarjeta ${index} ID:`, card.id);
            });
        }
    }
});
*/
let lista = document.getElementById("fichasCard");
Sortable.create(lista, {
    store: {
        set: (sortable) => {
            // Obtener el orden actual de los IDs de las tarjetas como un array de IDs
            const orden = sortable.toArray();
            
            // Crear un array de objetos que incluyan la posición y el ID de cada tarjeta
            const ordenConId = [];
            document.querySelectorAll('.card').forEach((card, index) => {
                const idTarjeta = parseInt(card.id);
                console.log(`Tarjeta ${index} ID:`, idTarjeta);
                
                // Crear un objeto con la posición y el ID de la tarjeta
                ordenConId.push({
                    posicion: index,
                    id: idTarjeta
                });
            });

            // Guardar el array de objetos en localStorage como una cadena JSON
            localStorage.setItem('ordenTarjetas', JSON.stringify(ordenConId));
            
            // Opcional: imprime los datos guardados para verificar
            console.log('Datos guardados en localStorage:', ordenConId);
        }
    }
});


function verificacionEstadoSesion(){
    let sesionIniciada = localStorage.getItem(`sesionIniciada`);
    let permiso = localStorage.getItem(`permisoUsuario`);
    let paginaCrearPj = document.getElementById('paginaCrearPj');
    let paginaNarrador = document.getElementById('paginaNarrador');
    let paginaMaster = document.getElementById('paginaMaster');
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    let nombreSesion = document.getElementById('offcanvasDarkNavbarLabel');
    let nombreUsuarioLocalStorage = localStorage.getItem('nombreusuario') || '';
    nombreSesion.textContent=`ZNK-${nombreUsuarioLocalStorage}`;

    if (sesionIniciada === "true") {
        cerrarSesion.classList.remove('d-none');
        paginaCrearPj.classList.remove('d-none');
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

let cerrarSesion=document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click",()=>{
    console.log("funciona el evento de cerrar sesion");
    localStorage.removeItem(`sesionIniciada`);
    localStorage.removeItem(`nombreusuario`);
    localStorage.removeItem(`idusuario`);
    localStorage.removeItem(`pj`);
    localStorage.removeItem(`permisoUsuario`);
    localStorage.removeItem(`estadoUsuario`);
    localStorage.removeItem(`coleccionPj`);
    console.log("sesion cerrada");
    let nombresSesion = document.getElementById('offcanvasDarkNavbarLabel');
    nombresSesion.textContent=`ZNK`;  
})

const consumirPersonajesBd = async () => {
    try {   
         //let dataidusuario=localStorage.getItem(`idusuario`);
        const resp = await fetch(`/misPersonajes`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }); 
        if (!resp.ok) {
            throw new Error(`Error en la solicitud: ${resp.status}`);
        }
      const data = await resp.json();
      console.log("informacion de personajes recuperados: ",data)

        data.forEach((pj) => {
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
                pj.historia,
                pj.nivelDestino,
                pj.puntosDestino
            );
           /*  // Convertir imagenFile a Base64 si es válido
             if (pj.imagenFile && pj.imagenFile.type === 'Buffer' && Array.isArray(pj.imagenFile.data)) {
                // Convertir array de bytes a Base64
                const bytes = pj.imagenFile.data;
                const bufferData = bytesToBase64(bytes);
                pj.imagenFile = bufferData; // Almacena Base64 en el personaje
            } else {
                console.error(`Datos de imagen no válidos para el personaje con ID ${pj.idpersonaje}`);
            }*/
            coleccionPj.push(pjNuevo);          
        });

        localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));  
        mostrarFichas(coleccionPj);
        console.log("el array tiene dentro: ",coleccionPj);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
    }
};


consumirPersonajesBd();
/*
function mostrarFichas(coleccionPj){
    fichasCard.innerHTML="";
    let idusuario=localStorage.getItem(`idusuario`);
    coleccionPj.forEach(pj=>{
        if (pj.idusuario_fk === parseInt(idusuario)) {
        pj.ficha()};
    });
};
*/




function mostrarFichas(coleccionPj) {
    // Vaciar el contenido de fichasCard
    fichasCard.innerHTML = "";
    
    // Recuperar el ID del usuario del localStorage
    let idusuario = localStorage.getItem('idusuario');
    
    // Recuperar el orden de IDs y posiciones de localStorage
    const ordenTarjetas = JSON.parse(localStorage.getItem('ordenTarjetas'));
    
    // Ordenar coleccionPj según ordenTarjetas
    // Crea un objeto de mapeo para facilitar la ordenación de coleccionPj
    const idAOrdenMap = {};
    ordenTarjetas.forEach(({ id, posicion }) => {
        idAOrdenMap[id] = posicion;
    });
    
    // Ordena coleccionPj según la posición especificada en ordenTarjetas
    coleccionPj.sort((a, b) => {
        return idAOrdenMap[a.idpersonaje] - idAOrdenMap[b.idpersonaje];
    });
    
    // Mostrar las fichas en el orden deseado
    coleccionPj.forEach(pj => {
        // Solo muestra las fichas del usuario con el ID correspondiente
        if (pj.idusuario_fk === parseInt(idusuario)) {
            pj.ficha();
        }
    });
}





socket.on('pjActualizado', (infoActualizada) => {
    console.log('Datos actualizados recibidos:', infoActualizada);
    
    coleccionPj=infoActualizada;
    console.log(infoActualizada);
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
            pj.consumicionKi
        );
        coleccionPj.push(pjNuevo);
    })


    mostrarFichas(coleccionPj)
    //invocamos esto para que consuma la base de datos y muestre los resultados en el dom
    
    //consumirPersonajesBd()
});



/*
// Función para convertir un array de bytes a Base64
function bytesToBase64(bytes) {
    let binaryString = '';
    for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}*/
/*
function bytesToBase64(bytes) {
    // Crea un Uint8Array a partir del array de bytes
    const uint8Array = new Uint8Array(bytes);
    
    // Convierte el Uint8Array a una cadena base64 usando btoa
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    
    return btoa(binaryString);
}
*/