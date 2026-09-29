export async function fetchUsers() {
  const response = await fetch("https://example.com/api/users");

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
