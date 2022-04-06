import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastDuration, ToastManager, ToastType } from "../utils/toast-manager";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private readonly username = "admin";
  private readonly password = "p@ssw0rd";
  private readonly token =
    "CfDJ8OW5OI0CPGJBgSNlGwO0x4YF7qbYKVv7KOO-N0eFtDUzXOrL7F9Xd9W1otVi4ueJOkAmAhuoHFWNkqRaFD7zvAMHMSKncl6Vo5QXKmpvy6vqxOKxSURdIey8aZPRi3Nnhp2p9la-Al5xrVKz0lignRdcCHf3O7pF9zv_sNx_c_T7pUe3WsxaJEPX3t_9FO2Wjw";

  constructor(private router: Router, private toast: ToastManager) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token") || undefined;

    return !!token;
  }

  login(value: { username: string; password: string }) {
    const { username, password } = value;
    if (username === this.username && password === this.password) {
      localStorage.setItem("token", this.token);
      this.router.navigate(["employee-list"]);
    } else {
      this.toast
        .create(
          "Username or Password is incorrect",
          ToastType.DANGER,
          ToastDuration.LONG
        )
        .show();
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}
