// dataUtil.js

/**
 * Employee data
 * @typedef {Object} Employee
 * @property {number} id - Employee ID.
 * @property {string} name - Employee name.
 */
const employees = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
];

/**
 * Method to generate dummy attendance data
 * @param {Employee[]} employees - Array of employee objects.
 * @returns {Object[]} - Array of attendance data objects.
 */
const generateAttendanceData = (employees) => {
    return employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        daysPresent: Math.floor(Math.random() * 31),
    }));
};

module.exports = { employees, generateAttendanceData };
