import { AlertifyService } from './../../../services/alertify.service';
import { TeachersService } from './../../../services/teachers.service';
import { Teacher } from './../../../models/teachers.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  showLoader = false;
  teachersList: Teacher[];
  teacherForm: FormGroup;
  editedTeacher: Teacher;
  editIndex: string;
  subjectOptions = [];
  mode = 'new';
  constructor(private router: Router, private teacherService: TeachersService,
      private _fb: FormBuilder, private alertify: AlertifyService,
       private route: ActivatedRoute) { }

  ngOnInit() {
    this.teacherService.getTeacherList();
    this.teacherForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      class: [null, Validators.required],
      stream: [null, Validators.required],
      subject: [null, Validators.required]
    });

    this.route.paramMap.subscribe(
      ((param: any) => {
        const key = param.get('id');
        if (key) {
          this.mode = 'edit';
          this.editIndex = key;
          this.getTeacher(key);
        }
      })
    );
  }

  onSubmit() {
    this.showLoader = true;
    if (this.mode === 'new') {
      this.teacherService.setTeacherList(this.teacherForm.value).then(() => {
        this.showLoader = false;
        this.alertify.success('Success');
        this.router.navigate(['/teacherList']);
      }).catch((err) => {
        this.showLoader = false;
        console.log(err);
        this.alertify.error('Some error occured');
        this.router.navigate(['/teacherList']);
      });
    } else if (this.mode === 'edit') {
      this.showLoader = true;
      console.log(this.teacherForm.value);
      this.teacherService.updateTeacher({...this.teacherForm.value, index: this.editIndex}).then(() => {
        this.showLoader = false;
        this.alertify.success('Updation successful');
        this.router.navigate(['/teacherList']);
      }).catch( () => {
        this.alertify.error('Some error occured');
        this.router.navigate(['/teacherList']);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/teacherList']);
  }

  getTeacher(key) {
    this.teacherService.getTeacher(key).subscribe(
      ((teacher: Teacher) => {
        this.editedTeacher = teacher;
        this.editTeacher(this.editedTeacher);
      })
    );
  }

  editTeacher(teacher: Teacher) {
    this.teacherForm.patchValue({
      name: teacher.name,
      email: teacher.email,
      password: teacher.password,
      class: teacher.class,
      stream: teacher.stream,
      subject: teacher.subject
    });
  }

  onChangeStream($event) {
    const selectedOption = $event.target.value;
    if (selectedOption === 'BSc IT') {
      this.subjectOptions = ['C++', 'Java', 'Networking'];
    } else if (selectedOption === 'BSc CS') {
      this.subjectOptions = ['Machine Learning', 'Cloud Computing', 'DBMS']
    } else if (selectedOption === 'BSc Agriculture') {
      this.subjectOptions = ['Argonomy', 'Horiculture', 'Plant Pathology'];
    }
  }

}
