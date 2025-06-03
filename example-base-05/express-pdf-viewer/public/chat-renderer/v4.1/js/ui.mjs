import { jsonData, getCurrentConversation, currentConversationIndex } from "./dataLoader.mjs";
import { formatUnixTimestamp, getConversationMessages } from "./utils.mjs";
import { getCurrentPage, messagesPerPage } from "./pagination.mjs";
// import {  } from "./dataLoader.mjs";
// import { marked } from "marked";

const highlightCode = () => hljs.highlightAll();
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function displayMessages() {
  let root = document.getElementById("root");
  root.innerHTML = "";

  if (jsonData.length === 0) return;

  let conversation = getCurrentConversation();
  if (!conversation) return;

  const createdOn = conversation.create_time ? formatUnixTimestamp(conversation.create_time) : null;
  const updatedOn = conversation.update_time ? formatUnixTimestamp(conversation.update_time) : null;

  let messages = getConversationMessages(conversation);
  let start = getCurrentPage() * messagesPerPage;
  let end = start + messagesPerPage;
  let paginatedMessages = messages.slice(start, end);

  let messageDivCount = 0;

  messages.forEach((msg) => {
    let messageDiv = document.createElement("div");
    if (msg.author && msg.author.toLowerCase() !== "user") {
      messageDiv.className = "p-3 border rounded-md bg-gray-200";
      // messageDiv.style.textWrap = "break-word";
      messageDiv.innerHTML = `
<span class="font-bold">${messageDivCount}<br/>${msg.author}:</span> 
<div class="prose dark:prose-invert overflow-x-auto max-w-full">
${marked.parse(msg.text)}
</div>`;
    } else {
      messageDivCount++;
      messageDiv = document.createElement("pre");
      messageDiv.className = "p-3 border rounded-md bg-red-200 whitespace-pre-wrap";
      // messageDiv.style.whiteSpace = "pre-wrap";
      // messageDiv.style.textWrap = "break-word";
      // messageDiv.innerHTML = `<span class="font-bold">${msg.author}:</span> ${msg.text}`;
      // messageDiv.innerText = `<div class="whitespace-pre-wrap">${msg.text}</div>`;
      messageDiv.innerText = `${messageDivCount}\n${msg.text}`;
    }

    root.appendChild(messageDiv);
  });

  document.getElementById("prevPageBtn").disabled = getCurrentPage() === 0;
  document.getElementById("nextPageBtn").disabled = end >= messages.length;
  document.getElementById("pageNavigationBtnContainer").style.display = "none";
  // document.getElementById("nextPageBtn").style.display = "none";

  document.getElementById("prevConversationBtn").disabled = currentConversationIndex === 0;
  document.getElementById("nextConversationBtn").disabled = currentConversationIndex >= jsonData.length - 1;

  document.getElementById("conversationIndex").innerHTML = `[ ${currentConversationIndex + 1} / ${
    jsonData.length
  } ] - ${conversation.title} <br/> 
  http://localhost:3000/analyse-cgpt/api/itr2/snapshots/s/v35/c/${conversation.id}<br/>
  Total messages: ${messages.length}, Created: ${createdOn}, Last Updated: ${updatedOn}
  `;
  highlightCode();
}
