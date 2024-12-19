import { getTaggedMessageId } from "./storage.mjs";

export function scrollToTaggedMessage() {
    const taggedMessageId = getTaggedMessageId();
    if (taggedMessageId) {
        const taggedDiv = document.querySelector(`[data-id="${taggedMessageId}"]`);
        if (taggedDiv) {
            taggedDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }
}
