// (() => {

//     // ======== Some helper utilities ===============

//     const LOGGER = loggerUtility;

//     //============================================

//     const fetchEmployees = () => {
//         LOGGER.reset();

//         const url = 'http://localhost:3000/api/employees';

//         fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 LOGGER.info('Employees data:', JSON.stringify(data, null, 2));
//             })
//             .catch(error => {
//                 LOGGER.error('Error fetching employees:', error);
//             });
//     };

//     const loadInitialComponents = () => {
//         const containerDiv = document.createElement('div');
//         const loadEmployeesBtn = document.createElement('button');
//         loadEmployeesBtn.textContent = 'Load Employees'

//         loadEmployeesBtn.addEventListener('click', () => {
//             fetchEmployees();
//         });

//         containerDiv.appendChild(loadEmployeesBtn);
//         document.body.appendChild(containerDiv);
//     }

//     loadInitialComponents();

//     // ============= Bootstrap code ====================
//     initialConsoleComponentCreatorUtility.createInitialComponents(
//         (id) => {
//             LOGGER.info(
//                 `[From: successCallback]: Succesfully created initial components. container div id:${id}`
//             ),
//                 fetchEmployees();
//                 // loadInitialComponents();
//         },
//         (errorMessage) => LOGGER.error("Sirf component nahi bana, " + errorMessage),
//         false,
//         () => {
//             // LOGGER.reset();
//             // fetchEmployees();
//         }
//     );

// })();



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
        }
    };

    /**
     * Apply styles to an HTML element.
     * @param {HTMLElement} element - The HTML element to style.
     * @param {Object} styles - A JSON object containing CSS properties and values.
     */
    const applyStyles = (element, styles) => {
        if (!element || !styles) {
            return;
        }
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property] = styles[property];
            }
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
        const containerDiv = document.createElement('div');
        const loadEmployeesBtn = document.createElement('button');
        loadEmployeesBtn.textContent = 'Load Employees';

        // Apply styles
        applyStyles(containerDiv, defaultStyles.containerDiv);
        applyStyles(loadEmployeesBtn, defaultStyles.loadEmployeesBtn);

        loadEmployeesBtn.addEventListener('click', () => {
            fetchEmployees();
        });

        containerDiv.appendChild(loadEmployeesBtn);
        document.body.appendChild(containerDiv);
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
