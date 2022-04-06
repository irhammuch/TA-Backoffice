import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule, registerLocaleData } from "@angular/common";
import { EmployeeAddComponent } from "src/pages/employee-add/employee-add.component";
import { EmployeeDetailComponent } from "src/pages/employee-detail/employee-detail.component";
import { EmployeeListSortDirective } from "src/pages/employee-list/employee-list-sort.directive";
import { EmployeeListComponent } from "src/pages/employee-list/employee-list.component";
import { LoginComponent } from "src/pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginGuard } from "src/guards/login.guard";
import { LoginService } from "src/services/login.service";
import localeId from "@angular/common/locales/id";
import localeIdExtra from "@angular/common/locales/extra/id";
import { ToastModule } from "src/utils/toast.module";

registerLocaleData(localeId, "id-ID", localeIdExtra);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    EmployeeListSortDirective,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "id-ID",
    },
    LoginGuard,
    LoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
