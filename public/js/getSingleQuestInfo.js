document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const questId = urlParams.get("quest_id");

  // Function to handle the response for quest information
  const callbackForQuestInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const questInfo = document.getElementById("questInfo");

      if (responseStatus == 404) {
          questInfo.innerHTML = `${responseData.message}`;
          return;
      }

      // Set the inner HTML for quest information and Accept Quest button
      questInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                      Quest ID: ${responseData.quest_id} <br>
                      Name: ${responseData.name} <br>
                      Description: ${responseData.description} <br>
                      Reward: ${responseData.reward} <br>
                      Difficulty: ${responseData.difficulty} <br>
                  </p>
                  <button id="acceptQuestButton" class="btn btn-primary">Accept Quest</button>
              </div>
          </div>
      `;

      // Event listener for the Accept Quest button
      const acceptButton = document.getElementById("acceptQuestButton");
      acceptButton.addEventListener("click", function () {
          completeQuest(questId);
      });
  };

  // Fetch quest information
  fetchMethod(currentUrl + `/api/quests/${questId}`, callbackForQuestInfo);
});

// Function to complete a quest
function completeQuest(questId) {
  const callbackForCompleteQuest = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 200) {
          // Handle successful quest completion
          alert("Quest completed successfully!");
      } else {
          // Handle errors or other response statuses
          alert(responseData.message);
      }
  };

  const userId = localStorage.getItem("userId");
  const data = {
      questId: questId,
      user_id: userId
  };
    
  fetchMethod(
      currentUrl + `/api/quests/complete/${questId}`,
      callbackForCompleteQuest,
      "POST",
      data
  );
}
