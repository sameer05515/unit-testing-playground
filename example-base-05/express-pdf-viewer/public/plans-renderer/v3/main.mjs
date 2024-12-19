export function fakePaint(headerText = "🥹🥹Text do na") {
  let root = document.getElementById("root");
  root.innerHTML = `<h2 class="text-xl font-bold text-center text-gray-800 mb-6">${headerText}</h2>`;
}
