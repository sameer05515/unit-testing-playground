(() => {
    // ======== Some helper utilities ===============

    const LOGGER = loggerUtility;

    // ===== Constants ====================

    // Simulate an API call that returns a promise
    function fetchData(url, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const randomVal = Math.random();
                if (randomVal > 0.1) {
                    resolve(`URL: ${url}, RandomValue: ${randomVal}, Data from ${url}`);
                } else {
                    reject(`RandomValue: ${randomVal}, Failed to fetch data from ${url}`);
                }
            }, delay);
        });
    }

    // URLs and delays
    const urls = [
        { url: "https://api.example.com/data1", delay: 1000 },
        { url: "https://api.example.com/data2", delay: 1500 },
        { url: "https://api.example.com/data3", delay: 2000 },
    ];

    // ===== main logic ==============
    const demonstratePromiseDotAllUseCase = () => {
        // Create an array of promises
        const promises = urls.map(({ url, delay }) => fetchData(url, delay));

        // Use Promise.all to wait for all promises to resolve
        Promise.all(promises)
            .then((results) => {
                LOGGER.info("All promises resolved:");
                results.forEach((result) => LOGGER.info(result));
            })
            .catch((error) => {
                LOGGER.error(`One or more promises rejected: <br/> ${error}` );
            })
            .finally(() => {
                LOGGER.info("All promises have been processed.");
            });
    };

    // ============= Bootstrap code ====================
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (id) => {
            console.log(
                `[From: successCallback]: Succesfully created initial components. container div id:${id}`
            ),
                demonstratePromiseDotAllUseCase();
        },
        (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage),
        true,
        () => {
            LOGGER.reset();
            demonstratePromiseDotAllUseCase();
        }
    );
})();
