const STORAGE_KEY = "taggedMessageId";

export function getTaggedMessageId() {
  return localStorage.getItem(STORAGE_KEY) || null;
}

export function setTaggedMessageId(msgId) {
  localStorage.setItem(STORAGE_KEY, msgId);
}
