url = new URL(document.URL);
const urlParams = url.searchParams;
const userId = urlParams.get("user_id");

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
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} <br>
                    Total Points: ${responseData.total_points}
                </p>
            </div>
        </div>
    `;
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