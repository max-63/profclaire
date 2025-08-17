import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Eleve, Classe } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']  // ⚠️ attention c'est style**Urls** (pluriel)
})
export class Dashboard implements OnInit {

  eleves: Eleve[] = [];   // objet pour stocker les élèves
  classes: Classe[] = [];  // objet pour stocker les classes*

  classesAvecEleves: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.load_data();
  }


  trier_eleves_par_classes(): any[] {
    const result: any[] = [];

    for (let c of this.classes) {
      const eleves_de_classe = this.eleves.filter(e => e.classe === c.id);
      // Pousse un objet dans le tableau avec la classe et ses élèves
      result.push({
        classe: c,
        eleves: eleves_de_classe
      });
    }

    return result;
  }



  load_data() {
    this.api.getEleves().subscribe({
      next: (eleves) => {
        this.eleves = eleves;
        console.log(this.eleves);
        this.buildClassesAvecEleves();
      }
    });

    this.api.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
        console.log(this.classes);
        this.buildClassesAvecEleves();
      }
    });
  }

  // Cette méthode ne fera l’assemblage que si les deux tableaux sont remplis
  buildClassesAvecEleves() {
    if (this.eleves.length && this.classes.length) {
      this.classesAvecEleves = this.trier_eleves_par_classes();
    }
  }


}
