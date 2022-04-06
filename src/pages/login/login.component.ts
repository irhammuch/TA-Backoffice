import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login",
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="onSubmit()"
      class="row align-items-md-end needs-validation"
    >
      <div class="row pt-md-4 justify-content-center">
        <div class="mb-3 col-6">
          <label for="username" class="form-label">User Name</label>
          <input
            formControlName="username"
            type="text"
            class="form-control"
            id="username"
            placeholder="Input User Name"
          />
          <small
            class="text-danger"
            *ngIf="(f['username'].touched || submitted) && f['username'].errors?.['required']"
            >User Name is required</small
          >
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="mb-3 col-6">
          <label for="password" class="form-label">Password</label>
          <input
            formControlName="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Input Password"
          />
          <small
            class="text-danger"
            *ngIf="(f['password'].touched || submitted) && f['password'].errors?.['required']"
            >Password is required</small
          >
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-6 d-grid">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </div>
    </form>
  `,
})
export class LoginComponent implements OnInit {
  submitted = false;
  uniqueGroup: string[] = [];
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });
  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.value);
  }

  get f() {
    return this.loginForm.controls;
  }
}
