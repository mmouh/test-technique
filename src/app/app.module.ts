import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FileSelectDirective} from 'ng2-file-upload';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {SalariesComponent} from './salaries/salaries.component';
import {SalarieListComponent} from './salaries/salarie-list/salarie-list.component';
import {SalarieComponent} from './salaries/salarie/salarie.component';
import {MaterialModule} from './material/material.module';
import {SalarieService} from './shared/salarie.service';
import {MatDatepickerModule} from '@angular/material';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    SalariesComponent,
    SalarieListComponent,
    SalarieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [SalarieService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [SalarieComponent]
})
export class AppModule {
}
