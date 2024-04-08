let coleccionPj=[];

class Pj{
    constructor(idpersonaje,nombre,raza,naturaleza,dominio,fuerza,fortaleza,ki,kiActual,faseSalud,vidaTotal,damageActual,ken,kenActual,imagen,destreza,agilidad,sabiduria,sentidos,presencia,principio, academisismo, artesMarciales, atletismo,conBakemono,conDemonio,conEsferas,conEspiritual,forja,medicina,montar,sigilo,pilotear,manejoArma,conObjMagicos,conLeyendas,resCorte,resEnergia,resRayo,resFuego,resFrio,resVeneno,manejoSombras,tratoBakemono,conHechiceria,meditacionEspiritual,meditacionVital,idusuario_fk,cantFases,fasesPos,fasesNeg,nombreArma,consumicionKi)
      {
     this.idpersonaje=idpersonaje,
     this.nombre=nombre,
     this.raza=raza,
     this.naturaleza=naturaleza,
     this.dominio=dominio,
     this.fuerza=fuerza,
     this.fortaleza=fortaleza,
     this.ki=ki,
     this.kiActual=kiActual,
     this.faseSalud=faseSalud,
     this.vidaTotal=vidaTotal,
     this.damageActual=damageActual,
     this.ken=ken,
     this.kenActual=kenActual,
     this.imagen=imagen,
     this.destreza=destreza,
     this.agilidad=agilidad,
     this.sabiduria=sabiduria,
     this.sentidos=sentidos,
     this.presencia=presencia,
     this.principio=principio,
     this.academisismo=academisismo,
     this.artesMarciales=artesMarciales,
     this.atletismo=atletismo,  
     this.conBakemono=conBakemono,
     this.conDemonio=conDemonio,
     this.conEsferas=conEsferas,
     this.conEspiritual=conEspiritual,
     this.forja=forja,
     this.medicina=medicina,
     this.montar=montar,
     this.sigilo= sigilo,
     this.pilotear=pilotear,
     this.manejoArma=manejoArma,
     this.conObjMagicos=conObjMagicos,
     this.conLeyendas=conLeyendas,
     this.resCorte=resCorte,
     this.resEnergia=resEnergia,
     this.resRayo=resRayo,
     this.resFuego= resFuego,
     this.resFrio=resFrio,
     this.resVeneno=resVeneno,
     this.manejoSombras=manejoSombras,
     this.tratoBakemono= tratoBakemono,
     this.conHechiceria=conHechiceria,
     this.meditacionEspiritual=meditacionEspiritual, 
     this.meditacionVital=meditacionVital,
     this.idusuario_fk=idusuario_fk,
     this.cantFases=cantFases,
     this.fasesPos=fasesPos,
     this.fasesNeg=fasesNeg,
     this.nombreArma=nombreArma,
     this.consumicionKi=consumicionKi
    }  

