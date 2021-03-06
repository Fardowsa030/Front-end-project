import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../validation.service';
import { AuthService } from '../../auth/auth.service';
import { Registration } from '../../auth/registration/registrationModel/registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {
  registrations: Registration[];
  user: firebase.User;
  registrationValidation: Registration;
  message : String;

  constructor(private validation: ValidationService, private auth: AuthService, private router: Router) { }

  ngOnInit() {

    // Logged in admin user has access otherwise sen user back to login.
    this.auth.getUserState().subscribe( user => {
      this.user = user;
      if(user == null){
        this.router.navigate(['login']);
      }
      if(user != null){
        this.auth.accessOnlyAdmin(user.email);
      }
    });

    this.validation.registrations.subscribe(registrations => {
      this.registrations = registrations;
    });

  }

  acceptRegistration(email: string) {
    this.validation.acceptRegistration(email);
    return this.message = "Gebruiker Goedgekeurd";
  }

  declineRegistration(email: string) {
    this.validation.declineRegistration(email);
    return this.message = "Gebruiker Afgekeurd";
  }
}
