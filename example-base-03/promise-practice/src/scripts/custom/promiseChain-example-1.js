((providedArray = []) => {
    const { checkNumWithPromise } = promiseUtility;
    const { addElementWithPromise } = elementAdderUtility;
    const { styles } = cssStylesUtility;

    // ======== Some helper utilities ===============

    const LOGGER= loggerUtility;

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
                        throw new Error(
                            `Stopping execution due to error.`
                        );
                    }
                );
            });
        });

        promiseChain
            .catch((error) => {                
                LOGGER.error(error.message)
            })
            .finally(() => {                
                LOGGER.info(`Finished calculation for given set of array: ${arr}`)
            });
    };

    // ======== Creating controles =====================

    
    const createInitialComponents = async () => {
        let myContainerDivId = null;
        let componentsCreatedSuccesfully=false;
        try {
            const newlyAddedDiv = await addElementWithPromise({
                elementType: "div",
                addToBody: true,
                style: styles.div,
            });
            console.log(`[Success]: Created div: ${newlyAddedDiv.id}`);
            myContainerDivId = newlyAddedDiv.id;            
            LOGGER.registerLoggingConfig(newlyAddedDiv);

            
            LOGGER.reset();
            LOGGER.success(`Created div: ${myContainerDivId}`);

            componentsCreatedSuccesfully=true;
        } catch (error) {
            console.log(`[Warning]: Error occured: ${error}`);
            console.log(`[${new Date()}]: Stopping element creation due to error.`);
        }

        if(componentsCreatedSuccesfully){

            LOGGER.info(`All intial components created succesully!`)
            runSequentially(providedArray);
        }else{
            
            LOGGER.error(`Stopping as error occured in intial components creation.`);
        }
    };

    // ============= Bootstrap code ====================
    createInitialComponents();
})([2, 2, 4, 4, 6, 6, 7, 8, 10, 12, 15]);
