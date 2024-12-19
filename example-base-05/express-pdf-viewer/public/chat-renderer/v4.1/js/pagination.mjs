import { displayMessages } from "./ui.mjs";
import { jsonData, setCurrentConversationIndex, getCurrentConversation } from "./dataLoader.mjs";

let currentPage = 0;
export const messagesPerPage = 5;

export function getCurrentPage() {
  return currentPage;
}

export function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    displayMessages();
  }
}

export function nextPage() {
  let conversation = getCurrentConversation();
  if (!conversation) return;

  let messages = conversation ? getConversationMessages(conversation) : [];
  if ((currentPage + 1) * messagesPerPage < messages.length) {
    currentPage++;
    displayMessages();
  }
}

export function prevConversation() {
  if (jsonData.length > 1 && getCurrentConversation()) {
    let currentIndex = jsonData.indexOf(getCurrentConversation());
    if (currentIndex > 0) {
      // setCurrentConversationIndex(currentIndex - 1);
      currentPage = 0; // Reset to first page
      // displayMessages();
      window.location.href=`/chat-viewer/v4.1?sVer=v3&convIdx=${currentIndex - 1}`
    }
  }
}

export function nextConversation() {
  if (jsonData.length > 1 && getCurrentConversation()) {
    let currentIndex = jsonData.indexOf(getCurrentConversation());
    if (currentIndex < jsonData.length - 1) {
      // setCurrentConversationIndex(currentIndex + 1);
      currentPage = 0; // Reset to first page
      displayMessages();
      window.location.href = `/chat-viewer/v4.1?sVer=v3&convIdx=${currentIndex + 1}`;
    }
  }
}
