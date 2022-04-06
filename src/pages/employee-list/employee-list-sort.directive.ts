import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { Employee } from "../../services/employee.service";

export type SortColumn = keyof Employee | "";
export type SortDirection = "asc" | "desc" | "";
export interface SortEvent {
  column: SortColumn;
  direction?: SortDirection;
}

@Directive({
  selector: "th[sortable]",
  host: {
    "[class.asc]": 'direction === "asc"',
    "[class.desc]": 'direction === "desc"',
    "(click)": "rotate()",
  },
})
export class EmployeeListSortDirective {
  @Input() sortable: SortColumn = "";
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    const rotate: { [key: string]: SortDirection } = {
      asc: "desc",
      desc: "",
      "": "asc",
    };

    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
