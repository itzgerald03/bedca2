    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("createMessageButton").addEventListener("click", function () {
            openMessageModal();  // Open modal for creating new message
        });


        document.getElementById("confirmDeleteButton").addEventListener("click", function () {
            const messageId = document.getElementById("deleteMessageModal").getAttribute("data-message-id");
            deleteMessage(messageId);
        });


        const callbackForMessageInfo = (responseStatus, responseData) => {
            const messageInfo = document.getElementById("messageInfo");
            const userId = localStorage.getItem("userId"); // Get the current user's 
            const role = localStorage.getItem("role")
        
            if (responseStatus == 404) {
                messageInfo.innerHTML = `<div class="alert alert-danger">Message not found.</div>`;
                return;
            }
        
            messageInfo.innerHTML = '';
            responseData.forEach(message => {
                let buttons = '';
                if (message.user_id == userId) { // Check if the message belongs to the current user
                    buttons = `
                        <button onclick="openMessageModal(${message.id}, '${message.message_text}')" class="btn btn-primary">Update Message</button>
                        <button onclick="openDeleteConfirmationModal(${message.id})" class="btn btn-danger">Delete Message</button>
                    `;
                } else if (role == "admin") {
                    buttons = `
                    <button onclick="openDeleteConfirmationModal(${message.id})" class="btn btn-danger">Delete Message</button>
                `;
                }
        
                messageInfo.innerHTML += `
                    <div class="card mb-3">
                        <div class="card-body">
                            <p class="card-text">
                                Message ID: ${message.id} <br>
                                User ID: ${message.user_id} <br>
                                Text: ${message.message_text} <br>
                            </p>
                            ${buttons}
                        </div>
                    </div>
                `;
            });
        };

        fetchMethod(currentUrl + `/api/message`, callbackForMessageInfo);
    });


    function openDeleteConfirmationModal(messageId) {
        document.getElementById("deleteMessageModal").setAttribute("data-message-id", messageId);
        new bootstrap.Modal(document.getElementById('deleteMessageModal')).show();
    }

    function deleteMessage(messageId) {
        fetchMethod(currentUrl + `/api/message/${messageId}`, (responseStatus, responseData) => {
            if (responseStatus === 200) {
                alert("Message deleted successfully!");
                location.reload();
            } else {
                alert("Error deleting message.");
            }
        }, "DELETE");
    }

    function openMessageModal(messageId = '', messageText = '') {
        document.getElementById("messageIdModal").value = messageId;
        document.getElementById("messageTextModal").value = messageText;

        const modalTitle = document.getElementById("messageModalLabel");
        const saveButton = document.getElementById("saveMessageButton");

        if (messageId) {
            modalTitle.innerText = "Edit Message";
            saveButton.innerText = "Save Changes";
        } else {
            modalTitle.innerText = "New Message";
            saveButton.innerText = "Submit";
        }

        new bootstrap.Modal(document.getElementById('messageModal')).show();
    }



    document.getElementById("saveMessageButton").addEventListener("click", function () {
        const messageId = document.getElementById("messageIdModal").value;
        if (messageId) {
            updateMessage(messageId);
        } else {
            createNewMessage();
        }
    });

    function createNewMessage() {
        const userId = localStorage.getItem("userId");
        const messageText = document.getElementById("messageTextModal").value;

        const data = {
            user_id: userId,
            message_text: messageText
        };

        fetchMethod(currentUrl + '/api/message', (responseStatus, responseData) => {
            if (responseStatus == 201) {
                alert("Message created successfully!");
                location.reload();
            } else {
                alert("Error creating message.");
            }
        }, "POST", data);
    }

    function updateMessage(messageId) {
        const currentUserID = localStorage.getItem("userId");
        const messageText = document.getElementById("messageTextModal").value;

        const data = {
            user_id: currentUserID,
            message_text: messageText
        };

        fetchMethod(currentUrl + `/api/message/${messageId}`, (responseStatus, responseData) => {
            if (responseStatus == 200) {
                alert("Message updated successfully!");
                location.reload();
            } else {
                alert("Error updating message.");
            }
        }, "PUT", data);
    }
