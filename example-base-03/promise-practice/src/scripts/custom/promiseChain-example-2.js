((providedArray = []) => {
    // ======== Some helper utilities ===============

    const LOGGER = loggerUtility;
    const { checkNumWithPromise } = promiseUtility;

    // ======== Main logic =========================

    const runSequentially = (arr) => {
        LOGGER.info(`Starting calculation for given set of array: ${arr}`);

        let promiseChain = Promise.resolve();

        arr.forEach((num) => {
            promiseChain = promiseChain.then(() => {
                return checkNumWithPromise(num).then(
                    (result) => {
                        LOGGER.success(result);
                    },
                    (error) => {
                        LOGGER.warning(error);
                        throw new Error(`Stopping execution due to error.`);
                    }
                );
            });
        });

        promiseChain
            .catch((error) => {
                LOGGER.error(error.message);
            })
            .finally(() => {
                LOGGER.info(`Finished calculation for given set of array: ${arr}`);
            });
    };

    // ============= Bootstrap code ====================
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (id) => {
            console.log(
                `[From: successCallback]: Succesfully created initial components. container div id:${id}`
            ),
                runSequentially(providedArray);
        },
        (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage)
    );
})([2, 2, 4, 4, 6, 6, 7, 8, 10, 12, 15]);
