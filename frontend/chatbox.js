// ---------------- GROQ AI CONFIG ----------------

const CHAT_API_BASE='https://pawsomecareapp-production.up.railway.app/'
// ---------------- UI ELEMENTS ----------------
const chatIcon = document.querySelector(".chat-icon");
const chatbox = document.querySelector(".chatbox");
const btn = document.getElementById("btn");
const chatMessages = document.getElementById("chatMessages");
const input = document.getElementById("prompt");

// ---------------- OPEN CHATBOX ----------------
chatIcon.addEventListener("click", () => {
    chatbox.id = "chatbox_show";
});

// CLOSE when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".chatbox") && !e.target.closest(".chat-icon")) {
        chatbox.id = "";
    }
});

// Updated event listener
btn.addEventListener("click", askGroq);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") askGroq();
});

function addMessage(sender, text) {
    const msg = document.createElement("div");

    if (sender === "You") {
        msg.className = "chat-message-user";
    } else {
        msg.className = "chat-message-ai";
    }

    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ---------------- GEMINI AI REQUEST ----------------
// Updated the function name and API call
async function askGroq() {
    const prompt = input. value.trim();
    if (!prompt) return;

    addMessage("You", prompt);
    input.value = "";
    addMessage("Pawsome AI", "⏳ thinking...");

    try {
        const response = await fetch(`${CHAT_API_BASE}api/auth/askGroq`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt })
});
       

    if (!response.ok) {
              throw new Error("AI request failed");
          }


        const data = await response.json();
        chatMessages. lastChild.remove();

        // Parse Groq response format
       const aiText = data.reply ||
            "Sorry, I couldn't understand.";

        addMessage("Pawsome AI", aiText);

    } catch (err) {
        chatMessages.lastChild. remove();
        addMessage("Pawsome AI", "⚠️ Server error.");
        console.error(err);
    }
}



function createPawParticles() {
    for (let i = 0; i < 6; i++) {
        const paw = document.createElement("div");
        paw.classList.add("paw-particle");
        paw.style.left = (Math.random() * 90) + "vw";
        paw.style.top = (Math.random() * 80) + "vh";
        paw.style.animationDuration = (3 + Math.random() * 2) + "s";
        document.body.appendChild(paw);
    }
}

createPawParticles();

