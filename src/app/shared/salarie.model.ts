export class SalarieModel {

  prenom: string;
  fonction: string;
  anneeExperience: number;
  adresse: string;

  constructor(prenom: string, fonction: string, anneeExperience: number, adresse: string) {
    this.prenom = prenom;
    this.fonction = fonction;
    this.anneeExperience = anneeExperience;
    this.adresse = adresse;
  }

}
