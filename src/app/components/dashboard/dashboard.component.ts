import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { DashboardData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;

  dashboardModelObj: DashboardData = new DashboardData();
  allCustomerData: any;
  showAdd!: boolean;
  showbtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      _id: [],
      name: [''],
      title: [''],
      email: [''],
      role: [''],
    });
    this.getAllCustomerData();
  }

  clickAddCustomer() {
    this.formValue.reset();
    this.showAdd = true; //
    this.showbtn = false;
  }

  //subscribing the data

  addCustomer() {
    this.dashboardModelObj._id = this.formValue.value._id;
    this.dashboardModelObj.name = this.formValue.value.name;
    this.dashboardModelObj.title = this.formValue.value.title;
    this.dashboardModelObj.email = this.formValue.value.email;
    this.dashboardModelObj.role = this.formValue.value.role;

    this.api.postCustomer(this.dashboardModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Customer Added Succesfully');
        this.formValue.reset();
        this.getAllCustomerData();

        let ref = document.getElementById('clear');
        ref?.click();
      },
      (err) => {
        alert('Something Wrong');
      }
    );
  }

  getAllCustomerData() {
    this.api.getCustomer().subscribe((res) => {
      this.allCustomerData = res;
      console.log(res);
    });
  }

  deteteCustomerData(data: any) {
    this.api.deleteCustomer(data._id).subscribe((res) => {
      alert('record Deleted ');
      this.getAllCustomerData();
    });
  }

  onEditCustomer(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.dashboardModelObj._id = data._id;
    this.formValue.controls['_id'].setValue(data._id);
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['title'].setValue(data.title);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['role'].setValue(data.role);
  }

  updateCustomerData() {
    this.dashboardModelObj.name = this.formValue.value.name;
    this.dashboardModelObj.title = this.formValue.value.title;
    this.dashboardModelObj.email = this.formValue.value.email;
    this.dashboardModelObj.role = this.formValue.value.role;

    this.api
      .updateCustomer(this.dashboardModelObj, this.dashboardModelObj._id)
      .subscribe((res) => {
        alert('updated');
        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset();
        this.getAllCustomerData();
      });
  }
}
