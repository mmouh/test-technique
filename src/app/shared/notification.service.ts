import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) {
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };


  success(msg) {
    const panel = 'panelClass';
    this.config[panel] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  failure(msg) {
    const panel = 'panelClass';
    this.config[panel] = ['notification', 'failure'];
    this.snackBar.open(msg, '', this.config);
  }
}
