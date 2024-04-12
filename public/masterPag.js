class usuario{
    constructor(idusuario,nombreusuario,estado,permiso){
        this.idusuario = idusuario,
        this.nombreusuario = nombreusuario,
        this.estado = estado,
        this.permiso = permiso
    }
    fichaUsuario(){     
        let nuevaFichaUsuario = document.createElement("div")
        nuevaFichaUsuario.className = "col-sm-12 col-md-6 col-lg-4 col-xxl-3 my-3"
   
        nuevaFichaUsuario.innerHTML = `<div id="${this.idusuario}"  class="card mx-auto fondoCardUsuarios" >
                                            <div class="card-body mx-auto">                                           
                                                <h5 class="card-Nombre usuarioSpan">${this.nombreusuario}</h5>
                                                <p> Id usuario: ${this.idusuario}</p>
                                                <span><label>Estado:</label></span>
                                                <p id="estado-${this.idusuario}">${this.estado}</p>
                                                <button id="btnCambiarEstado-${this.idusuario}" class="btn btn-primary" type="button"></button>
                                                <br>
                                                <br>
                                                <span><label>Permiso de usuario:</label></span>
                                                <p id="permiso-${this.idusuario}">${this.permiso}</p>
                                                <button id="btnCambiarPermiso-${this.idusuario}" class="btn btn-primary" type="button"></button>                                                                                    
                                        </div>
                                    </div> `
        
        usuariosRows.appendChild(nuevaFichaUsuario);

        let estado=document.getElementById(`estado-${this.idusuario}`);     
        let permiso=document.getElementById(`permiso-${this.idusuario}`);
        if(this.estado=="0"){           
            estado.innerHTML="Deshabilitado"
        }else{
            estado.innerHTML="Habilitado"
        }
         let btnCambiarEstado=document.getElementById(`btnCambiarEstado-${this.idusuario}`);
         let btnCambiarPermiso=document.getElementById(`btnCambiarPermiso-${this.idusuario}`);
        if(this.permiso=="0"){           
            permiso.innerHTML="Jugador"
        }else if(this.permiso==="1"){
            permiso.innerHTML="Narrador"
        }else if(this.permiso==="2"){
            permiso.innerHTML="**MASTER**"
            btnCambiarPermiso=document.getElementById(`btnCambiarPermiso-${this.idusuario}`);
            btnCambiarPermiso.remove();
            btnCambiarEstado=document.getElementById(`btnCambiarEstado-${this.idusuario}`);
            btnCambiarEstado.remove();
        }
             
        btnCambiarEstado.addEventListener("click",()=>{
           console.log(`funciona el boton de cambio de estado del usuario ${this.idusuario}`);          
           let nuevoEstado
           if(this.estado=="0"){           
            nuevoEstado="1";
            console.log("el estado era 0 y es cambiado a 1")
            }else if(this.estado=="1"){
              nuevoEstado="0";
              console.log("el estado era 1 y es cambiado a 0")
            }
           cambiarEstadoUsuario(this.idusuario,this.nombreusuario,nuevoEstado);
        });

        btnCambiarPermiso.addEventListener("click",()=>{
            console.log(`funciona el boton de cambio de permiso del usuario ${this.idusuario}`);  
            let nuevoPermiso
            if(this.permiso=="0"){           
             nuevoPermiso="1";
             console.log("el estado del permiso de usuario era 0 y es cambiado a 1")
             }else if(this.permiso=="1"){
               nuevoPermiso="0";
               console.log("el estado del permiso de usuario era 1 y es cambiado a 0")
            }     
            cambiarPermisoUsuario(this.idusuario,this.nombreusuario,nuevoPermiso);
         });
            
    }
}

function verificacionEstadoSesion(){
    let sesionIniciada = localStorage.getItem(`sesionIniciada`);
    let permiso = localStorage.getItem(`permisoUsuario`);
    let nombreUsuarioLocalStorage = localStorage.getItem('nombreusuario') || '';
    let nombreSesion = document.getElementById('offcanvasDarkNavbarLabel');
    nombreSesion.textContent=`ZNK-${nombreUsuarioLocalStorage}`;
    let paginaMisPersonajes = document.getElementById('paginaMisPersonajes');
    let paginaNarrador = document.getElementById('paginaNarrador');
    let paginaCrearPj = document.getElementById('paginaCrearPj');
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    
    if (sesionIniciada === "true") {
        cerrarSesion.classList.remove('d-none');
        paginaCrearPj.classList.remove('d-none');
        paginaMisPersonajes.classList.remove('d-none');
        paginaNarrador.classList.add('d-none');

        if (permiso === "1") {
            paginaNarrador.classList.remove('d-none');
        }
        if (permiso === "2") {
            paginaNarrador.classList.remove('d-none');
        }
    } else {
        cerrarSesion.classList.add('d-none');
        paginaCrearPj.classList.add('d-none');
        paginaMisPersonajes.classList.add('d-none');
        paginaNarrador.classList.add('d-none');
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

let coleccionUsuarios=[];
let usuariosRows=document.getElementById("usuariosRows");


const obtenerEstadoUsuarios = async () => {
    try {   
        coleccionUsuarios.length = 0;
        const resp = await fetch(`/peticionEstado`, {
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

        data.forEach((user) => {
            let usuarioNuevo = new usuario(
                user.idusuario,
                user.nombreusuario,
                user.estado,
                user.permiso               
            );
            coleccionUsuarios.push(usuarioNuevo);
            console.log(coleccionUsuarios);
            mostrarUsuarios(coleccionUsuarios);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

//cambia el estado del usuario habilitandolo o desabilitandolo para login
async function cambiarPermisoUsuario(idusuario,nombreusuario,permiso) {
    try {
        const response = await fetch(`/cambioPermiso`, {  // Utilizamos el idpersonaje en la URL para indicar qué registro actualizar
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            idusuario:`${idusuario}`,
            nombreusuario:`${nombreusuario}`,
            permiso:`${permiso}`           
            })   
        });

        if (response.ok) {
            console.log("Update exitoso!!");
            Swal.fire({
          
                icon: "success",
                title: `Los cambios fueron guardados!`,
                showConfirmButton: false,
                timer: 1500
            });
            obtenerEstadoUsuarios();         
        } else {
            console.error('Error en la solicitud:', response.status);
        }

    } catch (error) {
        console.log('Error en la solicitud:', error.message);
    }
}

//cambia el estado del usuario habilitandolo o desabilitandolo para login
async function cambiarEstadoUsuario(idusuario,nombreusuario,estado) {
    try {
        const response = await fetch(`/cambioEstado`, {  // Utilizamos el idpersonaje en la URL para indicar qué registro actualizar
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            idusuario:`${idusuario}`,
            nombreusuario:`${nombreusuario}`,
            estado:`${estado}`           
            })
    

        });

        if (response.ok) {
            console.log("Update exitoso!!");
            Swal.fire({         
                icon: "success",
                title: `Los cambios fueron guardados!`,
                showConfirmButton: false,
                timer: 1500
            });
            obtenerEstadoUsuarios();
        } else {
            console.error('Error en la solicitud:', response.status);
        }

    } catch (error) {
        console.log('Error en la solicitud:', error.message);
    }
}

//funcion de mostrar las fichas
function mostrarUsuarios(coleccionUsuarios){
    usuariosRows.innerHTML="";
    coleccionUsuarios.forEach(us=>us.fichaUsuario())
}

obtenerEstadoUsuarios();

