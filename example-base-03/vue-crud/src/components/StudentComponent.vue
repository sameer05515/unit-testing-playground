<!-- src/components/StudentComponent.vue -->
<template>
    <div>
      <h1>Student List</h1>
      <ul>
        <li v-for="student in students" :key="student.id">
          {{ student.name }} ({{ student.age }})
          <button @click="edit(student)">Edit</button>
          <button @click="deleteStudent(student.id)">Delete</button>
        </li>
      </ul>
  
      <h2>Add New Student</h2>
      <form @submit.prevent="addStudent">
        <input v-model="newStudent.name" placeholder="Name" required>
        <input v-model="newStudent.age" type="number" placeholder="Age" required>
        <button type="submit">Add</button>
      </form>
  
      <div v-if="editStudent">
        <h2>Edit Student</h2>
        <form @submit.prevent="updateStudent">
          <input v-model="editStudent.name" placeholder="Name" required>
          <input v-model="editStudent.age" type="number" placeholder="Age" required>
          <button type="submit">Update</button>
          <button @click="cancelEdit">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: [],
        newStudent: { id: 0, name: '', age: 0 },
        editStudent: null,
      };
    },
    methods: {
      loadStudents() {
        axios.get('http://localhost:3000/students').then(response => {
          this.students = response.data;
        });
      },
      addStudent() {
        axios.post('http://localhost:3000/students', this.newStudent).then(response => {
          this.students.push(response.data);
          this.newStudent = { id: 0, name: '', age: 0 };
        });
      },
      updateStudent() {
        axios.put(`http://localhost:3000/students/${this.editStudent.id}`, this.editStudent).then(() => {
          this.loadStudents();
          this.editStudent = null;
        });
      },
      deleteStudent(id) {
        axios.delete(`http://localhost:3000/students/${id}`).then(() => {
          this.loadStudents();
        });
      },
      edit(student) {
        this.editStudent = { ...student };
      },
      cancelEdit() {
        this.editStudent = null;
      },
    },
    mounted() {
      this.loadStudents();
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  