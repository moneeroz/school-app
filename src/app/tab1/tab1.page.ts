import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { StudentComponent } from '../components/student/student.component';
import { Istudent } from '../interfaces/istudent';
import { StudentsService } from '../services/studnets.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, StudentComponent, NgFor],
})
export class Tab1Page implements OnInit {
  students: Istudent[] = [];
  isDeleteAlertOpen: boolean = false;
  // canDelete: boolean = false;
  // deleteButtons: object[] = [
  //   {
  //     text: 'NO',
  //     handler: () => {
  //       this.canDelete = false;
  //     },
  //   },
  //   {
  //     text: 'YES',
  //     handler: () => {
  //       this.canDelete = true;
  //     },
  //   },
  // ];

  constructor(
    private studentSerivce: StudentsService,
    private alertController: AlertController,
  ) {
    console.log('constructor is called before ngOnInit()');
  }
  // Calls the service when component is selected similar to using ngOnInit
  // ionViewWillEnter() {
  //   this.studentSerivce.getStudents().subscribe((results) => {
  //     this.students = results;
  //   });
  // }

  async deleteStudent(student_id: number) {
    const deleteAlert = await this.alertController.create({
      header: 'Delete',

      message: 'Are you sure you want to delete student!',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          handler: () => {
            // Delete a student from the database
            this.studentSerivce
              .deleteStudent(student_id)
              .subscribe((result) => {
                console.log(result);
              });

            // Delete student from UI display
            let index = this.students.findIndex((item) => {
              // Get student index from array
              return item.id === student_id;
            });

            this.students.splice(index, 1); // remove student data from array
            alert('Student was deleted successfully!');
          },
        },
      ],
    });
    await deleteAlert.present();
  }

  ngOnInit(): void {
    this.studentSerivce.getStudents().subscribe((results) => {
      this.students = results;
    });
    console.log('component initialized');
  }

  // Ion alert method
  setDeleteOpen(isOpen: boolean) {
    this.isDeleteAlertOpen = isOpen;
  }

  // Alert controller
  async presentAlert() {}
}
