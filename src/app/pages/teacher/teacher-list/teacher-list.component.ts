import { Teacher } from './../../../models/teachers.model';
import { AlertifyService } from './../../../services/alertify.service';
import { TeachersService } from './../../../services/teachers.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teacersList: Teacher[] = [];
  showLoader = false;
  constructor(private router: Router, private teacherService: TeachersService,
      private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
   this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getTeacherList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.teacersList.push(x as Teacher);
        });
      }),
      ((err) => {
        this.showLoader = false;
        console.log(err);
        this.alertify.error('Some error occured');
      })
    );
  }

  onAddTeacher() {
    this.router.navigate(['/teacherCreate']);
  }

  onEdit(key) {
    this.router.navigate(['/teacherCreate', key]);
  }

  onDelete(key) {
    this.teacherService.deleteTeacher(key).then(() => {
      this.alertify.success('Teacher removed');
      this.teacersList = [];
      this.getAllTeachers();
    }).catch(() => {
      this.alertify.error('Some error occured');
    });
  }
}
