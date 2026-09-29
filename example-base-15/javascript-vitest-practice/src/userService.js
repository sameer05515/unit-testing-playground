export async function getUser(id, fetchFn = fetch) {
  const response = await fetchFn(`https://example.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}

export function getUserDisplayName(user) {
  return `${user.firstName} ${user.lastName}`;
}