    actualizarBarraDeProgreso(){
        if(this.damageActual<=0){
            this.damageActual=0;
        }
        if(this.kiActual<=0){
            this.kiActual=0;
        }
        if(this.kenActual<=0){
            this.kenActual=0;
        }      
        let vidaPositiva=this.fasesPos*this.faseSalud;
        let vidaNegativa=this.fasesNeg*this.faseSalud;
        this.vidaTotal=(this.fasesPos+this.fasesNeg)*this.faseSalud;

        if(this.damageActual>vidaPositiva){
            let porcentajeDamageNegativo = ((this.damageActual-vidaPositiva) * 100) / vidaNegativa;
            const barraVidaNegativa = document.getElementById(`barraVidaNegativa-${this.idpersonaje}`);
            barraVidaNegativa.style.width = `${porcentajeDamageNegativo}%`;
            barraVidaNegativa.textContent = `${this.damageActual}`;
            let porcentajeDamage = (this.damageActual * 100) / vidaPositiva;
            const barraVida = document.getElementById(`barraVida-${this.idpersonaje}`);
            barraVida.style.width = `${porcentajeDamage}%`;
            barraVida.textContent = ``;
            let EtiquetaVitaACtualizado=document.getElementById(`vita-${this.idpersonaje}`);
            EtiquetaVitaACtualizado.innerHTML=`Vitalidad: ${this.damageActual}/ ${this.vidaTotal}`;
            

            if(this.damageActual>this.vidaTotal){
             barraVidaNegativa.textContent = `MUERTO`;
             EtiquetaVitaACtualizado.innerHTML=`Vitalidad: ${this.damageActual}/ ${this.vidaTotal} MUERTO`;
             
             let muerto=document.getElementById(`${this.idpersonaje}`);
             muerto.classList.add('muerto');
             localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj)); 
         }
     
        }else{
     
            //ESTE SE TRATA DE LA BARRA POSITIVA
             let porcentajeDamage = (this.damageActual * 100) / vidaPositiva;
             const barraVida = document.getElementById(`barraVida-${this.idpersonaje}`); 
             barraVida.style.width = `${porcentajeDamage}%`;
             barraVida.textContent = `${this.damageActual}`;
             let EtiquetaDañoACtualizado=document.getElementById(`dañoActual-${this.idpersonaje}`);
            // EtiquetaDañoACtualizado.innerHTML=`Daño actual: ${this.damageActual}`;
             const barraVidaNegativa = document.getElementById(`barraVidaNegativa-${this.idpersonaje}`);
             barraVidaNegativa.style.width = `0%`;
             barraVidaNegativa.textContent = ``;
             let EtiquetaVitaACtualizado=document.getElementById(`vita-${this.idpersonaje}`);
             EtiquetaVitaACtualizado.innerHTML=`Vitalidad: ${this.damageActual}/ ${this.vidaTotal}`;
             if(this.damageActual<this.vidaTotal){
                 let vivo = document.getElementById(`${this.idpersonaje}`);
                 vivo.classList.remove('muerto');
                 localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));     
             }
        }

     
        let porcentajeKi = (this.kiActual * 100) / this.ki;
        const barraKi = document.getElementById(`barraKi-${this.idpersonaje}`);
        let porcentajeKen = (this.kenActual * 100) / this.ken;
        const barraKen = document.getElementById(`barraKen-${this.idpersonaje}`);
        barraKi.style.width = `${porcentajeKi}%`;
        barraKi.textContent = `${this.kiActual}`;
        let EtiquetaKiACtualizado=document.getElementById(`kiActual-${this.idpersonaje}`);
       // EtiquetaKiACtualizado.innerHTML=`Ki actual: ${this.kiActual}`;
        barraKen.style.width = `${porcentajeKen}%`;
        barraKen.textContent = `${this.kenActual}`;
        let EtiquetaKenACtualizado=document.getElementById(`kenActual-${this.idpersonaje}`);
        //EtiquetaKenACtualizado.innerHTML=`Ken actual: ${this.kenActual}`;
        let EtiquetaKiiACtualizado=document.getElementById(`ki-${this.idpersonaje}`);
        EtiquetaKiiACtualizado.innerHTML=`Nivel de ki: ${this.kiActual}/ ${this.ki}`;
        let EtiquetaKennACtualizado=document.getElementById(`ken-${this.idpersonaje}`);
        EtiquetaKennACtualizado.innerHTML=`Ken: ${this.kenActual}/ ${this.ken}`;
    }

    ficha(){   
                let nuevaFichaCard = document.createElement("div")
                nuevaFichaCard.className = "col-sm-12 col-md-6 col-lg-4 col-xxl-3 my-3"         
                nuevaFichaCard.innerHTML = `<div id="${this.idpersonaje}"  class="card mx-auto cardInicio cardhover" style="width: 18rem;">
                                                <img src="${this.imagen}" height="300px" width="" class="card-img-top circular" alt="${this.nombre} de ${this.dominio}">
                                                <div class="card-body mx-auto">
                                                <h5 class="card-Nombre">${this.nombre}</h5>
                                                <p>ID: ${this.idpersonaje}</p>
                                                <p>Raza: ${this.raza}</p>
                                                <p>Naturaleza: ${this.naturaleza}</p>
                                                <p>Dominio: ${this.dominio}</p>                                               

                                                <p id="vita-${this.idpersonaje}">Vitalidad:${this.damageActual}/ ${this.vidaTotal*2}</p>
                                                
                                                <p id="ki-${this.idpersonaje}">Ki:${this.kiActual}/ ${this.ki}</p>
                                                
                                                <p id="ken-${this.idpersonaje}">Ken:${this.kenActual}/ ${this.ken}</p>                                                                                                                                      
                                        
                                                <a href="#" class="btn btn-outline-danger" id="btnCargarDaño-${this.idpersonaje}">DAÑOS</a>
                                                <input type="number" id="inputDaño-${this.idpersonaje}" placeholder="Ingrese daño" min="0" style="width: 120px;">    
                                               
                                                <div class="progress health-bar miBarraVida">
                                                        <div id="barraVida-${this.idpersonaje}" class="progress-bar brillanteRojo" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>                                                                                                                                       
                                                <div class="progress health-bar miBarraVidaNegativa brillanteNegativa">
                                                        <div id="barraVidaNegativa-${this.idpersonaje}" class="progress-bar brillanteRojo" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                               
                                                <a href="#" class="btn btn-outline-primary" id="btnCargarKi-${this.idpersonaje}">KI</a>
                                                <input type="number" id="inputKiGastado-${this.idpersonaje}" placeholder="Consumir ki" min="0" style="width: 120px;">    
                                                
                                                 <div class="progress health-bar miBarraKi">
                                                        <div id="barraKi-${this.idpersonaje}" class="progress-bar brillante" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>                                       
                                                <a href="#" class="btn btn-outline-info" id="btnCargarKen-${this.idpersonaje}">KEN</a>
                                                <input type="number" id="inputKenGastado-${this.idpersonaje}" placeholder="Consumir ken" min="0" style="width: 120px;">    
                                                 
                                                 <div class="progress health-bar miBarraKen">
                                                        <div id="barraKen-${this.idpersonaje}" class="progress-bar brillanteKen" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>                                                
                                                <div style="text-align: center;">
                                                <a class="btn btn-danger" id="abrirFicha" href="miFicha.html?id=${this.idpersonaje}" target="_blank">Abrir ficha</a>
                                                </div>
            
                                            </div> `
                fichasCard.appendChild(nuevaFichaCard)
       
                let newDamage=0;
                let newKi=0;
                let newKen=0;
                
                let botonCargarDaño= document.getElementById(`btnCargarDaño-${this.idpersonaje}`)
                let botonCargarKi= document.getElementById(`btnCargarKi-${this.idpersonaje}`)
                let botonCargarKen= document.getElementById(`btnCargarKen-${this.idpersonaje}`)
                let inputDamage = document.getElementById(`inputDaño-${this.idpersonaje}`);
                let inputKiGastado = document.getElementById(`inputKiGastado-${this.idpersonaje}`);
                let inputKenGastado = document.getElementById(`inputKenGastado-${this.idpersonaje}`);        
                let barraVida = document.getElementById(`barraVida-${this.idpersonaje}`)
                let barraVidaNegativa = document.getElementById(`barraVidaNegativa-${this.idpersonaje}`)
                let barraKi = document.getElementById(`barraKi-${this.idpersonaje}`)
                let barraKen = document.getElementById(`barraKen-${this.idpersonaje}`) 
                let vita=document.getElementById(`vita-${this.idpersonaje}`)
                let ki=document.getElementById(`ki-${this.idpersonaje}`)
                let ken=document.getElementById(`ken-${this.idpersonaje}`)

            //luego que carga las card les pone el daño y barra de daño guardadas en el storage
            this.actualizarBarraDeProgreso();

            //BOTON CARGAR DAÑO solo para personaje 0
            botonCargarDaño.addEventListener('click', () => {
                event.preventDefault();
              if(this.damageActual>this.vidaTotal){
                    newDamage = parseInt(inputDamage.value)|| 0;
                    this.damageActual=this.damageActual+newDamage                    
                    this.actualizarBarraDeProgreso()
                    inputDamage.value="";
                    inputDamage.focus();  
                    console.log(`el daño actual de ${this.nombre} es ${this.damageActual}`);
                    localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                    this.actualizarPj();
              }else{

                newDamage = parseInt(inputDamage.value)|| 0;
                console.log(newDamage)
                this.damageActual=this.damageActual+newDamage
                this.actualizarBarraDeProgreso()  
                inputDamage.value="";
                inputDamage.focus();
                console.log(`el daño actual de ${this.nombre} es ${this.damageActual}`);
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                this.actualizarPj();
              }
                              
            });


            botonCargarKi.addEventListener('click', () => {
                event.preventDefault();
                let newKi = parseInt(inputKiGastado.value) || 0;
                console.log(newKi);
                this.kiActual = this.kiActual - newKi;
                // Verificar si se gastó más ki del que se tenía y actualizar la consumición de ki
                if (newKi > 0 && this.kiActual < 0) {
                    this.consumicionKi = this.consumicionKi + (newKi + this.kiActual); // Agregar la diferencia a consumiciónKi
                    this.kiActual = 0; // Establecer kiActual a cero ya que no puede ser negativo
                } else if (newKi > 0 && this.kiActual >= 0) {
                    this.consumicionKi = this.consumicionKi + newKi;
                }

                // Guardar cambios en localStorage y actualizar la interfaz si es necesario
                if (newKi > 0 && this.kiActual >= 0) {
                    localStorage.setItem("coleccionPj", JSON.stringify(coleccionPj));
                    console.log(`Cambios guardados`);
                    this.actualizarPj();
                }
                this.actualizarBarraDeProgreso()
                console.log(`el Ki actual de ${this.nombre} es ${this.kiActual}`);
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                this.actualizarPj();
            });

            botonCargarKen.addEventListener('click', () => {
                event.preventDefault();
                newKen = parseInt(inputKenGastado.value)|| 0;
                console.log(newKen)            
                this.kenActual=this.kenActual+(-newKen)               
                this.actualizarBarraDeProgreso()            
                inputKenGastado.value="";
                inputKenGastado.focus();
                console.log(`el Ken actual de ${this.nombre} es ${this.kenActual}`);               
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                this.actualizarPj();
            });                 
    }

    mostrarFicha(){
            let origen=document.getElementById("origen");
            origen.innerHTML=`
                    <div class="centrame margin16">
                        <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#presentacion" aria-expanded="false" aria-controls="collapseExample">
                        presentacion
                        </button>
                    </div>      
                    <div class="collapse show" id="presentacion">
                             <div class="apertura" id="${this.idpersonaje}">        
                                <div>
                                    <img src="${this.imagen}" id="etiquetaImagen" class="imagen" alt="imagenPj">
                                </div>     
                                <div class="info">
                                    <ul>
                                        <div>
                                            <label for="nombre" class="form-label labels">Nombre de personaje:</label>
                                            <input type="text" class="form-control inputSegundaFicha1" id="nombreInput" aria-describedby="nombre" value="${this.nombre}" placeholder="Ingrese nombre del personaje">
                                        </div>             
                                        <div>
                                            <label for="raza" class="form-label labels">Raza:</label>
                                            <input type="text" class="form-control inputSegundaFicha1" id="razaInput" aria-describedby="raza" value="${this.raza}" placeholder="Ingrese raza">
                                        </div>     
                                        <div>
                                            <label for="naturaleza" class="form-label labels">Naturaleza:</label>
                                            <input type="text" class="form-control inputSegundaFicha1" id="naturalezaInput" aria-describedby="naturaleza" value="${this.naturaleza}" placeholder="Ingrese naturaleza">
                                        </div>         
                                        <div>
                                            <label for="dominio" class="form-label labels">Dominio:</label>
                                            <select class="form-select inputSegundaFicha1"  id="dominioInput" aria-label="Default select example" required>
                                            <option value="${this.dominio}" selected>${this.dominio}</option>
                                            
                                            <option value="Guerrero de las artes marciales">Guerrero de las artes marciales</option>
                                            <option value="Maestro de armas">Maestro de armas</option>
                                            <option value="Maestro de sombras">Maestro de sombras</option>
                                            <option value="Hechicero">Hechicero</option>
                                            <option value="Ciador Bakemono">Ciador Bakemono</option>
                                            <option value="Maestro espiritual">Maestro espiritual</option>
                                            </select>
                                        </div>
                                        <div class="parejo">
                                            <div>
                                                <label for="ki" class="labelParejoIzquierdo">KI:</label>
                                                <input type="number" class="form-control inputSegundaFicha2 inputParejoIzquierdo" id="kiInput" aria-describedby="ki"  value="${this.ki}"placeholder="Ingrese nivel de ki" required>  
                                            </div>                                       
                                            <div>
                                                <label for="ken" class="labelParejoDerecho">KEN:</label>
                                                <input type="number" class="form-control inputSegundaFicha2 inputParejoDerecho" id="kenInput" aria-describedby="ken" value="${this.ken}" placeholder="Ingrese puntos de ken" required>  
                                            </div>                  
                                        </div>                                        
                                        <div>
                                            <label for="imagen" class="form-label labels">url de la imagen del personaje:</label>
                                            <input type="text" class="form-control inputSegundaFicha" id="imagenInput" aria-describedby="imagen" value="${this.imagen}" placeholder="Ingrese url de imagen del personaje">                                           
                                        </div>                                        
                                    </ul>
                                </div>                                
                            </div>
                    </div> 
                                        
                    <div class="centrame">
                        <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBarras" aria-expanded="false" aria-controls="collapseExample2">
                        Vitalidad
                        </button>
                    </div>
                    <div class="collapse show" id="collapseBarras">
                        <div class="barras">
                                <div class="gru">
                                        <div >
                                        <label class="fas" >cantidad de fases Positivas</label>
                                        <input class="small-input" type="number" id="fasesPosInput-${this.idpersonaje}">
                                        </div>

                                        <div >
                                            <label class="fas" >cantidad de fases Negativas</label>
                                            <input class="small-input" type="number" id="fasesNegInput-${this.idpersonaje}">
                                        </div>
                                </div>

                                    <div class="barraParejo">
                                        <div><a href="#" class="btn btn-outline-danger botonBarra"  id="btnCargarDaño-${this.idpersonaje}">DAÑOS</a>
                                        <input type="number" id="inputDaño-${this.idpersonaje}" class="miInputF" placeholder="Ingrese daño" min="0" >    
                                    </div>
                                    <div>
                                        <p id="vita-${this.idpersonaje}" class="labelFicha" >Vitalidad:${this.damageActual}/ ${this.vidaTotal*2}</p></div>   
                                    </div>                                    
                                    <div class="progress health-bar miBarraVida">
                                        <div id="barraVida-${this.idpersonaje}" class="progress-bar brillanteRojo"  role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>                                   
                                    <div class="progress health-bar miBarraVidaNegativa">
                                        <div id="barraVidaNegativa-${this.idpersonaje}" class="progress-bar brillanteRojo" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="barraParejo">
                                        <div> 
                                            <a href="#" class="btn btn-outline-primary botonBarra" id="btnCargarKi-${this.idpersonaje}">CONSUMIR KI</a>
                                            <input type="number" id="inputKiGastado-${this.idpersonaje}" class="miInputF" placeholder="Consumir ki" min="0" >
                                            <input type="number" id="inputConsumicionKi-${this.idpersonaje}" class="consumicionKi" placeholder="Consumicion" min="0" value="${this.consumicionKi}" >  
                                        </div>
                                        <div> <p id="ki-${this.idpersonaje}" class="labelFicha" >Ki:${this.kiActual}/ ${this.ki}</p></div>
                                        </div>   
                                        <div class="progress health-bar miBarraKi">
                                            <div id="barraKi-${this.idpersonaje}" class="progress-bar brillante" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>
                                    
                                <div class="barraParejo">
                                    <div>
                                    <a href="#" class="btn btn-outline-info botonBarra" id="btnCargarKen-${this.idpersonaje}">GASTAR KEN</a>
                                    <input type="number" id="inputKenGastado-${this.idpersonaje}" class="miInputF" placeholder="Consumir ken" min="0" > 
                                    </div>
                                    <div> <p id="ken-${this.idpersonaje}" class="labelFicha">Ken:${this.kenActual}/ ${this.ken}</p></div>
                                    </div>
                                    <div class="progress health-bar miBarraKen">
                                        <div id="barraKen-${this.idpersonaje}" class="progress-bar brillanteKen" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                         </div>  
                    
                    

                    <div class="centrame">
                    <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#caracteristicas" aria-expanded="false" aria-controls="collapseExample">
                    Caracteristicas
                    </button>
                    </div>      
                    <div class="collapse show" id="caracteristicas">                         
                            <!--TRONCO ZNK-->
                            <div class="tronco">
                            
                                <div>
                                    
                                    <div>
                                        <label for="fuerza" class="form-label labelTronco">Fuerza:</label>
                                        <input type="number" class="form-control" id="fuerzaInput" value="${this.fuerza}"aria-describedby="fuerza">
                                    </div>

                                    <div>
                                        <label for="ki" class="form-label labelTronco">Fortaleza:</label>
                                        <input type="number" class="form-control" id="fortalezaInput" value="${this.fortaleza}" aria-describedby="fortaleza">  
                                    </div>      
                                    
                                    <div>
                                        <label for="destreza" class="form-label labelTronco">Destreza:</label>
                                        <input type="number" class="form-control" id="destrezaInput" value="${this.destreza}" aria-describedby="destreza">  
                                    </div>
                                    
                                    <div>
                                        <label for="agilidad" class="form-label labelTronco">Agilidad:</label>
                                        <input type="number" class="form-control" id="agilidadInput" value="${this.agilidad}" aria-describedby="agilidad">  
                                    </div>



                                    <div>
                                    
                                    <label id="resultado" class="resultadoR labelTronco" placeholder="resultado">resultado</label>
                                    <label >p totales tronco</label>
                                    </div> 


                                
                                </div>
                                
                                <div>
                                    <div>
                                        <label for="sabiduria" class="form-label labelTronco">Sabiduria:</label>
                                        <input type="number" class="form-control" id="sabiduriaInput" aria-describedby="sabiduria" value="${this.sabiduria}">
                                    </div>
                                    <div>
                                        <label for="principio" class="form-label labelTronco">Principio:</label>
                                        <input type="number" class="form-control" id="principioInput" value="${this.principio}" aria-describedby="principio" >  
                                    </div>
                                    <div>
                                        <label for="presencia" class="form-label labelTronco">Presencia:</label>
                                        <input type="number" class="form-control" id="presenciaInput" value="${this.presencia}" aria-describedby="presencia">  
                                    </div>
                                    <div>
                                        <label for="sentidos" class="form-label labelTronco">Sentidos:</label>
                                        <input type="number" class="form-control" id="sentidosInput" value="${this.sentidos}" aria-describedby="sentidos">  
                                    </div>
                                    <div>
                                        <label id="resultado2" class="resultadoR labelTronco" placeholder="resultado">resultado</label>
                                        <label >p totales habilidades</label>
                                    </div>        
                    </div>
                    <!--HABILIDADES ZNK-->
                    <div class="aptitudes">                              
                            <div>
                            <label for="academisismo" class="form-label labelHabilidad">Academisismo:</label>
                            <input type="number" class="form-control" id="academisismoInput" value="${this.academisismo}" aria-describedby="academisismo">  
                            </div>
                            <div>
                            <label for="artesMarciales" class="form-label labelHabilidad">Artes marciales:</label>
                            <input type="number" class="form-control" id="artesMarcialesInput" value="${this.artesMarciales}" aria-describedby="artesMarciales">  
                            </div>
                            <div>
                            <label for="atletismo" class="form-label labelHabilidad">Atletismo:</label>
                            <input type="number" class="form-control" id="atletismoInput" value="${this.atletismo}" aria-describedby="atletismo"   >  
                            </div>
                            <div>
                            <label for="conBakemono" class="form-label labelHabilidad">Con. Bakemono:</label>
                            <input type="number" class="form-control" id="conBakemonoInput" value="${this.conBakemono}" aria-describedby="conBakemono"   >  
                            </div>
                            <div>
                            <label for="conDemonio" class="form-label labelHabilidad">Con. Demonio:</label>
                            <input type="number" class="form-control" id="conDemonioInput" value="${this.conDemonio}" aria-describedby="conDemonio"  >  
                            </div>
                            <div>
                            <label for="conEsferas" class="form-label labelHabilidad">Con. Esferas:</label>
                            <input type="number" class="form-control" id="conEsferasInput" value="${this.conEsferas}" aria-describedby="conEsferas"  >  
                            </div>
                            <div>
                            <label for="conEspiritual" class="form-label labelHabilidad">Con. Espiritual:</label>
                            <input type="number" class="form-control" id="conEspiritualInput" value="${this.conEspiritual}" aria-describedby="conEspiritual">  
                            </div>    
                            <div>
                            <label for="forja" class="form-label labelHabilidad">Forja:</label>
                            <input type="number" class="form-control" id="forjaInput" value="${this.forja}" aria-describedby="forja">  
                            </div>
                            <div>
                            <label for="medicina" class="form-label labelHabilidad">Medicina:</label>
                            <input type="number" class="form-control" id="medicinaInput" value="${this.medicina}" aria-describedby="medicina">  
                            </div>
                            <div>
                            <label for="montar" class="form-label labelHabilidad">Montar:</label>
                            <input type="number" class="form-control" id="montarInput" value="${this.montar}" aria-describedby="montar">  
                            </div>
                            <div>
                            <label for="sigilo" class="form-label labelHabilidad">Sigilo:</label>
                            <input type="number" class="form-control" id="sigiloInput" value="${this.sigilo}" aria-describedby="sigilo"  >  
                            </div>
                            <div>
                            <label for="pilotear" class="form-label labelHabilidad">Pilotear:</label>
                            <input type="number" class="form-control" id="pilotearInput" value="${this.pilotear}" aria-describedby="pilotear"  >  
                            </div>
                            <div>
                            <label for="manejoArma" class="form-label labelHabilidad">Manejo de Arma:</label>
                            <input type="text" class="nomArma" id="nombreArmaInput" value="${this.nombreArma}">
                            <input type="number" class="form-control" id="manejoArmaInput" value="${this.manejoArma}" aria-describedby="manejoArma">  
                            </div>
                            <div>
                            <label for="conObjMagicos" class="form-label labelHabilidad">Con. Obj. Magicos:</label>
                            <input type="number" class="form-control" id="conObjMagicosInput" value="${this.conObjMagicos}" aria-describedby="conObjMagicos">  
                            </div>   
                            <div>
                            <label for="conLeyendas" class="form-label labelHabilidad">Con. de Leyendas:</label>
                            <input type="number" class="form-control" id="conLeyendasInput" value="${this.conLeyendas}" aria-describedby="conLeyendas">  
                            </div>                                
                            <div>
                            <label for="resCorte" class="form-label labelHabilidad">Res. Esp. Corte:</label>
                            <input type="number" class="form-control" id="resCorteInput" value="${this.resCorte}" aria-describedby="resCorte">  
                            </div>
                            <div>
                            <label for="resEnergia" class="form-label labelHabilidad">Res. Esp. Energia:</label>
                            <input type="number" class="form-control" id="resEnergiaInput" value="${this.resEnergia}" aria-describedby="resEnergia">  
                            </div>
                            <div>
                            <label for="resRayo" class="form-label labelHabilidad">Res. Esp. Rayo:</label>
                            <input type="number" class="form-control" id="resRayoInput" value="${this.resRayo}" aria-describedby="resRayo">  
                            </div>
                            <div>
                            <label for="resFuego" class="form-label labelHabilidad">Res. Esp. Fuego:</label>
                            <input type="number" class="form-control" id="resFuegoInput" value="${this.resFuego}" aria-describedby="resFuego">  
                            </div>
                            <div>
                            <label for="resFrio" class="form-label labelHabilidad">Res. Esp. Frio:</label>
                            <input type="number" class="form-control" id="resFrioInput" value="${this.resFrio}" aria-describedby="resFrio" >  
                            </div>
                            <div>
                            <label for="resVeneno" class="form-label labelHabilidad">Res. Esp. Veneno:</label>
                            <input type="number" class="form-control" id="resVenenoInput" value="${this.resVeneno}" aria-describedby="resVeneno" >  
                            </div>
                            <div>
                            <label for="manejoSombras" class="form-label labelHabilidad">Manejo de Sombras:</label>
                            <input type="number" class="form-control" id="manejoSombrasInput" value="${this.manejoSombras}" aria-describedby="manejoSombras">  
                            </div>
                            <div>
                            <label for="tratoBakemono" class="form-label labelHabilidad">Trato Bakemono:</label>
                            <input type="number" class="form-control" id="tratoBakemonoInput" value="${this.tratoBakemono}" aria-describedby="tratoBakemono">  
                            </div>
                            <div>
                            <label for="conHechiceria" class="form-label labelHabilidad">Con. Hechiceria:</label>
                            <input type="number" class="form-control" id="conHechiceriaInput" value="${this.conHechiceria}" aria-describedby="conHechiceria">  
                            </div>   
                            <div>
                            <label for="meditacionEspiritual" class="form-label labelHabilidad">Meditacion Espiritual:</label>
                            <input type="number" class="form-control" id="meditacionEspiritualInput" value="${this.meditacionEspiritual}" aria-describedby="meditacionEspitual">  
                            </div>
                            <div>
                            <label for="meditacionVital" class="form-label labelHabilidad">Meditacion Vital:</label>
                            <input type="number" class="form-control" id="meditacionVitalInput" value="${this.meditacionVital}" aria-describedby="meditacionVital">  
                            </div>                                         
                    </div>
                </div>  
                                            
            </div>

                            <div class="centrame">
                            <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#dominios" aria-expanded="false" aria-controls="collapseExample">
                            Dominios
                            </button>
                            </div>      
                            <div class="collapse show dominios" id="dominios">
                            <div class="container" id="dominiosBox">
                            </div>  
                                <div class="selector">
                                    <label for="selectDominio">Dominio</label>
                                    <select name="selectDominio" id="selectDominio">
                                    <option value="">Escoja dominio</option>
                                    <option value="1">Guerrero de las artes marciales</option>
                                    <option value="2">Maestro de armas</option>
                                    <option value="3">Maestro de sombras</option>
                                    <option value="4">Hechicero</option>
                                    <option value="5">Criador Bakemono</option>
                                    <option value="6">Maestro espiritual</option>
                                    </select>
                                    <button id="btnNuevoDominio" class="btn btn-success">+ Dominio</button>
                                </div>
                            </div>

                            <div class="centrame">
                            <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#ventajas" aria-expanded="false" aria-controls="collapseExample">
                            Ventajas y desventajas
                            </button>
                            </div>      
                            <div class="collapse show ventajas" id="ventajas">  
                            <div id="ventajas-container">
                              
                            </div>
                            <div>
                                <button class="agregar-ventaja" id="agregar-ventaja">Agregar Ventaja</button>
                            </div>
                           
                           </div>


                           <div class="centrame">
                            <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#tecnicasEspeciales" aria-expanded="false" aria-controls="collapseExample">
                            Tecnicas especiales
                            </button>
                            </div>  

                           <div class="collapse show ventajas" id="tecnicasEspeciales">  
                            <div id="tecnicasEspeciales-container">
                              
                            </div>
                            <div id="contenedorNuevasTecnicasEspeciales">
                           
                            </div>
                            <div>
                                <button class="agregar-tecnicaEspecial" id="agregar-tecnicaEspecial">Nueva tecnica especial</button>
                            </div>
                           
                           </div>
                           </div>


                           <div class="centrame">
                            <button class="btn btn-primary botonesCollapse" type="button" data-bs-toggle="collapse" data-bs-target="#inventario" aria-expanded="false" aria-controls="collapseExample">
                            Inventario
                            </button>
                            </div>  

                           <div class="collapse show inventarios" id="inventario">  
                            <div id="inventario-container">
                              
                            </div>
                            <div>
                                <button class="agregar-inventario" id="agregar-inventario">+ inventario</button>
                            </div>
                           
                           </div>
                           </div>

                            <div>

                                <div class="guardarCambios">
                                <button type="button" class="btn" id="guardarcambiosBtn-${this.idpersonaje}">Guardar cambios</button>
                                </div>
                                
                            </div>  
                                        `

            let consumicionKi=document.getElementById(`inputConsumicionKi-${this.idpersonaje}`);            
            consumicionKi.addEventListener("change",()=>{
             
                console.log("funciona input consumicionKi: ",consumicionKi.value)
               
                this.consumicionKi=consumicionKi.value;
                console.log("funciona input consumicionKi: ",this.consumicionKi)

                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                console.log(`cambios guardados`)
                
                this.actualizarPj();
            })

            pjDominios.idPersonaje=this.idpersonaje;
            let newDamage=0;
            //let newKi=0;
            let newKen=0;

            let  botonCargarDaño= document.getElementById(`btnCargarDaño-${this.idpersonaje}`)
            let  botonCargarKi= document.getElementById(`btnCargarKi-${this.idpersonaje}`)
            let  botonCargarKen= document.getElementById(`btnCargarKen-${this.idpersonaje}`)
            let inputDamage = document.getElementById(`inputDaño-${this.idpersonaje}`);
            let inputKiGastado = document.getElementById(`inputKiGastado-${this.idpersonaje}`);
            let inputKenGastado = document.getElementById(`inputKenGastado-${this.idpersonaje}`);
            let barraVida = document.getElementById(`barraVida-${this.idpersonaje}`)
            let barraVidaNegativa = document.getElementById(`barraVidaNegativa-${this.idpersonaje}`)
            let barraKi = document.getElementById(`barraKi-${this.idpersonaje}`)
            let barraKen = document.getElementById(`barraKen-${this.idpersonaje}`)
            let vita=document.getElementById(`vita-${this.idpersonaje}`)
            let ki=document.getElementById(`ki-${this.idpersonaje}`)
            let ken=document.getElementById(`ken-${this.idpersonaje}`)

            let fasesPos=document.getElementById(`fasesPosInput-${this.idpersonaje}`)
            let fasesNeg=document.getElementById(`fasesNegInput-${this.idpersonaje}`)
            fasesPos.value=`${this.fasesPos}`;
            fasesNeg.value=`${this.fasesNeg}`;
            this.actualizarBarraDeProgreso();
               
            botonCargarDaño.addEventListener('click', () => {
                event.preventDefault();
            if(this.damageActual>this.vidaTotal){
                    newDamage = parseInt(inputDamage.value) || 0;
                    console.log(newDamage)
                    this.damageActual=this.damageActual+newDamage  
                    this.actualizarBarraDeProgreso()
                    inputDamage.value="";
                    inputDamage.focus();
                    console.log(`el daño actual de ${this.nombre} es ${this.damageActual}`); 
                    localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                    console.log(`cambios guardados`);
                    this.actualizarPj()
            }else{
                console.log(`funciona evento de carga de daño en barra de vida en ${this.nombre}`)
                newDamage = parseInt(inputDamage.value)|| 0;
                console.log(newDamage)
                this.damageActual=this.damageActual+newDamage
                this.actualizarBarraDeProgreso()
                inputDamage.value="";
                inputDamage.focus();
                console.log(`el daño actual de ${this.nombre} es ${this.damageActual}`);
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                console.log(`cambios guardados`);
                this.actualizarPj()
            }

            });

            botonCargarKi.addEventListener('click', () => {
                event.preventDefault();
                let newKi = parseInt(inputKiGastado.value) || 0;
                console.log(newKi);
                this.kiActual = this.kiActual - newKi;
                // Verificar si se gastó más ki del que se tenía y actualizar la consumición de ki
                if (newKi > 0 && this.kiActual < 0) {
                    this.consumicionKi = this.consumicionKi + (newKi + this.kiActual); // Agregar la diferencia a consumiciónKi
                    this.kiActual = 0; // Establecer kiActual a cero ya que no puede ser negativo
                } else if (newKi > 0 && this.kiActual >= 0) {
                    this.consumicionKi = this.consumicionKi + newKi;
                }

                // Guardar cambios en localStorage y actualizar la interfaz si es necesario
                if (newKi > 0 && this.kiActual >= 0) {
                    localStorage.setItem("coleccionPj", JSON.stringify(coleccionPj));
                    console.log(`Cambios guardados`);
                    this.actualizarPj();
                }
                this.actualizarBarraDeProgreso()
                console.log(`el Ki actual de ${this.nombre} es ${this.kiActual}`);
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                this.actualizarPj();
            });

            botonCargarKen.addEventListener('click', () => {
                event.preventDefault();
                newKen = parseInt(inputKenGastado.value)|| 0;
                this.kenActual=this.kenActual+(-newKen)
                this.actualizarBarraDeProgreso()
                console.log(`el Ken actual de ${this.nombre} es ${this.kenActual}`);
                localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
                this.actualizarPj();
            });

            document.getElementById("fuerzaInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("fortalezaInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("destrezaInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("agilidadInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("sabiduriaInput").addEventListener("input",()=>{
                console.log(this)
                this.calcularTotalTronco();
            });
            document.getElementById("sentidosInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("principioInput").addEventListener("input",()=>{
            this.calcularTotalTronco();
            });
            document.getElementById("presenciaInput").addEventListener("input",()=>{
                this.calcularTotalTronco();
            });
            document.getElementById("academisismoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("artesMarcialesInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("atletismoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conBakemonoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            }) 
            document.getElementById("conDemonioInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conEsferasInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conEspiritualInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("forjaInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("medicinaInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("montarInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("sigiloInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("pilotearInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("manejoArmaInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conObjMagicosInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conLeyendasInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resCorteInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resEnergiaInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resRayoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resFuegoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resFrioInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("resVenenoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("manejoSombrasInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("tratoBakemonoInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("conHechiceriaInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("meditacionEspiritualInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            })
            document.getElementById("meditacionVitalInput").addEventListener("input",()=>{
                this.calcularTotalHabilidades();
            }) 

            this.calcularTotalTronco();
            this.calcularTotalHabilidades();

            fasesPos=document.getElementById(`fasesPosInput-${this.idpersonaje}`).value;
            fasesNeg=document.getElementById(`fasesNegInput-${this.idpersonaje}`).value;

            let numeroDivisionesPos=parseInt(fasesPos)
            let numeroDivisionesNeg=parseInt(fasesNeg)
          
        
            document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
            document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);


            document.getElementById(`fasesPosInput-${this.idpersonaje}`).addEventListener("input",()=>{
                let fasesPos=document.getElementById(`fasesPosInput-${this.idpersonaje}`).value;
                let fasesNeg=document.getElementById(`fasesNegInput-${this.idpersonaje}`).value;
                let cantFases=parseInt(fasesPos)+parseInt(fasesNeg)
                this.fasesPos=fasesPos;
                this.fasesNeg=fasesNeg;


                this.cantFases=cantFases;

                let vita=this.faseSalud*cantFases;
                
                this.vidaTotal=vita
                
                let numeroDivisionesPos=parseInt(fasesPos)
            console.log(fasesPos)
            let numeroDivisionesNeg=parseInt(fasesNeg)
            console.log(fasesNeg)
        
            document.documentElement.style.setProperty('--numeroDivisionesPos', numeroDivisionesPos);
            document.documentElement.style.setProperty('--numeroDivisionesNeg', numeroDivisionesNeg);

                //labelVita.innerHTML=`Vitalidad: ${vita}/${vita}`;
                this.actualizarPj()
            })

            document.getElementById(`fasesNegInput-${this.idpersonaje}`).addEventListener("input",()=>{
                console.log("funciona el evento input de cant fases Negativas");

                //tiene que alterar las fases y la vida total
                let fasesPos=document.getElementById(`fasesPosInput-${this.idpersonaje}`).value;
                let fasesNeg=document.getElementById(`fasesNegInput-${this.idpersonaje}`).value;
                let cantFases=parseInt(fasesPos)+parseInt(fasesNeg)
                this.fasesPos=fasesPos;
                this.fasesNeg=fasesNeg;


                this.cantFases=cantFases;

                let vita=this.faseSalud*cantFases;
                
                this.vidaTotal=vita
                
               
                this.actualizarPj()
            })
            

//ESTE ES EL BOTON DENTRO DE LA CARD PARA GUARDAS CAMBIOS
let guardarCambiosBtn=document.getElementById(`guardarcambiosBtn-${this.idpersonaje}`);
guardarCambiosBtn.addEventListener("click",()=>{
    console.log("funciona boton de guardar cambios ficha")
    //guardarNuevasVentajas();
    //enviarNuevasVentajasAlServidor(); 

    //guardarNuevasTecnicasEspeciales();
    //enviarTecnicasEspecialesAlServidor()
    //enviarNuevasTecnicasEspecialesAlServidor();


    //modifica la ficha y se guarda en el storage y luego renderiza el dom con los cambios
    this.modificarFicha();
    localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj));
    //aca viene la parte donde hacemos un update sobre la base de datos
        // *****ACA TENEMOS QUE HACER UN UPDATE
    
                    
    realizarUpdateBbdd(this.idpersonaje,this.nombre,this.raza,this.naturaleza,this.dominio,this.fuerza,this.fortaleza,this.ki,this.kiActual,this.faseSalud,this.vidaTotal,this.damageActual,this.ken,this.kenActual,this.imagen,this.destreza,this.agilidad,this.sabiduria,this.sentidos,this.presencia,this.principio, this.academisismo, this.artesMarciales, this.atletismo,this.conBakemono,this.conDemonio,this.conEsferas,this.conEspiritual,this.forja,this.medicina,this.montar,this.sigilo,this.pilotear,this.manejoArma,this.conObjMagicos,this.conLeyendas,this.resCorte,this.resEnergia,this.resRayo,this.resFuego,this.resFrio,this.resVeneno,this.manejoSombras,this.tratoBakemono,this.conHechiceria,this.meditacionEspiritual,this.meditacionVital,this.idusuario_fk,this.cantFases,this.fasesPos,this.fasesNeg,this.nombreArma);
    
    insertDominiosTecnicas(pjDominios)
    //**********************DESPUES LO RESOLVEMOS************************
    location.reload();            
}) 


        //ACA ES DONDE SE IMPRIMEN LOS DOMINIOS Y LAS TECNICAS
        //let dominiosBox=document.getElementById(`dominiosBox`)


        //PRIMERO TOMAMOS LOS DOMINIOS Y TECNICAS DEL PERSONAJE 
        console.log("DOMINIOS Y TECNICAS: ",arrayDominiosTecnicas)
        //obtengo los dominios
        function obtenerIdsDominios(arrayDominiosTecnicas) {
            // Utilizamos el método map() para extraer solo los IDs de dominios
            return arrayDominiosTecnicas.map(dominio => dominio.idDominio);
        }

        //obtengo las tecncias
        function obtenerIdsTecnicas(arrayDominiosTecnicas) {
            let idsTecnicas = [];
            arrayDominiosTecnicas.forEach(dominio => {
                dominio.tecnicas.forEach(tecnica => {
                    idsTecnicas.push(tecnica.idTecnica);
                });
            });
            return idsTecnicas;
        }
        
        let tecnicasSeleccionadas=obtenerIdsTecnicas(arrayDominiosTecnicas);
        console.log(tecnicasSeleccionadas)
   
        let dominiosSeleccionados=obtenerIdsDominios(arrayDominiosTecnicas);
        console.log(dominiosSeleccionados)


        // aca la info
        function obtenerTecnicas(arrayDominiosTecnicas) {
            let tecnicas = [];
            arrayDominiosTecnicas.forEach(dominio => {
                dominio.tecnicas.forEach(tecnica => {
                    tecnicas.push({
                        idDominio: dominio.idDominio,
                        idTecnica: tecnica.idTecnica,
                        nombre: tecnica.nombre,
                        descripcion: tecnica.descripcion,
                        costeKi: tecnica.costeKi,
                        tiempoInvo: tecnica.tiempoInvo,
                        // Agrega aquí todas las propiedades que desees extraer de la técnica
                    });
                });
            });
            return tecnicas;
        }


        let infoTecnica=obtenerTecnicas(arrayDominiosTecnicas)
        console.log("INFORMACION DE LAS TECNICAS:",infoTecnica)

        //CUANDO IMPRIMIMOS MANDAMOS DOMINIOS Y TECNICAS SELECCIONADAS
        imprimirDominiosYTecnicas(dominiosSeleccionados,tecnicasSeleccionadas,infoTecnica);      

        function imprimirDominiosYTecnicas(dominiosSeleccionados, tecnicasSeleccionadas,infoTecnica) {
            // Obtener el contenedor donde se van a imprimir los dominios y las técnicas
            let dominiosBox = document.getElementById(`dominiosBox`);

           
        
            // Iterar sobre los dominios seleccionados
            dominiosSeleccionados.forEach(dominioId => {
                // Imprimir las técnicas para el dominio actual
              //  let tecnicasHtml = obtenerTextoCasillas(parseInt(dominioId));
                // Agregar el HTML de las técnicas al contenedor de dominios
               // dominiosBox.innerHTML += tecnicasHtml;
               console.log(parseInt(dominioId))
               let tecnicasHtml = obtenerTextoCasillas(parseInt(dominioId),tecnicasSeleccionadas,infoTecnica);
               console.log(tecnicasHtml)
               dominiosBox.innerHTML += tecnicasHtml;
            });

            verificarCheck();
        }
  
     
        function obtenerTextoCasillas(dominioSeleccionado,tecnicasSeleccionadas,infoTecnica) {
            switch (dominioSeleccionado) {
                
                case 1:
                    console.log("lo que llegaaaaaaa: ",infoTecnica)
                
                    let tecnicaInfo1 = infoTecnica?.find(tecnica => tecnica.idTecnica === 1);
                    let tecnicaInfo2 = infoTecnica?.find(tecnica => tecnica.idTecnica === 2);
                    let tecnicaInfo3 = infoTecnica?.find(tecnica => tecnica.idTecnica === 3);
                    let tecnicaInfo4 = infoTecnica?.find(tecnica => tecnica.idTecnica === 4);
                    let tecnicaInfo5 = infoTecnica?.find(tecnica => tecnica.idTecnica === 5);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: GUERRERO DE LAS ARTES MARCIALES </label> 
                    <label style="margin-left: 10%;">Arte: JINKEN </label><br>
                    <input type="checkbox" data-dominio-id="1"  value="1" ${tecnicasSeleccionadas.includes(1) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}"> "Golpe de energia"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo1 ? tecnicaInfo1.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo1 ? tecnicaInfo1.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="1"  name="tecnicaInicial2-${dominioSeleccionado}" value="2" ${tecnicasSeleccionadas.includes(2) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}"> "Volar por los cielos"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo2 ? tecnicaInfo2.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo2 ? tecnicaInfo2.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="1"  name="tecnicaInter3-${dominioSeleccionado}" value="3" ${tecnicasSeleccionadas.includes(3) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}"> "Fortaleza ferrea"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo3 ? tecnicaInfo3.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo3 ? tecnicaInfo3.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="1"  name="tecnicaInter4-${dominioSeleccionado}" value="4" ${tecnicasSeleccionadas.includes(4) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}"> "Descarga de fuerza vital"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo4 ? tecnicaInfo4.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo4 ? tecnicaInfo4.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="1"  name="tecnicaSuperior-${dominioSeleccionado}" value="5" ${tecnicasSeleccionadas.includes(5) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}" >"Explosion de Ki</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo5 ? tecnicaInfo5.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo5 ? tecnicaInfo5.tiempoInvo : ''}</span><br><br>
                    </div>
                    `;
                case 2:
                    let tecnicaInfo6 = infoTecnica?.find(tecnica => tecnica.idTecnica === 6);
                    let tecnicaInfo7 = infoTecnica?.find(tecnica => tecnica.idTecnica === 7);
                    let tecnicaInfo8 = infoTecnica?.find(tecnica => tecnica.idTecnica === 8);
                    let tecnicaInfo9 = infoTecnica?.find(tecnica => tecnica.idTecnica === 9);
                    let tecnicaInfo10 = infoTecnica?.find(tecnica => tecnica.idTecnica === 10);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: MAESTRO DE ARMAS </label>
                    <label style="margin-left: 10%;">Arte: BUJUTSU </label><br>
                    <input type="checkbox" data-dominio-id="2"  name="tecnicaInicial1-${dominioSeleccionado}" value="6" ${tecnicasSeleccionadas.includes(6) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}">"Despertar armamento"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo6 ? tecnicaInfo6.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo6 ? tecnicaInfo6.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="2"  name="tecnicaInicial2-${dominioSeleccionado}" value="7" ${tecnicasSeleccionadas.includes(7) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}">"Corte de energia"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo7 ? tecnicaInfo7.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo7 ? tecnicaInfo7.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="2" " name="tecnicaInter3-${dominioSeleccionado}" value="8" ${tecnicasSeleccionadas.includes(8) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}">"Ataque preciso"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo8 ? tecnicaInfo8.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo8 ? tecnicaInfo8.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="2" name="tecnicaInter4-${dominioSeleccionado}" value="9" ${tecnicasSeleccionadas.includes(9) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}">"Onda de ataque"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo9 ? tecnicaInfo9.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo9 ? tecnicaInfo9.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="2" name="tecnicaSuperior-${dominioSeleccionado}" value="10" ${tecnicasSeleccionadas.includes(10) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}">"Liberar arma unica</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo10 ? tecnicaInfo10.tiempoInvo : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo10 ? tecnicaInfo10.tiempoInvo : ''}</span><br><br>
                    </div>`;
                case 3:
                    let tecnicaInfo11 = infoTecnica?.find(tecnica => tecnica.idTecnica === 11);
                    let tecnicaInfo12 = infoTecnica?.find(tecnica => tecnica.idTecnica === 12);
                    let tecnicaInfo13 = infoTecnica?.find(tecnica => tecnica.idTecnica === 13);
                    let tecnicaInfo14 = infoTecnica?.find(tecnica => tecnica.idTecnica === 14);
                    let tecnicaInfo15 = infoTecnica?.find(tecnica => tecnica.idTecnica === 15);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: MAESTRO DE LAS SOMBRAS </label>
                    <label style="margin-left: 10%;">Arte: KAGEBOSHI </label><br>
                    <input type="checkbox" data-dominio-id="3"  name="tecnicaInicial11-${dominioSeleccionado}" value="11" ${tecnicasSeleccionadas.includes(11) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}">"Aura de confianza"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo11 ? tecnicaInfo11.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo11 ? tecnicaInfo11.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="3"  name="tecnicaInicial2-${dominioSeleccionado}" value="12" ${tecnicasSeleccionadas.includes(12) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}">"Clonar formas"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo12 ? tecnicaInfo12.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo12 ? tecnicaInfo12.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="3"  name="tecnicaInter3-${dominioSeleccionado}" value="13" ${tecnicasSeleccionadas.includes(13) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}">"Desvanecimiento sombrio"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo13 ? tecnicaInfo13.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo13 ? tecnicaInfo13.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="3"   name="tecnicaInter4-${dominioSeleccionado}" value="14" ${tecnicasSeleccionadas.includes(14) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}">"Paso de sombras"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo14 ? tecnicaInfo14.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo14 ? tecnicaInfo14.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="3"  name="tecnicaSuperior-${dominioSeleccionado}" value="15" ${tecnicasSeleccionadas.includes(15) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}">"Clones ilusorios"</label> 
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo15 ? tecnicaInfo15.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo15 ? tecnicaInfo15.tiempoInvo : ''}</span><br><br>
                    </div>`;
                case 4:
                    let tecnicaInfo16 = infoTecnica?.find(tecnica => tecnica.idTecnica === 16);
                    let tecnicaInfo17 = infoTecnica?.find(tecnica => tecnica.idTecnica === 17);
                    let tecnicaInfo18 = infoTecnica?.find(tecnica => tecnica.idTecnica === 18);
                    let tecnicaInfo19 = infoTecnica?.find(tecnica => tecnica.idTecnica === 19);
                    let tecnicaInfo20 = infoTecnica?.find(tecnica => tecnica.idTecnica === 20);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: HECHICERO </label>
                    <label style="margin-left: 10%;">Arte: JUJUTSU </label><br>
                    <input type="checkbox" data-dominio-id="4"  name="tecnicaInicial1-${dominioSeleccionado}" value="16" ${tecnicasSeleccionadas.includes(16) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}">"Liberar sello"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo16 ? tecnicaInfo16.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo16 ? tecnicaInfo16.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="4"   name="tecnicaInicial2-${dominioSeleccionado}" value="17" ${tecnicasSeleccionadas.includes(17) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}">"Relicario magico"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo17 ? tecnicaInfo17.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo17 ? tecnicaInfo17.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="4"   name="tecnicaInter3-${dominioSeleccionado}" value="18" ${tecnicasSeleccionadas.includes(18) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}">"Percepcion de los mahos"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo18 ? tecnicaInfo18.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo18 ? tecnicaInfo18.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="4"   name="tecnicaInter4-${dominioSeleccionado}" value="19" ${tecnicasSeleccionadas.includes(19) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}">"Liberar conjuracion"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo19 ? tecnicaInfo19.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo19 ? tecnicaInfo19.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="4"  name="tecnicaSuperior-${dominioSeleccionado}" value="20" ${tecnicasSeleccionadas.includes(20) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}">"Dominio de la energia vital"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo20 ? tecnicaInfo20.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo20 ? tecnicaInfo20.tiempoInvo : ''}</span><br><br>
                    </div>`;
                case 5:
                    let tecnicaInfo21 = infoTecnica?.find(tecnica => tecnica.idTecnica === 21);
                    let tecnicaInfo22 = infoTecnica?.find(tecnica => tecnica.idTecnica === 22);
                    let tecnicaInfo23 = infoTecnica?.find(tecnica => tecnica.idTecnica === 23);
                    let tecnicaInfo24 = infoTecnica?.find(tecnica => tecnica.idTecnica === 24);
                    let tecnicaInfo25 = infoTecnica?.find(tecnica => tecnica.idTecnica === 25);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: CRIADOR BAKEMONO </label>
                    <label style="margin-left: 10%;">Arte: ZOSHOKU </label><br>
                    <input type="checkbox" data-dominio-id="5"   name="tecnicaInicial1-${dominioSeleccionado}" value="21" ${tecnicasSeleccionadas.includes(21) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}">"Empatia Bakemono"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo21 ? tecnicaInfo21.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo21 ? tecnicaInfo21.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="5"  name="tecnicaInicial2-${dominioSeleccionado}" value="22" ${tecnicasSeleccionadas.includes(22) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}">"Sanar heridas Bakemono"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo22 ? tecnicaInfo22.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo22 ? tecnicaInfo22.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="5" name="tecnicaInter3-${dominioSeleccionado}" value="23" ${tecnicasSeleccionadas.includes(23) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}">"Nakama Bakemono"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo23 ? tecnicaInfo23.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo23 ? tecnicaInfo23.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="5"  name="tecnicaInter4-${dominioSeleccionado}" value="24" ${tecnicasSeleccionadas.includes(24) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}">"Fortaleza salvaje"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo24 ? tecnicaInfo24.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo24 ? tecnicaInfo24.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="5"  name="tecnicaSuperior-${dominioSeleccionado}" value="25" ${tecnicasSeleccionadas.includes(25) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}">"Esencia natural"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo25 ? tecnicaInfo25.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo25 ? tecnicaInfo25.tiempoInvo : ''}</span><br><br>
                    </div>`;
                case 6:
                    let tecnicaInfo26 = infoTecnica?.find(tecnica => tecnica.idTecnica === 26);
                    let tecnicaInfo27 = infoTecnica?.find(tecnica => tecnica.idTecnica === 27);
                    let tecnicaInfo28 = infoTecnica?.find(tecnica => tecnica.idTecnica === 28);
                    let tecnicaInfo29 = infoTecnica?.find(tecnica => tecnica.idTecnica === 29);
                    let tecnicaInfo30 = infoTecnica?.find(tecnica => tecnica.idTecnica === 30);
                    return `
                    <div class="dominioSelect">
                    <label>Dominio: MAESTRO ESPIRITUAL </label>
                    <label style="margin-left: 10%;">Arte: REISO </label><br>
                    <input type="checkbox" data-dominio-id="6"  name="tecnicaInicial1-${dominioSeleccionado}" value="26" ${tecnicasSeleccionadas.includes(26) ? 'checked' : ''}>
                    <label for="tecnicaInicial1-${dominioSeleccionado}">"Percibir el mundo invisible"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo26 ? tecnicaInfo26.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo26 ? tecnicaInfo26.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="6" " name="tecnicaInicial2-${dominioSeleccionado}" value="27" ${tecnicasSeleccionadas.includes(27) ? 'checked' : ''}>
                    <label for="tecnicaInicial2-${dominioSeleccionado}">"Guardian Shikigami"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo27 ? tecnicaInfo27.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo27 ? tecnicaInfo27.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="6"  name="tecnicaInter3-${dominioSeleccionado}" value="28" ${tecnicasSeleccionadas.includes(28) ? 'checked' : ''}>
                    <label for="tecnicaInter3-${dominioSeleccionado}">"Barrera Kekkai"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo28 ? tecnicaInfo28.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo28 ? tecnicaInfo28.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="6"  name="tecnicaInter4-${dominioSeleccionado}" value="29" ${tecnicasSeleccionadas.includes(29) ? 'checked' : ''}>
                    <label for="tecnicaInter4-${dominioSeleccionado}">"Fuerza espiritual"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo29 ? tecnicaInfo29.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo29 ? tecnicaInfo29.tiempoInvo : ''}</span><br>
                    <input type="checkbox" data-dominio-id="6"  name="tecnicaSuperior-${dominioSeleccionado}" value="30" ${tecnicasSeleccionadas.includes(30) ? 'checked' : ''}>
                    <label for="tecnicaSuperior-${dominioSeleccionado}">"Nexo de almas"</label>
                    <span style="margin-left: 100px;">Coste de Ki: ${tecnicaInfo30 ? tecnicaInfo30.costeKi : ''}</span>
                    <span style="margin-left: 100px;">Tiempo de invocacion: ${tecnicaInfo30 ? tecnicaInfo30.tiempoInvo : ''}</span><br><br>
                    </div>`;
                // Agrega más casos según necesites para los otros dominios
                default:
                    return ""; // Si el dominio no coincide con ninguno de los casos, no se muestra nada
            }
        }


        function verificarCheck() {
            let dominiosBox = document.getElementById(`dominiosBox`);
            let checkboxes = dominiosBox.querySelectorAll('input[type="checkbox"]');
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    let tecnica = parseInt(this.value);
                    let dominio = parseInt(this.getAttribute('data-dominio-id'));
                    
                    // Verificar si la casilla de verificación se desmarca
                    if (!this.checked) {
                        // Eliminar la técnica del objeto pjDominios
                        eliminarTecnicaSeleccionada(dominio, tecnica);
                        // Llamar a la función para eliminar la técnica y el dominio asociado de la base de datos
                        const urlParams = new URLSearchParams(window.location.search);
                        const idpersonaje = parseInt(urlParams.get('id'));
                        eliminarTecnicaYDominioDB(idpersonaje, dominio, tecnica);
                       
                    } else {
                        // Si se marca la casilla de verificación, guardar la técnica seleccionada
                        guardarTecnicaSeleccionada(dominio, tecnica);
                    }
                });
            });
        }
      
        function guardarTecnicaSeleccionada(dominio, tecnica) {
            // Verificar si ya existe el dominio en pjDominios
            if (!pjDominios.tecnicas[dominio]) {
                // Si el dominio no existe, lo agregamos al array de dominios
                pjDominios.dominio.push(dominio);
                // Creamos un nuevo array para almacenar las técnicas de este dominio
                pjDominios.tecnicas[dominio] = [];
            }
            // Guardamos la técnica en el dominio correspondiente
            pjDominios.tecnicas[dominio].push(tecnica);
            
            console.log('Técnica seleccionada guardada:', pjDominios);
        }

        // Función para eliminar la técnica seleccionada del objeto pjDominios
        function eliminarTecnicaSeleccionada(dominio, tecnica) {
            if (pjDominios.tecnicas[dominio]) {
                // Filtrar las técnicas para mantener solo las que no sean igual a la técnica deseleccionada
                pjDominios.tecnicas[dominio] = pjDominios.tecnicas[dominio].filter(t => t !== tecnica);
                console.log('Técnica seleccionada eliminada:', pjDominios);
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

       //Eliminar 
        async function eliminarTecnicaYDominioDB(idpersonaje,dominio, tecnica) {
            try {
                
                console.log("********SE DISPARO UNA ELIMINACION")
                     
                // Realizar la solicitud de eliminación a la base de datos
                const response = await fetch('/eliminarTecnicaYDominio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        idpersonaje,
                        dominio,
                        tecnica
                    })
                });
        
                if (response.ok) {
                    console.log("Eliminación exitosa en la base de datos!!");
                    const jsonResponse = await response.json();
                    console.log("Respuesta del servidor (JSON) de la solicitud de eliminación:", jsonResponse);
                } else {
                    console.error('Error en la solicitud de eliminación:', response.status);
                }
        
            } catch (error) {
                console.log('Error en la solicitud de eliminación:', error.message)
            }
        }
     
       
        btnNuevoDominio.addEventListener("click", () => {
            console.log("Función del botón para imprimir un nuevo dominio");
            // Obtener el valor del nuevo dominio seleccionado por el usuario desde el elemento de selección
            let selectDominio = document.getElementById("selectDominio");
            let dominioSeleccionado = parseInt(selectDominio.value) || 0; // Convertir el valor a entero
        
            // Verificar si el dominio seleccionado ya está presente en la lista de dominios seleccionados
            if (!dominiosSeleccionados.includes(dominioSeleccionado) && dominioSeleccionado !== 0) {
                // El dominio no está presente en la lista, por lo tanto, lo agregamos
                dominiosSeleccionados.push(dominioSeleccionado);
                console.log("Dominio agregado al array: " + dominioSeleccionado);
                // Llamar a la función para imprimir las técnicas asociadas a este nuevo dominio
                imprimirDominiosYTecnicas([dominioSeleccionado], tecnicasSeleccionadas); // Pasar el dominio seleccionado como un array
            } else {
                console.log("El dominio ya ha sido seleccionado anteriormente o no se ha seleccionado uno nuevo");
            }
        });


//NUEVO COMPONENTE TECNCIA ESPECIAL

// array para almacenar las ventajas del servidor
let tecnicasEspecialesServidor = [];
//<p class="idTecnicaEspecialP">${tecnicaEspecial.idTecnicaEspecial}</p>
// Función para imprimir las ventajas obtenidas del servidor
const imprimirTecnicasEspeciales = async () => {
    try {
        const tecnicasEspeciales = await consumirTecnicasEspeciales();
        tecnicasEspecialesServidor = tecnicasEspeciales; // Almacenar las ventajas del servidor en la variable global

        tecnicasEspecialesServidor.forEach(tecnicaEspecial => {
            const nuevoDiv = document.createElement("div");
            nuevoDiv.id = "tecnicaEspecial-" + tecnicaEspecial.idTecnicaEspecial;
            nuevoDiv.className = "tecnicaEspecial"; // Utiliza className en lugar de class
            nuevoDiv.innerHTML = `
            <div class="nombreEliminar">
              
                
                <input type="text" class="nombre-tecnicaEspecial" value="${tecnicaEspecial.nombre}">
                <button class="btn btn-danger eliminar-tecnicaEspecial" id="eliminarTecnicaEspecial${tecnicaEspecial.idTecnicaEspecial}">Eliminar</button>
            </div>    
                <textarea type="text" class="descripcion-tecnicaEspecial" value="${tecnicaEspecial.descripcion}">${tecnicaEspecial.descripcion}</textarea>
                <textarea type="text" class="sistema-tecnicaEspecial" value="${tecnicaEspecial.sistema}">${tecnicaEspecial.sistema}</textarea>
                <div class="costeTiempo">
                <label for="coste">Coste de ki:</label>
                <input type="number" class="coste-tecnicaEspecial" value="${tecnicaEspecial.coste}">
                <label for="tiempoInvo">Tiempo de Invocación:</label>
                <input type="text" class="tiempoInvo-tecnicaEspecial" value="${tecnicaEspecial.tiempoInvo}">
                </div>
                
            `;
            document.getElementById("tecnicasEspeciales-container").appendChild(nuevoDiv);




            const urlParams = new URLSearchParams(window.location.search);
            const idPersonaje = parseInt(urlParams.get('id'));

            let btnEliminarTecnicaEspecial = document.getElementById(`eliminarTecnicaEspecial${tecnicaEspecial.idTecnicaEspecial}`);
            btnEliminarTecnicaEspecial.addEventListener("click", function() {
                console.log("funciona el boton eliminar tecnica especial")
                eliminarTecnicaEspecialBd(idPersonaje,tecnicaEspecial.idTecnicaEspecial);
                console.log("ID DE TECNICA ESPECIAL:",tecnicaEspecial.idTecnicaEspecial)
                //contenedorTecnicaEspecial.removeChild(nuevoDiv);
                document.getElementById("tecnicasEspeciales-container").removeChild(nuevoDiv);
            });



            //necesito que cuando se cambie nombre,descripcion,sistema,coste,tiempoInvo se dispare un update
             // Añadir event listeners para cada campo input y textarea
             nuevoDiv.querySelectorAll('input, textarea').forEach(element => {
                element.addEventListener('change', function() {
                    console.log("funciona la actualizacion de tecnica especial")
                    const nombre = document.querySelector(`#tecnicaEspecial-${tecnicaEspecial.idTecnicaEspecial} .nombre-tecnicaEspecial`).value;
                    const descripcion = document.querySelector(`#tecnicaEspecial-${tecnicaEspecial.idTecnicaEspecial} .descripcion-tecnicaEspecial`).value;
                    const sistema = document.querySelector(`#tecnicaEspecial-${tecnicaEspecial.idTecnicaEspecial} .sistema-tecnicaEspecial`).value;
                    const coste = document.querySelector(`#tecnicaEspecial-${tecnicaEspecial.idTecnicaEspecial} .coste-tecnicaEspecial`).value;
                    const tiempoInvo = document.querySelector(`#tecnicaEspecial-${tecnicaEspecial.idTecnicaEspecial} .tiempoInvo-tecnicaEspecial`).value;
                    console.log(`
                    nombre:${nombre}
                    descripcion:${descripcion}
                    sistema:${sistema}
                    coste:${coste}
                    tiempoInvo:${tiempoInvo}`)
                    actualizarTecnicaEspecial(idPersonaje,tecnicaEspecial.idTecnicaEspecial, nombre, descripcion, sistema, coste, tiempoInvo);
                    
               
                });
            });

        });
    } catch (error) {
        // Manejar el error aquí
    }
};


