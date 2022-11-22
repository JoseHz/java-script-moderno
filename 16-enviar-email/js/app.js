document.addEventListener('DOMContentLoaded', startForm);

function startForm() {
  //define vars
  const inputEmail = document.querySelector('#email');
  const inputSubject = document.querySelector('#subject');
  const inputMessage = document.querySelector('#message');
  const form = document.querySelector('#form');
  const values = {
    email: "",
    subject: "",
    message: "",
  }
  const btnSubmit = document.querySelector('#form button[type="submit"]')
  const btnReset = document.querySelector('#form button[type="reset"]')
  const spinner = document.querySelector('#spinner');
  
  //create events
  inputEmail.addEventListener('blur', valid);
  inputSubject.addEventListener('blur', valid);
  inputMessage.addEventListener('blur', valid);

  btnReset.addEventListener('click', resetForm);

  form.addEventListener('submit', sendInformation)

  function sendInformation(e) {
    e.preventDefault();
    spinner.classList.remove('hidden')

    setTimeout(() => {
      spinner.classList.add('hidden');

      resetForm();

      const alertSuccess = document.createElement('P');
      alertSuccess.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
      alertSuccess.textContent = 'Mensaje enviado correctamente';
      
      form.appendChild(alertSuccess);

      setTimeout(() => {
        alertSuccess.remove();
      }, 2000)
      
    },3000);
  }
  
  function valid(e) {
    const reference = document.querySelector(`#${e.target.id}`).parentElement;
    
    if (e.target.value.trim() === "") {
      msgAlert(`${e.target.id} no puede estar vacio`, reference)
      values[e.target.id] = '';
      console.log(values)
      validateValues();
      return;
    }

    if (e.target.id === "email") {
      if (!isValidEmail(e.target.value.trim())) {
        msgAlert(`ingrese un ${e.target.id} valido`, reference)
        values[e.target.id] = '';
        console.log(values)
        validateValues();
        return;
      }
    }
    eraseAlert(reference)
    
    reference.firstElementChild.nextSibling.nextSibling.classList.remove('border-gray-300');
    reference.firstElementChild.nextSibling.nextSibling.classList.add('border-green-500');
    
    values[e.target.id] = e.target.value.trim().toLowerCase();
    console.log(values)
    validateValues();
  }

  function msgAlert(message, location) {

    //if exist alert, erase it first
    eraseAlert(location)
    

    //create html error
    const msg = document.createElement('P');
    msg.textContent = message;
    msg.classList.add('alerta', 'p-2', 'uppercase', 'font-bold', 'bg-red-600', 'text-white', 'text-center')

    location.appendChild(msg);
    
  }

  function eraseAlert(location) {
    const exist = location.querySelector('.bg-red-600');
    if (exist) {
      exist.remove();
    }
  }
  
  function validateValues() {
    console.log(!Object.values(values).includes(''))
    if (!Object.values(values).includes('')) {
      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
      return
    }
    btnSubmit.classList.add('opacity-50');
    btnSubmit.disabled = true;
  }

  function resetForm(e) {
    e.preventDefault();
    values.email='';
    values.subject='';
    values.message='';
    form.reset();
    validateValues()
  }
  
  
  
  
  function isValidEmail(mail) { 
    return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
  }


}