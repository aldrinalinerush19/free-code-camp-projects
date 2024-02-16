// Get reference to the paragraph element where the current date will be displayed
const currentDateParagraph = document.getElementById('current-date');

// Get reference to the select element for date options
const dateOptionsSelectElement = document.getElementById('date-options');

// Create a new Date object to get the current date and time
const date = new Date();

// Extract individual components of the current date and time
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

// Format the date to display in the default format: day-month-year
const formattedDate = `${day}-${month}-${year}`;

// Set the initial content of the paragraph element to display the formatted date
currentDateParagraph.textContent = formattedDate;

dateOptionsSelectElement.addEventListener('change', () => {
  // Use a switch statement to handle different date format options based on user selection
  switch (dateOptionsSelectElement.value) {
    case 'yyyy-mm-dd': // If the selected option is 'yyyy-mm-dd'
      currentDateParagraph.textContent = formattedDate
        .split('-') // Split the date string into an array of components
        .reverse() // Reverse the array elements to rearrange the date components
        .join('-'); // Join the array elements back into a string with '-' as the separator
      break;
    case 'mm-dd-yyyy-h-mm': // If the selected option is 'mm-dd-yyyy-h-mm'
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      currentDateParagraph.textContent = formattedDate; // Reset the paragraph content to display the default formatted date
  }
});
