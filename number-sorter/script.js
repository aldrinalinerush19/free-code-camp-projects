// Get the sort button element from the DOM
const sortButton = document.getElementById('sort');

// Function to sort the input array and update the UI accordingly
const sortInputArray = event => {
  event.preventDefault();

  // Retrieve input values from dropdown elements and convert them to numbers
  const inputValues = [
    ...document.getElementsByClassName('values-dropdown'),
  ].map(dropdown => Number(dropdown.value));
  // Sort the input values in ascending order using the built-in sort method
  const sortedValues = inputValues.sort((a, b) => {
    return a - b; //Sorting comparison function for ascending order
  });
  // Update the UI with the sorted array values
  updateUI(sortedValues);
};

// Function to update the UI with sorted array values
const updateUI = (array = []) => {
  // Loop through the sorted array and update the corresponding output value nodes in the UI
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
};

// Function to perform the bubble sort algorithm on an array
const bubbleSort = array => {
  // Iterate through the array to perform bubble sort
  for (let i = 0; i < array.length; i++) {
    // Inner loop to compare adjacent elements and swap if necessary
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements if the current element is greater than the next element
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  // Return the sorted array
  return array;
};

// Function to perform the selection sort algorithm on an array
const selectionSort = array => {
  // Iterate through the array to perform selection sort
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    // Find the index of the minimum element in the unsorted portion of the array
    for (let j = i + 1; j < array.length; j++) {
      console.log(array, array[j], array[minIndex]);
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    // Swap the minimum element with the current element
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
};

// Function to perform the insertion sort algorithm on an array
const insertionSort = array => {
  // Iterate through the array to perform insertion sort
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;
    // Move elements of array[0..i-1], that are greater than currValue, to one position ahead of their current position
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array; // Return the sorted array
};

// Add event listener to the sort button to trigger sorting when clicked
sortButton.addEventListener('click', sortInputArray);
