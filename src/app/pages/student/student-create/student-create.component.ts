import { Student } from 'src/app/models/student.model';
import { StudentService } from './../../../services/student.service';
import { AlertifyService } from './../../../services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  showLoader = false;
  studentList: Student[];
  studentForm: FormGroup;
  editedStudent: Student;
  editIndex: string;
  mode = 'new';
  constructor(private router: Router, private studentService: StudentService,
      private _fb: FormBuilder, private alertify: AlertifyService,
       private route: ActivatedRoute) { }

  ngOnInit() {
    this.studentService.getStudentList();
    this.studentForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      class: [null, Validators.required],
      stream: [null, Validators.required]
    });

    this.route.paramMap.subscribe(
      ((param: any) => {
        const key = param.get('id');
        if (key) {
          this.mode = 'edit';
          this.editIndex = key;
          this.getStudent(key);
        }
      })
    );
  }

  onSubmit() {
    this.showLoader = true;
    if (this.mode === 'new') {
      this.studentService.setStudentList(this.studentForm.value).then(() => {
        this.showLoader = false;
        this.alertify.success('Success');
        this.router.navigate(['/studentList']);
      }).catch((err) => {
        this.showLoader = false;
        console.log(err);
        this.alertify.error('Some error occured');
        this.router.navigate(['/studentList']);
      });
    } else if (this.mode === 'edit') {
      this.showLoader = true;
      this.studentService.updateStudent({...this.studentForm.value, index: this.editIndex}).then(() => {
        this.showLoader = false;
        this.alertify.success('Updation successful');
        this.router.navigate(['/studentList']);
      }).catch( () => {
        this.alertify.error('Some error occured');
        this.router.navigate(['/studentList']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/studentList']);
  }

  getStudent(key) {
    this.studentService.getStudent(key).subscribe(
      ((student: Student) => {
        this.editedStudent = student;
        this.editStudent(this.editedStudent);
      })
    );
  }

  editStudent(student: Student) {
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      password: student.password,
      class: student.class,
      stream: student.stream
    });
  }

}
