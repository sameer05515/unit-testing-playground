import apiRequest from "../../../common/apiRequest.mjs";

export function renderTable(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error("Invalid or empty data array.");
    return null;
  }

  const container = document.createElement("div");
  container.className = "overflow-x-auto p-4";

  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg text-xs";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.className = "bg-gray-200 text-gray-700";

  const headers = Object.keys(dataArray[0]);
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header.toUpperCase();
    th.className = "border border-gray-300 px-2 py-1 text-left font-semibold";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  dataArray.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 === 0 ? "bg-gray-100" : "bg-white";

    headers.forEach((header) => {
      const td = document.createElement("td");
      //
      if (header === "slug") {
        td.innerHTML = `<a href="/analyse-cgpt/api/itr2/snapshots/s/${item.slug}">${item[header]}</a>`;
      } else {
        td.textContent = item[header];
      }

      td.className = "border border-gray-300 px-2 py-1";
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
  return container;
}

function goToConv(sVer, convId) {
  window.location.href = `/analyse-cgpt/api/itr2/snapshots/s/${sVer}/c/${convId}`;
}

//////////////////
const highlightCode = () => hljs.highlightAll();
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function displayMessages({ messages, nextConvId, prevConvId }, sVer = "v3", convId) {
  let root = document.getElementById("root");
  root.innerHTML = "";

  console.log("messages : ", messages);
  document.getElementById("prevConversationBtn").addEventListener("click", () => goToConv(sVer, prevConvId));
  document.getElementById("nextConversationBtn").addEventListener("click", () => goToConv(sVer, nextConvId));

  // if (jsonData.length === 0) return;

  // let conversation = getCurrentConversation();
  // if (!conversation) return;

  // const createdOn = conversation.create_time ? formatUnixTimestamp(conversation.create_time) : null;
  // const updatedOn = conversation.update_time ? formatUnixTimestamp(conversation.update_time) : null;

  // let messages = getConversationMessages(conversation);
  // let start = getCurrentPage() * messagesPerPage;
  // let end = start + messagesPerPage;
  // let paginatedMessages = messages.slice(start, end);

  let messageDivCount = 0;

  messages.forEach((msg) => {
    let messageDiv = document.createElement("div");
    if (msg.author && msg.author.toLowerCase() !== "user") {
      messageDiv.className = "p-3 border rounded-md bg-gray-200";
      // messageDiv.style.textWrap = "break-word";
      messageDiv.innerHTML = `
<span class="font-bold">${messageDivCount}<br/>${msg.author}:</span> 
<div class="prose dark:prose-invert overflow-x-auto max-w-full">
${marked.parse(msg.text || "")}
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

  // document.getElementById("prevPageBtn").disabled = getCurrentPage() === 0;
  // document.getElementById("nextPageBtn").disabled = end >= messages.length;
  // document.getElementById("pageNavigationBtnContainer").style.display = "none";
  // // document.getElementById("nextPageBtn").style.display = "none";

  // document.getElementById("prevConversationBtn").disabled = currentConversationIndex === 0;
  // document.getElementById("nextConversationBtn").disabled = currentConversationIndex >= jsonData.length - 1;

  // document.getElementById("conversationIndex").innerHTML = `[ ${currentConversationIndex + 1} / ${
  //   jsonData.length
  // } ] - ${conversation.title} <br/>
  // Total messages: ${messages.length}, Created: ${createdOn}, Last Updated: ${updatedOn}
  // `;
  highlightCode();
}

////////////////

export function bootstrap(sVer = "v3", convId) {
  console.log("sVer : ", sVer, " convId : ", convId);
  apiRequest("/analyse-cgpt/api/itr2/snapshots/s/" + sVer + "/c/" + convId, { headers: { accept: "application/json" } })
    .then((data) => {
      // console.log("DATA: ", data);
      displayMessages(data, sVer, convId);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

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
