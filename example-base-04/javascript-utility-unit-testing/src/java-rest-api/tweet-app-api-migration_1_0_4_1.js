let token = "";

// Helper function to create headers
const createHeaders = (additionalHeaders = {}) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...additionalHeaders,
  });
  return headers;
};

// Fetch JWT token on login
const fetchLoginToken = async (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({ username, password }),
    redirect: "follow",
  };

  try {
    const response = await fetch("http://127.0.0.1:8976/users/login", requestOptions);
    if (!response.ok) throw new Error(`Login failed! Status: ${response.status}`);
    return await response.text(); // Return token as text
  } catch (error) {
    throw new Error(`Error fetching login token: ${error.message}`);
  }
};

// Fetch resume by ID using JWT token
const fetchResumeById = async (token, resumeId) => {
  const requestOptions = {
    method: "GET",
    headers: createHeaders({
      Authorization: `Bearer ${token}`,
      uniqueId: resumeId,
    }),
    redirect: "follow",
  };

  try {
    const response = await fetch("http://127.0.0.1:8976/api/my-resume/get", requestOptions);
    if (!response.ok) throw new Error(`Failed to fetch resume! Status: ${response.status}`);
    return await response.json(); // Return resume data as JSON
  } catch (error) {
    throw new Error(`Error fetching resume: ${error.message}`);
  }
};

// Main function to handle the flow
const main = async () => {
  try {
    token = await fetchLoginToken("sameer426", "India@123");
    console.log("Token: ", token);

    const resume = await fetchResumeById(token, "aaaaaa");
    console.log("Resume: ", resume);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

main();
