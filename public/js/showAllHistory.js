const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const historyInfo = document.getElementById("historyInfo");

  if (responseStatus == 404) {
    historyInfo.innerHTML = `<div class="alert alert-danger">History not found.</div>`;
    return;
}

if (responseStatus != 200) {
  historyInfo.innerHTML = `<div class="alert alert-danger">Error fetching History.</div>`;
    return;
}


  responseData.forEach((history) => {
    const displayItem = document.createElement("div");
    displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
    displayItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title"><b>${history.name}</b></h3>
                <p class="card-text">
                Type: ${history.type} <br>
                    Points: ${history.points} <br>
                    Completion Date: ${history.completion_date} <br>
                </p>
            </div>
        </div>
    `;
    historyInfo.appendChild(displayItem);
  });
};

const userId = localStorage.getItem("userId")

fetchMethod(currentUrl + `/api/history/${userId}`, callback);