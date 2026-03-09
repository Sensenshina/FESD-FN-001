import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  isLoading = false;
  alertMessage = '';
  alertType = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      userTel: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      dateOfBirth: ['', [Validators.required, this.dateFormatValidator]]
    });
  }

  private dateFormatValidator(control: any): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(control.value)) {
      return { 'invalidDateFormat': true };
    }

    return null;
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.alertMessage = '';

    if (this.registrationForm.invalid) {
      this.alertMessage = 'Please fill in all required fields correctly.';
      this.alertType = 'warning';
      return;
    }

    this.isLoading = true;
    const user = new User(
      this.f['userFirstName'].value,
      this.f['userLastName'].value,
      this.f['userEmail'].value,
      this.f['userPassword'].value,
      this.f['userTel'].value,
      this.f['dateOfBirth'].value
    );

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertType = 'success';
        this.alertMessage = 'Registration successful! Your account has been created.';
        this.registrationForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.alertType = 'danger';
        this.alertMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.submitted = false;
    this.alertMessage = '';
  }
}