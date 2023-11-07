import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

  // Binding form control elements alongside their input validation using REGEX
  username = new FormControl('');
  firstname = new FormControl('');
  lastname = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  hasError = false;
  errorMessage = '';

  // Constructor
  constructor(private router: Router, private auth: AuthService, private http: HttpClient, private titleService: Title) {
    this.titleService.setTitle("Signup");
   }

  // Variables to track toggle state
  showPassword = false;
  showConfirmPassword = false;

  // Functions check password visibility state
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Functions check password visibility state
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  ngOnInit(): void { }


  // On Form Submitted event
  onSubmit(e: Event) {
    e.preventDefault();
    this.hasError = false;

    if (
      !this.username.value ||
      !this.firstname.value ||
      !this.lastname.value ||
      !this.password.value ||
      !this.confirmPassword.value

    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Check if password match
    if (this.password.value != this.confirmPassword.value) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Send http request ot create user
    this.auth.signUp(
      this.username.value,
      this.firstname.value,
      this.lastname.value,
      this.password.value
    )
      .subscribe({

        next: (v) => {
          console.log('Token received:', v);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Error signing up:', err);
          this.hasError = true;
          this.errorMessage = 'Error creating acccount, please check your details';
        },
      });

  }

  dismissError(): void {
    this.hasError = false;
    this.errorMessage = '';
  }
}