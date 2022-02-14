// Funcionamento do Modal;

const modalOff = () => {
  let modal = document.querySelector('.modal');
  modal.style.opacity = '0';  
}

const modalOn = (element) => {
    let paragrath = document.querySelector('.test');
    let modal = document.querySelector('.modal');
    paragrath.innerHTML = (element.firstChild.innerHTML);
    console.log(paragrath);
    modal.style.opacity = '1';  
}

const closeModal = () => {
  let closeButton = document.querySelectorAll('.close-modal');
  closeButton.forEach((element) => element.addEventListener('click', modalOff));  
}

const showModal = () => {
  let dices = document.querySelectorAll('.container-dice');
  dices.forEach((element) => {
    element.addEventListener('click', function(){ modalOn(element) });
  })
}

closeModal();
showModal();

// Mecanica de Rolagem de Dados;

const rollDice = () => {
  let buttonAccept = document.querySelector('.accept-button');
  let modifier = document.querySelector('#modifier');
  let numberOfDices = document.querySelector('#number-of-dices');
  let paragrathRolledDice = document.querySelector('.test');
  let modal = document.querySelector('.modal');
  buttonAccept.addEventListener('click', () => {
    let rolls = [];
    let paragraphShowResult = document.createElement('p');
    paragraphShowResult.className = 'show-dice-result';
    let section = document.querySelector('.show-dice-rolling');
    let value = parseInt(paragrathRolledDice.innerHTML);
    let stringRolls = '';
    let finalResult = '';
    let sumRolls = 0;
    for (let i = 0; i < numberOfDices.value; i++) {
      rolls.push((Math.floor(Math.random() * value) + 1));
      sumRolls += rolls[i];
      if (stringRolls === '') {
        stringRolls = rolls[i]; 
      } else {
        stringRolls = stringRolls + ', ' + rolls[i]; 
      }
      finalResult = `Roll(${stringRolls}): ${parseInt(numberOfDices.value)}d${value} + ${parseInt(modifier.value)} = <b>${(sumRolls) + parseInt(modifier.value)}<b>`
    }
    if (document.getElementsByClassName('show-dice-result').length === 11) {
      document.getElementsByClassName('show-dice-result')[0].remove();  
    }
    section.appendChild(paragraphShowResult);
    paragraphShowResult.innerHTML = finalResult;
    modal.style.opacity = '0';
  });
} 

rollDice();

module.exports = {rollDice, modalOff};
