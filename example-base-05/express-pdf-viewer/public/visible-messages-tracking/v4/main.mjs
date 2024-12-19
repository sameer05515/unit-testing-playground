import { renderMessages } from "./ui.mjs";
import { scrollToTaggedMessage } from "./scroll.mjs";

// 🔹 Initialize
renderMessages();

// ✅ Delay scrolling until rendering is fully complete
setTimeout(scrollToTaggedMessage, 50);
