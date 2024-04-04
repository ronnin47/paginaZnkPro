//importacion de io
const socket = io();
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
        cerrarSesion.classList.remove('d-none');
        paginaCrearPj.classList.remove('d-none');
        paginaMisPersonajes.classList.remove('d-none');

        //paginaNarrador.classList.add('d-none');
        paginaMaster.classList.add('d-none');

        if (permiso === "1") {
           // paginaNarrador.classList.remove('d-none');
            paginaMaster.classList.add('d-none');
        }

        if (permiso === "2") {
            paginaMaster.classList.remove('d-none');
        }

    } else {
        cerrarSesion.classList.add('d-none');
        paginaCrearPj.classList.add('d-none');
        paginaMisPersonajes.classList.add('d-none');
        //paginaNarrador.classList.add('d-none');
        paginaMaster.classList.add('d-none');
    }
}

verificacionEstadoSesion();

//BOTON CERRAR SESION
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
   //window.location.href = '/';
  
});

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
                pj.consumicionKi
            );
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

function mostrarFichas(coleccionPj){
    fichasCard.innerHTML="";
    coleccionPj.forEach(pj=>pj.ficha())
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

