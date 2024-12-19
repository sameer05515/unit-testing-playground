// Generate Dummy Messages
const messages = Array.from({ length: 500 }, (_, idx) => ({
    id: `msg-${idx + 1}`,
    content: `${idx + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`
}));

const messageContainer = document.getElementById("messageContainer");

// 🔹 Load messages on page load based on localStorage
const visibleMessages = new Set(JSON.parse(localStorage.getItem("visibleMessages")) || []);

function renderMessages() {
    messageContainer.innerHTML = ""; // Clear before rendering
    messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "p-3 border rounded bg-gray-50 shadow-sm";
        div.textContent = msg.content;
        div.dataset.id = msg.id;
        messageContainer.appendChild(div);
        
        // If the message was visible before, mark it
        if (visibleMessages.has(msg.id)) {
            div.classList.add("bg-green-200");
        }
    });
}

// 🔹 Intersection Observer to track visibility
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const msgId = entry.target.dataset.id;
        if (entry.isIntersecting) {
            visibleMessages.add(msgId);
        } else {
            visibleMessages.delete(msgId);
        }
        localStorage.setItem("visibleMessages", JSON.stringify([...visibleMessages]));
    });
}, { threshold: 0.5 });

// 🔹 Observe all messages
function observeMessages() {
    document.querySelectorAll("#messageContainer > div").forEach(div => observer.observe(div));
}

// 🔹 Initialize
renderMessages();
observeMessages();
