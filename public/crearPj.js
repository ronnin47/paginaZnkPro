//VERIFICA ESTADO DE SESION Y PERMISO PARA HABILITAR LA NAVEGACION EN LAS PAGINAS
function verificacionEstadoSesion(){
    let sesionIniciada = localStorage.getItem(`sesionIniciada`);
    let permiso = localStorage.getItem(`permisoUsuario`);
    let nombreUsuarioLocalStorage = localStorage.getItem('nombreusuario') || '';
    let nombreSesion = document.getElementById('offcanvasDarkNavbarLabel');
    nombreSesion.textContent=`ZNK-${nombreUsuarioLocalStorage}`;
    let paginaMisPersonajes = document.getElementById('paginaMisPersonajes');
    let paginaNarrador = document.getElementById('paginaNarrador');
    let paginaMaster = document.getElementById('paginaMaster');
    let inicioSesion = document.getElementById('inicioSesion');
    let cerrarSesion = document.getElementById('cerrarSesion');
    
    if (sesionIniciada === "true") {
        cerrarSesion.classList.remove('d-none');
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
        paginaMisPersonajes.classList.add('d-none');
        paginaNarrador.classList.add('d-none');
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
    localStorage.removeItem(`pjsJugador`);
    console.log("sesion cerrada");
    let nombresSesion = document.getElementById('offcanvasDarkNavbarLabel');
    nombresSesion.textContent=`ZNK`;
})


//objeto para guardar dominios y tecnicas
let pjDominios = {
    idPersonaje: 0,
    dominio: [],
    tecnicas: {}
};

let ventajasData = {
    idPersonaje: 0,
    ventaja: [],  
};



const consumirPersonajesBd = async () => {
    try {   
        const resp = await fetch(`/basePersonajes`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
            },
            
        }); 
        
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
                pj.fasesNeg
            );
            coleccionPj.push(pjNuevo);
            console.log(coleccionPj)
        });
        // Guarda la lista en el localStorage
        localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));  
       
        // Muestra la lista de personajes
        //mostrarFichas(coleccionPj);
        console.log("el array tiene dentro: ",coleccionPj);
    } catch (error) {
        console.error('Error al obtener personajes:', error);
    }
};


let sesionIniciada=localStorage.getItem("sesionIniciada");
//el storage solo se recupera si hay sesion inciada y toma el nombre de usuario
if(sesionIniciada=="true"){
    let idusuario=localStorage.getItem("idusuario");
    consumirPersonajesBd();
}


//async function de INSERT NUEVO PRODUCTO
async function realizarInsertBbdd(nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases,fasesPos,fasesNeg,nombreArma,consumicionKi){
    try{
        //let idusuario_fk = localStorage.getItem("idusuario");
        const response= await fetch('/insert',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            
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
            idusuario_fk: `${idusuario_fk}`,
            cantFases: `${cantFases}`,
            fasesPos: `${fasesPos}`,
            fasesNeg: `${fasesNeg}`,
            nombreArma: `${nombreArma}`,
            consumicionKi: `${consumicionKi}`

        })
        });
    
    if(response.ok){
        //console.log("insert exitoso!!")
        const jsonResponse = await response.json();
        console.log("Respuesta del servidor (JSON):", jsonResponse);
        const idNuevoPersonaje = jsonResponse.idpersonaje;
        
        return idNuevoPersonaje;
    
    }else{
        console.error('Error en la solicitud:', response.status);
        return null;
    }
    
    }catch (error){
    console.log('Error en la solicitud:', error.message)
     return null;
    }    
}

