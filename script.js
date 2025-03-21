

// array canciones
// let canciones = [
//     { nombre: "Cicatrices", cantante: "Airbag" },
//     { nombre: "Goteo", cantante: "Duki" },
//     { nombre: "Numb", cantante: "Linkin Park" },
//     { nombre: "Perfect", cantante: "Ed Sheeran" },
//     { nombre: "Piel", cantante: "Thiago" },
//     { nombre: "Por mil noches", cantante: "Airbag" }];


const tablaInfo = document.getElementById("tablaInfo")
const tabla = document.getElementById("tabla")

const canciones = []

const URL_JSON = './data/canciones.json'

async function obtenerCanciones() {
    try {
        const respuesta = await fetch(URL_JSON)
        if (!respuesta.ok) {
            throw new Error(`Error al obtener JSON: ${respuesta.status}`);            
        }
        const cancionesBD = await respuesta.json()

        console.log("Canciones cargadas: ",cancionesBD)


        canciones.push(...cancionesBD)              


    }catch (error) {
        console.log("Hubo un error al cargar las canciones:", error)
    }
    
}

obtenerCanciones()


const favoritas = []

console.log(canciones)

// guardar en local storage 
function guardarLocal() {
    localStorage.setItem('cancionesFav', JSON.stringify(favoritas));    
}

// recuperar favortias del local storage al iniciar la aplicacion
function recuperarFav() {

    document.addEventListener("DOMContentLoaded", () => {
        const favoritasGuardadas = JSON.parse(localStorage.getItem('cancionesFav')) || []
    
        favoritas.push(...favoritasGuardadas)
    
        console.log("favoritas cargadas al inciar la app:", favoritas)    

        actualizarFav()
    })    
}

recuperarFav()



// console.log(favoritasGuardadas)


function actualizarCanciones() {
    tablaInfo.innerHTML = ""
    canciones.forEach(musica => {
        const fila = document.createElement("tr")
        fila.innerHTML =
            `<td>${musica.nombre}</td>
            <td>${musica.cantante}</td>
            <td>
                 <button class="btnFavo" data-nombre="${musica.nombre}" data-cantante="${musica.cantante}">❤️</button>
            </td>
            `
        tablaInfo.appendChild(fila)
    })
} 



// btn1
let btn1 = document.getElementById("button1")
actualizarCanciones()
btn1.addEventListener("click", () => {
    if (tabla.style.display === "none") {
        tabla.style.display = "table"
        btn1.textContent = "Ocultar Tabla"
    } else {
        tabla.style.display = "none"
        btn1.textContent = "Mostrar Tabla"
    }

})


let btn2 = document.getElementById("button2")
let form = document.getElementById("form")


// agregar canciones btn2
btn2.addEventListener("click", () => {
    let inputName = document.getElementById("inputName")
    let inputCantante = document.getElementById("inputCantante")

    if (inputName.value.trim() !== "" && inputCantante.value.trim() !== "") {
        canciones.push({ nombre: inputName.value, cantante: inputCantante.value })

        const mensajeExitoso = document.createElement("p")
        mensajeExitoso.innerHTML = "Canción agregada con exito"
        mensajeExitoso.classList.add("enviado")
        form.appendChild(mensajeExitoso)

        actualizarCanciones()
    } else {
        alert("Los datos ingresados no son válidos")
    }
})


// btn3
btn3 = document.getElementById("button3")

btn3.addEventListener("click", () => {
    let buscarCancion = prompt("Ingrese el nombre de la cancion que desea buscar").toUpperCase()

    let cancionEncontrada = canciones.find((cancion) => cancion.nombre.toUpperCase() === buscarCancion);
    if (cancionEncontrada) {
        alert(`La busqueda se realizo con exito \n Nombre: ${cancionEncontrada.nombre}\nCantante: ${cancionEncontrada.cantante}`);
    }
})



function pruebaBtnFav() {
    const btnFav = document.querySelectorAll(".btnFavo")

   btnFav.forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.getAttribute("data-nombre")
        const cantante = btn.getAttribute("data-cantante")
        
        const existe = favoritas.some(fav => fav.nombre === nombre && fav.cantante === cantante)
        if (!existe) {
            favoritas.push({ nombre, cantante })

            console.log("Cancion agregada a favoritas:", { nombre, cantante })
        }else {
            console.log("La cancion ya esta en favoritas")
        }

        console.log("Lista de favoritas:", favoritas)

        actualizarFav()
        guardarLocal()

    })
   })
}

pruebaBtnFav()



function actualizarFav() {
    const listaFavoritas = document.getElementById("listaFavoritas")
    listaFavoritas.innerHTML = ""

    favoritas.forEach(cn => {
        let li = document.createElement("li")
        li.textContent = `${cn.nombre} - ${cn.cantante}`
        listaFavoritas.appendChild(li)
    })
}





