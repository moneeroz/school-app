import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Istudent } from '../interfaces/istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/students';

  getStudents() {
    return this.http.get<Istudent[]>(this.url);
  }

  getStudentInfo(student_id: any) {
    return this.http.get<Istudent>(this.url + '/' + student_id);
  }

  deleteStudent(student_id: number) {
    return this.http.delete<Istudent>(this.url + '/' + student_id);
  }

  createStudent(data: any) {
    return this.http.post<Istudent>(this.url, data);
  }

  updateStudent(data: any, student_id: number) {
    return this.http.put<Istudent>(this.url + '/' + student_id, data);
  }
}