async function guardarPjNuevo(coleccionPj)
{  
    console.log(coleccionPj)
    let nombreInput=document.getElementById("nombreInput");
    let nombre=nombreInput.value
    console.log(nombre);
    //si ese nombre de personaje ya existe, me va decir que escoja otro nombre
    // se va fijar si el nombre exite en el array coleccionPj
    let nombreExistente=coleccionPj.find(pj=>pj.nombre.toLowerCase()==nombre.toLowerCase());
         console.log("el nombre si no existe en coleecionPj es undefined:",nombreExistente);
     if(nombreExistente){
        Swal.fire({
            position: "top-center",
            icon: "error",
            text: `el nombre de personaje ${nombreExistente.nombre} ya existe!
            Escoje un nuevo nombre.`,
            showConfirmButton: true,
            timer: 2500
        });
        //si el nombre no esta registrado me va dejar crear un nuevo personaje
        }else{
        console.log("pj no existe y se va crear")
        let razaInput=document.getElementById("razaInput");
        let naturalezaInput=document.getElementById("naturalezaInput");
        let dominioInput=document.getElementById("dominioInput");
        let kiInput=document.getElementById("kiInput");
        let kenInput=document.getElementById("kenInput");
        let fuerzaInput=document.getElementById("fuerzaInput");
        let fortalezaInput=document.getElementById("fortalezaInput");
        let imagenInput=document.getElementById("imagenInput");
        let destrezaInput=document.getElementById("destrezaInput");
        let agilidadInput=document.getElementById("agilidadInput");
        let sabiduriaInput=document.getElementById("sabiduriaInput");
        let sentidosInput=document.getElementById("sentidosInput");
        let principioInput=document.getElementById("principioInput");
        let presenciaInput=document.getElementById("presenciaInput");  
        let academisismoInput=document.getElementById("academisismoInput");
        let artesMarcialesInput=document.getElementById("artesMarcialesInput");
        let atletismoInput=document.getElementById("atletismoInput");
        let conBakemonoInput=document.getElementById("conBakemonoInput");  
        let conDemonioInput=document.getElementById("conDemonioInput");
        let conEsferasInput=document.getElementById("conEsferasInput");
        let conEspiritualInput=document.getElementById("conEspiritualInput");
        let forjaInput=document.getElementById("forjaInput");
        let medicinaInput=document.getElementById("medicinaInput");
        let montarInput=document.getElementById("montarInput");
        let sigiloInput=document.getElementById("sigiloInput");
        let pilotearInput=document.getElementById("pilotearInput");
        let manejoArmaInput=document.getElementById("manejoArmaInput");
        let conObjMagicosInput=document.getElementById("conObjMagicosInput");
        let conLeyendasInput=document.getElementById("conLeyendasInput");
        let resCorteInput=document.getElementById("resCorteInput");
        let resEnergiaInput=document.getElementById("resEnergiaInput");
        let resRayoInput=document.getElementById("resRayoInput");
        let resFuegoInput=document.getElementById("resFuegoInput");
        let resFrioInput=document.getElementById("resFrioInput");
        let resVenenoInput=document.getElementById("resVenenoInput");
        let manejoSombrasInput=document.getElementById("manejoSombrasInput");
        let tratoBakemonoInput=document.getElementById("tratoBakemonoInput");
        let conHechiceriaInput=document.getElementById("conHechiceriaInput");
        let meditacionEspiritualInput=document.getElementById("meditacionEspiritualInput");
        let meditacionVitalInput=document.getElementById("meditacionVitalInput");
        let nombreArmaInput=document.getElementById("nombreArmaInput");
         

        //let cantFasesInput=document.getElementById("inputCantFases") ;
        let fasesPosInput=document.getElementById("fasesPosInput") ;
        let fasesNegInput=document.getElementById("fasesNegInput") ;
        

//LOS NODOS LOS PONGO EN VARIABLES
        let raza=razaInput.value || "";
        let naturaleza=naturalezaInput.value || "";
        let dominio=dominioInput.value || "";
        let ki=kiInput.value || 0;
        let ken=kenInput.value || 0;
        let fuerza=fuerzaInput.value || 0;
        let fortaleza=fortalezaInput.value || 0;
        let imagen=imagenInput.value || "/assets/plumas.jpg";
        let destreza=destrezaInput.value || 0;
        let agilidad=agilidadInput.value || 0;
        let sabiduria=sabiduriaInput.value || 0;
        let sentidos=sentidosInput.value || 0;
        let principio=principioInput.value || 0;
        let presencia=presenciaInput.value || 0;
        let academisismo=academisismoInput.value || 0;
        let artesMarciales=artesMarcialesInput.value || 0;
        let atletismo=atletismoInput.value || 0;
        let conBakemono=conBakemonoInput.value || 0;
        let conDemonio=conDemonioInput.value || 0;
        let conEsferas=conEsferasInput.value || 0;
        let conEspiritual=conEspiritualInput.value || 0;
        let forja=forjaInput.value || 0;
        let medicina=medicinaInput.value || 0;
        let montar=montarInput.value || 0;
        let sigilo=sigiloInput.value || 0;
        let pilotear=pilotearInput.value || 0;
        let manejoArma=manejoArmaInput.value || 0;
        let conObjMagicos=conObjMagicosInput.value || 0;
        let conLeyendas=conLeyendasInput.value || 0;
        let resCorte=resCorteInput.value || 0;
        let resEnergia=resEnergiaInput.value || 0;
        let resRayo=resRayoInput.value || 0;
        let resFuego=resFuegoInput.value || 0;
        let resFrio=resFrioInput.value || 0;
        let resVeneno=resVenenoInput.value || 0;
        let manejoSombras=manejoSombrasInput.value || 0;
        let tratoBakemono=tratoBakemonoInput.value || 0;
        let conHechiceria=conHechiceriaInput.value || 0;
        let meditacionEspiritual=meditacionEspiritualInput.value || 0;
        let meditacionVital=meditacionVitalInput.value || 0;

        let nombreArma=nombreArmaInput.value || "";
        let consumicionKi=0;
        
        
        let fasesPos=fasesPosInput.value || 3;
        let fasesNeg=fasesNegInput.value || 3;
        let cantFases=(parseInt(fasesPos)+parseInt(fasesNeg)) || 6;

        let idusuario_fk = localStorage.getItem("idusuario");
        
        let faseSalud=parseInt(fortaleza)+parseInt(ki);
        let vidaTotal=faseSalud*cantFases;  
        let damageActual=0;
        let kiActual=parseInt(ki);
        let kenActual=parseInt(ken);

  
   const idNuevoPersonaje = await realizarInsertBbdd(
    nombre || '',
    raza || '',
    naturaleza || '',
    dominio || '',
    parseInt(fuerza) || 0,
    parseInt(fortaleza) || 0,
    parseInt(ki) || 0,
    kiActual || 0,
    faseSalud || 0,
    vidaTotal || 0,
    damageActual || 0,
    parseInt(ken) || 0,
    kenActual || 0,
    imagen || '',
    parseInt(destreza) || 0,
    parseInt(agilidad) || 0,
    parseInt(sabiduria) || 0,
    parseInt(sentidos) || 0,
    parseInt(presencia) || 0,
    parseInt(principio) || 0,
    parseInt(academisismo) || 0,
    parseInt(artesMarciales) || 0,
    parseInt(atletismo) || 0,
    parseInt(conBakemono) || 0,
    parseInt(conDemonio) || 0,
    parseInt(conEsferas) || 0,
    parseInt(conEspiritual) || 0,
    parseInt(forja) || 0,
    parseInt(medicina) || 0,
    parseInt(montar) || 0,
    parseInt(sigilo) || 0,
    parseInt(pilotear) || 0,
    parseInt(manejoArma) || 0,
    parseInt(conObjMagicos) || 0,
    parseInt(conLeyendas) || 0,
    parseInt(resCorte) || 0,
    parseInt(resEnergia) || 0,
    parseInt(resRayo) || 0,
    parseInt(resFuego) || 0,
    parseInt(resFrio) || 0,
    parseInt(resVeneno) || 0,
    parseInt(manejoSombras) || 0,
    parseInt(tratoBakemono) || 0,
    parseInt(conHechiceria) || 0,
    parseInt(meditacionEspiritual) || 0,
    parseInt(meditacionVital) || 0,
    idusuario_fk,
    parseInt(cantFases) || 6,
    parseInt(fasesPos) || 3,
    parseInt(fasesNeg) || 3,

    nombreArma || '',
    parseInt(consumicionKi) || 0
);
        let idpersonaje=idNuevoPersonaje;

        console.log("no llego a crear objeto")
        
        
     
       

        //si no existe lo creo
        let nuevoPj= new Pj(idpersonaje,nombre,raza,naturaleza,dominio,parseInt(fuerza),parseInt(fortaleza),parseInt(ki),kiActual,faseSalud,vidaTotal,damageActual,parseInt(ken),kenActual,imagen,parseInt(destreza),parseInt(agilidad),parseInt(sabiduria),parseInt(sentidos),parseInt(presencia),parseInt(principio), parseInt(academisismo), parseInt(artesMarciales), parseInt(atletismo),parseInt(conBakemono),parseInt(conDemonio),parseInt(conEsferas),parseInt(conEspiritual),parseInt(forja),parseInt(medicina),parseInt(montar),parseInt(sigilo),parseInt(pilotear),parseInt(manejoArma),parseInt(conObjMagicos),parseInt(conLeyendas),parseInt(resCorte),parseInt(resEnergia),parseInt(resRayo),parseInt(resFuego),parseInt(resFrio),parseInt(resVeneno),parseInt(manejoSombras),parseInt(tratoBakemono),parseInt(conHechiceria),parseInt(meditacionEspiritual),parseInt(meditacionVital),idusuario_fk,parseInt(cantFases),parseInt(fasesPos), parseInt(fasesNeg), nombreArma, parseInt(consumicionKi));        
        coleccionPj.push(nuevoPj);
        console.log(coleccionPj);
        localStorage.setItem("pj", JSON.stringify(coleccionPj));//guardo 
       
       
        return idpersonaje
        }   
       
}

