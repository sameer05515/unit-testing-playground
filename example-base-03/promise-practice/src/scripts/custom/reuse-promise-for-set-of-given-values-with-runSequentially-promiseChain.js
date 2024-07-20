((providedArray = []) => {
    const checkNumWithPromise = (num = 0) => {
        // console.log(`[${new Date()}]: Going to check validity for : ${num}`);
        return new Promise(function (myResolve, myReject) {
            let x = parseInt(num);
            // The producing code (this may take some time)
            setTimeout(() => {
                if (x % 2 === 0) {
                    myResolve(`number ${num} is multiple of 2`);
                } else {
                    myReject(`number ${num} is not multiple of 2`);
                }
            }, (x && x > 0 ? x : 1) * 1000);
        });
    };

    const runSequentially = (arr) => {
        console.log(`[${new Date()}]: Starting calculation for given set of array: ${arr}`);
        let promiseChain = Promise.resolve();
    
        arr.forEach(num => {
            promiseChain = promiseChain.then(() => {
                return checkNumWithPromise(num).then(
                    (result) => {
                        console.log(`[Success]: ${result}`);
                    },
                    (error) => {
                        console.log(`[Warning]: ${error}`);
                        throw new Error(`[${new Date()}]: Stopping execution due to error.`);
                    }
                );
            });
        });
    
        promiseChain.catch((error) => {
            console.log(error.message);
        }).finally(() => {
            console.log(`[${new Date()}]: Finished calculation for given set of array: ${arr}`);
        });
    };

    runSequentially(providedArray);
})([2, 2, 4, 4, 6, 6, 7, 8, 10, 12, 15]);
