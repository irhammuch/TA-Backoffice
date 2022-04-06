import { Injectable } from "@angular/core";
import { sortCompare } from "src/utils/commons";
import { EMPLOYEES } from "../constants/employees";
import {
  SortDirection,
  SortEvent,
} from "../pages/employee-list/employee-list-sort.directive";

export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private _value: Employee[] = EMPLOYEES;
  filterForm = {
    minSalary: "",
    maxSalary: "",
    status: "",
    filterGroup: "",
  };

  constructor() {}

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get uniqueGroup() {
    return [...new Set(this._value.map((item) => item.group).values())];
  }

  sortBy(column: keyof Employee, direction: SortDirection) {
    return this._value.sort((a, b) => {
      const res = sortCompare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }

  filter(filterValue: EmployeeService["filterForm"]) {
    this.filterForm = filterValue;
    return this.value.filter((employee) => {
      return (
        (!filterValue.minSalary ||
          employee.basicSalary > parseFloat(filterValue.minSalary)) &&
        (!filterValue.maxSalary ||
          employee.basicSalary < parseFloat(filterValue.maxSalary)) &&
        (!filterValue.status || filterValue.status === employee.status) &&
        (!filterValue.filterGroup || filterValue.filterGroup === employee.group)
      );
    });
  }
}
