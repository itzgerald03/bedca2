document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    const createQuestButtonContainer = document.getElementById("createQuestButton");

    // Display the "Create New Quest" button for admins
    if (role == 'admin') {
        createQuestButtonContainer.innerHTML = `<button class="btn btn-success" id="showCreateQuestModal">Create New Quest</button>`;
        document.getElementById("showCreateQuestModal").addEventListener("click", function() {
            var modal = new bootstrap.Modal(document.getElementById('createQuestModal'));
            modal.show();
        });
    }

    document.getElementById("saveQuestButton").addEventListener("click", function () {
        createNewQuest();
    });
});

function createNewQuest() {
    const name = document.getElementById('questName').value;
    const description = document.getElementById('questDescription').value;
    const reward = parseInt(document.getElementById('questReward').value, 10);
    const difficulty = document.getElementById('questDifficulty').value;


    // Validate reward as integer
    if (isNaN(reward)) {
      alert("Reward must be a valid integer.");
      return;
    }
  
    // Ensure difficulty is one of the allowed values
    if (!['Easy', 'Moderate', 'Hard'].includes(difficulty)) {
      alert("Difficulty must be either Easy, Moderate, or Hard.");
      return;
    }
  
    const questData = {
      name: name,
      description: description,
      reward: reward,
      difficulty: difficulty
    };
  
    // Replace fetchMethod with your actual method to make an API call
    fetchMethod(currentUrl + "/api/quests", (responseStatus, responseData) => {
        if (responseStatus == 201) {
            alert("Quest created successfully.");
            window.location.reload(); // Reload the page or dynamically update the store list
        } else {
            alert("Error creating Quest. Please ensure all fields are correctly filled.");
        }
    }, "POST", questData);
}
 
  


const questCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const QuestList = document.getElementById("QuestList");
    responseData.forEach((quest) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
      
      let deleteButtonHtml = localStorage.getItem("role") === 'admin' ? `<button class="btn btn-danger deleteQuest" data-quest-id="${quest.quest_id}">Delete</button>` : '';
      
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h3 class="card-title"><b>${quest.name}</b></h3>
                  <p class="card-text">
                      Description: ${quest.description} <br>
                  </p>
                  <a href="singleQuestInfo.html?quest_id=${quest.quest_id}" class="btn btn-primary">View Details</a>
                  ${deleteButtonHtml}
              </div>
          </div>
      `;
      QuestList.appendChild(displayItem);
    });

    document.querySelectorAll('.deleteQuest').forEach(button => button.addEventListener('click', function() {
        const questId = this.getAttribute('data-quest-id');
        showDeleteConfirmation(questId);
    }));
};

const showDeleteConfirmation = (questId) => {
    // Pass questId to delete button
    document.getElementById('confirmDeleteQuest').setAttribute('data-quest-id', questId);
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteQuestModal'));
    deleteModal.show();
};

document.getElementById('confirmDeleteQuest').addEventListener('click', function() {
    const questId = this.getAttribute('data-quest-id');
    deleteQuest(questId);
});

const deleteQuest = (questId) => {
    fetchMethod(currentUrl + `/api/quests/${questId}`, (responseStatus, responseData) => {
        if (responseStatus == 204) {
          alert("Quest Deleted successfully.");
          // Optionally, refresh the page or update the UI to reflect the new user info
          window.location.reload(); // Or another method to refresh user info on the page
        } else {
          alert("Error in deleting Quest");
        }
      }, "DELETE"); // Adjust method and data as necessary for your API
    };

  
  fetchMethod(currentUrl + "/api/quests", questCallback);