function calcularTotalTronco(){
    let fuerza=document.getElementById("fuerzaInput");
    let fortaleza=document.getElementById("fortalezaInput");
    let destreza=document.getElementById("destrezaInput");
    let agilidad=document.getElementById("agilidadInput");
    let sabiduria=document.getElementById("sabiduriaInput");
    let sentidos=document.getElementById("sentidosInput");
    let principio=document.getElementById("principioInput");
    let presencia=document.getElementById("presenciaInput");  


    let caracteristicas8=[7];
    caracteristicas8[0]=parseInt(fuerza.value)|| 0;
    caracteristicas8[1]=parseInt(fortaleza.value)|| 0;
    caracteristicas8[2]=parseInt(destreza.value)|| 0;
    caracteristicas8[3]=parseInt(agilidad.value)|| 0;
    caracteristicas8[4]=parseInt(sabiduria.value)|| 0;
    caracteristicas8[5]=parseInt(presencia.value)|| 0;
    caracteristicas8[6]=parseInt(principio.value)|| 0;
    caracteristicas8[7]=parseInt(sentidos.value)|| 0;
    let total=caracteristicas8.reduce((acum,valor)=>acum+valor,0);
    let resultado=document.getElementById("resultado");
    resultado.innerHTML=total
    console.log(total);

}

