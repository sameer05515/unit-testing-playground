// Original script - now available as Express API endpoint
// See server.js for the API implementation
// Use: GET http://localhost:3000/api/snapshots

const url =
  "https://raw.githubusercontent.com/sameer05515/microservices-playground/main/example-base-03/fontend/chat-gpt-conversation/src/common/utils/snapshots.json";

async function readJson() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

readJson();
