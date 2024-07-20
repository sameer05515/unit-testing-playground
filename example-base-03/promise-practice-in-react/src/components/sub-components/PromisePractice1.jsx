import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../utils/promises";

const PromisePractice1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {
    setLoading(true);
    setError(null);
    setMessage(() => `Loading User Data...`);
    setData(() => []);
    fetchUsers(200)
      .then((response) => {
        setData(response.data);
        setMessage(
          () =>
            `[Success]: RandomNumber: ${response.randomNumber}, User Data Loaded successfully!!`
        );
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setMessage(
          () => `[Error]: RandomNumber: ${error.randomNumber},${error.message}!`
        );
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Promise Practice: 1st Example</h1>

      <div>
        {`loading: ${loading}, error: ${JSON.stringify(
          error
        )}, (loading || error): ${loading || error}`}
      </div>

      {(loading || (error && error.message)) && <div>{message}</div>}
      <div>
        <button onClick={reload}>Reload</button>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromisePractice1;
