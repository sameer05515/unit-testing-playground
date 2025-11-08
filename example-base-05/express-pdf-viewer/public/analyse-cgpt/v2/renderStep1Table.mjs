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

// // Sample usage:
// const sampleData = [
//     {
//         "id": "CONVERSATIONS_23_MAY_2023",
//         "order": 1,
//         "location": "/data/sample-conversations1.json",
//         "isLatest": false,
//         "createdOn": "2023-05-22",
//         "createdBy": "PREMENDRA"
//     }
// ];

// // Append the table to the body (for testing)
// document.body.appendChild(renderTable(sampleData));
