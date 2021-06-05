//Buscar como funciona el metodo "find" y "filter"
const User = [{

    "nUser": "Gabriel",
    "pass": "123",
    "estado": false

},
{

    "nUser": "Vanessa",
    "pass": "123",
    "estado": false

},
{

    "nUser": "Jimmy",
    "pass": "123",
    "estado": false

}]

const listado = $("#listado")
const btnSide1 = $("#btnSide1")
const btnPedido = $("#btnPedido")
const btnList = $("#btnList")
const btnSide2 = $("#btnSide2")
const btnSide3 = $("#btnSide3")
const frmIngreso = $("#frmIngreso")
const sideTextA = $("#sideTextA")
const sideTextB = $("#sideTextB")
const frmCrearUser = $("#frmCrearUser")
const btnEnviar = $("#btnEnviar")
const btnEnviarN = $("#btnEnviarN")
const btnEnviarP = $("#btnEnviarP")
const menuPedidos = $("#menuPedidos")
const ingresoDatos = $("#ingresoDatos")
const sidebar = $("#sidebar")
const btnSideHide = $("#btnSideHide")
const campoBuscador = $("#campoBuscador")
const apiBut = $("#apiBut")

const userSelector = $("#userSelector")


apiBut.on('click', usarLaApi);
btnPedido.on('click', hacerPedido);
btnList.on('click', verTusCompras);
btnSide1.on('click', menuIngresar);
btnSide2.on('click', menuCrear);
btnSide3.on('click', cerrarSesion);
btnEnviar.on('click', logUser);
btnEnviarN.on('click', createUser);
btnEnviarP.on('click', mostrarOpciones);

mensajero();
sesionActual();
verTusCompras();

let arrayComprador = []
let userOnline;

function sesionActual() {
    let aux4 = sessionStorage.getItem("actualSesion")
    aux4 = JSON.parse(aux4)
    if (aux4 != null) {
        if (aux4.estado == true) {

            btnSideHide.fadeIn()
            btnSide1.hide()
            btnSide2.hide()
            listado.show()
            apiBut.show()
            sideTextA.text("Bienvenido " + aux4.nUser)
        }
    }
}

function mostrarOpciones() {
    ingresoDatos.slideDown()
}

function hacerPedido() {
    
    $("#menuPedidos").submit(function (e) {
        e.preventDefault();
    if(null != sessionStorage.getItem("actualSesion")){
        let nVendor = $("#nVendor").text()
    var aux = 0;
    var res = 0;
    let aux5 = sessionStorage.getItem("actualSesion")
    aux5 = JSON.parse(aux5)
    
    var capNombre = aux5.nUser

    var capTipoC = $("#descriptionA").val()

    var capTam = $("#tamA").val();
    aux = presupuesto(capTam, aux);
    

    if (aux != false) {
        
        res = aux;

        var capBg = $("#backg").val()
        aux = presupuesto(capBg, res)
        if (aux != false) {
            
            res = aux * 1.21;

            Swal.fire({
                title: nVendor + ' recibira un Pedido de $' + aux,
                text: "Descrito como: "+ capTipoC,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Solicitar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {

                    let nuevoComprador = new aCompra(capNombre, capTipoC, capTam, capBg, res, nVendor)

                    arrayComprador.push(nuevoComprador)

                    let a = localStorage.getItem("comprasJornada")
                    a = JSON.parse(a)

                    let b = []



                    for (i in a) {
                        b.push(a[i]);

                    }
                    b.push(nuevoComprador)
                    localStorage.setItem("comprasJornada", JSON.stringify(b))

                    let c = localStorage.getItem(capNombre)
                    c = JSON.parse(c)

                    let d = []
                    for (i in c) {
                        d.push(c[i])
                    }
                    d.push(nuevoComprador)
                    localStorage.setItem(capNombre, JSON.stringify(d))

                    
                    //ingresoDatos.slideUp()
                    sideTextB.text("Pedido enviado")

                        Swal.fire(
                            'Excelente!',
                            nVendor + ' se contactara contigo',
                            'success'
                        )

                        }
                    })
                        } else {
                        sideTextB.text('Datos invalido')
                        }
                    } else {
                        sideTextB.text('Datos invalido')

                    }
                        $(":input").val("")

////
}

else{Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Ingresa o Crea un usuario para participar'
  })}

}

)

}

function presupuesto(a, b) {
    switch (a) {
        case "1":
            return b += 50;
        case "2":
            return b += 100;
        case "3":
            return b += 150;
        default:
            return false;
    }
}

