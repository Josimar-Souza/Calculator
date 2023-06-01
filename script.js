window.onload = () => {
  const displayElement = document.getElementById('display');
  const calculatorButtons = document.getElementsByClassName('button');
  const operationKey = 'operation';
  const firstNumberKey = 'first-number';
  const secondNumberKey = 'second-number';

  const init = () => {
    localStorage.setItem(firstNumberKey, '');
    localStorage.setItem(secondNumberKey, '');
    localStorage.setItem(operationKey, '');

    displayElement.textContent = '0';
  };

  init();

  const calculate = operation => {
    const firstNumber = +localStorage.getItem(firstNumberKey);
    const secondNumber = +localStorage.getItem(secondNumberKey);
    let result;

    switch(operation) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      default:
        result = '';
    }

    displayElement.textContent = result.toFixed(3);

    localStorage.setItem(firstNumberKey, result.toFixed(3));
    localStorage.setItem(secondNumberKey, '');
    localStorage.setItem(operationKey, '');
  };

  const makeOperation = ({ target: { name, value } }) => {
    let firstNumber = localStorage.getItem(firstNumberKey);
    let secondNumber = localStorage.getItem(secondNumberKey);
    let operation = localStorage.getItem(operationKey);

    if (name === 'number' && operation === '') {
      firstNumber += value

      localStorage.setItem(firstNumberKey, firstNumber);
    } else if (name === 'number' && operation !== '') {
      secondNumber += value;

      localStorage.setItem(secondNumberKey, secondNumber);
    } else if (name === 'operation') {
      operation = value;

      localStorage.setItem(operationKey, value);
    } else if (name === 'equal') {
      calculate(operation);
    } else if (name === 'clear-all') {
      firstNumber = '0';
      secondNumber = '';
      operation = '';

      localStorage.setItem(firstNumberKey, '');
      localStorage.setItem(secondNumberKey, '');
      localStorage.setItem(operationKey, '');
    }

    if (name !== 'equal') {
      displayElement.textContent = `${firstNumber} ${operation} ${secondNumber}`
    }
  };

  for (let index = 0; index < calculatorButtons.length; index += 1) {
    calculatorButtons[index].addEventListener('click', makeOperation);
  }
};