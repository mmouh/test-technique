import {Component, OnInit} from '@angular/core';
import {SalarieService} from '../../shared/salarie.service';
import {MAT_DATE_FORMATS, MatDialogRef, DateAdapter} from '@angular/material';
import {NotificationService} from '../../shared/notification.service';


@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {

  operattionType = 'create';

  constructor(private service: SalarieService,
              public dialogRef: MatDialogRef<SalarieComponent>,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    if (this.service.form.get('id').value) {
      this.operattionType = 'update';
    } else {
      this.operattionType = 'create';
    }
  }


  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('id').value) {
        this.service.addSalarie(this.service.form.value).subscribe(
          res => {
            this.notificationService.success(':: Submitted successfully');
            this.onClose();
          },
          err => {
            this.notificationService.failure(':: Submit failure');
            this.onClose();
          }
        );
      } else {
        this.service.updateSalarie(this.service.form.value).subscribe(
          res => {
            this.notificationService.success(':: Updated successfully');
            this.onClose();
          },
          err => {
            this.notificationService.failure(':: Update failure');
            this.onClose();
          }
        );
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.service.initialize();
  }
}
