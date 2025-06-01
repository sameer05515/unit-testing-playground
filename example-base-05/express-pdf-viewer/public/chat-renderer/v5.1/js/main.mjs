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

export function bootstrap() {
  apiRequest("/analyse-cgpt/api/itr2/snapshots", { headers: { accept: "application/json" } })
    .then((data) => {
      // const messageDiv = document.getElementById("messageDiv");
      console.log("DATA: ", data);
      const tableContainer = document.getElementById("table-container");

      // messageDiv.textContent = JSON.stringify(data, null, 2);

      // Clear previous table if any
      tableContainer.innerHTML = "";

      const tableElement = renderTable(data);
      if (tableElement) {
        tableContainer.appendChild(tableElement);
      } else {
        tableContainer.textContent = "No data to display.";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // const messageDiv = document.getElementById("messageDiv");
      // messageDiv.textContent = "Error: " + JSON.stringify(error, null, 2);
    });
}
