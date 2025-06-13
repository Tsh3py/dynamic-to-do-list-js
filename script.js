document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn'); 
    const taskInput = document.getElementById('task-input');   
    const taskList = document.getElementById('task-list');     

    
    function loadTasks() {
        
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(taskText => {
            
            addTask(taskText, false);
        });
    }

    function addTask(taskTextParam, save = true) { 
        const taskText = taskTextParam ? taskTextParam.trim() : taskInput.value.trim();

        if (taskText === "") {
            
            alert("Please enter a task.");
            return; 
        } 

    
        const listItem = document.createElement('li');
        
        listItem.textContent = taskText;

        
        const removeButton = document.createElement('button');
        
        removeButton.textContent = "Remove";
        
        removeButton.classList.add('remove-btn');

    
        removeButton.onclick = function() {
            taskList.removeChild(listItem); 

            
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            
            const taskIndex = storedTasks.indexOf(taskText);
            
            if (taskIndex > -1) {
                storedTasks.splice(taskIndex, 1); 
            }
            
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            
        };

    
        listItem.appendChild(removeButton);

        taskList.appendChild(listItem);

        
        taskInput.value = '';

        
        if (save) {
            
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            
            storedTasks.push(taskText);
            
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
        
    }

    addButton.addEventListener('click', () => addTask()); 

    
    taskInput.addEventListener('keypress', function(event) {
        
        if (event.key === 'Enter') {
            addTask(); 
        }
    });

    
    loadTasks();
    
});

    



