import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Employee, EmployeeService } from "../../services/employee.service";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styles: [".avatar { height: 6rem; width: 6rem; border-radius:50% }"],
})
export class EmployeeDetailComponent implements OnInit {
  username: string | null = this.route.snapshot.paramMap.get("username");
  employee: Employee | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employee = this.employeeService.value.find(
      (employee) => employee.username === this.username
    );
  }
}
