

// promiseUtility.js
const promiseUtility = (() => {
    const checkNumWithPromise = (num = 0) => {
        return new Promise((resolve, reject) => {
            let x = parseInt(num);
            setTimeout(() => {
                if (x % 2 === 0) {
                    resolve(`number ${num} is multiple of 2`);
                } else {
                    reject(`number ${num} is not multiple of 2`);
                }
            }, (x && x > 0 ? 1 : 1) * 1000);
        });
    };

    return { checkNumWithPromise };
})();

module.exports = promiseUtility;