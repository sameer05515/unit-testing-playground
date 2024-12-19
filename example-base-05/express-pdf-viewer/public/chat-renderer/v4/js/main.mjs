import { loadJSON, setCurrentConversationIndex } from "./dataLoader.mjs";
import { displayMessages } from "./ui.mjs";
import { prevPage, nextPage } from "./pagination.mjs";
import { prevConversation, nextConversation } from "./pagination.mjs";

export const bootstrap = (snapshotVersion="v3",selectedConvIndex=0) => {
  document.getElementById("prevPageBtn").addEventListener("click", prevPage);
  document.getElementById("nextPageBtn").addEventListener("click", nextPage);

  document.getElementById("prevConversationBtn").addEventListener("click", prevConversation);
  document.getElementById("nextConversationBtn").addEventListener("click", nextConversation);

  setCurrentConversationIndex(selectedConvIndex);
  // loadJSON().then(displayMessages);
  loadJSON(snapshotVersion);
};



document.addEventListener("DOMContentLoaded", () => {
  // 🔅 Theme Toggle
  const themeToggle = document.getElementById("toggle-theme");
  const html = document.documentElement;

  if (localStorage.getItem("know-your-potential-theme") === "dark") {
    html.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("know-your-potential-theme", isDark ? "dark" : "light");
  });
});
