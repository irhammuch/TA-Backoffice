import { Component } from "@angular/core";
import { LoginService } from "src/services/login.service";

@Component({
  selector: "app-root",
  template: `
    <div class="root">
      <nav class="navbar navbar-dark bg-primary">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Employee Backoffice</span>
          <button
            *ngIf="loginService.isAuthenticated()"
            class="btn btn-light"
            type="button"
            (click)="loginService.logout()"
          >
            Logout
          </button>
        </div>
      </nav>
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
      <app-toasts aria-live="polite" aria-atomic="true"></app-toasts>
    </div>
  `,
  styles: [".root{ min-height:100vh }"],
})
export class AppComponent {
  title = "TA-Backoffice";
  constructor(public loginService: LoginService) {}
}
