import { Component, OnInit } from '@angular/core';
// Adjust path
import { AuthService } from './_user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  title = 'crudEmployee';
}
