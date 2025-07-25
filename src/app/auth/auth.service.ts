import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode} from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, { email, senha });
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
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
    if (!this.isBrowser()) return null;
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch {
      return false;
    }
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

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}