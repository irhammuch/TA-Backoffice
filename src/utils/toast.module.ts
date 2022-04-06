import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { ToastManager } from "./toast-manager";
import { ToastsContainer } from "./toast-container";

@NgModule({
  declarations: [ToastsContainer],
  imports: [CommonModule, NgbModule],
  exports: [ToastsContainer],
  providers: [ToastManager],
})
export class ToastModule {}
