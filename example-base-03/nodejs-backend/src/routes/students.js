// routes/students.js
import express from 'express';

const router = express.Router();

let students = [
  { id: 1, name: 'John Doe', age: 18 },
  { id: 2, name: 'Jane Doe', age: 19 },
  { id: 3, name: 'Jim Beam', age: 20 }
];

// Get all students
router.get('/', (req, res) => {
  res.json(students);
});

// Get a single student by ID
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');
  res.json(student);
});

// Create a new student
router.post('/', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update a student
router.put('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).send('Student not found');

  student.name = req.body.name;
  student.age = req.body.age;
  res.json(student);
});

// Delete a student
router.delete('/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).send('Student not found');

  const deletedStudent = students.splice(studentIndex, 1);
  res.json(deletedStudent);
});


export default router;
