import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  /**
   * Show a notification message in a snackbar
   * @param message Message to display
   * @param action Optional action text
   * @param duration Duration in milliseconds
   * @param isError Whether this is an error notification
   */
  showNotification(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
    isError: boolean = false
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: isError ? ['error-notification'] : ['success-notification']
    });
  }
}
