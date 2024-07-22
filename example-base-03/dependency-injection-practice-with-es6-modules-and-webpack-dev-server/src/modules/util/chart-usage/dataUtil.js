const employees = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
    { id: 6, name: "Anita" },
    { id: 7, name: "Raj" },
    { id: 8, name: "Priya" },
    { id: 9, name: "Vikram" },
    { id: 10, name: "Neha" },
];

const generateAttendanceData = (employees) => {
    return employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        daysPresent: Math.floor(Math.random() * 31),
    }));
};

export { employees, generateAttendanceData };
