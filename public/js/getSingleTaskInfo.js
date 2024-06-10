document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const taskId = urlParams.get("task_id");

  // Function to handle the response for quest information
  const callbackForTaskInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const taskInfo = document.getElementById("taskInfo");

      if (responseStatus == 404) {
        taskInfo.innerHTML = `${responseData.message}`;
          return;
      }

      // Set the inner HTML for quest information and Accept Quest button
      taskInfo.innerHTML = `
      <div class="card mb-4 shadow-sm">
      <div class="card-body">
          <h3 class="card-title"><b>${responseData.title}</b></h3>
          <p class="card-text">
              Description: ${responseData.description} <br>
              Reward: ${responseData.points} <br>
          </p>
          <div class="mb-3">
              <label for="completionDate" class="form-label fw-bold">Completion Date</label>
              <input type="date" id="completionDate" class="form-control" placeholder="Completion Date">
          </div>
          <div class="mb-3">
              <label for="taskNotes" class="form-label fw-bold">Notes (OPTIONAL)</label>
              <textarea id="taskNotes" class="form-control" placeholder="Optional notes"></textarea>
          </div>
          <button id="acceptTaskButton" class="btn btn-primary">Accept Task</button>
      </div>
  </div>
  `;

      // Event listener for the Accept Task button
      const acceptButton = document.getElementById("acceptTaskButton");
      acceptButton.addEventListener("click", function () {
          completeTask(taskId);
          location.reload();
      });
  };

  // Fetch quest information
  fetchMethod(currentUrl + `/api/tasks/${taskId}`, callbackForTaskInfo);
});

function completeTask(taskId) {
    const completionDate = document.getElementById("completionDate").value;
    const taskNotes = document.getElementById("taskNotes").value || "NIL"; // Optional, so we use null if empty

        // Check if completion date is empty
        if (!completionDate) {
            alert("Missing required completion date");
            return; // Stop the function execution if no date is provided
        }

    const callbackForCompleteTask = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 201) {
            alert("Task completed successfully!");
        } else {
            alert(responseData.message);
        }
    };

    const userId = localStorage.getItem("userId");
    const data = {
        task_id: taskId,
        user_id: userId,
        completion_date: completionDate,
        notes: taskNotes // This will be "NIL" if no notes are entered
    };

    fetchMethod(
        currentUrl + `/api/task_progress/`,
        callbackForCompleteTask,
        "POST",
        data
    );
}