// Llamamos a la función para imprimir las ventajas
imprimirTecnicasEspeciales();

async function actualizarTecnicaEspecial(idPersonaje,idTecnicaEspecial, nombre, descripcion, sistema, coste, tiempoInvo) {
    try {
        const response = await fetch(`/updateTecnicaEspecial/${idPersonaje}/${idTecnicaEspecial}`, {
            method: 'PUT', // Método HTTP PUT para actualizar
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                sistema: sistema,
                coste: coste,
                tiempoInvo: tiempoInvo
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la técnica especial en la base de datos');
        }

        const data = await response.json();
        console.log('Técnica especial actualizada:', data);
    } catch (error) {
        console.error('Error al actualizar la técnica especial en la base de datos:', error);
    }
}

// Función para eliminar una tecnica especial
async function eliminarTecnicaEspecialBd(idPersonaje, idTecnicaEspecial) {
    try {
      const response = await fetch('/eliminarTecnicaEspecial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idpersonaje: idPersonaje,
          idTecnicaEspecial: idTecnicaEspecial, // Ajusta el nombre del campo según lo esperado por el servidor
        }),
      });
  
      if (response.ok) {
        console.log("¡Tecnica especial eliminada exitosamente!");
        const jsonResponse = await response.json();
        console.log("Respuesta del servidor:", jsonResponse);
      } else {
        console.error('Error en la solicitud de eliminación de Tecnica especial:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación de Tecnica Especial:', error.message);
}}


