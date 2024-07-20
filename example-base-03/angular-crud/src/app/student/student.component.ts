// src/app/student/student.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';

interface Student {
  id: number;
  name: string;
  age: number;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = { id: 0, name: '', age: 0 };
  editStudent: Student | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  addStudent(): void {
    this.studentService.createStudent(this.newStudent).subscribe((student: Student) => {
      this.students.push(student);
      this.newStudent = { id: 0, name: '', age: 0 };
    });
  }

  updateStudent(): void {
    if (this.editStudent) {
      this.studentService.updateStudent(this.editStudent.id, this.editStudent).subscribe(() => {
        this.loadStudents();
        this.editStudent = null;
      });
    }
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  edit(student: Student): void {
    this.editStudent = { ...student };
  }

  cancelEdit(): void {
    this.editStudent = null;
  }
}
