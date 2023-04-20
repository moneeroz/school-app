import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Idepartment } from '../interfaces/idepartment';
import { StudentsService } from '../services/studnets.service';
import { DepartmentsService } from '../services/departments.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, NgFor, NgIf],
})
export class Tab2Page {
  studentForm;
  departments: Idepartment[] = [];
  isEdit: boolean = false;
  editStudentId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private departmentService: DepartmentsService,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.studentForm = formBuilder.group({
      name: ['', [Validators.required]], //1st item in array sets up the default value
      age: [0, [Validators.required]],
      country: ['', [Validators.required]],
      dept_id: [0, [Validators.required]],
    });

    // Retreive department data
    departmentService.getDepartments().subscribe((results) => {
      this.departments = results;
    });

    // Get student id from current url
    const student_id = route.snapshot.paramMap.get('student_id');

    // Check if the student id was specified. if true it means we are in edit mode, else we are in create mode
    if (student_id !== null) {
      this.isEdit = true;
      this.editStudentId = parseInt(student_id);

      // Get student data from the backend and update the webform inputs with the data
      studentService.getStudentInfo(student_id).subscribe((result) => {
        this.studentForm.patchValue(result);
      });
    }
  }

  onSubmit() {
    const student_data = this.studentForm.value;

    if (this.isEdit) {
      this.studentService
        .updateStudent(student_data, this.editStudentId)
        .subscribe((results) => {
          console.log(results);

          this.showAlert('Edit Student', 'Student updated successfully!');
        });
    } else {
      this.studentService.createStudent(student_data).subscribe((results) => {
        console.log(results);

        this.studentForm.reset(); // clears all form inputs after submit
        this.showAlert('Create Student', 'Student created successfully!');
      });
    }
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,

      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