/*Esta funcion seria para ver todas las compraras realizadas en general pero no esta implementada

function verCompras(){

        document.getElementById("listado").innerHTML = " "

    for(let i = 0; i<arrayComprador.length ; i++){
        
        console.log(arrayComprador[i]);
        document.getElementById("listado").innerHTML += "<li>" + arrayComprador[i].nombre + " realizo una compra de: $" +arrayComprador[i].pres + "</li>";

    }


}*/

function verTusCompras() {

    if(null != sessionStorage.getItem("actualSesion")){
    let aux6 = sessionStorage.getItem("actualSesion")
    aux6 = JSON.parse(aux6)

    let tuName = aux6.nUser
    let aux7 = localStorage.getItem(tuName)
    aux7 = JSON.parse(aux7)
    let listado = $("#listado")
    let tuPedido = $("#tuPedido")
    listado.text(" ")
    if (aux7 == null) {
        listado.append('<p> No hay pedidos, ' + tuName + ', ¿qué esperas? </p>')
    }
    for (i in aux7) {
        listado.append("<li>" + "Se realizo un pedido al usuario: "+ aux7[i].vendor + ". Un presupuesto de: $" + aux7[i].pres + "</li>");

    }
}

}


//cambia el texto por debajo del titulo de la pagina

function mensajero() {

    let msj = "pasa llevate arte"

    let rando = Math.round(Math.random() * 5);

    switch (rando) {

        case 1:
            msj = "Como un delivery, pero de arte";
            break;
        case 2:
            msj = "Elon Musk nos compraria, pensalo";
            break;
        case 3:
            msj = "ARTE, ARTE, ARTE";
            break;
        case 4:
            msj = "Nos gusta el aRRRRRRte";
            break;
        case 5:
            msj = "Pasa y llevate arte"
            break;
        default:
            msj = "mensaje default n°42069 - nice"
            break;

    }

    document.getElementById("mensaje").innerHTML = msj

}

//Abre el menu para ingresar

function menuIngresar() {
    cargarUsers();
    frmCrearUser.hide()
    frmIngreso.slideDown()
    sideTextA.text(" ")
}


//Funcion que hace aparecer el menu para crear usuarios

function menuCrear() {
    cargarUsers();

    frmIngreso.hide()
    frmCrearUser.slideDown()

    sideTextA.text(" ")

}

//Funcion para crear usuarios

function createUser() {
    $("#frmCrearUser").submit(function (e) {

        e.preventDefault();
        let usuariosExistentes = localStorage.getItem("User")
        usuariosExistentes = JSON.parse(usuariosExistentes)

        var name = document.getElementById("nombreN").value
        var passA = document.getElementById("passwordN").value
        var passB = document.getElementById("passwordC").value



        if (passA == passB) {

            var nuevoUser = new user(name, passA, false);
            usuariosExistentes[0].push(nuevoUser)
            usuariosExistentes = JSON.stringify(usuariosExistentes)
            $("#frmCrearUser").hide()
            localStorage.setItem("User", usuariosExistentes)
            sideTextA.text("Usuario creado")

        } else {

            document.getElementById("sideTextA").innerHTML = "Contraseña No coincide"

        }


    })
}


//Funcion para Loguearse

function logUser() {
    $("#frmIngreso").submit(function (e) {

    e.preventDefault();

    let theValue = localStorage.getItem("User");

    theValue = JSON.parse(theValue);

    let name = document.getElementById("nombre").value;
    let passIn = document.getElementById("password").value;


    for (let i = 0; i < theValue[0].length; i++) {

        let aux = theValue[0][i].nUser
        let aux2 = theValue[0][i].pass

        if (aux == name) {
            if (passIn == aux2) {
                userOnline = new user(aux, aux2, true)
                sessionStorage.setItem("actualSesion", JSON.stringify(userOnline))
                location.reload()
            }
        }document.getElementById("sideTextA").innerHTML = "Datos Incorrectos"
    }

})
}

function cerrarSesion() {
    sessionStorage.clear("actualSesion")
    menuPedidos.hide()
    btnSideHide.hide()
    btnSide1.show()
    btnSide2.show()
    sideTextA.text("Hasta Luego")
}

function cargarUsers() {

    if (localStorage.getItem("User") == null) {
        let c = []

        let d = JSON.stringify(User)

        d = JSON.parse(d)

        c.push(d)

        c = JSON.stringify(c)

        localStorage.setItem("User", c)
    }

}

function usarLaApi() {


    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'Testeo de Api',
    body: sessionStorage.getItem("actualSesion"),
    userId: 09011403,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
    .then((json) => {let objectApi = json

        objectApi = objectApi.body

        objectApi = JSON.parse(objectApi)

        console.log(objectApi.nUser)

        sideTextA.text("Hola " + objectApi.nUser + ", te estoy nombrando desde la API")
    
    })
  

}