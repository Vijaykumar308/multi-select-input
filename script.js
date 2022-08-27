const getButton = document.getElementById('get'); //by default
const multiInput = document.querySelector('multi-input'); //by default
const values = document.querySelector('#values'); //by default

getButton.onclick = () => {
  if (multiInput.getValues().length > 0) {
    values.textContent = `Got ${multiInput.getValues().join(' and ')}!`;
  } else {
    values.textContent = 'Got noone  :`^(.'; 
  }
}

document.querySelector('input').focus();
