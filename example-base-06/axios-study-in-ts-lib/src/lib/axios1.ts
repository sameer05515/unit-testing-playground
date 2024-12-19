import axios from "axios";
import { BASE_URL } from "../constants/Global";
import { Node } from "../constants/Types";

const node: Node = {
  uniqueId: "12345",
  metadata: {
    hhh: "12345",
  },
};

export const run = () => {
  //   getAllNodes();
  postNode();
};

export const getAllNodes = () => {
  // Make a request for a user with a given ID
  axios
    .get(`${BASE_URL}`)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export const postNode = () => {
  axios
    .post(BASE_URL, node)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      if (axios.isAxiosError(error)) {
        console.log(
          "axios error Response: ",
          JSON.stringify(error.response, null, 2)
        );
      }
    })
    .finally(function () {
      // always executed
    });
};
