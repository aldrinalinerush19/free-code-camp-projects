// DOM Elements
const taskForm = document.getElementById('task-form');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('tasks-container');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');

// Task Data from Local Storage or Initialize as Empty Array
const taskData = JSON.parse(localStorage.getItem('data')) || [];
let currentTask = {}; // Store the currently selected task for editing

// Function to Add or Update Task
const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = 'Add Task';

  // Find index of current task in taskData array
  const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id);
  const taskObj = {
    // Generate unique ID for the task using title and current timestamp
    id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // If task is new, add it to the beginning of the array; otherwise, update existing task
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  // Store updated taskData array in local storage
  localStorage.setItem('data', JSON.stringify(taskData));
  updateTaskContainer(); // Update UI with new/updated tasks
  reset(); // Reset form fields
};

// Function to Update Task Container in UI
const updateTaskContainer = () => {
  tasksContainer.innerHTML = '';

  // Loop through taskData array and generate HTML for each task
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn" onclick="editTask(this)">Edit</button>
          <button type="button" class="btn" onclick="deleteTask(this)">Delete</button> 
        </div>
      `;
  });
};

// Function to Delete Task
const deleteTask = buttonEl => {
  // Find index of task to be deleted in taskData array
  const dataArrIndex = taskData.findIndex(
    item => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove(); // Remove task HTML from UI
  taskData.splice(dataArrIndex, 1); // Remove task from taskData array
  // Update local storage with modified taskData array
  localStorage.setItem('data', JSON.stringify(taskData));
};

// Function to Edit Task
const editTask = buttonEl => {
  // Find index of task to be edited in taskData array
  const dataArrIndex = taskData.findIndex(
    item => item.id === buttonEl.parentElement.id
  );

  // Set currentTask to the selected task for editing
  currentTask = taskData[dataArrIndex];
  // Populate form fields with task details for editing
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = 'Update Task'; // Change button text to indicate update action
  taskForm.classList.toggle('hidden'); // Show task form for editing
};

// Function to Reset Task Form
const reset = () => {
  // Clear form fields
  titleInput.value = '';
  dateInput.value = '';
  descriptionInput.value = '';
  taskForm.classList.toggle('hidden'); // Hide task form
  currentTask = {}; // Reset currentTask
};

// Check if there are tasks inside taskData; Update UI if tasks exist
if (taskData.length) {
  updateTaskContainer();
}

// Event Listeners
openTaskFormBtn.addEventListener('click', () =>
  taskForm.classList.toggle('hidden')
);

closeTaskFormBtn.addEventListener('click', () => {
  // Check if form inputs contain values and if any values have been updated
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  // If form inputs contain values and values have been updated, show confirmation dialog
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset(); // Otherwise, reset form fields
  }
});

cancelBtn.addEventListener('click', () => confirmCloseDialog.close()); // Close confirmation dialog

discardBtn.addEventListener('click', () => {
  confirmCloseDialog.close(); // Close confirmation dialog
  reset(); // Reset form fields
});

// Handle form submission
taskForm.addEventListener('submit', e => {
  e.preventDefault();

  addOrUpdateTask(); // Add or update task based on form input
});
