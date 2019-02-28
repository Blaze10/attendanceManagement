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

  private _searchName: string;
  private _searchYear: string;
  private _searchStream: string;
  filteredTeacherList: Teacher[];

  constructor(private router: Router, private teacherService: TeachersService,
      private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
   this.getAllTeachers();
  }

  get searchName(): string {
    return this._searchName;
  }

  get searchYear(): string {
    return this._searchYear;
  }

  get searchStream(): string {
    return this._searchStream;
  }

  set searchName(value: string) {
    this._searchName = value;
    this.filteredTeacherList = this.filterName(value);
  }

  set searchYear(value: string) {
    this._searchYear = value;
    this.filteredTeacherList = this.filterYear(value);
  }

  set searchStream(value: string) {
    this._searchStream = value;
    this.filteredTeacherList = this.filterStream(value);
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
        this.filteredTeacherList = this.teacersList;
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

  filterName(searchName: string) {
    return this.teacersList.filter(list =>
      list.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }

  filterYear(searchYear: string) {
    return this.teacersList.filter(list =>
      list.class.toLowerCase().indexOf(searchYear.toLowerCase()) !== -1);
  }

  filterStream(searchYear: string) {
    return this.teacersList.filter(list =>
      list.stream.toLowerCase().indexOf(searchYear.toLowerCase()) !== -1);
  }

}
