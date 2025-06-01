import apiRequest from "../../../common/apiRequest.mjs";

export function renderTable(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error("Invalid or empty data array.");
    return null;
  }

  // Create the table container div
  const container = document.createElement("div");
  container.className = "overflow-x-auto p-4";

  // Create the table element
  const table = document.createElement("table");
  table.className = "w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg text-xs";

  // Create the table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.className = "bg-gray-200 text-gray-700";

  // Extract keys from first object for headers
  const headers = Object.keys(dataArray[0]);
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header.toUpperCase();
    th.className = "border border-gray-300 px-2 py-1 text-left font-semibold";
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create the table body
  const tbody = document.createElement("tbody");
  dataArray.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = index % 2 === 0 ? "bg-gray-100" : "bg-white";

    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = item[header];
      td.className = "border border-gray-300 px-2 py-1";
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
  return container;
}

export function bootstrap(message = []) {
  apiRequest("/analyse-cgpt/api/itr2/snapshots", { headers: { accept: "application/json" } })
    .then((data) => {
      document.getElementById("messageDiv").innerText = JSON.stringify(data, null, 2);
      const tableContainer = document.getElementById("table-container");
      const tableElement = renderTable(data); // Call function from ui.js
      if (tableElement) {
        tableContainer.appendChild(tableElement);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("messageDiv").innerText = JSON.stringify(error, null, 2);
    });
}
