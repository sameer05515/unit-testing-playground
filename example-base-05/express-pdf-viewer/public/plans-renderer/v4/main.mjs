export function fakePaint(planId = "🥹🥹Text do na") {
  let root = document.getElementById("root");
  // console.log("headerText>>>>   '", headerText, "'");
  if (!planId || planId.trim().length < 1) {
    root.innerHTML = `<h2 class="text-xl font-bold text-center text-red-800 mb-6">🥹🥹Please provide valid Plan id</h2>`;
    return;
  }
  root.innerHTML = `<h2 class="text-xl font-bold text-center text-gray-800 mb-6">${planId}</h2>`;
}
