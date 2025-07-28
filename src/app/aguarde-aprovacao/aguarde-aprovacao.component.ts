import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aguarde-aprovacao',
  imports: [],
  templateUrl: './aguarde-aprovacao.component.html',
  styleUrl: './aguarde-aprovacao.component.css'
})
export class AguardeAprovacaoComponent {

  constructor(private router: Router) {}
  
  voltarLogin() {
    this.router.navigate(['/auth/login']);
  }
  
}
