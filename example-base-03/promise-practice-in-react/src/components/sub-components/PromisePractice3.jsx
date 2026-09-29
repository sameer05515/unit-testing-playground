import React, { useState, useEffect } from "react";
import { fetchUserDetailsForEmpCode, fetchUsers } from "../../utils/promises";
import {
    getStylesForPromiseStatusType,
    PROMISE_STATUS_CONSTANTS,
} from "../../utils/global-constants";
import ContainerComponent from "../../common/ContainerComponent";
import UserCard from "../../common/UserCard";

const initialState = {
    status: PROMISE_STATUS_CONSTANTS.IDLE,
    message: "",
};

const PromisePractice3 = () => {
    const [usersData, setUsersData] = useState([]);
    const [userDetailsData, setUserDetailsData] = useState(null);
    const [promiseResponse, setPromiseResponse] = useState(initialState);

    useEffect(() => {
        reload();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps -- mount-only demo

    const flushOldData = () => {
        setUsersData(() => []);
        setUserDetailsData(() => null);
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
        updatePromiseResponse(PROMISE_STATUS_CONSTANTS.LOADING, `User Data...`);

        fetchUsers(200)
            .then((usersDataResponse) => {
                setUsersData(usersDataResponse.data);
                updatePromiseResponse(
                    PROMISE_STATUS_CONSTANTS.SUCCESS,
                    usersDataResponse.message,
                    usersDataResponse.randomNumber
                );

                if (usersDataResponse.data.length > 0) {
                    updatePromiseResponse(
                        PROMISE_STATUS_CONSTANTS.LOADING,
                        `User Details Data...`
                    );
                    return fetchUserDetailsForEmpCode(
                        usersDataResponse.data[0].employeeCode,
                        2000
                    );
                }
                return null;
            })
            .then((userDetailsResponse) => {
                if (!userDetailsResponse) return;
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
                        <h1>Promise Practice: 3rd Example: Deal with 2 promises Sequentially</h1>
                        <h3>
                            First fetch users' data. Then load First User of the array and
                            render in card. (With <b>Promise chaining using multiple 'then()' </b> )
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
                                <li
                                    key={item.id}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: userDetailsData?.id === item.id ? 'bold' : 'normal',
                                    }}
                                    onClick={() => onItemSelection(item)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                rightSection={() => <UserCard userDetails={userDetailsData} />}
            />

        </div>
    );
};

export default PromisePractice3;
