const mysql = require('mysql2');
const {employees}=require('./insert_employees.v2')

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',      // MySQL server host
  user: 'root',           // MySQL username
  password: 'admin@123',  // MySQL password
  database: 'interview_sql_question' // Name of your database
});

// Dummy data to insert
// const employees = [
//   { name: 'Alice', department_name: 'HR', salary: 50000.00 },
//   { name: 'Bob', department_name: 'IT', salary: 60000.00 },
//   { name: 'Charlie', department_name: 'Finance', salary: 70000.00 },
//   { name: 'David', department_name: 'Marketing', salary: 55000.00 }
// ];

// Insert dummy data into the Employee table
employees.forEach(employee => {
  const query = 'INSERT INTO Employee (name, department_name, salary) VALUES (?, ?, ?)';
  connection.execute(query, [employee.name, employee.department_name, employee.salary], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return;
    }
    console.log('Inserted employee:', employee.name);
  });
});

// Close the connection
connection.end();
