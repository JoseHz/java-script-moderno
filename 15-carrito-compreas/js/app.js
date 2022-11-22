//variables
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const borrarArticulos = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];


cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener('click', addCourse);
  borrarArticulos.addEventListener('click', borrarCurso);
  vaciarCarrito.addEventListener('click', vaciarContenedorCarrito)
}


//funciones
function addCourse(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    e.preventDefault();
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  } 
}

function leerDatosCurso(curso) {
  
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.u-pull-right').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  }
  agregarCarrito(infoCurso);
}

function agregarCarrito(infoCurso) {
  //validamos si existe el curso
  const existe = carrito.some(item => item.id === infoCurso.id);

  if (existe) {
    const newCourses = carrito.map(item => {
      if (item.id === infoCurso.id) {
        item.cantidad++;
        return item;
      }
      return item;
    })
    carrito = [...newCourses];
    
  } else {
    carrito = [...carrito, infoCurso];
  }
  
  carritoHTML();  
}

function carritoHTML() {
  //limpiar html carrito
  limpiarHTML()

  //recorremos carrito y agregamos cursos
  carrito.forEach(curso => {
    const {imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src=${imagen} width="100px"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
    `
    contenedorCarrito.appendChild(row);
  })
}

function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

function borrarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    //eliminar articulos del carrito
    carrito = carrito.filter( curso => curso.id !== cursoId);
    carritoHTML();
  }
}

function vaciarContenedorCarrito() {
  while (carrito.length !== 0) {
    carrito.shift();
    console.log(carrito);
  }
  limpiarHTML();
}