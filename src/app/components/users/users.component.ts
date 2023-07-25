import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime } from 'rxjs';
import { IUser, IUserData, IUserDetails } from 'src/app/interfaces/user';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  users  : IUser | undefined;
  userDetails : IUserDetails | undefined
  searchTerm = new Subject<any>()

  filteredUsers : IUserData []= []
  totalCount : number = 0 
  pageSize : number  = 0
  pageNumber : number = 0 
  pageEvent: PageEvent | undefined;
  previousPageIndex: number = 0;
  loading: Observable<boolean>;

  constructor(public _userService : UserService, public router : Router, public loadingBarService : LoadingBarService){
    this.loading = this.loadingBarService.loading;
  }

  getAllUsers (pageNumber? :number, previousPageIndex? : number) {
    this._userService.getUsers({pageNumber : pageNumber, previousPageIndex : previousPageIndex}).subscribe((res : IUser) => {
      debugger
      this.users = res
      this.totalCount = res.total
       this.pageNumber = res.page - 1
      this.filteredUsers = this.users.data
      
    })
  }

  showUserDetails (user : IUserData) {
    this._userService.getUserByID(user.id).subscribe((res : IUserDetails) => {
      this.userDetails = res
      this.router.navigateByUrl(`user-details/${this.userDetails.data.id}`, { state: this.userDetails  });
      
    })
  }

  onSearch($event:any) {
    const value = $event.target.value;
    this.searchTerm.next(value)
  }

  searchUsers (searchTxt :string) {
    if (this.users) {
      this.filteredUsers = this.users.data.filter(user => user.first_name.toLowerCase().includes(searchTxt) || user.last_name.toLowerCase().includes(searchTxt))
    }
  }

  handlePageEvent(e: PageEvent) {
    debugger
    this.pageEvent = e;
    this.totalCount = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1
    if (e.previousPageIndex) {
      this.previousPageIndex = e.previousPageIndex + 1
    }
    this.getAllUsers(this.pageNumber, this.previousPageIndex);
  }

  ngOnInit(): void {
   this.getAllUsers();
   this.searchTerm.pipe(debounceTime(1100)).subscribe((searchTxt :string)=>{
    this.searchUsers(searchTxt)
  })
  }

  
}
