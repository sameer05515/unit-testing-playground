import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById
} from '../controllers/employeeController.js';

const router = express.Router();

// Define routes
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployeeById);
router.delete('/employees/:id', deleteEmployeeById);

export default router;