function calcularTotalHabilidades(){

    let academisismo=document.getElementById("academisismoInput");
    let artesMarciales=document.getElementById("artesMarcialesInput");
    let atletismo=document.getElementById("atletismoInput");
    let conBakemono=document.getElementById("conBakemonoInput");  
    let conDemonio=document.getElementById("conDemonioInput");
    let conEsferas=document.getElementById("conEsferasInput");
    let conEspiritual=document.getElementById("conEspiritualInput");
    let forja=document.getElementById("forjaInput");
    let medicina=document.getElementById("medicinaInput");
    let montar=document.getElementById("montarInput");
    let sigilo=document.getElementById("sigiloInput");
    let pilotear=document.getElementById("pilotearInput");
    let manejoArma=document.getElementById("manejoArmaInput");
    let conObjMagicos=document.getElementById("conObjMagicosInput");
    let conLeyendas=document.getElementById("conLeyendasInput");
    let resCorte=document.getElementById("resCorteInput");
    let resEnergia=document.getElementById("resEnergiaInput");
    let resRayo=document.getElementById("resRayoInput");
    let resFuego=document.getElementById("resFuegoInput");
    let resFrio=document.getElementById("resFrioInput");
    let resVeneno=document.getElementById("resVenenoInput");
    let manejoSombras=document.getElementById("manejoSombrasInput");
    let tratoBakemono=document.getElementById("tratoBakemonoInput");
    let conHechiceria=document.getElementById("conHechiceriaInput");
    let meditacionEspiritual=document.getElementById("meditacionEspiritualInput");
    let meditacionVital=document.getElementById("meditacionVitalInput"); 
   
    let caracteristicas25=[25];
    caracteristicas25[0]=parseInt(academisismo.value)|| 0;
    caracteristicas25[1]=parseInt(artesMarciales.value)|| 0;
    caracteristicas25[2]=parseInt(atletismo.value)|| 0;
    caracteristicas25[3]=parseInt(conBakemono.value)|| 0;
    caracteristicas25[4]=parseInt(conDemonio.value)|| 0;
    caracteristicas25[5]=parseInt(conEsferas.value)|| 0;
    caracteristicas25[6]=parseInt(conEspiritual.value)|| 0;
    caracteristicas25[7]=parseInt(forja.value)|| 0;
    caracteristicas25[8]=parseInt(medicina.value)|| 0;
    caracteristicas25[9]=parseInt(montar.value)|| 0;
    caracteristicas25[10]=parseInt(sigilo.value)|| 0;
    caracteristicas25[11]=parseInt(pilotear.value)|| 0;
    caracteristicas25[12]=parseInt(manejoArma.value)|| 0;
    caracteristicas25[13]=parseInt(conObjMagicos.value)|| 0;
    caracteristicas25[14]=parseInt(conLeyendas.value)|| 0;
    caracteristicas25[15]=parseInt(resCorte.value)|| 0;
    caracteristicas25[16]=parseInt(resEnergia.value)|| 0;
    caracteristicas25[17]=parseInt(resFuego.value)|| 0;
    caracteristicas25[18]=parseInt(resRayo.value)|| 0;
    caracteristicas25[19]=parseInt(resFrio.value)|| 0;
    caracteristicas25[20]=parseInt(resVeneno.value)|| 0;
    caracteristicas25[21]=parseInt(manejoSombras.value)|| 0;
    caracteristicas25[22]=parseInt(tratoBakemono.value)|| 0;
    caracteristicas25[23]=parseInt(conHechiceria.value)|| 0;
    caracteristicas25[24]=parseInt(meditacionEspiritual.value)|| 0;
    caracteristicas25[25]=parseInt(meditacionVital.value)|| 0;
  

    let total=caracteristicas25.reduce((acum,valor)=>acum+valor,0);
    let resultado2=document.getElementById("resultado2");
    resultado2.innerHTML=total
    console.log(total);

}

