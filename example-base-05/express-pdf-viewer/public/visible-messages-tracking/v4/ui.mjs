import { messages } from "./messages.mjs";
import { getTaggedMessageId, setTaggedMessageId } from "./storage.mjs";

export const messageContainer = document.getElementById("messageContainer");

export function renderMessages() {
    const taggedMessageId = getTaggedMessageId();
    messageContainer.innerHTML = ""; // 🔥 Clear previous content

    messages.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "p-3 border rounded bg-gray-50 shadow-sm my-2 flex justify-between items-center relative";
        div.dataset.id = msg.id;

        // Message Content
        const contentDiv = document.createElement("span");
        contentDiv.textContent = msg.content;

        // Tag Button
        const tagButton = document.createElement("button");
        tagButton.className = "absolute right-3 px-3 py-1 text-white rounded transition-opacity";

        if (msg.id === taggedMessageId) {
            tagButton.textContent = "📍"; // Already tagged
            tagButton.classList.add("bg-gray-500", "cursor-default");
        } else {
            tagButton.textContent = "🔖"; // Show tag icon
            tagButton.classList.add("bg-blue-500", "hover:bg-blue-600");
            tagButton.style.opacity = "0"; // Initially hidden
            tagButton.onclick = () => tagMessage(msg.id);
        }

        // Show tag button on hover (if not already tagged)
        div.addEventListener("mouseenter", () => {
            if (msg.id !== taggedMessageId) tagButton.style.opacity = "1";
        });
        div.addEventListener("mouseleave", () => {
            if (msg.id !== taggedMessageId) tagButton.style.opacity = "0";
        });

        // Append Elements
        div.appendChild(contentDiv);
        div.appendChild(tagButton);
        messageContainer.appendChild(div);
    });
}

function tagMessage(msgId) {
    setTaggedMessageId(msgId);
    renderMessages(); // Re-render to update UI
}
