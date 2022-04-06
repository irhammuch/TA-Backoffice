import { Component, QueryList, ViewChildren } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { atLeastOneHasValue } from "src/utils/commons";
import { Employee, EmployeeService } from "../../services/employee.service";
import {
  ToastDuration,
  ToastManager,
  ToastType,
} from "../../utils/toast-manager";
import {
  EmployeeListSortDirective,
  SortDirection,
  SortEvent,
} from "./employee-list-sort.directive";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
})
export class EmployeeListComponent {
  @ViewChildren(EmployeeListSortDirective)
  headers!: QueryList<EmployeeListSortDirective>;
  employees!: Employee[];
  page = 1;
  pageSize = 10;
  collectionSize!: number;

  filterForm = this.fb.group(
    {
      minSalary: [null, Validators.pattern("^[0-9]*$")],
      maxSalary: [null, Validators.pattern("^[0-9]*$")],
      status: [null],
      filterGroup: [null],
    },
    {
      validators: atLeastOneHasValue([
        "minSalary",
        "maxSalary",
        "status",
        "filterGroup",
      ]),
    }
  );

  constructor(
    private fb: FormBuilder,
    public employeeService: EmployeeService,
    private toast: ToastManager
  ) {
    this.filterForm.patchValue(this.employeeService.filterForm);
    this.refreshEmployees();
    this.filterForm.valid && this.onFilterSubmit();
  }

  resetFilter() {
    this.filterForm.reset();
    this.refreshEmployees();
  }

  onFilterSubmit() {
    const FILTERED_EMPLOYEES = this.employeeService.filter(
      this.filterForm.value
    );
    this.collectionSize = FILTERED_EMPLOYEES.length;
    this.employees = FILTERED_EMPLOYEES.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    if (direction === "" || column === "") {
      this.employees = this.employeeService.value;
    } else {
      this.employees = this.employeeService.sortBy(
        column,
        direction as SortDirection
      );
    }
  }

  refreshEmployees() {
    this.employees = this.employeeService.value.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
    this.collectionSize = this.employeeService.value.length;
  }

  showActionToast(text: string, action: "Edit" | "Delete") {
    const toastType = action === "Edit" ? ToastType.WARNING : ToastType.DANGER;
    this.toast
      .create(`${action} ${text}`, toastType, ToastDuration.SHORT)
      .show();
  }
}
