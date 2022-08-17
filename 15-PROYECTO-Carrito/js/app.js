// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];



listaCursos.addEventListener('click', agregarCarrito);

function agregarCarrito(e) {

    e.preventDefault();

    // Detectar que elemento se clickeo

    if (e.target.classList.contains('agregar-carrito')) {
        
        infoCarrito = {
            imagen: e.target.parentElement.parentElement.querySelector('img').src,
            titulo: e.target.parentElement.parentElement.querySelector('h4').textContent,
            precio: e.target.parentElement.parentElement.querySelector('.precio span').textContent,
            cantidad: 1,
            id: e.target.getAttribute('data-id')  
                // id: document.querySelector('.agregar-carrito').getAttribute('data-id')
            
        }

        // Si el curso ya existe en el carrito, solo aumentar la cantidad

        const existe = articulosCarrito.some(articulo => articulo.id === infoCarrito.id);

        if (existe) {
            const index = articulosCarrito.findIndex(articulo => articulo.id === infoCarrito.id);
            articulosCarrito[index].cantidad++;
        } else {
            // Agregar el curso al carrito
            articulosCarrito.push(infoCarrito);
        }
    
        console.log(articulosCarrito);
        
        mostrarCarrito();
    }
}


contenedorCarrito.addEventListener('click', mostrarCarrito);

    function mostrarCarrito() {

         contenedorCarrito.innerHTML = '';

         articulosCarrito.forEach(articulo => {
            contenedorCarrito.innerHTML += `
                <tr>
                    <td>
                        <img src="${articulo.imagen}" width="100">
                    </td>
                    <td>${articulo.titulo}</td>
                    <td>${articulo.precio}</td>
                    <td>${articulo.cantidad}</td>
                    <td>
                        <a href="#" class="borrar-curso" data-id="${articulo.id}">X</a>
                    </td>
                </tr>
            `;
            console.log(articulosCarrito);
            console.log(contenedorCarrito);
        });

}

carrito.addEventListener('click', eliminarCurso);

    function eliminarCurso(e) {

        e.preventDefault();

        if (e.target.classList.contains('borrar-curso' && articulosCarrito.cantidad > 1)){

            articulosCarrito.forEach(articulo => {
                if (articulo.id === e.target.getAttribute('data-id')) {
                    articulo.cantidad--;
                }
            })
   
        } else if(e.target.classList.contains('borrar-curso')) {
            const id = e.target.getAttribute('data-id');
            const index = articulosCarrito.findIndex(articulo => articulo.id === id);
            articulosCarrito.splice(index, 1);
            mostrarCarrito();
        }

    //     if (e.target.classList.contains('borrar-curso')) {

    //         const id = e.target.getAttribute('data-id');

    //         articulosCarrito = articulosCarrito.filter(articulo => articulo.id != id);

    //         mostrarCarrito();
    //     }
     }

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

function vaciarCarrito(e) {

    e.preventDefault();
    articulosCarrito = [];
    console.log(articulosCarrito);

    mostrarCarrito();

}






