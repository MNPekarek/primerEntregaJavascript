const tablaInfo = document.getElementById("tablaInfo");
const tabla = document.getElementById("tabla");

const canciones = [];

const URL_JSON = "./data/canciones.json";

async function obtenerCanciones() {
  try {
    const respuesta = await fetch(URL_JSON);
    if (!respuesta.ok) {
      throw new Error(`Error al obtener JSON: ${respuesta.status}`);
    }
    const cancionesBD = await respuesta.json();

    console.log("Canciones cargadas: ", cancionesBD);

    canciones.push(...cancionesBD);

    console.log("mis canciones:", canciones);

    actualizarCanciones();
  } catch (error) {
    console.log("Hubo un error al cargar las canciones:", error);
  }
}
obtenerCanciones();

const favoritas = [];

// guardar en local storage
function guardarLocal() {
  localStorage.setItem("cancionesFav", JSON.stringify(favoritas));
}

// recuperar favortias del local storage al iniciar la aplicacion
function recuperarFav() {
  document.addEventListener("DOMContentLoaded", () => {
    const favoritasGuardadas =
      JSON.parse(localStorage.getItem("cancionesFav")) || [];

    favoritas.push(...favoritasGuardadas);

    console.log("favoritas cargadas al inciar la app:", favoritas);

    actualizarFav();
  });
}

recuperarFav();

function actualizarCanciones() {
  tablaInfo.innerHTML = "";
  canciones.forEach((musica) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${musica.imagen}" class="logoCn" alt="${musica.nombre}" width="50" height="50" /></td>
            <td>${musica.nombre}</td>
            <td>${musica.cantante}</td>
            <td>
                 <button class="btnFavo" data-nombre="${musica.nombre}" data-cantante="${musica.cantante}">❤️</button>
            </td>
            `;
    tablaInfo.appendChild(fila);
  });
  pruebaBtnFav();
}

// btn1
let btn1 = document.getElementById("button1");
actualizarCanciones();
btn1.addEventListener("click", () => {
  if (tabla.style.display === "none") {
    tabla.style.display = "table";
    btn1.textContent = "Ocultar Tabla";
  } else {
    tabla.style.display = "none";
    btn1.textContent = "Mostrar Tabla";
  }
});

let btn2 = document.getElementById("button2");
let form = document.getElementById("form");

// agregar canciones btn2
btn2.addEventListener("click", () => {
  let inputName = document.getElementById("inputName");
  let inputCantante = document.getElementById("inputCantante");

  if (inputName.value.trim() !== "" && inputCantante.value.trim() !== "") {
    canciones.push({ nombre: inputName.value, cantante: inputCantante.value });

    Toastify({
      text: `La canción ${inputName.value} fue agregada con exito`,
      style: {
        background: "green",},
    }).showToast();

    actualizarCanciones();
  } else {
    Toastify({
      text: `Los datos ingresados no son válidos`,
      style: {
        background: "red",},
    }).showToast();
  }
});

// btn3
btn3 = document.getElementById("button3");

btn3.addEventListener("click", () => {
  let buscar = document.getElementById("buscar")

const buscarCn = document.createElement("div")
buscarCn.innerHTML = 
   `<label for="buscarNombre">Ingrese el nombre de la canción</label>
    <input type="text" id="buscarNombre">
    <label for="cantante" id="buscarCantante">Ingrese el nombre del cantante</label>
    <input type="text" id="cantante">
    <button id="buscarBtn">Buscar</button>`
    
    buscar.appendChild(buscarCn)  


  document.getElementById("buscarBtn").addEventListener("click", () => {
    const nombreCancion = document.getElementById("buscarNombre").value.toUpperCase()
    const nombreCantante = document.getElementById("cantante").value.toUpperCase()   

    let cancionEncontrada = canciones.find(
      (cancion) => 
        cancion.nombre.toUpperCase() === nombreCancion || 
        cancion.cantante.toUpperCase() === nombreCantante
    );
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
          poput: "poput-class",
          title: "title-cass",
          confirmButton: "button-class",
        }
      });
    } Swal.fire({
      title: "No se encontró ninguna canción",
      icon: "error",
      text: "Por favor, verifica los datos ingresados.",
      confirmButtonText: "Reintentar",
    });
  
  })

  
});

function pruebaBtnFav() {
  const btnFav = document.querySelectorAll(".btnFavo");

  btnFav.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nombre = btn.getAttribute("data-nombre");
      const cantante = btn.getAttribute("data-cantante");

      const existe = favoritas.some(
        (fav) => fav.nombre === nombre && fav.cantante === cantante
      );
      if (!existe) {
        favoritas.push({ nombre, cantante });

        Toastify({
          text: `La canción ${nombre} fue agregada con exito`,
          style: {
            background: "#333333",
            background: "linear-gradient(to right, #333333, #dd1818)",
          },
        }).showToast();

      } else {
        console.log("La cancion ya esta en favoritas");
      }

      console.log("Lista de favoritas:", favoritas);

      actualizarFav();
      guardarLocal();
    });
  });
}

function actualizarFav() {
  const listaFavoritas = document.getElementById("listaFavoritas");
  listaFavoritas.innerHTML = "";

  favoritas.forEach((cn) => {
    let li = document.createElement("li");
    li.textContent = `${cn.nombre} - ${cn.cantante}`;
    listaFavoritas.appendChild(li);
  });
}
