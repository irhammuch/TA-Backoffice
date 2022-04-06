import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EmployeeService } from "src/services/employee.service";
import {
  ToastDuration,
  ToastManager,
  ToastType,
} from "../../utils/toast-manager";

@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
})
export class EmployeeAddComponent implements OnInit {
  submitted = false;
  uniqueGroup: string[] = [];
  addEmployeeForm = this.fb.group({
    username: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [
      null,
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    birthDate: [null, Validators.required],
    basicSalary: [
      null,
      [Validators.pattern("^[0-9]+(,[0-9]{0,2})?$"), Validators.required],
    ],
    status: [null, Validators.required],
    group: [null, Validators.required],
    description: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private toast: ToastManager,
    private router: Router,
    public employeeService: EmployeeService
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this.submitted = true;
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.toast
      .create(
        "Add Employee Successfully",
        ToastType.SUCCESS,
        ToastDuration.LONG
      )
      .show();

    this.router.navigate(["employee-list"]);
  }

  get f() {
    return this.addEmployeeForm.controls;
  }
}
