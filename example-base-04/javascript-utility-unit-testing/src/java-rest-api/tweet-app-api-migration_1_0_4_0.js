let token = "";

const fetchLoginToken = async (
  username = "sameer426",
  password = "India@123"
) => {
  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://127.0.0.1:8976/users/login", requestOptions);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.text(); // assuming the server returns JSON
    return result; // Return the token from the response
  } catch (error) {
    // console.error("Error occurred while fetching token:", error);
    throw error; // Re-throw error so the calling function can handle it
  }
};

const fetchResumeById = async (token, resumeId) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("uniqueId", resumeId);
  // myHeaders.append("Cookie", "JSESSIONID=4B72B7B2EB8F20A0167191D9AEB0B8BE");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  // fetch("http://127.0.0.1:8976/api/my-resume/get", requestOptions)
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.error(error));

  try {

    const response = await fetch("http://127.0.0.1:8976/api/my-resume/get", requestOptions);
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // assuming the server returns JSON
    return result; // Return the token from the response



  } catch (error) {
    // console.error("Error occurred while fetching token:", error);
    throw error; // Re-throw error so the calling function can handle it
  }
}

const main = async () => {
  try {
    // token = await fetchLoginToken("sameer4260000", "India@123");
    token = await fetchLoginToken("sameer426", "India@123");
    console.log("Token: ", token);

    const resume=await fetchResumeById(token, 'aaaaaa');
    console.log("Resume: ", resume);
  } catch (error) {
    console.log("Error occurred: ", error);
  }
};

main();
