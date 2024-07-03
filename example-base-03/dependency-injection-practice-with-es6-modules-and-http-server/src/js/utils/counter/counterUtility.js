const counterUtility = (() => {
    let count = 0;
    const increment = () => {
        count++;
        return count;
    };

    const decrement = () => {
        count--;
        return count;
    };

    const getCount = () => {
        return count;
    };

    return {
        increment,
        decrement,
        getCount,
    };
})();

export default counterUtility;
