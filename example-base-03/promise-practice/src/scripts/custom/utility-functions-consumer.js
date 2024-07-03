(() => {

    // ======== Some helper utilities ===============
    const LOGGER = loggerUtility;

    // Default styles for components
    const defaultStyles = {
        containerDiv: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            width:'95%',
            backgroundColor: "#f4f4f4",
        },
        loadEmployeesBtn: {
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width:'200px'
        }
    };

    LOGGER.info('Arrow function IIFE runs immediately.');
    // LOGGER.info(counterUtility.increment()); // 1
    // LOGGER.info(counterUtility.getCount());  // 1
    // LOGGER.info(counterUtility.decrement()); // 0

    const myCont=document.createElement('div');
    myCont.id=`jaajajajajajajajiiiia-kk`;
    document.body.appendChild(myCont);

    const loadInitialComponents=async ()=>{
        try{
            const containerDiv = await elementAdderUtility.addElementWithPromise({
                elementType: "div",
                addToBody: false,
                parentElementId: myCont.id,
                style: defaultStyles.containerDiv,
                showInnerText: false
            });

            // const incrementBtn = 
            await elementAdderUtility.addElementWithPromise({
                elementType: "button",
                parentElementId: containerDiv.id,
                style: defaultStyles.loadEmployeesBtn,
                innerText: 'Increment',
                onClick: ()=>LOGGER.info(counterUtility.increment()),
                showInnerText: true
            });

            await elementAdderUtility.addElementWithPromise({
                elementType: "button",
                parentElementId: containerDiv.id,
                style: defaultStyles.loadEmployeesBtn,
                innerText: 'Get Count',
                onClick: ()=>LOGGER.info(counterUtility.getCount()),
                showInnerText: true
            });

            await elementAdderUtility.addElementWithPromise({
                elementType: "button",
                parentElementId: containerDiv.id,
                style: defaultStyles.loadEmployeesBtn,
                innerText: 'Decrement',
                onClick: ()=>LOGGER.info(counterUtility.decrement()),
                showInnerText: true
            });

        }catch(error){
            LOGGER.error("Error creating components:", error);
        }
    };

    // ============= Bootstrap code ====================
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (id) => {
            LOGGER.info(
                `[From: successCallback]: Succesfully created initial components. container div id:${id}`
            ),
                // fetchEmployees();
                loadInitialComponents();
        },
        (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage),
        true,
        () => {
            LOGGER.reset();
            // fetchEmployees();
        }
    );
})();
