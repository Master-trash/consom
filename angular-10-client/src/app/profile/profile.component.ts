import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  userToUpdate: any;
  updateMode: Boolean = false;

  constructor(private token: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userToUpdate = (({username, email}) => ({username, email}))(this.currentUser)
  }

  toggleUpdateMode() {
    this.updateMode = !this.updateMode
  }

  onSubmit() {
    this.userService.updateAllUserInfo(this.currentUser.id, this.userToUpdate).subscribe(result => {
      console.log(result)
    })
  }

}
