// Generate Dummy Messages
const messages = Array.from({ length: 500 }, (_, idx) => ({
    id: `msg-${idx + 1}`,
    content: `${idx + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
}));

const messageContainer = document.getElementById("messageContainer");

// 🔹 Load tagged message from localStorage
let taggedMessageId = localStorage.getItem("taggedMessageId") || null;

function renderMessages() {
    messageContainer.innerHTML = ""; // 🔥 Clear previous content

    messages.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "p-3 border rounded bg-gray-50 shadow-sm my-2 flex justify-between items-center";
        div.dataset.id = msg.id;

        // Message Content
        const contentDiv = document.createElement("span");
        contentDiv.textContent = msg.content;

        // 📌 "Tag This" Button
        const tagButton = document.createElement("button");
        tagButton.textContent = "📌 Tag This";
        tagButton.className = "px-3 py-1 bg-blue-500 text-white rounded";
        tagButton.onclick = () => tagMessage(msg.id);

        // Append Elements
        div.appendChild(contentDiv);
        div.appendChild(tagButton);
        messageContainer.appendChild(div);
    });

    // ✅ Delay scrolling until rendering is fully complete
    setTimeout(scrollToTaggedMessage, 50);
}

// 🔹 Tag a message manually
function tagMessage(msgId) {
    taggedMessageId = msgId;
    localStorage.setItem("taggedMessageId", taggedMessageId);
}

// 🔹 Scroll to the tagged message (if exists)
function scrollToTaggedMessage() {
    if (taggedMessageId) {
        const taggedDiv = document.querySelector(`[data-id="${taggedMessageId}"]`);
        if (taggedDiv) {
            taggedDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

// 🔹 Initialize
renderMessages();
