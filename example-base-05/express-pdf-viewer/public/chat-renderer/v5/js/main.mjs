import { loadJSON, setCurrentConversationIndex } from "./dataLoader.mjs";
import { prevPage, nextPage, prevConversation, nextConversation } from "./pagination.mjs";
import { toggleLogic } from "./toggle.mjs";

export const bootstrap = (snapshotVersion = "v3", selectedConvIndex = 0) => {
  document.getElementById("prevPageBtn").addEventListener("click", prevPage);
  document.getElementById("nextPageBtn").addEventListener("click", nextPage);

  document.getElementById("prevConversationBtn").addEventListener("click", prevConversation);
  document.getElementById("nextConversationBtn").addEventListener("click", nextConversation);

  setCurrentConversationIndex(selectedConvIndex);
  loadJSON(snapshotVersion);
};

document.addEventListener("DOMContentLoaded", () => toggleLogic());
