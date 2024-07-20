const promiseUtility = (() => {
    const checkNumWithPromise = (num = 0) => {
        return new Promise(function (myResolve, myReject) {
            let x = parseInt(num);
            setTimeout(() => {
                if (x % 2 === 0) {
                    myResolve(`number ${num} is multiple of 2`);
                } else {
                    myReject(`number ${num} is not multiple of 2`);
                }
            }, (x && x > 0 ? 1 : 1) * 1000);
        });
    };

    return { checkNumWithPromise };
})();

export default promiseUtility;
