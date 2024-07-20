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
            }, x*1000);
        });
    };

    const run = (arr) => {
        console.log(`[${new Date()}]: Starting calculation for given set of array: ${arr}`);
        if(!arr){
            return;
        }

        // checkNumWithPromise(arr[0]).then(
        //     (value) => {
        //         console.log(`[Success]: ${value}`);
        //     },
        //     (error) => {
        //         console.log(`Warning: ${error}`);
        //     }
        // );

        const promises = arr.map(num => checkNumWithPromise(num));
        
        Promise.allSettled(promises).then(results => {
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    console.log(`[Success]: ${result.value}`);
                } else {
                    console.log(`Warning: ${result.reason}`);
                }
            });
        });
        console.log(`[${new Date()}]: Finished calculation for given set of array: ${arr}`);
    };

    run(providedArray);
})([1, 2, 3, 4, 5, 6, 7]);