//ahora vamos con el boton para agregar



  // Seleccionar el botón de agregar técnica especial
const btnAgregarTecnicaEspecial = document.getElementById("agregar-tecnicaEspecial");

// Agregar evento de clic al botón
btnAgregarTecnicaEspecial.addEventListener("click", function() {
    // Crear los campos similares para agregar una nueva técnica especial
    const nuevoDiv = document.createElement("div");
    nuevoDiv.className = "nueva-tecnicaEspecial";

    nuevoDiv.innerHTML = `
        <div class="nombreEliminar">
            <input type="text" class="nombre-nueva-tecnicaEspecial" placeholder="Nombre">
            <button class="btn btn-danger eliminar-nueva-tecnicaEspecial">Eliminar</button>
        </div>
        <textarea type="text" class="descripcion-nueva-tecnicaEspecial" placeholder="Descripción"></textarea>
        <textarea type="text" class="sistema-nueva-tecnicaEspecial" placeholder="Sistema"></textarea>
        <div class="costeTiempo">
            <label for="coste">Coste de ki:</label>
            <input type="number" class="coste-nueva-tecnicaEspecial" placeholder="Coste">
            <label for="tiempoInvo">Tiempo de Invocación:</label>
            <input type="text" class="tiempoInvo-nueva-tecnicaEspecial" placeholder="Tiempo de invocación">
            <button class="btn btn-primary guardar-nuevaTecnicaEspecial" id="guardar-nuevaTecnicaEspecial">Guardar nueva tecnica especial</button>
        </div>
       
        
    `;

    // Agregar el nuevoDiv al contenedor deseado en tu HTML
    document.getElementById("contenedorNuevasTecnicasEspeciales").appendChild(nuevoDiv);


    const urlParams = new URLSearchParams(window.location.search);
    const idPersonaje = parseInt(urlParams.get('id'));

    // Agregar evento de clic al botón de eliminar para eliminar el nuevoDiv si es necesario
    const btnEliminarNuevaTecnicaEspecial = nuevoDiv.querySelector(".eliminar-nueva-tecnicaEspecial");
    btnEliminarNuevaTecnicaEspecial.addEventListener("click", function() {
        nuevoDiv.remove();
    });

    let btnGuardarNuevaTecnicaEspecial=document.getElementById("guardar-nuevaTecnicaEspecial");
    btnGuardarNuevaTecnicaEspecial.addEventListener("click",()=>{
        console.log("funciona el boton de guardar nueva tecnica especial")
          // Capturar los valores de los campos de la nueva técnica especial
    const nombre = nuevoDiv.querySelector(".nombre-nueva-tecnicaEspecial").value;
    const descripcion = nuevoDiv.querySelector(".descripcion-nueva-tecnicaEspecial").value;
    const sistema = nuevoDiv.querySelector(".sistema-nueva-tecnicaEspecial").value;
    const coste = nuevoDiv.querySelector(".coste-nueva-tecnicaEspecial").value;
    const tiempoInvo = nuevoDiv.querySelector(".tiempoInvo-nueva-tecnicaEspecial").value;

    // Realizar la inserción en la base de datos o hacer lo que sea necesario con los datos capturados
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("Sistema:", sistema);
    console.log("Coste:", coste);
    console.log("Tiempo de Invocación:", tiempoInvo);

    // Aquí puedes enviar los datos al servidor para realizar la inserción en la base de datos
    enviarNuevasTecnicasEspecialesAlServidor(idPersonaje,nombre,descripcion,sistema,coste,tiempoInvo)
    location.reload()


    })
    //ahora tengo que tomar todos los campos y realizar un insert
});

