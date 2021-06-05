
const btnBuscador = $("#btnBuscador")
//const catDibujoTradicional = $("#catDibujoTradicional")
btnBuscador.on('click', buscarDesdeCampo);
//catDibujoTradicional.on('click', buscar)


function buscarDesdeCat(categoria){

    let aux = categoria;

    buscar(aux);

}

function buscarDesdeCampo(){

    let aux2 = campoBuscador.val()

    buscar(aux2);

}



function buscar(a) {
  
    const xHttp = new XMLHttpRequest();

    xHttp.open('GET', 'json.json', true);

    xHttp.send();

    xHttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            //console.log(this.responseText)

            let datos = JSON.parse(this.responseText)

            //console.log(datos)

            let parametro = a

           
            if (parametro.trim() > "" && parametro.trim() != undefined) {
                const resultado = datos.filter(p => p.default.includes(parametro) || p.usuario.includes(parametro) ||  p.especialidad.includes(parametro) ||  p.portfolio.includes(parametro) || p.categoria.includes(parametro))
               
                if (resultado.length == 0) {
                    $("#userSelector").html(" ")
                    $("#userSelector").html(contenidoError)
                } else {
                        $("#userSelector").html(" ")
                    for(let comm of resultado){
                        $("#userSelector").append(cargoCard(comm))
                        
                    }
                
                }
                }

        }

    }
    const contenidoError = `<div class="">
    <h4>Ups... No se encontraron resultados</h4>
    <h5>¯\_(ツ)_/¯</h5>
    </div>`
    
    const cargoCard = (comm) => {
       
        HTMLcard = ` <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                            <div class="m-3">
                                <div class="card border">
                                <img class="card-img-top" id="card-img-sm" src="${comm.img}">
                                
                                <p class="card-title">"${comm.usuario}"</p>
                                <p class="card-text">"${comm.especialidad}"</p>
                                <p class="card-text">Reputacion: "${comm.reputacion}" <i class="fas fa-star"></i></p>
                                <a href="#up"<button class="card-btn btn btn-primary" id="id${comm.id}" onClick="ver${comm.id}()";>Ver Usuario</button></a>
                                
                                </div>
                                </div>
                                <script>
                               

                               function ver${comm.id}(){
                                $("#imgPrincipal").fadeOut()
                                menuPedidos.fadeIn()
                                $("#nameUserCreador").text("${comm.usuario}")
                                $("#descriptionUsuario").text("${comm.portfolio}")
                                $("#imgCard").empty()
                                $("#imgCard").append('<img src="${comm.img}" id="card-img" alt="arte de ${comm.usuario}">')
                                $("#nVendor").text("${comm.usuario}")
                                $("#tiers1").text("${comm.atiers}")
                                $("#tiers2").text("${comm.btiers}")
                               }
                               
                               </script>
                                
                               
                        </div>`
        return HTMLcard
    
    }

 

    }
