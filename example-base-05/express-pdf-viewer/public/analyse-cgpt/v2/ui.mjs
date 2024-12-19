import apiRequest from "../../common/apiRequest.mjs";
import { renderTable } from "./renderStep1Table.mjs";

apiRequest("/analyse-cgpt/api/step-1-fetch-all-snapshot-names/itr2")
  .then((data) => {
    document.getElementById("messageDiv").innerText = JSON.stringify(data, null, 2);
    const tableContainer = document.getElementById("table-container");
    const tableElement = renderTable(data.step1); // Call function from ui.js
    if (tableElement) {
      tableContainer.appendChild(tableElement);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    document.getElementById("messageDiv").innerText = JSON.stringify(error, null, 2);
  });
