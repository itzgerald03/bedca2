document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const itemId = urlParams.get("item_id");

  // Function to handle the response for item information
  const callbackForItemInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const itemInfo = document.getElementById("itemInfo");

    if (responseStatus == 404) {
      itemInfo.innerHTML = `${responseData.message}`;
      return;
    }

    // Set the inner HTML for item information and Purchase Item button
    itemInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                      Item ID: ${responseData.item_id} <br>
                      Name: ${responseData.itemName} <br>
                      Description: ${responseData.description} <br>
                      Cost: ${responseData.cost} <br>
                      Quantity: ${responseData.quantity} <br>
                  </p>
                  <button id="purchaseItemButton" class="btn btn-primary">Purchase Item</button>
              </div>
          </div>
      `;

    // Event listener for the Purchase Item button
    const purchaseButton = document.getElementById("purchaseItemButton");
    purchaseButton.addEventListener("click", function () {
      purchaseItem(itemId);
    });
  };

  // Fetch item information
  fetchMethod(currentUrl + `/api/store/${itemId}`, callbackForItemInfo);
});



// Function to complete a quest
function purchaseItem(itemId) {
  const callbackForPurchaseItem = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 200) {
          // Handle successful quest completion
          alert("Item purchased successfully!");
          location.reload();
      } else {
          // Handle errors or other response statuses
          alert(responseData.message);
      }
  };

  const userId = localStorage.getItem("userId");
  const data = {
      itemId: itemId,
      user_id: userId
  };

  fetchMethod(
      currentUrl + `/api/store/purchase/${itemId}/user/${userId}`,
      callbackForPurchaseItem,
      "PUT",
      data
  );
}

