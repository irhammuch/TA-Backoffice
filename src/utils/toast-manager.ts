import { Injectable } from "@angular/core";

export interface Toast {
  text: string;
  type: string;
  duration: number;
}

export enum ToastType {
  DEFAULT = "",
  PRIMARY = "bg-primary text-light",
  DANGER = "bg-danger text-light",
  WARNING = "bg-warning text-dark",
  SUCCESS = "bg-success text-light",
}

export enum ToastDuration {
  SHORT = 3000,
  LONG = 5000,
}

@Injectable({ providedIn: "root" })
export class ToastManager {
  toasts: Toast[] = [];

  create(text: string, type: ToastType, duration: ToastDuration) {
    const toast = { text, type, duration };
    return {
      show: () => this.toasts.push(toast),
      dismiss: () => this.remove(toast),
    };
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
