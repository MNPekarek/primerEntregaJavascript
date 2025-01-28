
let canciones =[
    {nombre: "Perfect", cantante: "Ed Sheran"},
    {nombre: "Piel", cantante: "Thiago"}];

function simulador(){

    let opcion;

    do {
        opcion = prompt ("Ingrese una opción:\n 1: Mostrar canciones  \n 2: Agregar una cancion nueva \n 3: Buscar una canción \n 4: Cerrar");

        if (opcion === "1") {     
            for(let objeto of canciones) {
                alert(`Canción: ${objeto.nombre}    Cantante: ${objeto.cantante}`)                  
            }
        } else if (opcion === "2"){            
            let cancionNueva = prompt("Ingrese el nombre de la cancion")
            let artistaNuevo = prompt("Ingrese el nombre del autor")
                 
            if (cancionNueva !== null && artistaNuevo !== null) {
                canciones.push({nombre: cancionNueva, cantante: artistaNuevo})  
                alert("Canción agregada con exito")    
            } else {
                alert("Los datos ingresados no son válidos")
            }
        } else if (opcion === "3"){
            let buscarCancion = prompt("Ingrese el nombre de la cancion que desea buscar").toUpperCase()

            let cancionEncontrada = canciones.find((cancion) => cancion.nombre.toUpperCase() === buscarCancion);
            if (cancionEncontrada) {
                alert (`La busqueda se realizo con exito \n Nombre: ${cancionEncontrada.nombre}\nCantante: ${cancionEncontrada.cantante}`);
            }         

               
        } else if (opcion === "4"){
            confirm("¿Estas seguro que quieres cerrar el simulador?")
            alert("Simulador cerrado")        
        } else {
            alert("Opción inválida. Intente nuevamente")
        }
    }while (opcion !== "4");
}

simulador()



