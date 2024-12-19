const formatUnixTimestamp = require("./formatUnixTimestamp");

// Capitalize the first letter of a string
const capitalizeFirstLetter = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : "");

// Helper to format the author
const formatAuthor = (role, metadata) => {
  if (role === "assistant") return "ChatGPT";
  if (role === "system" && metadata?.is_user_system_message) return "Custom user info";
  return capitalizeFirstLetter(role);
};

// function getConversationMessages(conversation) {
//   const messages = [];
//   let currentNode = conversation.current_node;

//   while (currentNode) {
//     let node = conversation.mapping[currentNode];
//     if (node.message && node.message.content?.parts?.length > 0 && node.message.author.role !== "system") {
//       let author = node.message.author.role === "assistant" ? "ChatGPT" : "User";
//       messages.push({ author, text: node.message.content.parts[0] });
//     }
//     currentNode = node.parent;
//   }

//   return messages.reverse();
// }

// Format messages for a conversation
const getConversationMessages = (conversation) => {
  const messages = [];
  let currentNode = conversation.current_node;
  while (currentNode !== null) {
    const node = conversation.mapping[currentNode];
    if (
      node.message &&
      node.message.content?.content_type === "text" &&
      node.message.content.parts?.[0]?.length &&
      (node.message.author.role !== "system" || node.message.metadata?.is_user_system_message)
    ) {
      messages.push({
        id: node.message.id,
        author: formatAuthor(node.message.author.role, node.message.metadata),
        isUserMessage: node.message.author.role === "user",
        content: node.message.content.parts[0],
        createdOn: node.message.create_time ? formatUnixTimestamp(node.message.create_time) : null,
        updatedOn: node.message.update_time ? formatUnixTimestamp(node.message.update_time) : null,
      });
    }
    currentNode = node.parent;
  }
  return messages.reverse();
};

module.exports = getConversationMessages;
