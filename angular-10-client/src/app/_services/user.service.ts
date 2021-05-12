import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../user'

const API_URL = 'http://localhost:8081/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[];
  user = new User();
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'Users')
  }

  getUserById(id) {
    return this.http.get<User>(API_URL + "User/" + id)
  }

  deleteUser(id) {
    console.log(id)
    return this.http.delete(API_URL + "deleteUser/" + id)
  }

  updateUser(id, role) {
    return this.http.put(API_URL + "editByAdmin/" + id, {role})
  }

  updateAllUserInfo(id, user) {
    return this.http.put(API_URL + 'edit/' + id, user)
  }
}
