import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants';
import { User } from '../models/user';

export const ROLE_KEY = 'roleId';
export enum Roles {
  ADMIN = 'admin',
  USER = "user"
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3001';

  private tokenData: any;
  private tokenRole: any;
  private id: any;
  private tokenPass: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  singin(user: User) {
    const endpoint = `${BASE_URL}usuario?userName=${user.userName}&pass=${user.pass}`;
    return this.http.get(endpoint);
  }

  isAuth(): boolean {
    const roleId = localStorage.getItem(ROLE_KEY);
    return roleId == Roles.ADMIN;
  }

  isUser(): boolean {
    const roleId = localStorage.getItem(ROLE_KEY);
    return roleId == Roles.USER;
  }

  setTokenData(data: string) {
    this.tokenData = data;
  }

  getTokenData() {
    return this.tokenData;
  }

  setTokenRole(role: string) {
    this.tokenRole = role;
  }

  getTokenRole() {
    return localStorage.getItem(ROLE_KEY);
  }

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setPass(pass: string) {
    this.tokenPass = pass;
  }

  getPass() {
    return this.tokenPass;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}usuario`);
  }

  getUserbyId(id: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/user/getuser/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${BASE_URL}usuario`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${BASE_URL}usuario/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${BASE_URL}usuario/${user.id}`, user);
  }
}
