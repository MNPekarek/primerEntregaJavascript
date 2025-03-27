const tablaInfo = document.getElementById("tablaInfo")
const tabla = document.getElementById("tabla")

const canciones = []

const URL_JSON = "./data/canciones.json"

async function obtenerCanciones() {
  try {
    const respuesta = await fetch(URL_JSON);
    if (!respuesta.ok) {
      throw new Error(`Error al obtener JSON: ${respuesta.status}`)
    }
    const cancionesBD = await respuesta.json()

    canciones.push(...cancionesBD)

    actualizarCanciones()
  } catch (error) {
    console.log("Hubo un error al cargar las canciones:", error)
  }
}
obtenerCanciones()

const favoritas = []

// guardar en local storage
function guardarLocal() {
  localStorage.setItem("cancionesFav", JSON.stringify(favoritas));
}

// recuperar favortias del local storage al iniciar la aplicacion
function recuperarFav() {
  document.addEventListener("DOMContentLoaded", () => {
    const favoritasGuardadas =
      JSON.parse(localStorage.getItem("cancionesFav")) || []

    favoritas.push(...favoritasGuardadas)

    actualizarFav()
  });
}

recuperarFav()

function actualizarCanciones() {
  tablaInfo.innerHTML = ""
  canciones.forEach((musica) => {
    const fila = document.createElement("tr")
    fila.innerHTML = `<td><img src="${musica.imagen}" class="logoCn" alt="${musica.nombre}" width="50" height="50" /></td>
            <td>${musica.nombre}</td>
            <td>${musica.cantante}</td>
            <td>
                 <button class="btnFavo" data-nombre="${musica.nombre}" data-cantante="${musica.cantante}">❤️</button>
            </td>
            `
    tablaInfo.appendChild(fila)
  })
  pruebaBtnFav()
  
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

// agregar button Agregar

let btnAgregar = document.getElementById("buttonAgregar")
btnAgregar.addEventListener("click", () => {
  const form = document.getElementById("form")
  if (form) {
    form.remove()
  } else {
    agregarCancionInner()
    agregarCancionesNuevas()
  }
})

function agregarCancionInner() {
  let AgregarCancion = document.getElementById("formAgregar")
  const form = document.createElement("div")
  form.id = "form"
  form.innerHTML = `
            <label for="name">Introducir nombre de la canción</label>
            <input type="text" id="inputName"><br>
            <label for="cantante">Introducir nombre del cantante</label>
            <input type="text" id="inputCantante">
            <button id="button2" class="button">Agregar cancion</button>
        </div>`
  AgregarCancion.appendChild(form)
}

// agregar canciones btn2
function agregarCancionesNuevas() {
  let btn2 = document.getElementById("button2")

  btn2.addEventListener("click", () => {
    let inputName = document.getElementById("inputName")
    let inputCantante = document.getElementById("inputCantante")

    if (inputName.value.trim() !== "" && inputCantante.value.trim() !== "") {
      canciones.push({
        nombre: inputName.value,
        cantante: inputCantante.value,
        imagen: "./img/imgDefault.webp"
      });

      Toastify({
        text: `La canción ${inputName.value} fue agregada con exito`,
        style: {
          background: "green",
        },
      }).showToast()

      actualizarCanciones()
    } else {
      Toastify({
        text: `Los datos ingresados no son válidos`,
        style: {
          background: "red",
        },
      }).showToast()
    }
  })
}

// btn3
btn3 = document.getElementById("button3")

btn3.addEventListener("click", () => {
  const contenedorExistente = document.getElementById("buscarCn")
  if (contenedorExistente) {
    contenedorExistente.remove()
    return
  }

  let buscar = document.getElementById("buscar")
  const buscarCn = document.createElement("div")
  buscarCn.id = "buscarCn"
  buscarCn.innerHTML = `
    <label for="buscarNombre">Ingrese el nombre de la canción</label>
    <input type="text" id="buscarNombre"> 
    <label for="cantante">Ingrese el nombre del cantante</label>
    <input type="text" id="cantante"> 
    <button id="buscarBtn">Buscar</button>
  `
  buscar.appendChild(buscarCn)

  document.getElementById("buscarBtn").addEventListener("click", () => {
    const nombreCancion = document
      .getElementById("buscarNombre")
      .value.toUpperCase()
    const nombreCantante = document
      .getElementById("cantante")
      .value.toUpperCase()

    let cancionEncontrada = canciones.find(
      (cancion) =>
        cancion.nombre.toUpperCase() === nombreCancion ||
        cancion.cantante.toUpperCase() === nombreCantante
    )

    if (cancionEncontrada) {
      Swal.fire({
        title: `<strong>${cancionEncontrada.nombre}</strong>`,
        icon: "info",
        html: `
          <p> Nombre de la canción: <b>${cancionEncontrada.nombre}</b></p>
          <p> Cantante: <b>${cancionEncontrada.cantante}</b></p>
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "OK",
        customClass: {
          popup: "popup",
          title: "title-class",
          confirmButton: "button-class",
          closeButton: "close-button-class",
        },
      })
      return
    }

    Swal.fire({
      title: "No se encontró ninguna canción",
      icon: "error",
      text: "Por favor, verifica los datos ingresados.",
      confirmButtonText: "Reintentar",
      customClass: {
        popup: "popup-error",
        title: "title-class-error",
        confirmButton: "button-class-error",
      },
    })
  })
})

function pruebaBtnFav() {
  const btnFav = document.querySelectorAll(".btnFavo")

  btnFav.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre")
      const cantante = btn.getAttribute("data-cantante")

      console.log("el cantante es: ",cantante)

      const existe = favoritas.some(
        (fav) => fav.nombre === nombre && fav.cantante === cantante
      )
      if (!existe) {
        favoritas.push({ nombre, cantante })

        Toastify({
          text: `La canción ${nombre} fue agregada con exito`,
          style: {
            background: "#333333",
            background: "linear-gradient(to right, #333333, #dd1818)",
          },
        }).showToast()
      } else {
        console.log("La cancion ya esta en favoritas")
      }

      console.log("Lista de favoritas:", favoritas);

      actualizarFav()
      guardarLocal()
    })
  })
}

btnAgregarFavoritos = document.getElementById("buttonListafavoritas")
btnAgregarFavoritos.addEventListener("click", () => {
  const listaFavoritas = document.getElementById("listaFavoritas")
  if (
    listaFavoritas.style.display === "none" ||
    !listaFavoritas.style.display
  ) {
    listaFavoritas.style.display = "block"
    actualizarFav()
  } else {
    listaFavoritas.style.display = "none"
  }
})

function actualizarFav() {
  const listaFavoritas = document.getElementById("listaFavoritas")
  listaFavoritas.innerHTML = ""

  const tabla = document.createElement("table")
  tabla.classList.add("table", "table-hover")

  const thead = document.createElement("thead")
  thead.innerHTML = `
          <tr>
            <th>Nombre de la canción</th>
            <th>Cantante</th>
            <th>Favoritas</th>
          </tr>`;
  tabla.appendChild(thead)

  const tbody = document.createElement("tbody")
  favoritas.forEach((cn) => {
    const fila = document.createElement("tr")
    fila.innerHTML = `
            <td>${cn.nombre}</td>
            <td>${cn.cantante}</td>
            <td>
              <button class="buttonCancel" data-nombre2="${cn.nombre}" data-cantante2="${cn.cantante}" >❌</button>
            </td>`
    tbody.appendChild(fila)
  })
  tabla.appendChild(tbody)
  listaFavoritas.appendChild(tabla)
  eliminarFav()

}



function eliminarFav() {
  const btnCancel = document.querySelectorAll(".buttonCancel")

  btnCancel.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre2")
      const cantante = btn.getAttribute("data-cantante2")

      const indice = favoritas.findIndex(
        (fav) =>
          fav.nombre.toLowerCase().trim() === nombre.toLowerCase().trim() &&
          fav.cantante.toLowerCase() === cantante.toLowerCase()
      )

      if (indice !== -1) {
        favoritas.splice(indice, 1)
        console.log("Se eliminó:", nombre)
        actualizarFav()
        guardarLocal()
      } else {
        console.log("No se encuentra la canción")
      }
    })
  })
}


  