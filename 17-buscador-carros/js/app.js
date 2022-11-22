document.addEventListener('DOMContentLoaded', readyStart);

function readyStart() {
  const marca = document.querySelector('#marca');
  const year = document.querySelector('#year');
  const minimo = document.querySelector('#minimo');
  const maximo = document.querySelector('#maximo');
  const puertas = document.querySelector('#puertas');
  const transmision = document.querySelector('#transmision');
  const color = document.querySelector('#color');

  const max = new Date().getFullYear();
  const min = max - 10;

  const dataSearch = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
  };

  const results = document.querySelector('#resultado')

  //event listeners
  marca.addEventListener('change', validateSelect);
  year.addEventListener('change', validateSelect);
  minimo.addEventListener('change', validateSelect);
  maximo.addEventListener('change', validateSelect);
  puertas.addEventListener('change', validateSelect);
  transmision.addEventListener('change', validateSelect);
  color.addEventListener('change', validateSelect);



  findCars();
  yearFilter();

  //functions
  function findCars() {

    autos.forEach( car => {

      const {marca, modelo, precio, year, puertas, color, transmision} = car;

      const carHTML = document.createElement('TR');

        carHTML.innerHTML = `
        <td>${marca}</td>
        <td>${modelo}</th>
        <td>${year}</td>
        <td>${puertas}</td>
        <td>${transmision}</td>
        `;

        results.appendChild(carHTML);
    })
  }

  function yearFilter() {
    for (let i=max; i >= min; i--) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      year.appendChild(option);
    }
  }

  function validateSelect(e) {
    dataSearch[e.target.id] = e.target.value;
    
    carFilter(e.target.id)
  }

  function carFilter() {
    const carResults = autos.filter(filterMarca);
    console.log(carResults)
  }

  function filterMarca(auto) {
    if (dataSearch.marca) {
      return auto.marca === dataSearch.marca;
    }
    return auto
  }
}