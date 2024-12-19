import { loadJSON } from "./dataLoader.mjs";
import { displayMessages } from "./ui.mjs";
import { prevPage, nextPage } from "./pagination.mjs";
import { prevConversation, nextConversation } from "./pagination.mjs";

document.getElementById("prevPageBtn").addEventListener("click", prevPage);
document.getElementById("nextPageBtn").addEventListener("click", nextPage);

document.getElementById("prevConversationBtn").addEventListener("click", prevConversation);
document.getElementById("nextConversationBtn").addEventListener("click", nextConversation);

// loadJSON().then(displayMessages);
loadJSON();
