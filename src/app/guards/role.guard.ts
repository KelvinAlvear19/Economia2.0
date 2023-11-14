import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService){
  }

  canActivate(): boolean {
    if (!this.authService.isUser()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
