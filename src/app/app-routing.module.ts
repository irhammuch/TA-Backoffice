import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "src/guards/login.guard";
import { EmployeeAddComponent } from "src/pages/employee-add/employee-add.component";
import { EmployeeDetailComponent } from "src/pages/employee-detail/employee-detail.component";
import { EmployeeListComponent } from "src/pages/employee-list/employee-list.component";
import { LoginComponent } from "src/pages/login/login.component";

const routes: Routes = [
  { path: "employee-add", component: EmployeeAddComponent },
  { path: "employee-detail/:username", component: EmployeeDetailComponent },
  {
    path: "employee-list",
    component: EmployeeListComponent,
    canActivate: [LoginGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/employee-list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
