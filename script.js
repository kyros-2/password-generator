const abc = 'abcdeefghijklmnopqrstuvwxyz',
ABC = abc.toLocaleUpperCase(),
n123 = '0123456789',
n$ = '&#|@?%$£§/!~{}^µ¤=+';

let passGen;

const lenCount = document.querySelector('#lenCount'),
lengthInput = document.querySelector('#lengthInput');

strongTest(lengthInput.value);

const choix = document.querySelectorAll('label.choixLab');

const caplettres = document.querySelector('input#caplettres'),
lettres = document.querySelector('input#lettres'),
digits = document.querySelector('input#digits'),
symbols = document.querySelector('input#symbols');

const genBtn = document.querySelector('#genBtn'),
inputPass = document.querySelector('#password');

const outPut = document.querySelector('div.outPut');

const copyBtn = document.querySelector('#copyBtn');

lengthInput.addEventListener('input', () => {
  lenCount.innerHTML = lengthInput.value;
  strongTest(lengthInput.value);
})

choix.forEach((ele) => {
  ele.addEventListener('input', () => {
    ele.classList.toggle('checkboxActive');
    generatePassword();
    disableBtn();
  })
});

genBtn.addEventListener('click', () => {
  inputPass.value = getPassword();
})



copyBtn.addEventListener('click', () => {
  inputPass.select();
  document.execCommand('copy');
  inputPass.blur();

  copyMessage();
})


function copyMessage(){
  const message = document.createElement('h2');
  message.id = 'copiedMessage';
  message.innerHTML = 'Password copied <i class="fa-solid fa-check"></i>';

  document.body.appendChild(message);

  copyBtn.style.pointerEvents = 'none';
  
  setTimeout(() => {
    message.remove();
    copyBtn.style.pointerEvents = null;
  }, 3500)
}

function generatePassword(){
    passGen = '';
    if(caplettres.checked){
      passGen += ABC;
    }
    if(lettres.checked){
      passGen += abc;
    }
    if(digits.checked){
      passGen += n123;
    }
    if(symbols.checked){
      passGen += n$;
    }
    passGen = passGen.split('');
  }
  
function getPassword(){
    let x;
    let listY = [];          
          
    while (listY.length < lengthInput.value){
      x = Math.floor(Math.random() * passGen.length);

      listY.push(passGen[x]);
    }

    return listY.join('');
}

function disableBtn(){
  if(!caplettres.checked && !lettres.checked && !digits.checked && !symbols.checked){
    genBtn.classList.add('disabled');
    outPut.classList.add('disabled');
  } else {
    genBtn.classList.remove('disabled');    
    outPut.classList.remove('disabled');
  }
}

function strongTest(num){
  if (num < 4){
    lengthInput.setAttribute('data-str', 'VERY WEAK');
    lengthInput.style.color = '#ff0000';
  } else if (num >= 4 && num < 8){
    lengthInput.setAttribute('data-str', 'WEAK');
    lengthInput.style.color = '#ff0000';
  } else if (num >= 8 && num < 12){
    lengthInput.setAttribute('data-str', 'GOOD');
    lengthInput.style.color = '#ffa500';
  }  else if (num >= 12 && num < 16){
    lengthInput.setAttribute('data-str', 'STRONG');
    lengthInput.style.color = '#008000';
  } else {
    lengthInput.setAttribute('data-str', 'VERY STRONG');
    lengthInput.style.color = '#0000ff';
  }
  if (num < 4){
    lengthInput.style.textShadow = '0 0 10px red';
  } else {
    lengthInput.style.textShadow = null ;
  }
}

// setInterval(() => {
//   genBtn.click();
// }, 100)