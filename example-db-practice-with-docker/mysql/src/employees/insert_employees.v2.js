// Arrays of first names and last names
const firstNames = ['Ram', 'Shyam', 'Geeta', 'Meeta', 'Papita','Jayant','Abinash'];
const lastNames = ['Kumar', 'Krishnan', 'Jha', 'Singh', 'Rathore','sharma'];

// Array to hold all possible full names
let employeeNames = [];

// Generate all possible combinations of first names and last names
for (let i = 0; i < firstNames.length; i++) {
    for (let j = 0; j < lastNames.length; j++) {
        employeeNames.push(firstNames[i] + ' ' + lastNames[j]);
    }
}

// Output the resulting array of employee names
// console.log(employeeNames);

// Array of 10 department names
const departments = [
    'HR', 'IT', 'Finance', 'Marketing', 'Sales',
    'Legal', 'R&D', 'Operations', 'Customer Support', 'Engineering'
];


// Function to generate a random salary between a range
function generateRandomSalary(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);  // Generate random salary between min and max, rounded to 2 decimals
}

// Create employees array with random department assignments and random salary
const employees = employeeNames.map(name => {
    // Randomly select a department from the departments array
    const department_name = departments[Math.floor(Math.random() * departments.length)];

    // Randomly generate a salary (you can change the range as needed)
    const salary = generateRandomSalary(45000, 90000);  // Random salary between 45,000 and 90,000

    return { name, department_name, salary: parseFloat(salary) };
});

// Output the resulting employees array
// console.log(employees);

module.exports={employees};