//eventos que se disparan para calcular el total de puntos en tronco
document.getElementById("fuerzaInput").addEventListener("input",()=>{  
    calcularTotalTronco();
});
document.getElementById("fortalezaInput").addEventListener("input",()=>{
    calcularTotalTronco();
});
document.getElementById("destrezaInput").addEventListener("input",()=>{
   calcularTotalTronco();
});
document.getElementById("agilidadInput").addEventListener("input",()=>{
   calcularTotalTronco();
});
document.getElementById("sabiduriaInput").addEventListener("input",()=>{
    calcularTotalTronco();
});
document.getElementById("sentidosInput").addEventListener("input",()=>{
    calcularTotalTronco();
});
document.getElementById("principioInput").addEventListener("input",()=>{
   calcularTotalTronco();
});
document.getElementById("presenciaInput").addEventListener("input",()=>{
   calcularTotalTronco();
});

document.getElementById("academisismoInput").addEventListener("input",()=>{
    console.log("dispara el eventos de calcular Habilidades")
   calcularTotalHabilidades();
})
document.getElementById("artesMarcialesInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("atletismoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("conBakemonoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
}) 
document.getElementById("conDemonioInput").addEventListener("input",()=>{
   calcularTotalHabilidades();
})
document.getElementById("conEsferasInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("conEspiritualInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("forjaInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("medicinaInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("montarInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("sigiloInput").addEventListener("input",()=>{
   calcularTotalHabilidades();
})
document.getElementById("pilotearInput").addEventListener("input",()=>{
   calcularTotalHabilidades();
})
document.getElementById("manejoArmaInput").addEventListener("input",()=>{
  calcularTotalHabilidades();
})
document.getElementById("conObjMagicosInput").addEventListener("input",()=>{
  calcularTotalHabilidades();
})
document.getElementById("conLeyendasInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("resCorteInput").addEventListener("input",()=>{
   calcularTotalHabilidades();
})
document.getElementById("resEnergiaInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("resRayoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("resFuegoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("resFrioInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("resVenenoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("manejoSombrasInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("tratoBakemonoInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("conHechiceriaInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("meditacionEspiritualInput").addEventListener("input",()=>{
    calcularTotalHabilidades();
})
document.getElementById("meditacionVitalInput").addEventListener("input",()=>{
   calcularTotalHabilidades();
}) 


document.getElementById("fasesPosInput").addEventListener("input",()=>{

    let labelVita=document.getElementById(`vita`)
    let fort=document.getElementById("fortalezaInput").value || 0;
    let kiInput=document.getElementById("kiInput").value  || 0;
    //let cantFases=document.getElementById("inputCantFases").value;
    let fasesPos=document.getElementById("fasesPosInput").value || 3;
    let fasesNeg=document.getElementById("fasesNegInput").value || 3;

    let cantFases=parseInt(fasesPos)+parseInt(fasesNeg);

       
    let vita=(parseInt(fort)+parseInt(kiInput))*cantFases;
    labelVita.innerHTML=`Vitalidad: ${vita}/${vita}`;

    let numeroDivisionesPos=parseInt(fasesPos)
    let numeroDivisionesNeg=parseInt(fasesNeg)

    document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
    document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);
});

document.getElementById("fasesNegInput").addEventListener("input",()=>{

    let labelVita=document.getElementById(`vita`)
    let fort=document.getElementById("fortalezaInput").value || 0;
    let kiInput=document.getElementById("kiInput").value  || 0;
    //let cantFases=document.getElementById("inputCantFases").value;
    let fasesPos=document.getElementById("fasesPosInput").value || 3;
    let fasesNeg=document.getElementById("fasesNegInput").value || 3;

    let cantFases=parseInt(fasesPos)+parseInt(fasesNeg);

       
    let vita=(parseInt(fort)+parseInt(kiInput))*cantFases;
    labelVita.innerHTML=`Vitalidad: ${vita}/${vita}`;


    let numeroDivisionesPos=parseInt(fasesPos)
    let numeroDivisionesNeg=parseInt(fasesNeg)

    document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
    document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);
});


document.getElementById("fortalezaInput").addEventListener("input",()=>{
    console.log("funciona vitalidad por fortaleza")
    //label vita
    let labelVita=document.getElementById(`vita`)
    let fort=document.getElementById("fortalezaInput").value || 0;
    let kiInput=document.getElementById("kiInput").value  || 0;
    
    let fasesPos=document.getElementById("fasesPosInput").value || 3;
    let fasesNeg=document.getElementById("fasesNegInput").value || 3;

    let cantFases=parseInt(fasesPos)+parseInt(fasesNeg);

    let vita=(parseInt(fort)+parseInt(kiInput))*cantFases;
    labelVita.innerHTML=`Vitalidad: ${vita}/${vita}`;


    let numeroDivisionesPos=parseInt(fasesPos)
    console.log(fasesPos)
    let numeroDivisionesNeg=parseInt(fasesNeg)
    console.log(fasesNeg)

    document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
    document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);
});


document.getElementById("kiInput").addEventListener("input",()=>{
    
    console.log("funciona kiInput");
    let kiInput=document.getElementById("kiInput").value;
    let labelKi=document.getElementById(`ki`);
    labelKi.innerHTML=`Ki: ${kiInput}/${kiInput}`;
    
    let barraKi = document.getElementById(`barraKi`)

    

    barraKi.style.width = `100%`;
    barraKi.textContent = `${kiInput}`;

    
    //label vita
    let labelVita=document.getElementById(`vita`)
    let fort=document.getElementById("fortalezaInput").value || 0 ;
    
    let fasesPos=document.getElementById("fasesPosInput").value || 3;
    let fasesNeg=document.getElementById("fasesNegInput").value || 3;

    let cantFases=parseInt(fasesPos)+parseInt(fasesNeg);

    let vita=(parseInt(fort)+parseInt(kiInput))*cantFases;
    labelVita.innerHTML=`Vitalidad: ${vita}/${vita}`;

    let numeroDivisionesPos=parseInt(fasesPos)
    console.log(fasesPos)
    let numeroDivisionesNeg=parseInt(fasesNeg)
    console.log(fasesNeg)

    document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
    document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);
    

});

