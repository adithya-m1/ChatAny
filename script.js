const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.aimlapi.com/chat/completions";
let API_KEY = "c0041d49427a4aeaafe4ac77a232aed7";
console.log("Message Bar:", messageBar); // Check if messageBar is found
console.log("Send Button:", sendBtn); // Check if sendBtn is found
console.log("Message Box:", messageBox); // Check if messageBox is found

sendBtn.onclick = function() {
    if (messageBar.value.length > 0) {
        // Add the user's message to the chat box
        let message = `
            <div class="chat message">
                <img src="images/user.jpg" alt="User">
                <span>${messageBar.value}</span>
            </div>`;
        
        // Placeholder for the bot's loading message with a new class "new" for easy targeting
        let response = `
            <div class="chat response new">
                <img src="images/chatbot.jpg" alt="Chatbot">
                <span>Loading.......</span>
            </div>`;

        // Append the user's message and bot's loading message to the chat box
        messageBox.insertAdjacentHTML("beforeend", message);
        messageBox.insertAdjacentHTML("beforeend", response);

        // Prepare the request options for the AIML API
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-4-turbo",
                "messages": [
                    { "role": "user", "content": messageBar.value }
                ]
            })
        };

        // Call the AIML API and handle the response
        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Get the response element with class "new" and update it with the API's response
                const chatBotResponse = document.querySelector(".response.new span");
                if (data.choices && data.choices[0] && data.choices[0].message.content) {
                    chatBotResponse.innerHTML = data.choices[0].message.content;
                } else {
                    chatBotResponse.innerHTML = "No response from chatbot.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Display error message in case of a failure
                const chatBotResponse = document.querySelector(".response.new span");
                chatBotResponse.innerHTML = "Oops! An error occurred. Please try again later.";
            });

        // Clear the message bar after sending
        messageBar.value = "";
    }
};
