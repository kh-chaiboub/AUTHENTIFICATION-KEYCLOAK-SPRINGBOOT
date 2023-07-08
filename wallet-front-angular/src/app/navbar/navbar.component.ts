import { Component, OnInit } from '@angular/core';
import { SercurityService } from '../services/sercurity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginTemplate: any;
  private loged: any;
  userProfile: any;
  loggedIn: boolean | undefined;
  constructor(public securityService:SercurityService) { }
  async ngOnInit() {
    console.log("sdfsdfsdfsdfsdfsdf")
    console.log(this.securityService.kcService.loadUserProfile())
    this.loggedIn = await this.securityService.kcService.isLoggedIn();
    if (this.loggedIn) {
      console.log("sdfsdfsdfsdfsdfsdf2")
      console.log(this.loggedIn)
      await this.loadUserProfile();
    }
  }

  async loadUserProfile() {
    try {
      this.userProfile = await this.securityService.kcService.loadUserProfile();
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  }

  getUserFullName(): string {
    if (this.userProfile) {
      console.log("sdfsdfsdfsdfsdfsdf3")
      console.log(this.userProfile)
      return `${this.userProfile.username}`;
    }
    return '';
  }

  onLogout() {
    this.securityService.kcService.logout(window.location.origin)

  }
  public async getToken() {
  }

  async login(){
    await this.securityService.kcService.login({
      redirectUri: window.location.origin
    })

  }
}