document.getElementById("kenInput").addEventListener("input",()=>{
    
    console.log("funciona kenInput");
    let kenInput=document.getElementById("kenInput").value;
    let labelKen=document.getElementById(`ken`);
    labelKen.innerHTML=`Ken: ${kenInput}/${kenInput}`;
    
    let barraKen = document.getElementById(`barraKen`)

    barraKen.style.width = `100%`;
    barraKen.textContent = `${kenInput}`;
});

document.getElementById("kenInput").addEventListener("input",()=>{
    console.log("funciona kenInput")
});



//BOTON PARA GUARDAR PERSONAJE NUEVO
let guardarPersonajeBtn=document.getElementById("guardarPersonajeBtn");
guardarPersonajeBtn.addEventListener("click",async ()=>{
    console.log("funciona boton guardar pj nuevo")
   let idCapturado= await guardarPjNuevo(coleccionPj); 


    //despues de guardar pj nuevo quiero el idpersonaje
    //let ultimoPersonaje = coleccionPj[coleccionPj.length];
    //let idpersonaje = ultimoPersonaje.idpersonaje;
    console.log(idCapturado)
    //quiero tomar el idpersonaje
    pjDominios.idPersonaje=idCapturado
    ventajasData.idPersonaje=idCapturado;

    console.log(pjDominios);
    //AHORA TENDRIA QUE INSERTAR ESTO EN MI BASE DE DATOS , CON UN POST 
    console.log(ventajasData);
    guardarVentajas(ventajasData)
    enviarVentajasAlServidor(ventajasData)


    insertDominiosTecnicas(pjDominios)
    //aca podriamos ya tener el id para luego llamar a lo siguiente

    Swal.fire({
        icon: "success",
        title: `El personaje se guardó con éxito!`,
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        //window.location.href = "misPersonajes.html";
        console.log(idCapturado)
        window.location.href = `miFicha.html?id=${idCapturado}`; 
        
      });
     
})




console.log(coleccionPj);


window.addEventListener('storage', function (event) {
    if (event.key === 'sesionIniciada' && event.newValue === null) {
        window.close();
    }
});

//nodo del boton
let btnNuevoDominio=document.getElementById("btnNuevoDominio");
//nodo del contenedor
let dominiosPj=document.getElementById("dominiosPj");
//nodo del selector 
let selectDominio=document.getElementById("selectDominio")

btnNuevoDominio.addEventListener("click",()=>{
    console.log("funcion el boton  de imprimir nuevo dominio");
    //tiene que tomar dominioSelecionado
    //nodo del selector 
    let selectDominio=document.getElementById("selectDominio");
    let dominioSeleccionado=parseInt(selectDominio.value) || 0
    //arrayDominios.push(selectDominio.value);
    console.log(dominioSeleccionado)
    console.log(typeof dominioSeleccionado)
   

    if (!pjDominios.dominio.includes(dominioSeleccionado) && dominioSeleccionado!==0) {
        // El dominio no está presente en el array, por lo tanto, lo agregamos
        //arrayDominios.push(dominioSeleccionado);
        pjDominios.dominio.push(dominioSeleccionado);
        console.log("Dominio agregado al array: " + dominioSeleccionado);
        imprimirDominio(dominioSeleccionado); // Llamamos a la función para imprimir el dominio seleccionado
    } else {
        console.log("El dominio ya ha sido seleccionado e imprimido anteriormente");
    }
    
    
})


