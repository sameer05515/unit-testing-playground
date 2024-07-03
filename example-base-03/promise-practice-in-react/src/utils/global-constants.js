export const PROMISE_STATUS_CONSTANTS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
});

export const getStylesForPromiseStatusType = (
    type = PROMISE_STATUS_CONSTANTS.IDLE
) => {
    const baseStyle = {
        color: "black",
        //padding: '5px',
        margin: "3px",
        borderRadius: "3px",
        whiteSpace: "pre-wrap",
        display: "block",
    };

    switch (type) {
        case PROMISE_STATUS_CONSTANTS.ERROR:
            return {
                ...baseStyle,
                color: "red",
            };
        case PROMISE_STATUS_CONSTANTS.LOADING:
            return {
                ...baseStyle,
                color: "green",
                backgroundColor: "yellow",
            };
        case PROMISE_STATUS_CONSTANTS.SUCCESS:
            return {
                ...baseStyle,
                color: "blue",
            };
        default:
            return {
                ...baseStyle,
            };
    }
};
