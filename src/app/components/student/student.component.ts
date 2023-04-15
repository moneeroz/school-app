import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Istudent } from 'src/app/interfaces/istudent';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class StudentComponent implements OnChanges {
  // student data is input to allow student_data to be used in the child component
  @Input() student_data!: Istudent;
  @Output() deleteEvent = new EventEmitter(); // custom event

  onDelete() {
    if (
      confirm(
        `Are you sure you want to delete ${this.student_data.name}'s record?`
      )
    ) {
      // emit() takes one argument if you want to send more use an array or an object
      this.deleteEvent.emit(this.student_data.id); // Triggering our custom event
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('student_data properity changed');
    console.log(changes);
  }
}
