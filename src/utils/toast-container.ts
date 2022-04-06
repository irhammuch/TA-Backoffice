import { Component } from "@angular/core";
import { ToastManager } from "./toast-manager";

@Component({
  selector: "app-toasts",
  template: `
    <ngb-toast
      *ngFor="let toast of toastManager.toasts"
      [class]="toast.type"
      [autohide]="true"
      [delay]="toast.duration"
      (hidden)="toastManager.remove(toast)"
    >
      {{ toast.text }}
    </ngb-toast>
  `,
  host: {
    class: "toast-container position-fixed top-0 end-0 p-3",
    style: "z-index: 1200",
  },
})
export class ToastsContainer {
  constructor(public toastManager: ToastManager) {}
}
