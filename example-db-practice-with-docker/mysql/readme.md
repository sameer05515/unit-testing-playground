### MySQL Table Creation Script

Here is the SQL script to create a table named `Employee` with the fields `id`, `name`, `department_name`, and `salary`:

```sql
CREATE TABLE Employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50),
  salary DECIMAL(10, 2)
);
```

### Explanation:
- **id**: An auto-incremented primary key, so it will automatically generate a unique ID for each record.
- **name**: A non-null string field to store the employee's name.
- **department_name**: A string field to store the department's name.
- **salary**: A decimal field to store the employee's salary, with two decimal places.

---

### JavaScript (Node.js) Script to Load Dummy Data into the Table

Here’s a simple Node.js script using the `mysql2` library to insert dummy data into the `Employee` table. This script assumes you have already set up MySQL and have created the `Employee` table.

#### Steps:
1. Install the `mysql2` package if you haven’t already:

   ```bash
   npm install mysql2
   ```

2. Use the following JavaScript script to insert dummy data into the `Employee` table:

```javascript
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',      // MySQL server host
  user: 'root',           // MySQL username
  password: 'your_password',  // MySQL password
  database: 'your_database_name' // Name of your database
});

// Dummy data to insert
const employees = [
  { name: 'Alice', department_name: 'HR', salary: 50000.00 },
  { name: 'Bob', department_name: 'IT', salary: 60000.00 },
  { name: 'Charlie', department_name: 'Finance', salary: 70000.00 },
  { name: 'David', department_name: 'Marketing', salary: 55000.00 }
];

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
```

### Explanation:
- The script connects to the MySQL database using the `mysql2` package.
- It defines an array of dummy employee objects with `name`, `department_name`, and `salary`.
- The `connection.execute()` method is used to insert each employee into the `Employee` table.
- The script will log to the console when each employee is inserted.

### Ensure the following before running the script:
1. **MySQL Database Setup**: Ensure you have a running MySQL instance and a database created.
2. **Database Connection Details**: Replace `localhost`, `root`, `your_password`, and `your_database_name` with your actual database connection details.
3. **Running the Script**: Run the script using Node.js:
   ```bash
   node script_name.js
   ```

Let me know if you need any more help!