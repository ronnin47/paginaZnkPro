let saga={
    nombre:"",
    idpersonaje:[]
}
let sagas

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
        //mostrarFichasSagas(coleccionPj);
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
    localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj)); 
    mostrarFichas(coleccionPj);
    let data = JSON.parse(localStorage.getItem("data"));
    //consumirSagas()
    gruposSagas.innerHTML="";
    console.log("paso por el io")
    mostrarFichasSagas(data)
   
});

//nodo
let pjsLabel=document.getElementById("pjs");
let inputBuscarPersonaje=document.getElementById("inputBuscarPersonaje");
inputBuscarPersonaje.addEventListener("input",()=>{
    let personajeBuscado=inputBuscarPersonaje.value;
    if (personajeBuscado === "") {
        fichasSagas.innerHTML = ""; 
        return; 
    }
   
   
    fichasSagas.innerHTML="";
    coleccionPj.forEach(pj=>{
        
        if(pj.nombre.toLowerCase().includes(personajeBuscado.toLowerCase())){
           
            pj.fichasSaga();
          
        }
    })
});

//crear saga
let inputTituloSaga=document.getElementById("inputTituloSaga");
let btnCrearSaga=document.getElementById("btnCrearSaga");
inputTituloSaga.addEventListener("input",()=>{
    saga.nombre=inputTituloSaga.value;
    console.log(saga);
})

btnCrearSaga.addEventListener("click",()=>{
    let inputTituloSaga=document.getElementById("inputTituloSaga");
    console.log("funciona el boton crear saga")
    console.log(sagas)
    
   

    let nombreSagaExistente = sagas.find(saga => (saga.nombreSaga).toLowerCase() === (inputTituloSaga.value).toLowerCase());
    if (nombreSagaExistente) {
        console.log("El nombre de saga ya existe:", inputTituloSaga.value);
        Swal.fire({
            icon: "error",
            title: `El nombre de saga ya existe`,
            showConfirmButton: false,
            timer: 1500
          })
        return; 
    }else{
        //aca vamos a hacer la llamada a la funcion async de insertar saga
    // luego vamos a limpiar el objeto
    console.log("personajes de saga ",saga);
    insertSaga(saga.nombre,saga.idpersonaje);
    //vacia el objeto
    saga={
        nombre:"",
        idpersonaje:[]
    }
    pjsLabel.innerText="";
    fichasSagas.innerHTML = "";
    inputTituloSaga.value="";
    inputBuscarPersonaje.value="";
    console.log(saga)

    }
    location.reload();

})

//insetar sagas y personajes en proceso
async function insertSaga(nombre,idpersonajes){
    try{
        //let idusuario_fk = localStorage.getItem("idusuario");
        const response= await fetch('/insertSaga',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            
            nombre:`${nombre}`,
            idpersonajes:idpersonajes,
        })
        });
    
    if(response.ok){
        //console.log("insert exitoso!!")
        const jsonResponse = await response.json();
        console.log("Respuesta del servidor (JSON):", jsonResponse);
        Swal.fire({
            icon: "success",
            title: `personaje añadido a la saga`,
            showConfirmButton: false,
            timer: 2500
          })
    
    }else{
        console.error('Error en la solicitud:', response.status);
        return null;
    }
    
    }catch (error){
    console.log('Error en la solicitud:', error.message)
     return null;
    }    
}

//consumir sagas y personajes
const consumirSagas = async () => {
    try {   
        //let dataidusuario=localStorage.getItem(`idusuario`);
        const resp = await fetch(`/misPjsSagas`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        }); 
        if (!resp.ok) {
            throw new Error(`Error en la solicitud: ${resp.status}`);
        }
      const data = await resp.json();
      console.log("informacion de SAGAS recuperadas: ",data)
      document.getElementById("gruposSagas").innerHTML=""
      localStorage.setItem("data", JSON.stringify(data));
      mostrarFichasSagas(data)

      sagas=data


        
    } catch (error) {
        console.error('Error al obtener personajes:', error);
    }
};

consumirSagas();

let gruposSagas=document.getElementById("gruposSagas");

function mostrarFichasSagas(data){
    //fichasCard.innerHTML="";
    data.forEach(saga => {
        let idGrupo=saga.idSaga
        let nombreSaga=saga.nombreSaga
        console.log("id grupo ",idGrupo)
        const personajesSaga = coleccionPj.filter(pj => saga.idPersonajes.includes(pj.idpersonaje));
        console.log(personajesSaga)
        personajesSaga.forEach(pj=>{
        pj.gruposSaga(idGrupo,nombreSaga);
        });
    });
};

async function agregarPersonajeSaga(idSaga,idpersonaje){
    try{
        const response= await fetch('/insertPjSaga',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({    
            idSaga:`${idSaga}`,
            idpersonaje:idpersonaje,
        })
        });
    
    if(response.ok){
        console.log("insert exitoso!!")
        const jsonResponse = await response.json();
        console.log("Respuesta del servidor (JSON):", jsonResponse);
        consumirSagas();
    }else{
        console.error('Error en la solicitud:', response.status);
        return null;
    }
    
    }catch (error){
    console.log('Error en la solicitud:', error.message)
     return null;
    }    
};


// eliminarPersonajeSaga(idGrupo,idpersonajeEliminar);
async function eliminarPersonajeSaga(idSaga, idpersonaje) {
    try {
        const response = await fetch('/deletePjSaga', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idSaga: `${idSaga}`,
                idpersonaje: idpersonaje,
            }),
        });
    
        if (response.ok) {
            console.log("Eliminación exitosa!!");
            const jsonResponse = await response.json();
            console.log("Respuesta del servidor (JSON):", jsonResponse);
            consumirSagas(); // Vuelve a cargar las sagas después de eliminar el personaje
        } else {
            console.error('Error en la solicitud:', response.status);
            return null;
        }
    } catch (error) {
        console.log('Error en la solicitud:', error.message);
        return null;
    }
}


