// Fetching DOM elements
const numberInput = document.getElementById('number-input');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');

// Predefined animation data
const animationContainer = document.getElementById('animation-container');

const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: `decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.`,
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

// Recursive function to convert decimal to binary
const decimalToBinary = input => {
  // Base cases for recursion
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // Recursive call to compute binary representation
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Function to display call stack animation
const showAnimation = () => {
  // Display initial message
  result.innerText = 'Call Stack Animation';

  animationData.forEach(obj => {
    // Add paragraph element for animation with delay
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px" class="animation-frame">decimalToBinary(${obj.inputVal})</p>
      `;
    }, obj.addElDelay);

    // Display message after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Remove paragraph element after a delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);

    // Update result after animation completion
    setTimeout(() => {
      result.textContent = decimalToBinary(5);
    }, 20000);
  });
};

// Function to validate user input and trigger animation
const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  // Check for valid input
  if (!numberInput.value || isNaN(inputInt)) {
    alert('Please provide a decimal number');
    return;
  }
  // Trigger animation for specific input value
  if (inputInt === 5) {
    showAnimation();
    return;
  }
  // Display result for other input values
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = '';
};

// Event listener for button click
convertBtn.addEventListener('click', checkUserInput);

// Event listener for enter key press
numberInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkUserInput();
  }
});
