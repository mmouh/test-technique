import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Salarie} from './salarie.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json; charset=utf-8'})
};

@Injectable({
  providedIn: 'root'
})
export class SalarieService {

  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    prenom: new FormControl('', Validators.required),
    fonction: new FormControl('', Validators.required),
    anneeExperience: new FormControl(0, Validators.required),
    adresse: new FormControl('', Validators.required),
    salaire: new FormControl(0.0, Validators.required),
    dateNaissance: new FormControl('', Validators.required)
  });

  initialize() {
    this.form.setValue({
      id: null,
      prenom: '',
      fonction: '',
      anneeExperience: 0,
      adresse: '',
      salaire: 0.0,
      dateNaissance: ''
    });
  }

  getSalaries() {
    return this.http.get('/server/salaries');
  }

  updateSalarie(salarie: Salarie) {
    console.log('update call');
    if (salarie.dateNaissance !== '') {
      salarie.dateNaissance = this.datePipe.transform(salarie.dateNaissance, 'yyyy-MM-dd');
    }
    return this.http.put('/server/salaries', salarie);
  }

  addSalarie(salarie: Salarie) {
    if (salarie.dateNaissance !== '') {
      salarie.dateNaissance = this.datePipe.transform(salarie.dateNaissance, 'yyyy-MM-dd');
    }
    return this.http.post('/server/salaries', salarie);
  }

  deleteSalarie(id: number) {
    return this.http.delete('/server/salaries/' + id);
  }

  dedoublonneSalaries(salaries: Array<Salarie>, critere: string) {
    return this.http.post('/server/salariesDedoublonnes?critere=' + critere, salaries);
  }

  populateForm(salarie) {
    this.form.setValue(salarie);
  }

}
