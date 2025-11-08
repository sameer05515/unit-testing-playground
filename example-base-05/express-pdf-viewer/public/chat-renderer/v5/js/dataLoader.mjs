import { displayMessages } from "./ui.mjs"; 

export let jsonData = [];
export let currentConversationIndex = 0;

const snapshots = {
  v1: "/data/vandana-chatgpt-08-feb-2025-conversations.json",
  v2: "/data/prem-conversations-08-Feb-2025.json",
  v3: "/data/prem-conversations-23-May-2025.json",
};

export async function loadJSON(snapshotVersion = "") {
  try {
    const response = await fetch(snapshots[snapshotVersion]);
    jsonData = await response.json();
    displayMessages();
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}

export function getCurrentConversation() {
  return jsonData[currentConversationIndex] || null;
}

export function setCurrentConversationIndex(index) {
  currentConversationIndex = index;
}
