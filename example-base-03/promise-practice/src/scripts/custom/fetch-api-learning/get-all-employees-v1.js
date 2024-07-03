(()=>{
    
    const fetchEmployees=()=> {
        const url = 'http://localhost:3000/api/employees';
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Employees data:', data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    };

    const loadInitialComponents=()=>{
        const containerDiv= document.createElement('div');
        const loadEmployeesBtn=document.createElement('button');
        loadEmployeesBtn.textContent='Load Employees'

        loadEmployeesBtn.addEventListener('click', () => {
            fetchEmployees();
        });

        containerDiv.appendChild(loadEmployeesBtn);
        document.body.appendChild(containerDiv);
    }

    loadInitialComponents();

})();