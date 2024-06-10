url = new URL(document.URL);
const urlParams = url.searchParams;
const userId = localStorage.getItem("userId")

const callbackForUserInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userInfo = document.getElementById("userInfo");

  if (responseStatus == 404) {
    userInfo.innerHTML = `${responseData.message}`;
    return;
  }

  userInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    User ID: ${responseData.user_id} <br>
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} <br>
                    Total Points: ${responseData.total_points}
                </p>
                <button type="button" class="btn btn-primary" id="editButton">Edit Info</button>
                <button type="button" class="btn btn-danger" id="deleteButton">Delete User</button>
            </div>
            </div>
        </div>
    `;

      // Optionally, add event listeners for these buttons
  document.getElementById("editButton").addEventListener("click", function() {
    // Code to handle "Edit" action
    new bootstrap.Modal(document.getElementById('editUserInfoModal')).show();

    const currentUsername = responseData.username; // This should be fetched from the server or a stored state
    const currentEmail = responseData.email; // This should be fetched from the server or a stored state
    
    // Populate the form fields with the current information
    document.getElementById("editUsername").value = currentUsername;
    document.getElementById("editEmail").value = currentEmail;
  });

  document.getElementById("saveUserInfo").addEventListener("click", function() {
    const updatedUsername = document.getElementById("editUsername").value;
    const updatedEmail = document.getElementById("editEmail").value;
  
    // Construct the data object to send in the request
    const data = {
      username: updatedUsername,
      email: updatedEmail,
    };
  
    // Call your API to update the user info, assuming `fetchMethod` is setup to handle this
    fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
      if (responseStatus == 200) {
        alert("User Info updated successfully.");
        // Optionally, refresh the page or update the UI to reflect the new user info
        window.location.reload(); // Or another method to refresh user info on the page
      } else {
        alert(responseData.message);
      }
    }, "PUT", data); // Adjust method and data as necessary for your API
  });

  document.getElementById("deleteButton").addEventListener("click", function() {
    // Assuming "deleteButton" is the button for deleting user accounts
    new bootstrap.Modal(document.getElementById('deleteUserAccountModal')).show();
});

document.getElementById("confirmAccountDelete").addEventListener("click", function() {
    const userId = localStorage.getItem("userId");

    fetchMethod(currentUrl + `/api/users/${userId}`, (responseStatus, responseData) => {
        if (responseStatus == 204) {
            alert("Account has been deleted.");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            window.location.href = "index.html";
        } else {
            alert("Error in deleting account.");
        }
    }, "DELETE");
});

};

function callbackForInventoryItems(responseStatus, responseData) {
    const inventoryInfo = document.getElementById("inventoryInfo");

    if (responseStatus == 404) {
        inventoryInfo.innerHTML = `<div class="alert alert-danger">Inventory items not found.</div>`;
        return;
    }

    if (responseStatus != 200) {
        inventoryInfo.innerHTML = `<div class="alert alert-danger">Error fetching inventory items.</div>`;
        return;
    }

    inventoryInfo.innerHTML = ''; // Clear existing content
    responseData.forEach(item => {
        inventoryInfo.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        inventoryInfo.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h3 class="card-title"><b>${item.itemName}</b></h3>
                    <p class="card-text">
                        Description: ${item.description} <br>
                    </p>
                </div>
            </div>
        `;
    });
}

fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo);
fetchMethod(currentUrl + `/api/inventory/${userId}`, callbackForInventoryItems);
