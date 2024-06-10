document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("role");
    const createItemButtonContainer = document.getElementById("createItemButton");

    // Display the "Create New Item" button for admins
    if (role == 'admin') {
        createItemButtonContainer.innerHTML = '<button class="btn btn-success" id="showCreateItemModal">Create New Item</button>';
        const showCreateItemModalButton = document.getElementById("showCreateItemModal");
        showCreateItemModalButton.addEventListener("click", function() {
            var modal = new bootstrap.Modal(document.getElementById('createItemModal'));
            modal.show();
        });
    }

    document.getElementById("saveItemButton").addEventListener("click", function () {
        createNewItem();
    });
});

function createNewItem() {
    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    let cost = parseInt(document.getElementById('cost').value, 10);
    let quantity = parseInt(document.getElementById('quantity').value, 10);

    // Validate cost and quantity to ensure they are integers
    if (isNaN(cost) || isNaN(quantity)) {
        alert("Cost and quantity must be valid integers.");
        return;
    }

    const itemData = {
        itemName: itemName,
        description: description,
        cost: cost,
        quantity: quantity
    };

    fetchMethod(currentUrl + "/api/store", (responseStatus, responseData) => {
        if (responseStatus == 201) {
            alert("Item created successfully.");
            window.location.reload(); // Reload the page or dynamically update the store list
        } else {
            alert("Error creating item. Please ensure all fields are correctly filled.");
        }
    }, "POST", itemData);
}
 
 
 
 
 // Function to fetch store items and display them
 const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const storeList = document.getElementById("storeList");
    responseData.forEach((item) => {
        const displayItem = document.createElement("div");
        displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><b>${item.itemName}</b></h5>
                <p class="card-text">
                    Description: ${item.description} <br>
                    Cost: ${item.cost} <br>
                    Quantity: ${item.quantity} <br>
                </p>
                <a href="singleStoreInfo.html?item_id=${item.item_id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `;
        storeList.appendChild(displayItem);
    });
};

fetchMethod(currentUrl + "/api/store", callback);

