let btnInicioSesion=document.getElementById("btnInicioSesion");
btnInicioSesion.addEventListener("click", ()=>{
    let sesionIniciada=localStorage.getItem(`sesionIniciada`);
    if(sesionIniciada==="true"){
        Swal.fire({
            position: "top-center",
            icon: "error",
            text: `Una sesion ya esta iniciada.Debera cerrarla para inicair otra.`,
            showConfirmButton: true,
            timer: 4500
        });
    }else{
      iniciarSesionUsuario();
    }
});

//FUNCION DE NUEVO REGISTRO, REGISTRA USUARIO Y CONTRASEÑA (LA INVOCA UN ONCLICK EN EL MODAL DE REGISTRARSE)
async function nuevoRegistro(){
  const nombreusuarioInput = document.getElementById('nuevoUsuario').value;
  const contraseniaInput = document.getElementById('nuevaContraseña').value;

  let nombreusuario=nombreusuarioInput
  let contrasenia=contraseniaInput
  console.log(nombreusuario)
  console.log(contrasenia)

    try{
            const response= await fetch('/nuevoRegistro',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                
                nombreusuario:`${nombreusuario}`,
                contrasenia:`${contrasenia}`,
            })
            });
        
        if(response.ok){
            const jsonResponse = await response.json();
            console.log("Respuesta del servidor (JSON):", jsonResponse);

            Swal.fire({
                position: "top-center",
                icon: "success",
                text: `el mail se registro correctamente`,
                showConfirmButton: true,
                timer: 2500
            });   
        }else if(response.status === 400){
            
        const errorResponse = await response.json();
        console.error('Error en la solicitud:', response.status, errorResponse.message);

        Swal.fire({
            position: 'top-center',
            icon: 'error',
            text: errorResponse.message,
            showConfirmButton: true,
            timer: 2500,
        });        
        }else{
            console.error('Error en la solicitud:', response.status);
        }
    
    }catch (error){
    console.log('Error en la solicitud:', error.message)
    }
}

//BOTON CERRAR SESION
let cerrarSesion=document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click",()=>{
    console.log("funciona el evento de cerrar sesion");
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    inicioSesion.style.display="inline";
    cerrarSesion.style.display="none";
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

//FUNCION DE INICIO DEL USUARIO 
async function iniciarSesionUsuario(){
    const nombreusuarioInput = document.getElementById('usuario').value;
    const contraseniaInput = document.getElementById('contraseña').value;
    let nombreusuario=nombreusuarioInput;
    let contrasenia=contraseniaInput;
      try{
            const response= await fetch('/iniciarSesion',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({            
                    nombreusuario:`${nombreusuario}`,
                    contrasenia:`${contrasenia}`,
                })
            });      
            if(response.ok){
            const jsonResponse = await response.json();
            console.log("Respuesta del servidor (JSON):", jsonResponse);
            
            //aca vamnmos a ver que hacemos con la respuesta
            const { dataUsuario } = jsonResponse;
            const { estado, contrasenia, idusuario, nombreusuario, permiso } = dataUsuario;
            
            if(estado=="1"){
                localStorage.setItem(`idusuario`, idusuario);
                localStorage.setItem(`nombreusuario`, nombreusuario);
                localStorage.setItem(`permisoUsuario`, permiso);
                localStorage.setItem(`estadoUsuario`, estado);

                localStorage.setItem(`sesionIniciada`, 'true');
                    Swal.fire({
                    position: "center",
                    icon: "success",
                    text: `sesion inicada`,
                    showConfirmButton: true,
                    timer: 2500
                });
            console.log(`sesion de ${nombreusuario} iniciada!!`);
           verificacionEstadoSesion();          
            }else{
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    text: `La sesión aún no ha sido confirmada`,
                    showConfirmButton: true,
                    timer: 2500
                });  
            }          
            }     
        }catch (error){
        console.log('Error en la solicitud:', error.message);
        }
}

//VERIFICA ESTADO DE SESION Y PERMISO PARA HABILITAR LA NAVEGACION EN LAS PAGINAS
function verificacionEstadoSesion() {
    let sesionIniciada = localStorage.getItem('sesionIniciada');
    let permiso = localStorage.getItem('permisoUsuario');
    let paginaCrearPj = document.getElementById('paginaCrearPj');
    let paginaMisPersonajes = document.getElementById('paginaMisPersonajes');
    let paginaNarrador = document.getElementById('paginaNarrador');
    let paginaMaster = document.getElementById('paginaMaster');
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    let nombreSesion = document.getElementById('offcanvasDarkNavbarLabel');
    let nombreUsuarioLocalStorage = localStorage.getItem('nombreusuario') || '';
    nombreSesion.textContent = `ZNK-${nombreUsuarioLocalStorage}`;

    if (sesionIniciada === "true") {
        inicioSesion.classList.add('d-none');
        cerrarSesion.classList.remove('d-none');
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
        inicioSesion.classList.remove('d-none');
        cerrarSesion.classList.add('d-none');
        paginaCrearPj.classList.add('d-none');
        paginaMisPersonajes.classList.add('d-none');
        paginaNarrador.classList.add('d-none');
        paginaMaster.classList.add('d-none');
    }
}
//BOTON PARA RECUPERAR CONTRASEÑA
let btnRecuperarContrasenia=document.getElementById("btnRecuperarContrasenia")
btnRecuperarContrasenia.addEventListener("click",()=>{
    console.log("funciona el BOTON de RECUEPERAR CONTRASEÑA");
    recuperarContrasenia();
})

async function recuperarContrasenia(){
    const nombreusuarioInput = document.getElementById('usuario').value;
    let nombreusuario=nombreusuarioInput;
    try{
      const response = await fetch(`/recuperarPass?nombreusuario=${nombreusuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
     });
  
        if(response.ok){          
            const jsonResponse = await response.json();
            //console.log("Respuesta del servidor (JSON):", jsonResponse);
            Swal.fire({
                position: "center",
                icon: "success",
                text: `Se envio un mail a ${nombreusuario}.`,
                showConfirmButton: true,
                timer: 2500
            }); 
        }else{
            console.error('Error en la solicitud:', response.status);
            Swal.fire({
                position: "center",
                icon: "error",
                text: `No se encontró ningún resultado para el usuario ${nombreusuario}.`,
                showConfirmButton: true
            });            
        }       
  }catch (error){
  console.log('Error en la solicitud:', error.message)  
  }
}

window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        location.reload();
    }
});




verificacionEstadoSesion();


Toastify({
    text: "Bienvenido a Zepiro no Kioku",
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #b2ebf2, #00acc1)",
      fontSize: "26px",
      color: "black",
      opacity: 0.7 


    },
    //onClick: function(){} // Callback after click
  }).showToast();
