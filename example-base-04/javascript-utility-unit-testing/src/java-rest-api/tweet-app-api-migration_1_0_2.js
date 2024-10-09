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

  return fetch("http://127.0.0.1:8976/users/login", requestOptions).then(
    (response) => response.text()
  );
  // .then((result) => console.log(result))
  // .catch((error) => console.error(error));
};

const main = async () => {
  try {
    const token = await fetchLoginToken("sameer4260000", "India@123");
    console.log("Token: ", token);
  } catch (error) {
    console.log("Error occured: ", error);
  }
};

main();
