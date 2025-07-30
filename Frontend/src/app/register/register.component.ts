import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_user/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authForm!: FormGroup;
  isRegisterMode: boolean = false;
  isLoading: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.isLoading = false;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const user = this.authForm.value;

    if (this.isRegisterMode) {
      this.authService.register(user).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/']);
        },
        error: (err) => alert(err)
      });
    } else {
      this.authService.login(user).subscribe({
        next: () => {
          alert('Login successful!');
          this.router.navigate(['/']);
        },
        error: (err) => alert(err)
      });
    }
  }

  switchMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.authForm.reset();
  }
}