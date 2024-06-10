const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const progressInfo = document.getElementById("progressInfo");
  
    if (responseStatus == 404) {
        progressInfo.innerHTML = `<div class="alert alert-danger">Task Progress not found.</div>`;
      return;
  }
  
  if (responseStatus != 200) {
    progressInfo.innerHTML = `<div class="alert alert-danger">Error fetching Task Progress.</div>`;
      return;
  }
  
  
    responseData.forEach((progress) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h3 class="card-title"><b>${progress.title}</b></h3>
                  <p class="card-text">
                  Points: ${progress.points} <br>
                  Completion Date: ${progress.completion_date} <br>
                      Notes: ${progress.notes} <br>
                  </p>
              </div>
          </div>
      `;
      progressInfo.appendChild(displayItem);
    });
  };
  
  const userId = localStorage.getItem("userId")
  
  fetchMethod(currentUrl + `/api/task_progress/user/${userId}`, callback);