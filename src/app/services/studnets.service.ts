import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Istudent } from '../interfaces/istudent';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}
  url = API_URL;

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
