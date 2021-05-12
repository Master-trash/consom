import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {User} from '../user'

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  query: string;
  users: User[];
  displayedUsers: User[];
  content: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.userService.getUsers().subscribe( data => {
      console.log(data);
      this.users = data ;
      this.displayedUsers = data
      
    });
  }

  searchUser() {
    console.log(this.query)
    if (this.query !== "") {
      this.displayedUsers = this.users.filter( user => {
        return user.username.toLowerCase().includes(this.query)
      })
    } else {
      this.displayedUsers = this.users
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(result => {
      this.users = this.users.filter(user => user.id !== id)
    })
  }

}
