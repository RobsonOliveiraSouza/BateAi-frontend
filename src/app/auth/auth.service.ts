import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, { email, senha });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.toastr.success('Logout realizado com sucesso!');
    this.router.navigate(['/auth/login']);
  }

  loginSuccess(): void {
    this.toastr.success('Login efetuado com sucesso');
  }

  erroLogin(): void {
    this.toastr.error('Credenciais inválidas');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    } catch {
      return null;
    }
  }

  getUserStatus(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.status || null;
    } catch {
      return null;
    }
  }
}
