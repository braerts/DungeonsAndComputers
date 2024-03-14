const apiEndpoint = "https://api.openai.com/v1/chat/completions"; //API Engine
var apiKey; //API Key

//Beginprompt

systemMessage = "You’re no longer a normal friendly assistant. You are now my DungeonMaster for a brand new D&D5e based campaign called Lost mines of phandelver. You will be my DungeonMaster. You should tell me what to do, including when my die rolls are needed. Ask me questions as needed, for example, who my character is and the result my die rolls. You will act fully as the DM and run the game. If you need me to roll Ask and use the following template |Roll 1D20|. You will now need to ask me to create a character sheet, send me a list of things you need to know to create the character sheet and once its done send the total sheet in a nice format in the chat box. Please note that players can AT MOST have 75 points across all scores combined. Tell me the total combined score of all my skills after I tell you what the values are, if I ask you to add any more then that just tell me that it is to many points and do not allow me to NO EXCEPTION. Use the previous conversation to give an as accurate as possible dungeons and dragons single player experience.";
waiting = false;
const loadingIcon = document.getElementById("loading-icon");

//Stuurt je message naar de ChatGPT API samen met de chat geschiedenis, laat een loading icon zien, en print deze zodra er een reactie op terug komt.

async function sendMessage(override) {
    const userMessage = userInput.value.trim();
    waiting = true;

    //Maakt de loading icon zichtbaar
    loadingIcon.style.display = "block";

    if (userMessage === "") {
        //Maakt de loading icon weer onzichtbaar
        loadingIcon.style.display = "none";
        return;
    }

    chatOutput.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = "";
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                  {
                    "role": "system",
                    "content": systemMessage
                  },
                  {
                    "role": "user",
                    "content": userMessage
                  }
                ]
              }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const chatMessage = data.choices[0].message.content.trim();
        chatOutput.innerHTML += `<p><strong>Dungeon Master:</strong> ${chatMessage}</p>`;

        chatOutput.scrollTop = chatOutput.scrollHeight;

        //Zorgt dat chatGPT de volledige context van de chat heeft
        systemMessage = systemMessage + "\n\n" + userMessage + "\n\n" + chatMessage;
        waiting = false;
        console.log(systemMessage);
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
      //Verstop de loading icon weer
      loadingIcon.style.display = "none";
      waiting = false;
  }
}

const chatOutput = document.getElementById("chat-output");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const saveButton = document.getElementById("save-button");
const keyButton = document.getElementById("token-button");
const newApiKey = document.getElementById("token-input");

//Code voor de "Send" knop

sendButton.addEventListener("click", sendMessage);
keyButton.addEventListener("click", newApi);
saveButton.addEventListener("click", () => exportLogs(systemMessage));
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function newApi() {
    apiKey = newApiKey.value.trim();
    console.log(newApiKey);
    console.log(apiKey);
}

//Maakt een Json file met alle tekst die uitgewisseld is tussen chatgpt en de speler

function exportLogs(logs) {
  const originalData = {
    logs
  };
  
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(originalData, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", "logs.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

//Deze code zorgt er voor dat ik json files kan uploaden en dat deze de systemMessage variable overwrite.
const uploadButton = document.getElementById("upload-button");
const uploadFileInput = document.getElementById("uploadFile");

uploadButton.addEventListener("click", () => uploadFileInput.click());
uploadFileInput.addEventListener("change", handleFile);

function handleFile(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                if (jsonData && jsonData.logs) {
                    systemMessage = jsonData.logs;
                    console.log("System message updated:", systemMessage);
                    chatOutput.innerHTML = `<p><strong>UPLOADED:</strong> ${systemMessage}</p>`;
                } else {
                    console.error("Invalid JSON format.");
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
    }
}

//voegt de dice.js file toe
var diceScript = document.createElement('script');
diceScript.src = 'Dice.js';
document.head.appendChild(diceScript);