function guardarTecnicaSeleccionada(dominio, tecnica) {
    // Verificamos si ya existe el dominio en pjDominios
    if (!pjDominios.tecnicas[dominio]) {
        pjDominios.tecnicas[dominio] = [];
    }
    // Guardamos la técnica en el dominio correspondiente
    pjDominios.tecnicas[dominio].push(tecnica);

    console.log('Técnica seleccionada guardada:', pjDominios);
}

function imprimirDominio(dominioSeleccionado){

    let nuevoDominio=document.createElement("div");
    nuevoDominio.innerHTML=` 
                                <div id="arteTecnicas-${dominioSeleccionado}" class="dominioSelect">
                                    
                                </div>
`

  //append o appendChild adjuntamos AL DOM al nodo
  dominiosPj.appendChild(nuevoDominio)

  let arteTecnicas=document.getElementById(`arteTecnicas-${dominioSeleccionado}`)
  
    let tecnicas = obtenerTextoCasillas(dominioSeleccionado)
    arteTecnicas.innerHTML= tecnicas;

  //ya estaria impreso
//necesito un evento que cuando exista un checkbok marcado lo guarde



let checkboxes = arteTecnicas.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            let dominio = parseInt(dominioSeleccionado);
            let tecnica = parseInt(this.value);
            // Guardar la técnica seleccionada en el objeto pjDominios
            guardarTecnicaSeleccionada(dominio, tecnica);
            console.log(pjDominios);
        } else {
            let dominio = parseInt(dominioSeleccionado);
            let tecnica = parseInt(this.value);
            // Eliminar la técnica seleccionada del objeto pjDominios
            eliminarTecnicaSeleccionada(dominio, tecnica);
            console.log(pjDominios);
        }
    });
});


function eliminarTecnicaSeleccionada(dominio, tecnica) {
    // Verificamos si existe el dominio en pjDominios
    if (pjDominios.tecnicas[dominio]) {
        // Buscamos la técnica en el array de técnicas del dominio
        const index = pjDominios.tecnicas[dominio].indexOf(tecnica);
        
        // Si la técnica se encuentra en el array
        if (index !== -1) {
            // Eliminamos la técnica
            pjDominios.tecnicas[dominio].splice(index, 1);
            console.log('Técnica seleccionada eliminada:', pjDominios);
        } else {
            console.log('La técnica no existe en el dominio especificado.');
        }
    } else {
        console.log('El dominio especificado no existe en pjDominios.');
    }
}


}

function obtenerTextoCasillas(dominioSeleccionado) {
    switch (dominioSeleccionado) {
        case 1:
            return `
            <label>Dominio: GUERRERO DE LAS ARTES MARCIALES </label>
            <label style="margin-left: 10%;">Arte: JINKEN </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="1">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Golpe de energia"</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="2">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Volar por los cielos"</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="3">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Fortaleza ferrea"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="4">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Descarga de fuerza vital"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="5">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Explosion de ki"</label><br>`;
        case 2:
            return `
            <label>Arte: MAESTRO DE ARMAS </label>
            <label style="margin-left: 10%;">Arte: BUJUTSU </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="6">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Despertar armamento"</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="7">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Corte de eergia"</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="8">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Ataque preciso"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="9">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Onda de ataque"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="10">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Liberar arma unica"</label><br>`;
        case 3:
            return `
            <label>Arte: MAESTRO DE LAS SOMBRAS </label>
            <label style="margin-left: 10%;">Arte: KAGEBOSHI </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="11">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Aura de confianza"</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="12">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Clonar formas"</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="13">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Desvanecimiento sombrio"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="14">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Paso de sombras"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="15">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Clones ilusorios"</label><br>`;
        case 4:
            return `
            <label>Arte: HECHICERO </label>
            <label style="margin-left: 10%;">Arte: JUJUTSU </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="16">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Liberar sello"</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="17">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Relicario magico"</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="18">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Percepcion de los mahos"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="19">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Liberar conjuracion"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="20">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Dominio de la energia vital"</label><br>`;
        case 5:
            return `
            <label>Arte: CRIADOR BAKEMONO </label>
            <label style="margin-left: 10%;">Arte: ZOSHOKU </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="21">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Empatia Bakemono</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="22">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Sanar heridas Bakemono</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="23">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Nakama Bakemono"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="24">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Fortaleza salvaje"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="25">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Esencia natural"</label><br>`;
        case 6:
            return `
            <label>Arte: MAESTRO ESPIRITUAL </label>
            <label style="margin-left: 10%;">Arte: REISO </label><br>
            <input type="checkbox" id="tecnicaInicial1-${dominioSeleccionado}" name="tecnicaInicial1-${dominioSeleccionado}" value="26">
            <label for="tecnicaInicial1-${dominioSeleccionado}">"Percibir el mundo invisible"</label><br>
            <input type="checkbox" id="tecnicaInicial2-${dominioSeleccionado}" name="tecnicaInicial2-${dominioSeleccionado}" value="27">
            <label for="tecnicaInicial2-${dominioSeleccionado}">"Guardian Shikigami"</label><br>
            <input type="checkbox" id="tecnicaInter3-${dominioSeleccionado}" name="tecnicaInter3-${dominioSeleccionado}" value="28">
            <label for="tecnicaInter3-${dominioSeleccionado}">"Barrera Kekkai"</label><br>
            <input type="checkbox" id="tecnicaInter4-${dominioSeleccionado}" name="tecnicaInter4-${dominioSeleccionado}" value="29">
            <label for="tecnicaInter4-${dominioSeleccionado}">"Fuerza espiritual"</label><br>
            <input type="checkbox" id="tecnicaSuperior-${dominioSeleccionado}" name="tecnicaSuperior-${dominioSeleccionado}" value="30">
            <label for="tecnicaSuperior-${dominioSeleccionado}">"Nexo de almas"</label><br>`;
        default:
            return ""; // Si el dominio no coincide con ninguno de los casos, no se muestra nada
    }
}

