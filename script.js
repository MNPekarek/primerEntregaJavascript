
let canciones = [
    { nombre: "Cicatrices", cantante: "Airbag" },
    { nombre: "Goteo", cantante: "Duki" },
    { nombre: "Numb", cantante: "Linkin Park" },
    { nombre: "Perfect", cantante: "Ed Sheeran" },
    { nombre: "Piel", cantante: "Thiago" },
    { nombre: "Por mil noches", cantante: "Airbag" }];


// function simulador() {

// let opcion;

//     do {
//         opcion = prompt ("Ingrese una opción:\n 1: Mostrar canciones  \n 2: Agregar una cancion nueva \n 3: Buscar una canción \n 4: Cerrar");

//         if (opcion === "1") {     
//             for(let objeto of canciones) {
//                 alert(`Canción: ${objeto.nombre}    Cantante: ${objeto.cantante}`)                  
//             }
// } else if (opcion === "2"){            
//     let cancionNueva = prompt("Ingrese el nombre de la cancion")
//     let artistaNuevo = prompt("Ingrese el nombre del autor")

//     if (cancionNueva !== null && artistaNuevo !== null) {
//         canciones.push({nombre: cancionNueva, cantante: artistaNuevo})  
//         alert("Canción agregada con exito")    
//     } else {
//         alert("Los datos ingresados no son válidos")
//     }
// } else if (opcion === "3"){
//     let buscarCancion = prompt("Ingrese el nombre de la cancion que desea buscar").toUpperCase()

//     let cancionEncontrada = canciones.find((cancion) => cancion.nombre.toUpperCase() === buscarCancion);
//     if (cancionEncontrada) {
//         alert (`La busqueda se realizo con exito \n Nombre: ${cancionEncontrada.nombre}\nCantante: ${cancionEncontrada.cantante}`);
//     }         


//         } else if (opcion === "4"){
//             confirm("¿Estas seguro que quieres cerrar el simulador?")
//             alert("Simulador cerrado")        
//         } else {
//             alert("Opción inválida. Intente nuevamente")
//         }
//     }while (opcion !== "4");
// }

// simulador()


const tablaInfo = document.getElementById("tablaInfo")
const tabla = document.getElementById("tabla")

canciones.forEach(musica => {
    const fila = document.createElement("tr")
    fila.innerHTML =
        `<td>${musica.nombre}
        <td>${musica.cantante}`
    tablaInfo.appendChild(fila)
})


let btn1 = document.getElementById("button1")

btn1.addEventListener("click", () => {
    if (tabla.style.display === "none") {
        tabla.style.display = "table"
        boton.textContent = "Ocultar Tabla"
    } else {
        tabla.style.display = "none"
        boton.textContent = "Mostrar Tabla"
    }

})


let btn2 = document.getElementById("button2")
let form =document.getElementById("form")


btn2.addEventListener("click", () => {
    let inputName = document.getElementById("inputName")
    let inputCantante = document.getElementById("inputCantante")

    if (inputName.value.trim() !== "" && inputCantante.value.trim() !== "") {
        canciones.push({ nombre: inputName.value, cantante: inputCantante.value })

        const mensajeExitoso = document.createElement("p")
        mensajeExitoso.innerHTML = "Canción agregada con exito"
        mensajeExitoso.classList.add("enviado")
        form.appendChild(mensajeExitoso)
        

        tablaInfo.innerHTML = ""

        canciones.forEach(musica => {
            const fila = document.createElement("tr")
            fila.innerHTML =
                `<td>${musica.nombre}
                <td>${musica.cantante}`
            tablaInfo.appendChild(fila)
        })
    } else {
        alert("Los datos ingresados no son válidos")
    }
})



btn3 = document.getElementById("button3")

btn3.addEventListener("click", () => {
    let buscarCancion = prompt("Ingrese el nombre de la cancion que desea buscar").toUpperCase()

    let cancionEncontrada = canciones.find((cancion) => cancion.nombre.toUpperCase() === buscarCancion);
    if (cancionEncontrada) {
        alert(`La busqueda se realizo con exito \n Nombre: ${cancionEncontrada.nombre}\nCantante: ${cancionEncontrada.cantante}`);
    }
})




    