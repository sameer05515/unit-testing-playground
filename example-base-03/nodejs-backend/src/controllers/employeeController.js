import Employee from '../models/Employee.js';

// Dummy employee data stored as constant array
let employees = [
  new Employee(1, 'John Doe', 'Developer'),
  new Employee(2, 'Jane Smith', 'Designer'),
  new Employee(3, 'Mike Johnson', 'Manager')
];

// Get all employees
export const getAllEmployees = (req, res) => {
  res.json(employees);
};

// Get employee by ID
export const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  if (!employee) {
    res.status(404).send('Employee not found');
  } else {
    res.json(employee);
  }
};

// Create a new employee
export const createEmployee = (req, res) => {
  const { name, position } = req.body;
  const id = employees.length + 1;
  const newEmployee = new Employee(id, name, position);
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

// Update an employee by ID
export const updateEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, position } = req.body;
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    res.status(404).send('Employee not found');
  } else {
    employees[index] = new Employee(id, name, position);
    res.json(employees[index]);
  }
};

// Delete an employee by ID
export const deleteEmployeeById = (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) {
    res.status(404).send('Employee not found');
  } else {
    const deletedEmployee = employees.splice(index, 1);
    res.json(deletedEmployee[0]);
  }
};
