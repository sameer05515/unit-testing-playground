import React, { useReducer, useEffect } from "react";
import { fetchUsers } from "../../utils/promises";

const initialState = {
    status: "idle",
    data: [],
    error: null,
    message: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                status: "loading",
                message: "Loading User Data...",
                data: [],
                error: null,
            };
        case "SUCCESS":
            return {
                ...state,
                status: "success",
                data: action.payload.data,
                message: `[Success]: RandomNumber: ${action.payload.randomNumber}, User Data Loaded successfully!!`,
                error: null,
            };
        case "ERROR":
            return {
                ...state,
                status: "error",
                data: [],
                message: `[Error]: RandomNumber: ${action.payload.randomNumber}, ${action.payload.message}!`,
                error: action.payload,
            };
        default:
            return state;
    }
};

const PromisePracticeWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        dispatch({ type: "LOADING" });
        fetchUsers(100)
            .then((response) => {
                dispatch({ type: "SUCCESS", payload: response });
            })
            .catch((error) => {
                dispatch({ type: "ERROR", payload: error });
            });
    };

    return (
        <div>
            <h1>Promise Practice : With Reducer</h1>

            {(state.status === "loading" ||
                state.status === "error" ||
                state.status === "success") && <div>{state.message}</div>}
            <button onClick={reload}>Reload</button>
            <ul>
                {state.data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PromisePracticeWithReducer;
