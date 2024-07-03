(()=>{
    // ======== Some helper utilities ===============

    const LOGGER = loggerUtility;

    //============================================

    const executionLogic=()=>{
        const conversationNames = {
            SAMPLE_CONVERSATIONS1: "/data/sample-conversations1.json",
            SAMPLE_CONVERSATIONS2: "/data/sample-conversations2.json",
            SAMPLE_CONVERSATIONS3: "/data/sample-conversations3.json",
            CONVERSATIONS_09_MAY_2024: "/data/conversations-09-May-2024.json",
            CONVERSATIONS_10_MAY_2024: "/data/conversations-10-May-2024.json",
            CONVERSATIONS_12_MAY_2024: "/data/conversations-12-May-2024.json",
            CONVERSATIONS_24_MAY_2024: "/data/conversations-24-May-2024.json",
            CONVERSATIONS_27_MAY_2024: "/data/conversations-27-May-2024.json",
            CONVERSATIONS_17_JUNE_2024: "/data/conversations-17-June-2024.json",
            CONVERSATIONS_12_JULY_2024: "/data/conversations-12-July-2024.json",
          };

        //   LOGGER.info(`intial object:${JSON.stringify(conversationNames, null, 2)}`);
    
          const mappedArray = Object.entries(conversationNames).map(
            ([key, value]) => {
              return {
                value: value,
                label: key,
              };
            }
          );
    
          LOGGER.info(`mappedArray:${JSON.stringify(mappedArray, null, 2)}`, `intial object:${JSON.stringify(conversationNames, null, 2)}`);
    }

    // ============= Bootstrap code ====================
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (id) => {
            LOGGER.info(
                `[From: successCallback]: Succesfully created initial components. container div id:${id}`
            ),
            executionLogic();
        },
        (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage),
        true,
        () => {
            LOGGER.reset();
            executionLogic();
        }
    );

})()