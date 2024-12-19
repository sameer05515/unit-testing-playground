import { jsonData, getCurrentConversation, currentConversationIndex } from "./dataLoader.mjs";
import { getConversationMessages } from "./utils.mjs";
import { getCurrentPage, messagesPerPage } from "./pagination.mjs";
// import {  } from "./dataLoader.mjs";
// import { marked } from "marked";

export function displayMessages() {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (jsonData.length === 0) return;

  let conversation = getCurrentConversation();
  if (!conversation) return;

  let messages = getConversationMessages(conversation);
  let start = getCurrentPage() * messagesPerPage;
  let end = start + messagesPerPage;
  let paginatedMessages = messages.slice(start, end);

  messages.forEach((msg) => {
    let messageDiv = document.createElement("div");
    if (msg.author && msg.author.toLowerCase() !== "user") {
      messageDiv.className = "p-3 border rounded-md bg-gray-200";
      messageDiv.style.textWrap = "break-word";
      messageDiv.innerHTML = `<span class="font-bold">${msg.author}:</span> ${marked.parse(msg.text)}`;
    } else {
      messageDiv = document.createElement("pre");
      messageDiv.className = "p-3 border rounded-md bg-red-200";
      messageDiv.style.whiteSpace = "pre-wrap";
      messageDiv.style.textWrap = "break-word";
      // messageDiv.innerHTML = `<span class="font-bold">${msg.author}:</span> ${msg.text}`;
      messageDiv.innerText = `${msg.text}`;
    }

    root.appendChild(messageDiv);
  });

  document.getElementById("prevPageBtn").disabled = getCurrentPage() === 0;
  document.getElementById("nextPageBtn").disabled = end >= messages.length;

  document.getElementById("prevConversationBtn").disabled = currentConversationIndex === 0;
  document.getElementById("nextConversationBtn").disabled = currentConversationIndex >= jsonData.length - 1;

  document.getElementById("conversationIndex").textContent = `Conversation ${currentConversationIndex + 1} of ${
    jsonData.length
  }`;
}
