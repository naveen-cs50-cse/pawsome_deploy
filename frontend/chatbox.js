// ---------------- GEMINI AI CONFIG ----------------


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

// ---------------- SEND MESSAGE ----------------
btn.addEventListener("click", askGemini);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") askGemini();
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
async function askGemini() {
    const prompt = input.value.trim();
    if (!prompt) return;

    addMessage("You", prompt);
    input.value = "";
    addMessage("Pawsome AI", "⏳ thinking...");

    try {
        const response = await fetch("http://127.0.0.1:5001/api/auth/askGemini", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt })
});


        const data = await response.json();
        chatMessages.lastChild.remove();

        const aiText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn’t understand.";

        addMessage("Pawsome AI", aiText);

    } catch (err) {
        chatMessages.lastChild.remove();
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

