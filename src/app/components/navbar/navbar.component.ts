import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  // @Output() termToSearch: EventEmitter<string>;

  term = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  buscar() {
    if (this.term.length === 0){
      return;
    }
    this.router.navigate(['search', this.term]);
  }

}
