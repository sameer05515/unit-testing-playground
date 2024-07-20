((providedArray = []) => {
    const {checkNumWithPromise} = promiseUtility;

    const runSequentially = async (arr) => {
        console.log(`[${new Date()}]: Starting calculation for given set of array: ${arr}`);
        for (let num of arr) {
            try {
                const result = await checkNumWithPromise(num);
                console.log(`[Success]: ${result}`);
            } catch (error) {
                console.log(`Warning: ${error}`);
                console.log(`[${new Date()}]: Stopping execution due to error.`);
                break;
            }
        }
        console.log(`[${new Date()}]: Finished calculation for given set of array: ${arr}`);
    };

    runSequentially(providedArray);
})([1, 2, 3, 4, 5, 6, 7]);