async function enviarNuevasTecnicasEspecialesAlServidor(idPersonaje,nombre,descripcion,sistema,coste,tiempoInvo) {
    try {
       

        // Realizar la solicitud POST al servidor solo con las nuevas ventajas filtradas
        const response = await fetch('/insertarTecnicasEspeciales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idpersonaje: idPersonaje,
                nombre: nombre,
                descripcion: descripcion,
                sistema: sistema,
                coste:coste,
                tiempoInvo
            }),
        });

        // Manejar la respuesta del servidor
        if (response.ok) {
            console.log("¡Inserción exitosa de tecncia especial!");
            const jsonResponse = await response.json();
            console.log("Respuesta del servidor:", jsonResponse);
        } else {
            console.error('Error en la solicitud de inserción de tecnica especial:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud de inserción de tecncia especial:', error.message);
    }
}


//COMPONENTE INVENTARIO

//IMPRIMIMOS EL INVENTARIO
let inventario = [];

// Consumir inventario
async function imprimirInventario() {
    try {
        inventario = await consumirInventario(inventario);
        console.log(inventario); // Imprimir inventario aquí

        const contenedorInventario = document.getElementById("inventario-container");

        // Limpiar el contenedor antes de agregar nuevos elementos
        contenedorInventario.innerHTML = "";

        // Iterar sobre cada elemento del inventario y crear un elemento HTML para cada uno
        inventario.forEach((item, index) => {
            const nuevoDiv = document.createElement("div");
            nuevoDiv.innerHTML = `
            <div class="inventariosClass">
                <input type="text" class="item-inventario" id="item${index}" value="${item.item}">
                <button class="btn btn-danger eliminar-item-inventario">Eliminar</button>
            </div>`;
            contenedorInventario.appendChild(nuevoDiv);
            const urlParams = new URLSearchParams(window.location.search);
            const idPersonaje = parseInt(urlParams.get('id'));
            // Obtener el botón de eliminar asociado al nuevo elemento de inventario
            let btnEliminar = nuevoDiv.querySelector(".eliminar-item-inventario");
            // Obtenemos el nuevo elemento de entrada
            let nuevoInput = nuevoDiv.querySelector(".item-inventario");

            // Agregar el evento 'click' al botón de eliminar
            btnEliminar.addEventListener("click", () => {
                contenedorInventario.removeChild(nuevoDiv); // Eliminar el div del inventario del DOM
                eliminarItem(idPersonaje, nuevoInput.value); // Llamar a la función para eliminar el item del servidor
            });

            nuevoInput.addEventListener("change",()=>{
                console.log("funciona el boton de update")
                updateItem(idPersonaje,item.idInventario, nuevoInput.value);
            })
           




        });
    } catch (error) {
        console.error('Error al imprimir inventario:', error);
    }
}
imprimirInventario();

