import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../_services/user.service"
import {User} from "../user"

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) { }
    roles: any = [
      {name: "Admin", value: 'ROLE_ADMIN'}, 
      {name: 'User', value: 'ROLE_USER'}, 
      {name: "Moderator", value: "ROLE_MODERATOR"}
    ];
    role: string;
    isSuccessful = false;
    user: User;

  ngOnInit(): void {
    let user_id = this.activatedRoute.snapshot.params.id
    this.userService.getUserById(user_id).subscribe( user => {
      this.user = user
      console.log(this.user)
    })
  }

  onSubmit(): void {
    console.log(this.role)
    this.userService.updateUser(this.user.id, this.role).subscribe(result => {
      console.log(result)
    })
  }

}
