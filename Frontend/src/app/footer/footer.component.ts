import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  contact = { name: '', email: '', message: '' };

  onSubmit() {
    // handle or send contact form
    console.log('Contact form data:', this.contact);
    alert('Thanks for reaching out!');
    this.contact = { name: '', email: '', message: '' };
  }
}
