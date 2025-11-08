export function getConversationMessages(conversation) {
  const messages = [];
  let currentNode = conversation.current_node;

  while (currentNode) {
    let node = conversation.mapping[currentNode];
    if (node.message && node.message.content?.parts?.length > 0 && node.message.author.role !== "system") {
      let author = node.message.author.role === "assistant" ? "ChatGPT" : "User";
      messages.push({ author, text: node.message.content.parts[0] });
    }
    currentNode = node.parent;
  }

  return messages.reverse();
}

// Format a UNIX timestamp into a readable date string
export const formatUnixTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
