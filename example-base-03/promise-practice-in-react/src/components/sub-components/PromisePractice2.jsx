import React, { useState, useEffect } from "react";
import { fetchUsers } from "../../utils/promises";
import { PROMISE_STATUS_CONSTANTS as STATUS_CONSTANTS } from "../../utils/global-constants";

const initialState = {
  status: "idle",
  error: null,
  message: "",
};

const PromisePractice2 = () => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(initialState);

  useEffect(() => {
    reload();
  }, []);

  const reload = () => {

    setData(() => []);

    setResponse((prev) => ({
      ...prev,
      status: STATUS_CONSTANTS.LOADING,
      error: null,
      message: `Loading User Data...`,
    }));

    
    fetchUsers(200)
      .then((response) => {

        setData(response.data);

        setResponse((prev) => ({
          ...prev,
          status: STATUS_CONSTANTS.SUCCESS,
          error: null,
          message: `[Success]: RandomNumber: ${response.randomNumber}, User Data Loaded successfully!!`,
        }));
      })
      .catch((error) => {

        setResponse((prev) => ({
          ...prev,
          status: STATUS_CONSTANTS.ERROR,
          error: error,
          message: `[Error]: RandomNumber: ${error.randomNumber},${error.message}!`,
        }));
      });
  };

  return (
    <div>
      <h1>
        Promise Practice: 2nd Example: Combined state for response and its state
      </h1>
      
      {response &&
        response.status &&
        [
          STATUS_CONSTANTS.LOADING,
          STATUS_CONSTANTS.ERROR,
          STATUS_CONSTANTS.SUCCESS,
        ].includes(response.status) && <div>{response.message}</div>}
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

export default PromisePractice2;
