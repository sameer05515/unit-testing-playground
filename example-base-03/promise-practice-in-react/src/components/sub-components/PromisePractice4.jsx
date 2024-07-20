import React, { useState, useEffect } from "react";
import { fetchUserDetailsForEmpCode, fetchUsers } from "../../utils/promises";
import {
    getStylesForPromiseStatusType,
    PROMISE_STATUS_CONSTANTS,
} from "../../utils/global-constants";
import ContainerComponent from "../../common/ContainerComponent";

const initialState = {
    status: PROMISE_STATUS_CONSTANTS.IDLE,
    message: "",
};

const PromisePractice4 = () => {
    const [usersData, setUsersData] = useState([]);
    const [userDetailsData, setUserDetailsData] = useState(null);
    const [promiseResponse, setPromiseResponse] = useState(initialState);

    useEffect(() => {
        reload();
    }, []);

    const flushOldData = () => {
        setUsersData(() => []);
        setUserDetailsData(() => null);
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
                message: `[${status.toUpperCase()}]: ${randomNumber ? `RandomNumber: ${randomNumber},` : ""
                    } Message: ${message}`,
            }));
        }
    };

    const reload = () => {
        flushOldData();
        console.log('1. Users list is started to fetch');
        updatePromiseResponse(PROMISE_STATUS_CONSTANTS.LOADING, `User Data...`);
    
        // let localUsersData;
        let firstUserData=null;
    
        let promiseChain = Promise.resolve();
    
        promiseChain = promiseChain.then(() => {
            console.log('2. fetchUsers promise is starting');
            return fetchUsers(5000).then(
                (usersDataResponse) => {
                    console.log('2.1 Recieved users list');
                    firstUserData = usersDataResponse.data && usersDataResponse.data.length > 0? usersDataResponse.data[0]:null;
                    setUsersData(usersDataResponse.data);
                    updatePromiseResponse(
                        PROMISE_STATUS_CONSTANTS.SUCCESS,
                        usersDataResponse.message,
                        usersDataResponse.randomNumber
                    );
                },
                (error) => {
                    console.log('2.2 Error in Recieving users list');
                    updatePromiseResponse(
                        PROMISE_STATUS_CONSTANTS.ERROR,
                        error.message,
                        error.randomNumber
                    );
                    throw new Error(`[${new Date()}]: Stopping execution due to error in fetch USERS LIST.`);
                }
            );
        });
    
        promiseChain = promiseChain.then(
            () => {
            console.log('3. Starting to fetch User details.');
            if (firstUserData) {
                updatePromiseResponse(
                    PROMISE_STATUS_CONSTANTS.LOADING,
                    `User Details Data...`
                );
                return fetchUserDetailsForEmpCode(
                    firstUserData.employeeCode,
                    2000
                ).then(
                    (userDetailsResponse) => {
                        console.log('3.1 Recieved user details');
                        setUserDetailsData(userDetailsResponse.data);
                        updatePromiseResponse(
                            PROMISE_STATUS_CONSTANTS.LOADING,
                            `User Details Data...`
                        );
                        updatePromiseResponse(
                            PROMISE_STATUS_CONSTANTS.SUCCESS,
                            userDetailsResponse.message,
                            userDetailsResponse.randomNumber
                        );
                    },
                    (error) => {
                        console.log('3.2 Error in Recieving user details');
                        updatePromiseResponse(
                            PROMISE_STATUS_CONSTANTS.ERROR,
                            error.message,
                            error.randomNumber
                        );
                        throw new Error(`[${new Date()}]: Stopping execution due to error in fetch USER DETAILS.`);
                    }
                );
            }
        });
    
        promiseChain.catch((error) => {
            console.log(error.message);
        }).finally(() => {
            console.log(`4. Finished calculation for User data and User details`);
        });
    };
    

    const onItemSelection = (item) => {
        if (item) {
            setUserDetailsData(() => null);
            updatePromiseResponse(
                PROMISE_STATUS_CONSTANTS.LOADING,
                `User Details Data...`
            );
            fetchUserDetailsForEmpCode(
                item.employeeCode,
                2000
            ).then((userDetailsResponse) => {
                setUserDetailsData(userDetailsResponse.data);

                updatePromiseResponse(
                    PROMISE_STATUS_CONSTANTS.SUCCESS,
                    userDetailsResponse.message,
                    userDetailsResponse.randomNumber
                );
            })
                .catch((error) => {
                    updatePromiseResponse(
                        PROMISE_STATUS_CONSTANTS.ERROR,
                        error.message,
                        error.randomNumber
                    );
                });
        }
    }

    return (
        <div>
            <ContainerComponent
                header={() => (
                    <>
                        <h1>Promise Practice: 4th Example: Deal with 2 promises Sequentially</h1>
                        <h3>
                            First fetch users' data. Then load First User of the array and
                            render in card (With <b>Promise.resolve() </b> )
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

                        <ul style={{ listStyle: 'none' }}>
                            {usersData.map((item) => (
                                <>                                    
                                    <li style={{ cursor: 'pointer', fontWeight: userDetailsData?.id === item.id ? 'bold' : 'normal' }}
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
                    <>{userDetailsData && <UserCard userDetails={userDetailsData} />}</>
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

export default PromisePractice4;
