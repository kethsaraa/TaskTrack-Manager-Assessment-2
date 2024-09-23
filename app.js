// Handle Sign Up
function handleSignUp(event) {
    event.preventDefault();
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("User with this email already exists.");
    } else {
        // Add the new user
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Account created successfully!");
        showLoginForm();
    }
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the credentials match
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        document.getElementById('taskManager').style.display = 'block';
        document.querySelector('.auth-section').style.display = 'none';
    } else {
        alert("Invalid login credentials.");
    }
}

// Show the Signup Form
function showSignUpForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Show the Login Form
function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Initial call to display tasks
displayTasks();


// Handle editing tasks
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[index];

    // Populate the form with existing task data
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDueDate').value = task.dueDate;
    document.getElementById('taskPriority').value = task.priority;

    // Remove the task to avoid duplication during update
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Update the displayTasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title} (Due: ${task.dueDate}, Priority: ${task.priority})
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Call displayTasks
displayTasks();