async function updateItem(idPersonaje, idInventario, item) {
    try {
        const response = await fetch(`/updateItem/${idPersonaje}/${idInventario}/${item}`, {
            method: 'PUT', // Método HTTP PUT para actualizar
            headers: {
                'Content-Type': 'application/json'
            },
            // Puedes enviar cualquier información adicional en el cuerpo de la solicitud si es necesario
            // body: JSON.stringify({ key: value })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el ítem en la base de datos');
        }

        const data = await response.json();
        console.log('Ítem actualizado:', data);
    } catch (error) {
        console.error('Error al actualizar el ítem en la base de datos:', error);
    }
}

let nuevoInventario = document.getElementById("agregar-inventario");
nuevoInventario.addEventListener("click", () => {
    console.log("Funciona el botón nuevo inventario");

    const contenedorInventario = document.getElementById("inventario-container");
    const nuevoDiv = document.createElement("div");
    nuevoDiv.innerHTML = `
    <div class="inventariosClass">
        <input type="text" class="item-inventario">
        <button class="btn btn-danger eliminar-item-inventario">Eliminar</button>
    </div>`;
    contenedorInventario.appendChild(nuevoDiv);

    // Obtenemos el nuevo elemento de entrada
    let nuevoInput = nuevoDiv.querySelector(".item-inventario");

    const urlParams = new URLSearchParams(window.location.search);
    const idPersonaje = parseInt(urlParams.get('id'));
    console.log(idPersonaje)
    console.log(typeof idPersonaje)

   
    // Agregamos el event listener directamente al nuevo elemento de entrada
    nuevoInput.addEventListener("change", () => {
      
        insertItem(idPersonaje,nuevoInput.value);
        
    });


    // Obtener el botón de eliminar asociado al nuevo elemento de inventario
    let btnEliminar = nuevoDiv.querySelector(".eliminar-item-inventario");

    // Agregar el evento 'click' al botón de eliminar
    btnEliminar.addEventListener("click", () => {
        contenedorInventario.removeChild(nuevoDiv); // Eliminar el div del inventario del DOM
        eliminarItem(idPersonaje, nuevoInput.value); // Llamar a la función para eliminar el item del servidor
    });

});
async function insertItem(idPersonaje,item){
    try{
        console.log("Insertando nuevo item:", item);
        console.log("Insertando nuevo item:", idPersonaje);
       


       
        
        const response = await fetch(`/insertarNuevoItem/${idPersonaje}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: item })
    
        });
        if (!response.ok) {
            throw new Error('Error al insertar el nuevo item en la base de datos');
        }
        const data = await response.json();
        console.log('Nuevo item insertado:', data);
     

    }catch(error){
        console.error('Error al insertar nuevo item en la base de datos:', error);
    }
}
async function eliminarItem(idPersonaje, item) {
    try {
        console.log("Eliminando item:", item);
        console.log("ID del personaje:", idPersonaje);

        // Realizar la solicitud para eliminar el item del servidor
        const response = await fetch(`/eliminarItem/${idPersonaje}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: item })
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el item de la base de datos');
        }

        const data = await response.json();
        console.log('Item eliminado:', data);
    } catch (error) {
        console.error('Error al eliminar el item de la base de datos:', error);
    }
}





