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
  


  getOpenFlex(c: any): string {
    const openCount = this.classesAvecEleves.filter(c => c.isOpen).length;

    // Largeur variable selon le nombre de cartes ouvertes
    if (window.innerWidth >= 1024) { // lg
      if (openCount === 1) return '1 1 100%';
      if (openCount === 2) return '1 1 48%';
      if (openCount === 3) return '1 1 32%';
      return '1 1 32%';
    }

    if (window.innerWidth >= 768) return '1 1 48%'; // md
    return '1 1 100%'; // sm
  }


  // Trie pour avoir les cartes ouvertes en premier
  sortedClasses() {
    return [...this.classesAvecEleves].sort((a, b) => (b.isOpen ? 1 : 0) - (a.isOpen ? 1 : 0));
  }

  // Détermine le style (largeur responsive) selon les cartes ouvertes sur la ligne
  getCardStyle(c: any) {
    if (!c.isOpen) return { flex: '1 1 30%', height: '150px' };

    const openCards = this.classesAvecEleves.filter(cl => cl.isOpen);
    const count = openCards.length;

    if (window.innerWidth >= 1024) return { flex: `1 1 ${100 / Math.min(count,3) - 2}%` };
    if (window.innerWidth >= 768) return { flex: `1 1 ${100 / Math.min(count,2) - 2}%` };
    return { flex: '1 1 100%' };
  }


  // Détermine quelles cartes sont sur la même "ligne" (approximatif selon flex-wrap)
  getCardsInLine(index: number) {
    const line: any[] = [];
    const breakpoint = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    const start = Math.floor(index / breakpoint) * breakpoint;
    for (let i = start; i < start + breakpoint && i < this.classesAvecEleves.length; i++) {
      line.push(this.classesAvecEleves[i]);
    }
    return line;
  }


  getOpenCardStyle(index: number) {
    const openCards = this.classesAvecEleves.filter(c => c.isOpen);
    const count = openCards.length;

    // Responsive
    if (window.innerWidth >= 1024) { // lg
      return { flex: `1 1 ${100 / Math.min(count,3) - 2}%` };
    }
    if (window.innerWidth >= 768) { // md
      return { flex: `1 1 ${100 / Math.min(count,2) - 2}%` };
    }
    return { flex: '1 1 100%' };
  }




  // Ligne à mettre dans la classe Dashboard
  getOpenLines(): any[][] {
    const openCards = this.classesAvecEleves.filter(c => c.isOpen);
    const lines: any[][] = [];
    let i = 0;

    while (i < openCards.length) {
      // Alterne 2 ou 3 cartes par ligne : 50% ou 33%
      const cardsInLine = (lines.length % 2 === 0) ? 2 : 3;
      lines.push(openCards.slice(i, i + cardsInLine));
      i += cardsInLine;
    }

    return lines;
  }

  // Calcul de la largeur par carte selon la ligne
  getOpenCardStyleByLine(lineIndex: number, lineLength: number) {
    if (window.innerWidth >= 1024) { // Desktop
      const width = (lineLength === 2) ? '50%' : '33%';
      return { flex: `1 1 ${width}` };
    }
    if (window.innerWidth >= 768) { // Tablette
      const width = (lineLength >= 2) ? '48%' : '100%';
      return { flex: `1 1 ${width}` };
    }
    return { flex: '1 1 100%' }; // Mobile
  }


  // Retourne les cartes fermées (toujours en bas)
  getClosedCards() {
    return this.classesAvecEleves.filter(c => !c.isOpen);
  }


  



}
