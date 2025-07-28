import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})

export class ContatoComponent {

  constructor(private router: Router) {}

  voltarInicio() {
    this.router.navigate(['/']);
  }
}