//COMPONENTE VENTAJAS

//IMPRIMIMOS LAS VENTAJAS
let ventajas = [];
function escapeHTML(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
// Consumir inventario
async function imprimirVentajas() {
    try {
        ventajas = await consumirVentajas(ventajas);
        console.log(ventajas); // Imprimir inventario aquí

        const contenedorVentajas = document.getElementById("ventajas-container");

        // Limpiar el contenedor antes de agregar nuevos elementos
        contenedorVentajas.innerHTML = "";

        // Iterar sobre cada elemento del inventario y crear un elemento HTML para cada uno
        ventajas.forEach((ventaja, index) => {
            const nuevoDiv = document.createElement("div");
            nuevoDiv.innerHTML = `
            <div class="ventajasClass">
            <input type="text" class="item-ventajas" id="idVentaja${index}" value="${ventaja.idVentaja}" style="display: none;">
                <input type="text" class="item-ventajas nombreVentaja" id="nombre${index}" value="${escapeHTML(ventaja.nombre)}">
                             
                <button class="btn btn-danger eliminar-item-ventajas">Eliminar</button>
            </div>`;
            contenedorVentajas.appendChild(nuevoDiv);
            const urlParams = new URLSearchParams(window.location.search);
            const idPersonaje = parseInt(urlParams.get('id'));
            // Obtener el botón de eliminar asociado al nuevo elemento de inventario
            let btnEliminar = nuevoDiv.querySelector(".eliminar-item-ventajas");
            // Obtenemos el nuevo elemento de entrada
            //let nuevoInput = nuevoDiv.querySelector(".item-ventajas");


            let nuevoInput = nuevoDiv.querySelector(".item-ventajas.nombreVentaja");
            btnEliminar.addEventListener("click", () => {
                const idVentaja = nuevoDiv.querySelector(`#idVentaja${index}`).value; // Obtener el ID de la ventaja
                contenedorVentajas.removeChild(nuevoDiv); // Eliminar el div del inventario del DOM
                eliminarVentajas(idPersonaje, idVentaja); // Llamar a la función para eliminar el item del servidor
            });

              
            nuevoInput.addEventListener("change",()=>{
                console.log("funciona el boton de update")
                //const idVentaja = nuevoDiv.querySelector(`#idVentaja${index}`).value;
                updateVentaja(idPersonaje,ventaja.idVentaja, nuevoInput.value);
            })

        });
    } catch (error) {
        console.error('Error al imprimir ventajas:', error);
    }
}
imprimirVentajas();





let nuevoVentajas = document.getElementById("agregar-ventaja");
nuevoVentajas.addEventListener("click", () => {
    console.log("Funciona el botón nuevo ventajas");

    const contenedorVentajas = document.getElementById("ventajas-container");
    const nuevoDiv = document.createElement("div");
    nuevoDiv.innerHTML = `
    <div class="ventajasClass">
        <input type="text" class="item-ventajas nombreVentaja" id="nombre">
        
        <button class="btn btn-danger eliminar-item-ventajas">Eliminar</button>
    </div>`;
    contenedorVentajas.appendChild(nuevoDiv);

    // Obtenemos el nuevo elemento de entrada
    let nuevoInput = nuevoDiv.querySelector(".item-ventajas");

    const urlParams = new URLSearchParams(window.location.search);
    const idPersonaje = parseInt(urlParams.get('id'));
    console.log(idPersonaje)
    console.log(typeof idPersonaje)

   
    // Agregamos el event listener directamente al nuevo elemento de entrada
    nuevoInput.addEventListener("change", () => {
        const nombre = nuevoDiv.querySelector(`#nombre`).value; 
        //const coste = nuevoDiv.querySelector(`#coste`).value;
        insertVentajas(idPersonaje,nombre);
        
    });


    // Obtener el botón de eliminar asociado al nuevo elemento de inventario
    let btnEliminar = nuevoDiv.querySelector(".eliminar-item-ventajas");

    // Agregar el evento 'click' al botón de eliminar
    btnEliminar.addEventListener("click", () => {
        contenedorVentajas.removeChild(nuevoDiv); // Eliminar el div del inventario del DOM
        eliminarVentajasNombre(idPersonaje, nuevoInput.value); // Llamar a la función para eliminar el item del servidor
    });

});


async function insertVentajas(idPersonaje,nombre){
    try{
        
        console.log("Insertando idPersonaje nueva ventaja:", idPersonaje);
        console.log("Insertando nombre nueva ventaja:", nombre);
        //console.log("Insertando coste nueva ventaja:", coste);
       


       
        
        const response = await fetch(`/insertarNuevaVentaja/${idPersonaje}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre})
    
        });
        if (!response.ok) {
            throw new Error('Error al insertar el nuevo item en la base de datos');
        }
        const data = await response.json();
        console.log('Nuevo item insertado:', data);
     

    }catch(error){
        console.error('Error al insertar nuevo item en la base de datos:', error);
    }
}


async function eliminarVentajas(idPersonaje, idVentaja) {
    try {
        console.log("Eliminando idVentaja:", idVentaja);
        console.log("ID del personaje:", idPersonaje);

        // Realizar la solicitud para eliminar el item del servidor
        const response = await fetch(`/eliminarVentaja/${idPersonaje}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idVentaja: idVentaja })
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el ventaja de la base de datos');
        }

        const data = await response.json();
        console.log('Ventaja eliminada:', data);
    } catch (error) {
        console.error('Error al eliminar ventaja de la base de datos:', error);
    }
}


