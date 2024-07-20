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

    /**
     * Fetch employees data from the server.
     */
    const fetchEmployees = () => {
        LOGGER.reset();
        
        const url = 'http://localhost:3000/api/employees';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                LOGGER.info('Employees data:', JSON.stringify(data, null, 2));
            })
            .catch(error => {
                LOGGER.error('Error fetching employees:', error);
            });
    };

    /**
     * Load initial components: a container div and a button to load employees.
     */
    const loadInitialComponents = () => {
        elementAdderUtility.addElementWithPromise({
            elementType: "div",
            addToBody: true,
            style: defaultStyles.containerDiv,
            showInnerText:false
        }).then(containerDiv => {
            elementAdderUtility.addElementWithPromise({
                elementType: "button",
                parentElementId: containerDiv.id,
                style: defaultStyles.loadEmployeesBtn,
                innerText: 'Load Employees',
                onClick: fetchEmployees,
                showInnerText:true
            }).catch(error => {
                LOGGER.error("Error creating loadEmployeesBtn:", error);
            });
        }).catch(error => {
            LOGGER.error("Error creating containerDiv:", error);
        });
    };

    loadInitialComponents();

    // ============= Bootstrap code ====================
    initialConsoleComponentCreatorUtility.createInitialComponents(
        (id) => {
            LOGGER.info(
                `[From: successCallback]: Succesfully created initial components. container div id:${id}`
            ),
                fetchEmployees();
                // loadInitialComponents();
        },
        (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage),
        false,
        () => {
            // LOGGER.reset();
            // fetchEmployees();
        }
    );
})();
