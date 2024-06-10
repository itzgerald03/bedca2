document.addEventListener("DOMContentLoaded", function () {
    fetchInventory(); // Call fetchInventory when the document is loaded

    function fetchInventory() {
        const userId = localStorage.getItem("userId"); // Get the userId from localStorage
        if (!userId) {
            console.error("User ID not found. Please ensure the user is logged in.");
            return;
        }

        // Assuming fetchMethod is a predefined function for making API requests
        fetchMethod(currentUrl + `/api/inventory/${userId}`, callbackForInventoryItems);
    }

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
            inventoryInfo.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h3 class="card-title"><b>${item.itemName}</b></h3>
                        <p class="card-text">
                            Description: ${item.description} <br>
                        </p>
                        <button onclick="deleteInventoryItem(${item.inventory_id})" class="btn btn-danger">Delete Item</button>
                    </div>
                </div>
            `;
        });
    }

    window.deleteInventoryItem = function(itemId) {
        const userId = localStorage.getItem("userId"); // Get the userId from localStorage
        if (confirm("Are you sure you want to delete this inventory item?")) {
            fetchMethod(currentUrl + `/api/inventory/${itemId}/user/${userId}`, (responseStatus, responseData) => {
                if (responseStatus === 200) {
                    alert("Inventory item deleted successfully!");
                    fetchInventory(); // Refresh the inventory list
                } else {
                    alert("Error deleting inventory item.");
                }
            }, "DELETE");
        }
    };
});
