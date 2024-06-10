const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const invList = document.getElementById("invList");
    responseData.forEach((user) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${user.itemName}</h5>
                  <p class="card-text">
                      Description: ${user.description} <br>
                  </p>
                  <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary">View Items</a>
              </div>
          </div>
      `;
      invList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/inventory", callback);