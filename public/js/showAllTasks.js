document.addEventListener("DOMContentLoaded", function () {
    const createTaskButton = document.getElementById("createTaskButton");
    const role = localStorage.getItem("role");

    if (role == 'admin') {
        createTaskButton.style.display = 'block';
    }

    createTaskButton.addEventListener("click", function () {
        var modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    });

    document.getElementById("saveTaskButton").addEventListener("click", function () {
        createNewTask();
    });
});

function createNewTask() {
    const title = document.getElementById('taskTitleModal').value;
    const description = document.getElementById('taskDescriptionModal').value;
    const points = document.getElementById('taskPointsModal').value;

    const taskData = {
        title: title,
        description: description,
        points: points
    };

    // Call your API to update the user info, assuming `fetchMethod` is setup to handle this
    fetchMethod(currentUrl + `/api/tasks`, (responseStatus, responseData) => {
        if (responseStatus == 201) {
          alert("Item Created successfully.");
          // Optionally, refresh the page or update the UI to reflect the new user info
          window.location.reload(); // Or another method to refresh user info on the page
        } else {
          alert("Missing data or Points is not an integer.");
        }
      }, "POST", taskData); // Adjust method and data as necessary for your API
    };


    const taskCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const TaskList = document.getElementById("TaskList");
        responseData.forEach((task) => {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
          let deleteButtonHtml = '';
    
          if (localStorage.getItem("role") == 'admin') {
            deleteButtonHtml = `<button class="btn btn-danger deleteTask" data-task-id="${task.task_id}">Delete</button>`;
          }
    
          displayItem.innerHTML = `
              <div class="card">
                  <div class="card-body">
                      <h3 class="card-title"><b>${task.title}</b></h3>
                      <p class="card-text">
                          Description: ${task.description} <br>
                          Reward: ${task.points} <br>
                      </p>
                      <a href="singleTaskInfo.html?task_id=${task.task_id}" class="btn btn-primary">View Details</a>
                      ${deleteButtonHtml}
                  </div>
              </div>
          `;
          TaskList.appendChild(displayItem);
        });
    
        // Add click event listeners for all delete buttons
        document.querySelectorAll('.deleteTask').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = this.getAttribute('data-task-id');
                showDeleteConfirmation(taskId);
            });
        });
    };
    
    const showDeleteConfirmation = (taskId) => {
        // Store taskId in the confirm button for later use
        document.getElementById('confirmDelete').setAttribute('data-task-id', taskId);
        var deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
        deleteModal.show();
    };
    
    // Add click event listener to the confirmation button
    document.getElementById('confirmDelete').addEventListener('click', function() {
        const taskId = this.getAttribute('data-task-id');
        deleteTask(taskId);
    });
    
    const deleteTask = (taskId) => {
        // Perform the deletion using fetchMethod or fetch API
        fetchMethod(currentUrl + `/api/tasks/${taskId}`, (responseStatus, responseData) => {
            if (responseStatus == 204) {
              alert("Task Deleted successfully.");
              // Optionally, refresh the page or update the UI to reflect the new user info
              window.location.reload(); // Or another method to refresh user info on the page
            } else {
              alert("Error in deleting Task");
            }
          }, "DELETE"); // Adjust method and data as necessary for your API
        };

    
  
  fetchMethod(currentUrl + "/api/tasks", taskCallback);

  