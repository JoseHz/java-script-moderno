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



  findCars(autos);
  yearFilter();

  //functions
  function findCars(autos) {
    clearTable();

    const headerHTML = document.createElement('TR');
    headerHTML.innerHTML = `
    <tr >
    <th>marca</th>
    <th>modelo</th>
    <th>aňo</th>
    <th>precio</th>
    <th>puertas</th>
    <th>transmisión</th>
    <th>color</th>
    </tr>
    `
    results.appendChild(headerHTML);
    autos.forEach( car => {
      
      const {marca, modelo, precio, year, puertas, color, transmision} = car;
      
      
      const carHTML = document.createElement('TR');
      carHTML.innerHTML = `
        <td>${marca}</td>
        <td>${modelo}</th>
        <td>${year}</td>
        <td>${precio}</td>
        <td>${puertas}</td>
        <td>${transmision}</td>
        <td>${color}</td>
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
  function clearTable() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
  }

  function carFilter() {
    const carResults = autos.filter(filterMarca).filter(filterYear).filter(filterMin).filter(filterMax).filter(numbersDoor).filter(transmisionFilter).filter(colorFilter);
    
    if (carResults) {
      findCars(carResults);
    } else {
      noMatch();
    }
  }

  function noMatch() {
    const noResults = document.createElement('P');
  }

  function filterMarca(auto) {
    if (dataSearch.marca) {
      return auto.marca === dataSearch.marca;
    }
    return auto;
  }

  function filterYear(auto) {
      if (dataSearch.year) {
        return auto.year === parseInt(dataSearch.year);
      }
      return auto;
    }

  function filterMin(auto) {
    if (dataSearch.minimo) {
      return auto.precio >= parseInt(dataSearch.minimo)
    }
    return auto;
  }

  function filterMax(auto) {
    if (dataSearch.maximo) {
      return auto.precio <= parseInt(dataSearch.maximo)
    }
    return auto;
  }

  function numbersDoor(auto) {
    if (dataSearch.puertas) {
      return auto.puertas === parseInt(dataSearch.puertas)
    }
    return auto;
  }

  function transmisionFilter(auto) {
    if (dataSearch.transmision) {
      return auto.transmision === dataSearch.transmision;
    }
    return auto;
  }

  function colorFilter(auto) {
    if (dataSearch.color) {
      return auto.color === dataSearch.color;
    }
    return auto;
  }
}

