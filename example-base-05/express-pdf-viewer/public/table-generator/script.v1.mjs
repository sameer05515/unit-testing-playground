const generateBtn = document.getElementById("generateBtn");
const outputDiv = document.getElementById("output");

async function generateTable() {
  outputDiv.innerHTML = ""; // Clear previous table

  for (let i = 1; i <= 10; i++) {
    const row = document.createElement("p");
    row.textContent = `2 × ${i} = ${2 * i}`;
    row.classList.add("text-lg", "font-semibold", "text-gray-700", "py-1");

    outputDiv.appendChild(row);
    
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms delay
  }
}

generateBtn.addEventListener("click", generateTable);
