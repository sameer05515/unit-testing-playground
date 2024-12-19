// Generate Dummy Messages
const messages = Array.from({ length: 500 }, (_, idx) => ({
    id: `msg-${idx + 1}`,
    content: `${idx + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
}));

const messageContainer = document.getElementById("messageContainer");

// 🔹 Load first visible message from localStorage
let firstVisibleMessageId = localStorage.getItem("firstVisibleMessageId") || null;

function renderMessages() {
    messageContainer.innerHTML = ""; // 🔥 Clear previous content

    messages.forEach((msg) => {
        const div = document.createElement("div");
        div.className = "p-3 border rounded bg-gray-50 shadow-sm my-2";
        div.textContent = msg.content;
        div.dataset.id = msg.id;
        messageContainer.appendChild(div);
    });

    // ✅ Ensure observer is set before scrolling
    setTimeout(() => {
        observeMessages();
        scrollToFirstVisibleMessage();
    }, 100);
}

// 🔹 Intersection Observer to track only the first visible message
const observer = new IntersectionObserver(
    (entries) => {
        let visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
            // 🔥 Take the first visible message
            firstVisibleMessageId = visibleEntries[0].target.dataset.id;
            localStorage.setItem("firstVisibleMessageId", firstVisibleMessageId);
        }
    },
    { threshold: 0.5 } // ✅ Message visible at 50% will be tracked
);

// 🔹 Observe all messages
function observeMessages() {
    document.querySelectorAll("#messageContainer > div").forEach((div) => observer.observe(div));
}

// 🔹 Scroll to first visible message (Only ONCE)
function scrollToFirstVisibleMessage() {
    if (firstVisibleMessageId) {
        const firstVisibleDiv = document.querySelector(`[data-id="${firstVisibleMessageId}"]`);
        if (firstVisibleDiv) {
            firstVisibleDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}

// 🔹 Initialize
renderMessages();
