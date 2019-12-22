export class Salarie {

  prenom: string;
  fonction: string;
  anneeExperience: number;
  adresse: string;
  salaire: number;
  dateNaissance: string;

  constructor(prenom: string, fonction: string, anneeExperience: number, adresse: string, salaire: number, dateNaissance: string) {
    this.prenom = prenom;
    this.fonction = fonction;
    this.anneeExperience = anneeExperience;
    this.adresse = adresse;
    this.salaire = salaire;
    this.dateNaissance = dateNaissance;
  }

}