//hacemos la funcion post async para el servidor
async function insertDominiosTecnicas(pjDominios){
    try{
        //let idusuario_fk = localStorage.getItem("idusuario");
        const response= await fetch('/insertarDominiosTecnicas',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            
            
            pjDominios


        })
        });
    
    if(response.ok){
        console.log("insert exitoso!!")
        const jsonResponse = await response.json();
        console.log("Respuesta del servidor (JSON) de la solicitud de insertar dominio y tecncias:", jsonResponse);
        
    
    }else{
        console.error('Error en la solicitud de insertar Dominios y Tecnicas:', response.status);
        
    }
    
    }catch (error){
    console.log('Error en la solicitud de insertar Domonios y Tecncias:', error.message)
    
    }    
}

//imprime ventajas
let contadorVentajas = 1;

document.getElementById("agregar-ventaja").addEventListener("click", function() {
    contadorVentajas++;
    const nuevoDiv = document.createElement("div");
    nuevoDiv.id = "ventaja-" + contadorVentajas;
    nuevoDiv.className = "ventaja"; // Utiliza className en lugar de class
    nuevoDiv.innerHTML = `
        <input type="text" class="nombre-ventaja" placeholder="Nombre de la ventaja">
     
        <button class="btn btn-danger  eliminar-ventaja" onclick="eliminarVentaja(${contadorVentajas})">Eliminar</button>
    `;
    document.getElementById("ventajas-container").appendChild(nuevoDiv);
});

function guardarVentajas(ventajasData) {
    console.log("SE DISPARÓ LA FUNCIÓN GUARDAR VENTAJAS");

    // Tomar el id del personaje (asumo que ya está definido en alguna parte de tu código)
    let idpersonaje = ventajasData.idPersonaje;

    // Obtener todos los elementos que comienzan con "ventaja-"
    const ventajaInputs = document.querySelectorAll('[id^="ventaja-"]');

    // Iterar sobre cada elemento y extraer el nombre y el costo de la ventaja
    ventajaInputs.forEach(ventaja => {
        const nombre = ventaja.querySelector('.nombre-ventaja').value;
      

        // Agregar los datos al array de ventajas
        ventajasData.ventaja.push({ nombre: nombre });

    });

    // Mostrar el array de ventajas con los datos actualizados
    console.log("OBJETO CON VENTAJAS GUARDADAS: ", ventajasData);
}

async function enviarVentajasAlServidor(ventajasData) {
    try {
        const { idPersonaje, ventaja } = ventajasData;
        const response = await fetch('/insertarVentajas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idpersonaje: idPersonaje,
                ventajas: ventaja, // Usar ventaja en lugar de ventajas
            }),
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            console.log("¡Inserción exitosa!");
            const jsonResponse = await response.json();
            console.log("Respuesta del servidor:", jsonResponse);
        } else {
            console.error('Error en la solicitud de inserción:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud de inserción:', error.message);
    }
}

function eliminarVentaja(idVentaja) {
    const ventajaEliminar = document.getElementById("ventaja-" + idVentaja);
    ventajaEliminar.remove();
}
