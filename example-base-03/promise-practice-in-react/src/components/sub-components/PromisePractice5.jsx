import React, { useState, useEffect } from "react";
import { fetchUserAttendanceForDateRange, fetchUserDetailsForEmpCode, fetchUsers } from "../../utils/promises";
import {
  getStylesForPromiseStatusType,
  PROMISE_STATUS_CONSTANTS,
} from "../../utils/global-constants";
import ContainerComponent from "../../common/ContainerComponent";

const initialState = {
  status: PROMISE_STATUS_CONSTANTS.IDLE,
  message: "",
};

const TIMEOUT_IN_MS = 2;

const PromisePractice5 = () => {
  const [usersData, setUsersData] = useState([]);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [userAttendanceDetails, setUserAttendanceDetails] = useState([]);
  const [promiseResponse, setPromiseResponse] = useState(initialState);

  useEffect(() => {
    reload();
  }, []);

  const flushOldData = (flushUserList = true) => {
    if (flushUserList) {
      setUsersData(() => []);
    }
    setUserDetailsData(() => null);
    setUserAttendanceDetails(() => []);
    console.clear();
  };

  const updatePromiseResponse = (
    status = "",
    message = "",
    randomNumber = 0
  ) => {
    if (status && message) {
      setPromiseResponse((prev) => ({
        ...prev,
        status: status,
        message: `[${status.toUpperCase()}]: ${message} ${randomNumber ? `, RandomNumber: ${randomNumber},` : ""
          } `,
      }));
    }
  };

  const handleUserDataResponse = (usersDataResponse) => {
    const firstUserData = usersDataResponse.data && usersDataResponse.data.length > 0
      ? usersDataResponse.data[0]
      : null;

    setUsersData(usersDataResponse.data);
    updatePromiseResponse(
      PROMISE_STATUS_CONSTANTS.SUCCESS,
      usersDataResponse.message,
      usersDataResponse.randomNumber
    );

    return firstUserData;
  };

  const handleUserDetailsResponse = (userDetailsResponse) => {
    setUserDetailsData(userDetailsResponse.data);
    // updatePromiseResponse(
    //   PROMISE_STATUS_CONSTANTS.LOADING,
    //   `User Details Data...`
    // );
    updatePromiseResponse(
      PROMISE_STATUS_CONSTANTS.SUCCESS,
      userDetailsResponse.message,
      userDetailsResponse.randomNumber
    );
  };

  const handleUserAttendanceDetailsResponse = (userAttendanceDetailsResponse) => {
    setUserAttendanceDetails(userAttendanceDetailsResponse.data);
    updatePromiseResponse(
      PROMISE_STATUS_CONSTANTS.SUCCESS,
      userAttendanceDetailsResponse.message,
      userAttendanceDetailsResponse.randomNumber
    );
  }

  const handleError = (error) => {
    updatePromiseResponse(
      PROMISE_STATUS_CONSTANTS.ERROR,
      error.message,
      error.randomNumber
    );
    throw new Error(`[${new Date()}]: Stopping execution due to error: ${error.message}`);
  };

  const reload = () => {
    flushOldData(true);

    console.log("1. Users list is started to fetch");

    updatePromiseResponse(PROMISE_STATUS_CONSTANTS.LOADING, `User List...`);

    let firstUserData = null;

    let promiseChain = Promise.resolve();

    promiseChain = promiseChain.then(() => {
      console.log("2. fetchUsers promise is starting");

      return fetchUsers(TIMEOUT_IN_MS)
        .then(handleUserDataResponse)
        .then((userData) => {
          firstUserData = userData;
        })
        .catch(handleError);
    });

    promiseChain = promiseChain.then(() => {
      console.log("3. Starting to fetch User details for: ", `'${firstUserData.employeeCode}'`);

      if (firstUserData) {
        updatePromiseResponse(
          PROMISE_STATUS_CONSTANTS.LOADING,
          `User Details Data for '${firstUserData.employeeCode}' ...`
        );
        return fetchUserDetailsForEmpCode(firstUserData.employeeCode, TIMEOUT_IN_MS)
          .then(handleUserDetailsResponse)
          .catch(handleError);
      }
    });

    promiseChain = promiseChain.then(() => {
      console.log('4. Starting to fetch User Attendance Details for: ', `'${firstUserData.employeeCode}'`);

      return fetchUserAttendanceForDateRange(firstUserData.employeeCode, null, TIMEOUT_IN_MS)
        .then(handleUserAttendanceDetailsResponse)
        .catch(handleError);
    });

    promiseChain
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        console.log(`5. Finished calculation for User data and User details`);
      });
  };

  const onItemSelection = (item) => {
    if (item) {
      // setUserDetailsData(() => null);
      // setUserAttendanceDetails(() => []);
      flushOldData(false);
      let promiseChain = Promise.resolve();
      promiseChain = promiseChain.then(() => {
        console.log("1. Starting to fetch User details for: ", `'${item.employeeCode}'`);
        updatePromiseResponse(
          PROMISE_STATUS_CONSTANTS.LOADING,
          `User Details Data...`
        );
        return fetchUserDetailsForEmpCode(item.employeeCode, TIMEOUT_IN_MS)
          .then(handleUserDetailsResponse)
          .catch(handleError);
      });

      promiseChain = promiseChain.then(() => {
        console.log('2. Starting to fetch User Attendance Details for: ', `'${item.employeeCode}'`);

        return fetchUserAttendanceForDateRange(item.employeeCode, null, TIMEOUT_IN_MS)
          .then(handleUserAttendanceDetailsResponse)
          .catch(handleError);
      });

      promiseChain
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          console.log(`5. Finished calculation for User data and User details`);
        });


    }
  };

  return (
    <div>
      <ContainerComponent
        header={() => (
          <>
            <h1>
              Promise Practice: 5th Example: Deal with 3 promises Sequentially (With <b>Promise.resolve() </b> )
            </h1>
            <h3>
              <ul style={{listStyle:'none'}}>
                <li>
                  For Below operations:- 
                  <ul style={{listStyle:'none'}}>
                    <li>First fetch users' data, </li>
                    <li>Then load First User of the array and render in card,</li>
                    <li>Then load Attendance data for user</li>
                  </ul>
                </li>
                <li>
                  Now moving to refactor code and Log message normalization
                </li>
              </ul>
            </h3>

            {promiseResponse &&
              promiseResponse.status &&
              [
                PROMISE_STATUS_CONSTANTS.LOADING,
                PROMISE_STATUS_CONSTANTS.ERROR,
                PROMISE_STATUS_CONSTANTS.SUCCESS,
              ].includes(promiseResponse.status) && (
                <div
                  style={{
                    ...getStylesForPromiseStatusType(promiseResponse.status),
                  }}
                >
                  {promiseResponse.message}
                </div>
              )}
            <div>
              <button onClick={reload}>Reload</button>
            </div>
          </>
        )}
        leftSection={() => (
          <>
            <ul style={{ listStyle: "none" }}>
              {usersData.map((item) => (
                <>
                  <li
                    style={{
                      cursor: "pointer",
                      fontWeight:
                        userDetailsData?.id === item.id ? "bold" : "normal",
                    }}
                    key={item.id}
                    onClick={() => onItemSelection(item)}
                  >
                    {item.name}
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
        rightSection={() => (
          <>


            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                {userDetailsData && <UserCard userDetails={userDetailsData} />}
              </div>
              <div style={{ flex: 2 }}>
                {userAttendanceDetails && userAttendanceDetails.length > 0 && <UserAttendance userAttendance={userAttendanceDetails} />}
              </div>
            </div>

          </>
        )}
      />
    </div>
  );
};

const UserCard = ({ userDetails }) => {
  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "5px",
      padding: "16px",
      margin: "16px",
      width: "300px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      marginTop: "0",
      color: "#333",
    },
    paragraph: {
      margin: "8px 0",
    },
    list: {
      listStyleType: "none",
      padding: "0",
    },
    listItem: {
      background: "#f4f4f4",
      margin: "4px 0",
      padding: "4px",
      borderRadius: "3px",
    },
  };

  return (
    <>
      {userDetails && (
        <div style={styles.card}>
          <h2 style={styles.header}>{userDetails.name}</h2>
          <p style={styles.paragraph}>
            <strong>Employee Code:</strong> {userDetails.employeeCode}
          </p>
          <p style={styles.paragraph}>
            <strong>Date of Birth:</strong> {userDetails.dob}
          </p>
          <p style={styles.paragraph}>
            <strong>Designation:</strong> {userDetails.designation}
          </p>
          <p style={styles.paragraph}>
            <strong>Department:</strong> {userDetails.department}
          </p>
          <div>
            <strong>Skills:</strong>
            <ul style={styles.list}>
              {userDetails.skills.map((skill, index) => (
                <li key={index} style={styles.listItem}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Languages:</strong>
            <ul style={styles.list}>
              {userDetails.languages.map((language, index) => (
                <li key={index} style={styles.listItem}>
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const UserAttendance = ({ userAttendance: dateRange = [] }) => {
  const styles = {
    container: {
      borderRadius: "5px",
      padding: "16px",
      margin: "16px",
      fontFamily: "Arial, sans-serif",
      width: "300px",
      //margin: "0 auto",
      textAlign: "center",
    },
    inputContainer: {
      margin: "10px 0",
    },
    label: {
      marginRight: "10px",
    },
    input: {
      padding: "5px",
      width: "150px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    list: {
      listStyleType: "none",
      padding: 0,
    },
    listItem: {
      backgroundColor: "#f9f9f9",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    listCell: {
      flex: 1,
      border: "1px solid #ddd",
      padding: "8px",
    },
  };
  return (
    <>
      <div style={{ ...styles.container, color: "#333", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", }}>
        <h2 style={{}}>User Attendance</h2>
        {/* <pre>{`dateRange: ${JSON.stringify(dateRange, null,2)}`}</pre> */}
        {dateRange && dateRange.length > 0 && (
          <ul style={styles.list}>
            <li
              key={"header-list-item"}
              style={{
                ...styles.listItem,
                backgroundColor: "#007BFF",
                padding: "0px",
                fontWeight: "bold",
                display: "flex",
              }}
            >
              <span style={styles.listCell}>Date</span>
              <span style={styles.listCell}>Attendance</span>
            </li>
            {dateRange.map(({ date, isPresent }, index) => (
              <li
                key={index}
                style={{ ...styles.listItem, padding: "0px", display: "flex" }}
              >
                <span style={{ ...styles.listCell, fontWeight: "bold" }}>
                  {date}
                </span>
                <span
                  style={{
                    ...styles.listCell,
                    color: isPresent ? "green" : "red",
                  }}
                >
                  {isPresent ? "Present" : "Absent"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default PromisePractice5;
