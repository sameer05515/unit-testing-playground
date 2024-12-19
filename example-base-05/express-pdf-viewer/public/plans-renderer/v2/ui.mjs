import { ChatGPTETLPipeline } from "./Repository.mjs";

function getHeader(headerText = "") {
  return `<h2 class="text-xl font-bold text-center text-gray-800 mb-6">${headerText}</h2>`;
}

function getStep(step) {
  let stepEl = `
    <div class="relative p-4 bg-blue-100 border-l-4 border-blue-500 rounded shadow">
        <h3 class="font-semibold text-blue-800">${step.name}</h3>
        <p class="text-sm text-gray-700">${step.description}</p>
      </div>
    `;
  return stepEl;
}

function getArrow() {
  return '<div class="text-center text-gray-500 my-3">⬇️</div>';
}

function getCompletionMessage(message) {
  return `
    <div class="text-center text-gray-700 mt-6 text-sm">
        ${message}
      </div>
    `;
}

export function paint() {
  let root = document.getElementById("root");
  root.innerHTML = "";
  root.innerHTML += getHeader(ChatGPTETLPipeline.title);
  ChatGPTETLPipeline.steps.forEach((step, idx) => {
    root.innerHTML += getStep(step);
    if (idx < ChatGPTETLPipeline.steps.length - 1) {
      root.innerHTML += getArrow();
    }
  });

  root.innerHTML += getCompletionMessage(ChatGPTETLPipeline.completionMessage);
}
