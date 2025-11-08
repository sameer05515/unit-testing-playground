import { delayForMS } from "./utils.mjs";

const generateBtn = document.getElementById("generateBtn");
const outputDiv = document.getElementById("output");
const messageDiv = document.getElementById("messageDiv");

async function generateTable(givenNum) {
  outputDiv.innerHTML = ""; // Clear previous table
  messageDiv.innerHTML = "";

  for (let i = 1; i <= 10; i++) {
    const row = document.createElement("p");
    row.textContent = `${givenNum} × ${i} = ${givenNum * i}`;
    row.classList.add("text-lg", "font-semibold", "text-gray-700", "py-1");

    outputDiv.appendChild(row);
    messageDiv.innerHTML = `🎯 ${givenNum} ka pahara generation in progress. ${i} daani likh liye`;

    await delayForMS(800);
  }
  messageDiv.innerHTML = `✅🎉 ${givenNum} ka pahara generation done. 😎😘😘😘`;
}

export function bootstrap(givenNum = 0) {
  if (Number.isInteger(givenNum) && givenNum > 0) {
    console.log("Vaild number: " + givenNum);
    generateBtn.innerHTML=`Generate Table for: ${givenNum}`
    generateBtn.addEventListener("click", () => generateTable(givenNum));
  } else {
    generateBtn.style.display = "none";
    outputDiv.innerHTML = "<h2>Please provide valid number</h2>";
  }
}
