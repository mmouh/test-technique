import {Component, OnInit, ViewChild} from '@angular/core';
import {SalarieService} from '../../shared/salarie.service';
import {Salarie} from '../../shared/salarie.model';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import {SalarieComponent} from '../salarie/salarie.component';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-salarie-list',
  templateUrl: './salarie-list.component.html',
  styleUrls: ['./salarie-list.component.css']
})
export class SalarieListComponent implements OnInit {

  public salaries;
  selected = 'prenom';

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['prenom', 'fonction', 'anneeExperience', 'adresse', 'salaire', 'dateNaissance', 'actions'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey;

  constructor(private salarieService: SalarieService,
              private dialog: MatDialog,
              private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.getSalaries();
    console.log('listData' + this.listData != null);
    /*
    this.salarieService.getSalaries().subscribe(
      list => {
        const array = list.map(item => {
           return{
             ...item.payload.val()
           };
        });
        this.listData = new MatTableDataSource(array);
      }
    );
    */
  }


  getSalaries() {
    this.salarieService.getSalaries()
      .subscribe(res => {
        this.salaries = res;
        this.listData = new MatTableDataSource(this.salaries);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toString().toLowerCase().indexOf(filter) !== -1;
          });
        };
        // console.log(this.salaries);
      }, error => {
        console.log(error);
        // this.status = 'ERROR';
        // this.errorMessage = error.error;
      });
    /*.subscribe(
    data => {this.salaries = data;},
    error => console.error(error),
    () => console.log('Salaries loaded')
  );*/

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    console.log('entree dans filtre');
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  dedoublonneSalaries() {
    this.salarieService.dedoublonneSalaries(this.salaries, this.selected).subscribe(
      res => {
        // console.log(res);
        // this.status = 'SUCCESS';
        this.salaries = res;
        this.listData = new MatTableDataSource(this.salaries);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
        // console.log(this.salaries);
      }, error => {
        console.log(error);
        // this.status = 'ERROR';
        // this.errorMessage = error.error;
      }
    );
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SalarieComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getSalaries();
      }
    );

  }

  onEdit(row) {
    this.salarieService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SalarieComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getSalaries();
      }
    );
  }

  onDelete(row) {
    /*console.log(row);
    console.log(row.id);*/
    this.salarieService.deleteSalarie(row.id).subscribe(
      res => {
        this.notificationService.success(':: Successfully deleted');
        this.getSalaries();
      },
      err => {
        this.getSalaries();
        this.notificationService.failure(':: Delete failure');
      }
    );

  }
}
