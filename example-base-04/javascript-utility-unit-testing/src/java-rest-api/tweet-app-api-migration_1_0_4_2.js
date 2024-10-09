let token = "";

// Helper function to create headers
const createHeaders = (additionalHeaders = {}) => {
  return new Headers({
    "Content-Type": "application/json",
    ...additionalHeaders,
  });
};

// Generic function to make API requests
const apiRequest = async (url, method, body = null, headers = {}, token = null) => {
  const requestHeaders = createHeaders(headers);
  if (token) requestHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method,
    headers: requestHeaders,
    redirect: "follow",
  };

  if (body) requestOptions.body = JSON.stringify(body);

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Request failed! Status: ${response.status}`);
    }
    return await response.json(); // Assuming JSON response for all
  } catch (error) {
    throw new Error(`Error making API request: ${error.message}`);
  }
};

// Fetch JWT token on login
const fetchLoginToken = async (username, password) => {
  const url = "http://127.0.0.1:8976/users/login";
  const body = { username, password };
  try {
    const responseText = await apiRequest(url, "POST", body);
    return responseText; // Token is returned as text
  } catch (error) {
    throw new Error(`Error fetching login token: ${error.message}`);
  }
};

// Fetch resume by ID using JWT token
const fetchResumeById = async (token, resumeId) => {
  const url = "http://127.0.0.1:8976/api/my-resume/get";
  const headers = { uniqueId: resumeId };
  try {
    return await apiRequest(url, "GET", null, headers, token);
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