async function eliminarVentajasNombre(idPersonaje, nombre) {
    try {
        console.log("Eliminando nombre:", nombre);
        console.log("ID del personaje:", idPersonaje);

        // Realizar la solicitud para eliminar el item del servidor
        const response = await fetch(`/eliminarVentajaNombre/${idPersonaje}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre })
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el ventaja de la base de datos');
        }

        const data = await response.json();
        console.log('Ventaja eliminada:', data);
    } catch (error) {
        console.error('Error al eliminar ventaja de la base de datos:', error);
    }
}

async function updateVentaja(idPersonaje, idVentaja, nombre) {
    try {
        console.log("SE DISPARO UPDATE VENTAJA")
        const response = await fetch(`/updateVentaja/${idPersonaje}/${idVentaja}/${nombre}`, {
            method: 'PUT', // Método HTTP PUT para actualizar
            headers: {
                'Content-Type': 'application/json'
            },
            // Puedes enviar cualquier información adicional en el cuerpo de la solicitud si es necesario
            // body: JSON.stringify({ key: value })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar ventaja en la base de datos');
        }

        const data = await response.json();
        console.log('Ventaja actualizado:', data);
    } catch (error) {
        console.error('Error al actualizar el ventaja en la base de datos:', error);
    }
}



  
       
    }
  
    modificarFicha(){
        let nombre=document.getElementById("nombreInput")
        let raza=document.getElementById("razaInput");
        let dominio=document.getElementById("dominioInput");
        let naturaleza=document.getElementById("naturalezaInput");
        let ki=document.getElementById("kiInput"); 
        let ken=document.getElementById("kenInput");
        let fuerza=document.getElementById("fuerzaInput");
        let fortaleza=document.getElementById("fortalezaInput");
        let imagen=document.getElementById("imagenInput");
        let destreza=document.getElementById("destrezaInput");
        let agilidad=document.getElementById("agilidadInput");
        let sabiduria=document.getElementById("sabiduriaInput");
        let sentidos=document.getElementById("sentidosInput");
        let principio=document.getElementById("principioInput");
        let presencia=document.getElementById("presenciaInput");
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
        let nombreArma=document.getElementById("nombreArmaInput");
        
        this.nombre=nombre.value;
        this.raza=raza.value;
        this.dominio=dominio.value;
        this.naturaleza=naturaleza.value;
        this.ki=parseInt(ki.value);
        this.ken=parseInt(ken.value);
        this.fuerza=parseInt(fuerza.value);
        this.fortaleza=parseInt(fortaleza.value);
        this.imagen=imagen.value;
        this.destreza=parseInt(destreza.value);
        this.agilidad=parseInt(agilidad.value);
        this.sabiduria=parseInt(sabiduria.value);
        this.sentidos=parseInt(sentidos.value);
        this.principio=parseInt(principio.value);
        this.presencia=parseInt(presencia.value);
        this.academisismo=parseInt(academisismo.value);
        this.artesMarciales=parseInt(artesMarciales.value);
        this.atletismo=parseInt(atletismo.value);  
        this.conBakemono=parseInt(conBakemono.value);
        this.conDemonio=parseInt(conDemonio.value);
        this.conEsferas=parseInt(conEsferas.value);
        this.conEspiritual=parseInt(conEspiritual.value);
        this.forja=parseInt(forja.value);
        this.medicina=parseInt(medicina.value);
        this.montar=parseInt(montar.value);
        this.sigilo= parseInt(sigilo.value);
        this.pilotear=parseInt(pilotear.value);
        this.manejoArma=parseInt(manejoArma.value);
        this.conObjMagicos=parseInt(conObjMagicos.value);
        this.conLeyendas=parseInt(conLeyendas.value);
        this.resCorte=parseInt(resCorte.value);
        this.resEnergia=parseInt(resEnergia.value);
        this.resRayo=parseInt(resRayo.value);
        this.resFuego=parseInt(resFuego.value);
        this.resFrio=parseInt(resFrio.value);
        this.resVeneno=parseInt(resVeneno.value);
        this.manejoSombras=parseInt(manejoSombras.value);
        this.tratoBakemono= parseInt(tratoBakemono.value);
        this.conHechiceria=parseInt(conHechiceria.value);
        this.meditacionEspiritual=parseInt(meditacionEspiritual.value); 
        this.meditacionVital=parseInt(meditacionVital.value);
        this.nombreArma=nombreArma.value;
        this.faseSalud=this.fortaleza+this.ki;
        this.vidaTotal=this.faseSalud*3;
        this.kiActual=this.kiActual;
        this.kenActual=this.ken;

        localStorage.setItem("coleccionPj",JSON.stringify(coleccionPj)); 
    }

    calcularTotalTronco(){
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

    calcularTotalHabilidades(){

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
       
        let caracteristicas25=[];
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
        caracteristicas25[17]=parseInt(resFrio.value)|| 0;
        caracteristicas25[18]=parseInt(resFuego.value)|| 0;
        caracteristicas25[19]=parseInt(resRayo.value)|| 0;
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

    actualizarPj(){
        let idusuario=localStorage.getItem(`idusuario`);
        socket.emit('actualizarPj',this,idusuario);
        console.log("emitio cambio en el personaje desde el cliente")
    }
}