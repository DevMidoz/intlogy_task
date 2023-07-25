import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserData, IUserDetails } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  userData : IUserData | undefined 
  userDetails : IUserDetails | undefined

  constructor(public router : Router, private location: Location){
    const navigation = this.router.getCurrentNavigation();
    this.userDetails = (navigation?.extras.state as IUserDetails);
    this.userData = this.userDetails.data;
  }

  goBack() {
    this.location.back();
  }

}
